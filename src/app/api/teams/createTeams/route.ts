import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { createTeamsSchema } from "@/validators/teams";
const generateUniqueReferalCode = async () => {
  let referalCode: number = 0;
  let isUnique = false;

  while (!isUnique) {
    // Generate a random 6-digit number
    referalCode = Math.floor(100000 + Math.random() * 900000);

    // Check if the referral code already exists in the database
    const existingTeam = await prisma.team.findUnique({
      where: { referalCode: referalCode.toString() },
    });

    // If no team is found with this referal code, it's unique
    if (!existingTeam) {
      isUnique = true;
    }
  }

  return referalCode;
};

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name } = createTeamsSchema.parse(body);
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const referalCode = await generateUniqueReferalCode();

    const newTeam = await prisma.team.create({
      data: {
        name,
        referalCode: referalCode.toString(),
        users: {
          connect:  {id: session.user.id as string},
        }
      },
    });

    //add teamid into teams array user who created the team
    await prisma.user.update({
      where: { id: session.user.id as string },
      data: {
        teams: {
          connect: { id: newTeam.id },
        },
      },
    });    

    return new NextResponse("Teams created successfully", { status: 201 });
  } catch (error) {
    return new NextResponse("Error creating team", { status: 500 });
  }
}
