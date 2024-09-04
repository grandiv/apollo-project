import React from "react";
import Link from "next/link";
import SignInButton from "./SignInButton";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";
import { ThemeToggle } from "./ThemeToggle";

type Props = {};

const Navbar = async (props: Props) => {
  const session = await getAuthSession();
  return (
    <nav className="fixed inset-x-0 top-0 bg-opacity-0 z-[30] h-fit py-3">
      <div className="flex items-center justify-center h-full gap-2 mx-auto sm:justify-between max-w-7xl">
        <Link href="/" className="items-center hidden gap-2 sm:flex">
          <p className="rounded-lg px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
            APOLLO
          </p>
        </Link>
        {/*bg-[#212f6d] background*/}
        <div className="flex items-center py-[0.15rem] px-4 rounded-[2rem]">
          {session?.user && (
            <>
              <Link href="/gallery" className="mr-12 hidden md:flex">
                Gallery
              </Link>
              <Link href="/create" className="mr-12 hidden md:flex">
                Create Course
              </Link>
              <Link href="/settings" className="mr-12 md:flex">
                Settings
              </Link>
            </>
          )}
          {/* <ThemeToggle className="mr-3" /> */}
          <div className="flex items-center">
            {session?.user ? (
              <UserAccountNav user={session.user} />
            ) : (
              ""
              // <SignInButton />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
