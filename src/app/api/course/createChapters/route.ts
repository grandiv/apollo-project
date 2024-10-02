// Endpoint: /api/course/createChapters

import { NextResponse } from "next/server";
import { createChaptersSchema } from "@/validators/course";
import { ZodError } from "zod";
import { strict_output } from "@/lib/gemini";
import { getUnsplashImage } from "@/lib/unsplash";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { checkSubscription } from "@/lib/subscription";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // If they are a pro member, this section will be skipped
    const isPro = await checkSubscription();
    if (session.user.credits <= 0 && !isPro) {
      return new NextResponse("No Credits Left", { status: 402 });
    }

    const body = await req.json();
    const { title, units, teamId } = createChaptersSchema.parse(body);

    type outputUnits = {
      title: string;
      chapters: {
        youtube_search_query: string;
        chapter_title: string;
      }[];
    }[];

    let output_units: outputUnits = await strict_output(
      "You are an AI capable of curating course content, consists of maximum 5 units and coming up with relevant chapter titles, and finding relevant YouTube videos for each chapter",
      new Array(units.length).fill(
        `It is your job to create a course about ${title}. The maximum amount of units is 5. The user has requested to create chapters for each of the units, if you find more than 5 relevant chapters, choose the most relevant ones with maximum of 5 chapters per unit. Then, for each chapter, provide a detailed YouTube search query that can be used to find an informative educational video for each chapter. Each query should give an educational informative course in YouTube.`
      ),
      {
        title: "title of the unit",
        chapters:
          "an array of chapters with maximum of 5, each chapter should have a youtube_search_query and a chapter_title key in the JSON object",
      }
    );

    const imageSearchTerm = await strict_output(
      "You are an AI capable of finding the most relevant image for a course",
      `Please provide a good image search term for the title of a course about ${title}. This search term will be fed into the unsplash API, so make sure it is a good search term that will return good results. Make sure the picture you are searching is relevant to the category of the course.`,
      {
        image_search_term: "a good search form for the title of the course",
      }
    );

    // Get an image from Unsplash
    const course_image = await getUnsplashImage(
      imageSearchTerm.image_search_term
    );

    const course = await prisma.course.create({
      data: {
        name: title,
        image: course_image,
        userId: session.user.id,
        teamId: teamId ? teamId : undefined,
      },
    });

    for (const unit of output_units) {
      const title = unit.title;
      const prismaUnit = await prisma.unit.create({
        data: {
          name: title,
          courseId: course.id,
        },
      });
      await prisma.chapter.createMany({
        data: unit.chapters.map((chapter) => {
          return {
            name: chapter.chapter_title,
            youtubeSearchQuery: chapter.youtube_search_query,
            unitId: prismaUnit.id,
          };
        }),
      });
    }

    // When they create a new course then the credits will be decremented
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        credits: {
          decrement: 1,
        },
      },
    });

    await prisma.team.update({
      where: {
        id: teamId,
      },
      data: {
        courses: {
          connect: {
            id: course.id,
          },
        },
      },
    });

    // redirect to the course page
    return NextResponse.json({ course_id: course.id });
  } catch (error) {
    console.error("Error in POST /api/course/createChapters:", error);

    if (error instanceof ZodError) {
      return new NextResponse("Invalid Body", { status: 400 });
    }

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
