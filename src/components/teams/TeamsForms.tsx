"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useToast } from "../ui/use-toast";
import {  useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function TeamsForms() {
    const { toast } = useToast();
    const router = useRouter();
    const [referalCode, setReferalCode] = useState<string>("");

    const handleJoin = (referalCode: string) => {
            toast({
                title: "Pending",
                description: "Joining team...",
                variant: "default",
            })
          axios.patch("/api/teams/joinTeams", {
            referalCode: referalCode,
          }).then(() => {

              toast({
                  title: "Success",
                  description: "Team joined successfully",
                  variant: "default",
              });
              router.push("/teams");
          }).catch((error) => {
            toast({
                title: "Error",
                description: "Error joining team",
                variant: "destructive",
            })
          });
      };
    return(
        <div className="w-full flex justify-start gap-x-4">
          <Link href="/teams/create">
            <Button
              type="button"
              variant="outline"
              className="font-semibold ml-2 w-44"
            >
              Create Teams
            </Button>
          </Link>
          <form className="w-full flex gap-x-4" onSubmit={(e) => {
            e.preventDefault();
            handleJoin(referalCode);
          }}> 
            <Input placeholder="Enter team code" value={referalCode} onChange={(e) => setReferalCode(e.target.value)}/>
            <Button
              type="submit"
              variant="outline"
              className="font-semibold w-36"
            >
              Join
            </Button>
          </form>
        </div>
    )
}