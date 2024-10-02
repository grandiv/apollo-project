import React from "react";
import Link from "next/link";
import SignInButton from "./SignInButton";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";
import { ThemeToggle } from "./ThemeToggle";
import Image from "next/image";
import NavbarWrapper from "./NavBarWrapper";

type Props = {};

const Navbar = async (props: Props) => {
  const session = await getAuthSession();
  return (
    <NavbarWrapper>
      <nav className="fixed inset-x-0 top-0 bg-opacity-0 z-[30] h-fit py-3">
        <div className="flex items-center justify-center h-full gap-2 mx-auto sm:justify-between max-w-7xl">
          <Link href="/" className="items-center hidden gap-2 sm:flex">
            <div className="relative w-40 h-12">
              <Image
                src="/logotransparent.png"
                alt="APOLLO Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          {/*bg-[#212f6d] background*/}
          <div className="flex items-center py-[0.15rem] px-4 rounded-[2rem]">
            {session?.user && (
              <>
                <Link href="/teams" className="mr-12 hidden md:flex">
                  Teams
                </Link>
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
    </NavbarWrapper>
  );
};

export default Navbar;
