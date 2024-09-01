// It doesn't work lol, but I'm keeping it anyway
"use client";
import React from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Image from "next/image";
import CardSection from "./CardSection";

type Props = {};

const ParallaxBg = (props: Props) => {
  return (
    <div className="h-fit">
      <Parallax
        pages={2}
        style={{ top: "0", left: "0" }}
        className="absolute block"
      >
        <ParallaxLayer offset={0} speed={0.3} className="z-[1.5]">
          <Image
            className="w-full absolute bg-repeat-x bg-auto bg-center"
            src="/layer7.png"
            alt="bg"
            width={1920}
            height={1080}
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.4} className="z-[2]">
          <Image
            className="w-full absolute bg-repeat-x bg-auto bg-center"
            src="/layer6.png"
            alt="bg"
            width={1920}
            height={1080}
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.4} className="z-[2]">
          <Image
            className="w-full absolute bg-repeat-x bg-auto bg-center"
            src="/layer5.png"
            alt="bg"
            width={1920}
            height={1080}
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.4} className="z-[1]">
          <Image
            className="w-full absolute bg-repeat-x bg-auto bg-bottom"
            src="/layer4.png"
            alt="bg"
            width={1920}
            height={1080}
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.4} className="z-[3]">
          <Image
            className="w-full absolute bg-repeat-x bg-auto bg-center"
            src="/layer3.png"
            alt="bg"
            width={1920}
            height={1080}
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0} className="z-[-1]">
          <Image
            className="w-full absolute bg-repeat-x bg-auto bg-center"
            src="/bgsky.png"
            alt="bg"
            width={1920}
            height={1080}
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.4} className="z-[3]">
          <Image
            className="w-full absolute bg-repeat-x bg-auto bg-center"
            src="/layer1.png"
            alt="bg"
            width={1920}
            height={1080}
          />
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.25} className="">
          <CardSection />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default ParallaxBg;
