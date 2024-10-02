import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";

export async function GET(req: NextRequest, res: NextApiRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    //get query params
    const url = new URL(req.url);
    const referalCode = url.searchParams.get("referalCode");
    try {
      const team = await prisma.team.findFirst({
        where: {
          referalCode: referalCode as string,
        },
      });
      if (!team) {
        return new NextResponse("Team not found", { status: 404 });
      }
      return new NextResponse(JSON.stringify(team), { status: 200 });
    } catch (error) {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
