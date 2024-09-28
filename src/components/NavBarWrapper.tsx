// NavbarWrapper.tsx
"use client";

import React, { useEffect, useState } from "react";

const NavbarWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 top-0 z-[30] transition-all duration-300 ${
        isScrolled ? "backdrop-blur-md dark:bg-gray-900/80" : "bg-transparent"
      }`}
      style={{ minHeight: "72px" }}
    >
      {children}
    </div>
  );
};

export default NavbarWrapper;
