import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CreateCourseTeams from "@/components/teams/CreateCourseTeams";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";
import SearchGallery from "@/components/SearchGallery";

const TeamsPage = async () => {

  const headersList = headers()
  const pathname = headersList.get('x-pathname');
  const id = pathname?.split("/")[2];
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  const team = await prisma.team.findFirst({
    where: {
      referalCode: id as string,
    },
  });
  const courses = await prisma.course.findMany({
    where: {
      teamId: team?.id,
    },
    include: {
      units: {
        include: {
          chapters: true,
        },
      },
    },
  });
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-[70%] h-[70%] flex flex-col justify-start items-center duration-500">
        <span className="w-full">
          {team?.name ? team.name : "Teams not found"}
        </span>
        <SearchGallery courses={courses} type="team" id={team?.id} />
      </div>
    </div>
  );
}

export default TeamsPage;
