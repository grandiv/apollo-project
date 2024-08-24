"use client";

import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

type Props = {};

const SignInButton = (props: Props) => {
  return (
    <Button
      variant="outline"
      className="rounded-3xl w-full h-[3rem] bg-gradient-to-t from-[#62cff4] to-[#2c67f2]"
      onClick={() => {
        signIn("google");
      }}
    >
      Sign In
    </Button>
  );
};

export default SignInButton;
