import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import TeamsForms from "@/components/teams/TeamsForms";

type Props = {};


const TeamsPage = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  const teams = await prisma.team.findMany({
    where: {
      users: {
        some: {
          id: session?.user.id,
        },
      },
    },
  });

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="w-[70%] h-[70%] flex flex-col justify-start gap-y-5">
        <TeamsForms />
        <div className="w-full h-full flex flex-col gap-3">{teams.map((item, idx) => (
          <Link href={`/teams/${item.referalCode}`} key={idx} className="w-full p-1 border-[.5px] border-white flex justify-between">
            <p>{item.name}</p>
            <p>#{item.referalCode}</p>
          </Link>
        ))}</div>
      </div>
    </div>
  );
};

export default TeamsPage;
