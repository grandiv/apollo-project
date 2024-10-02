"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function TeamsPage() {
  const router = useRouter();
  const { id } = useParams();
  const teams = axios
    .get(`/api/teams/getTeamsTitle/`, {
        params: {
            referalCode: id[0],
        }
    })
    .then((res) => {
        setTeamTitle(res.data.name);
    })
    .catch((error) => {});
  const [teamTitle, setTeamTitle] = useState<string>();

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-[70%] h-[70%] flex flex-col justify-start items-center">
        <span className="w-full">{teamTitle ? teamTitle : "Teams not found"}</span>
      </div>
    </div>
  );
}
