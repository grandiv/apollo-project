"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

type Input = {
  name: string;
};

const CreateTeamsForms = () => {
  const { toast } = useToast();
  const [teamName, setTeamName] = useState<string>("");

  const createTeam = async (teamName: string) => {
    try {
      toast({
        title: "Pending",
        description: "Creating team...",
        variant: "default",
      });
      const response = await axios.post("/api/teams/createTeams", {
        name: teamName,
      });
      toast({
        title: "Success",
        description: "Team created successfully",
        variant: "default",
      });

      console.log("Team created:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          title: "Error",
          description: "Error creating team",
          variant: "destructive",
        });
        console.error("Error creating team:", error.response?.data.error);
      } else {
        toast({
          title: "Unexpected Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
        console.error("Unexpected error:", error);
      }
    }
  };

  const handleSubmit = (name: string) => {
    if (name === "") {
      toast({
        title: "Error",
        description: "Please fill all the units",
        variant: "destructive",
      });
      return;
    }
    createTeam(name);
  };

  return (
    <div className="w-[70%] h-[70%] flex justify-center items-center">
      <form
        action=""
        className="w-full flex flex-col gap-y-5 justify-center items-center"
        onSubmit={(e) => {
          handleSubmit(teamName);
        }}
      >
        <Input
          placeholder="Enter team name"
          className="w-[50%]"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <Button
          type="submit"
          variant="outline"
          className="font-semibold ml-2 w-44"
        >
          Create Teams
        </Button>
      </form>
    </div>
  );
};

export default CreateTeamsForms;
