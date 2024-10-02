import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const session = await getAuthSession();
        if (!session?.user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        
        //get all teams from 
        const teams = await prisma.team.findMany({
            include: {
            users: true,
            },
        });
        return new NextResponse(JSON.stringify(teams), { status: 200 });
        
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
        
    }
}