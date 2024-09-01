// With the '...' in the path, this page will match any route that starts with /course/
// any slug after /course/ will be handled in this page.tsx. Ex: /course/1/2/3
// Look at the href in ConfirmChapters.tsx -> /course/${course.id}/0/0

import CourseSidebar from "@/components/CourseSidebar";
import MainVideoSummary from "@/components/MainVideoSummary";
import QuizCards from "@/components/QuizCards";
import { prisma } from "@/lib/db";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    slug: string[]; // This slug is basically the '/${course.id}/0/0' part
  };
};

const CoursePage = async ({ params: { slug } }: Props) => {
  const [courseId, unitIndexParam, chapterIndexParam] = slug;
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      units: {
        include: {
          chapters: {
            include: {
              questions: true,
            },
          },
        },
      },
    },
  });
  if (!course) {
    return redirect("/gallery");
  }
  let unitIndex = parseInt(unitIndexParam);
  let chapterIndex = parseInt(chapterIndexParam);

  const unit = course.units[unitIndex]; // Taking the unit in the course at the unitIndex
  if (!unit) {
    return redirect("/gallery");
  }

  const chapter = unit.chapters[chapterIndex]; // Taking the chapter in the unit at the chapterIndex
  if (!chapter) {
    return redirect("/gallery");
  }

  const nextChapter = unit.chapters[chapterIndex + 1];
  const prevChapter = unit.chapters[chapterIndex - 1];

  return (
    <div className="pt-16">
      <CourseSidebar course={course} currentChapterId={chapter.id} />
      <div>
        <div className="ml-[400px] px-8">
          <div className="flex">
            <MainVideoSummary
              chapter={chapter}
              unit={unit}
              chapterIndex={chapterIndex}
              unitIndex={unitIndex}
            />
            <QuizCards chapter={chapter} />
          </div>
          <div className="flex-[1] h-[1px] mt-4 text-gray-500 bg-gray-500" />
          <div className="flex pb-8">
            {/* The following code basically says if 'prevChapter' exists (not 'undefined' or 'null') 
            after decremented by 1 then render the 'Link'. Otherwise, don't render anything */}
            {prevChapter && (
              <Link
                href={`/course/${course.id}/${unitIndex}/${chapterIndex - 1}`}
                className="flex mt-4 mr-auto w-fit"
              >
                <div className="flex items-center">
                  <ChevronLeft className="w-6 h-6 mr-1" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-secondary-foreground/60">
                      Previous
                    </span>
                    <span className="text-xl font-bold">
                      {prevChapter.name}
                    </span>
                  </div>
                </div>
              </Link>
            )}
            {nextChapter && (
              <Link
                href={`/course/${course.id}/${unitIndex}/${chapterIndex + 1}`}
                className="flex mt-4 ml-auto w-fit"
              >
                <div className="flex items-center">
                  <div className="flex flex-col items-end">
                    <span className="text-sm text-secondary-foreground/60">
                      Next
                    </span>
                    <span className="text-xl font-bold">
                      {nextChapter.name}
                    </span>
                  </div>
                  <ChevronRight className="w-6 h-6 ml-1" />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
