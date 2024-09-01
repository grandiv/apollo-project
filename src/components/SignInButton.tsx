"use client";

import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

type Props = {};

const SignInButton = (props: Props) => {
  return (
    <Button
      variant="outline"
      className="rounded-3xl w-1/2 h-[3rem] border-none bg-gradient-to-br hover:bg-gradient-to-tl from-[#ffad5c] to-[#e6220c]"
      onClick={() => {
        signIn("google");
      }}
    >
      Sign In
    </Button>
  );
};

export default SignInButton;
