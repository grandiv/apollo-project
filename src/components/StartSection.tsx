import React from "react";
import { buttonVariants } from "@/components/ui/button";
import SignInButton from "./SignInButton";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import { GalleryVerticalEnd, Rocket } from "lucide-react";
import Image from "next/image";
import StartSectionBg from "./StartSectionBg";

type Props = {};

const StartSection = async (props: Props) => {
  const session = await getAuthSession();
  return (
    <div className="relative flex w-full h-screen items-center justify-center">
      <div className="md:z-10 h-screen">
        <StartSectionBg />
      </div>
      <div className="mx-auto md:z-20">
        <div className="text-white text-7xl mb-8">Ready to Get Started?</div>
        <div className="flex md:justify-center md:items-center">
          {session?.user ? (
            <div className="flex md:flex-row flex-col w-full md:space-x-[5rem] items-center md:justify-center">
              <Link
                className={buttonVariants({
                  variant: "outline",
                  className:
                    "rounded-[1.5rem] md:rounded-[2rem] z-[10] md:w-[15vw] md:mt-0 mt-5 w-full bg-transparent border border-white hover:backdrop-blur-[20px] hover:bg-inherit backdrop-blur-[10px]",
                  size: "lg",
                })}
                href="/gallery"
              >
                Gallery
                <GalleryVerticalEnd className="ml-2" />
              </Link>
              <Link
                className={buttonVariants({
                  variant: "secondary",
                  className:
                    "text-white z-[10] md:rounded-[2rem] rounded-[1.5rem] md:mt-0 mt-5 w-full md:w-[15vw] bg-gradient-to-br from-[#ffad5c] to-[#e6220c] hover:bg-gradient-to-tr",
                  size: "lg",
                })}
                href="/create"
              >
                Start
                <Rocket className="ml-2" />
              </Link>
            </div>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </div>
  );
};

export default StartSection;
