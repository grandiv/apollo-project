import { Button, buttonVariants } from "@/components/ui/button";
import React from "react";
import SignInButton from "@/components/SignInButton";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";

type Props = {};

const Home = async (props: Props) => {
  const session = await getAuthSession();
  return (
    <div className="flex flex-col max-w-xl mx-[10rem] my-[10rem]">
      <div className="">
        <h1 className="text-7xl font-bold text-start">
          GROW YOUR TALENT WITH APOLLO
        </h1>
      </div>
      <div className="py-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut quaerat eos
        expedita deleniti ipsa quae quidem omnis reiciendis voluptatibus.
      </div>
      <div className="flex flex-row">
        {session?.user ? (
          <div className="flex w-full space-x-[15rem] justify-center">
            <Link
              className={buttonVariants({
                variant: "outline",
                className: "rounded-3xl w-[10vw]",
                size: "lg",
              })}
              href="/gallery"
            >
              Gallery
            </Link>
            <Link
              className={buttonVariants({
                variant: "secondary",
                className: "rounded-3xl w-[10vw]",
                size: "lg",
              })}
              href="/create"
            >
              Start
            </Link>
          </div>
        ) : (
          <SignInButton />
        )}
      </div>
    </div>
  );
};

export default Home;
