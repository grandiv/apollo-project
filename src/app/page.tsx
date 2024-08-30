import { Button, buttonVariants } from "@/components/ui/button";
import React from "react";
import SignInButton from "@/components/SignInButton";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import CardSection from "@/components/CardSection";
import Image from "next/image";
import { GalleryVerticalEnd, Rocket } from "lucide-react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

type Props = {};

const Home = async (props: Props) => {
  const session = await getAuthSession();
  return (
    <div className="relative flex flex-col">
      <Image
        src="/bg.jpg"
        alt="bg"
        width={1920}
        height={1080}
        className="absolute z-[-1]"
      />
      <div className="w-full h-screen">
        <div className="flex flex-col max-w-3xl mx-4 my-10 md:mx-[10rem] md:my-[15rem]">
          <div>
            <h1 className="text-8xl font-bold text-start">
              GROW YOUR TALENT WITH APOLLO
            </h1>
          </div>
          <div className="py-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut quaerat
            eos expedita deleniti ipsa quae quidem omnis reiciendis
            voluptatibus.
          </div>
          <div className="flex flex-row">
            {session?.user ? (
              <div className="flex w-full space-x-[5rem] justify-center">
                <Link
                  className={buttonVariants({
                    variant: "outline",
                    className:
                      "rounded-[1.5rem] w-[15vw] bg-transparent border border-white hover:backdrop-blur-[20px] hover:bg-inherit backdrop-blur-[10px]",
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
                      "rounded-[1.5rem] w-[15vw] bg-gradient-to-br from-[#ffad5c] to-[#e6220c] hover:bg-gradient-to-tr",
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
    </div>
  );
};

export default Home;
