import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CreateTeamsForms from "@/components/teams/CreateTeamsForm";

const createTeamsPage = async () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <CreateTeamsForms />
    </div>
  );
};

export default createTeamsPage;
