import { buttonVariants } from "@/components/ui/button";
import React from "react";
import SignInButton from "@/components/SignInButton";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";
import { GalleryVerticalEnd, Rocket } from "lucide-react";
import CardSection from "@/components/CardSection";
import StartSection from "@/components/StartSection";

type Props = {};

const Home = async (props: Props) => {
  const session = await getAuthSession();
  return (
    <div className="relative flex flex-col min-h-screen">
      <div className="absolute z-[20] ml-5 mt-9 md:ml-32 md:mt-32 rotate-[70deg] md:w-[150px] md:h-[150px] w-[50px] h-[50px]">
        <Image src="/rocket.png" alt="rocket" fill />
      </div>
      <div className="absolute inset-0 z-[-1] md:aspect-[1170/2048]">
        <Image
          src="/long4.png"
          alt="bg"
          objectFit="cover"
          fill
          objectPosition="top"
          className="w-full h-full "
        />
      </div>
      <div className="w-full h-full">
        <div className="flex flex-col max-w-3xl mx-[3rem] my-[5rem] md:mx-[10.8rem] md:-translate-y-20 md:my-[21rem]">
          <div className="z-[10]">
            <h1 className="text-4xl md:text-8xl font-bold text-start text-[#f3f3f7]">
              GROW YOUR TALENT WITH APOLLO
            </h1>
          </div>
          <div className="py-4 z-[10]">
            <div className="py-4 z-[10] text-[#f3f3f7]">
              Unlock your potential and accelerate your career with APOLLO,
              where cutting-edge tools and personalized opportunities converge
              to fuel your success and help you reach new heights.
            </div>
          </div>
          <div className="flex md:hidden">
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
      <CardSection />
      <div className="hidden md:flex">
        <StartSection />
      </div>
    </div>
  );
};

export default Home;
