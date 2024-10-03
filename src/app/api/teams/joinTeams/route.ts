import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, res: NextResponse) {
    try {
        const session = await getAuthSession();
        if (!session?.user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { referalCode } = body;

        //check if teams already have the user
        try {
            const team = await prisma.team.findFirst({
                where: {
                    referalCode: referalCode,
                    users: {
                        some: { id: session.user.id },
                    },
                },
            });
            if (team) {
                return new NextResponse("User already in the team", { status: 400 });
            }
            
        } catch (error) {
            return new NextResponse("Internal Server Error", { status: 500 });
        }
        
        //Update the team to add user using referal code
        try {
            const newTeam = await prisma.team.update({
                where: { referalCode: referalCode },
                data: {
                    users: {
                        connect: { id: session.user.id },
                    },
                },
            });
            try {
                await prisma.user.update({
                    where: { id: session.user.id },
                    data: {
                        teams: {
                            connect: { id: newTeam.id },
                        },
                    },
                });
                return new NextResponse("Join Success", { status: 200 });
            } catch (error) {
                return new NextResponse("Internal Server Error", { status: 500 });
            }
            
        } catch (error) {
            return new NextResponse("Team not found", { status: 404 });
        }

        //add teamid into teams array user who created the team
        
        
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
        
    }
}