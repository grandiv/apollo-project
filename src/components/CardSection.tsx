"use client";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "./ui/card";

import { Rocket, Smile, LayoutPanelTop } from "lucide-react";

import Autoplay from "embla-carousel-autoplay";

type Props = {};

const CardSection = (props: Props) => {
  return (
    <div className="bg-[#ebeff7] pb-4 md:pb-9 pt-10 md:pt-24 h-full md:h-screen items-center flex relative flex-col">
      <h1 className="md:text-6xl text-4xl font-bold text-[#213178]">
        Built with FPS
      </h1>
      {/* Cards for desktop mode */}
      <div className="hidden md:p-9 pt-10 md:flex flex-col md:flex-row w-full items-center md:items-stretch justify-evenly">
        <Card className="w-[25vw] text-[#213178] bg-[#f3f3f7] drop-shadow-lg border-none hover:-translate-y-2">
          <div className="flex justify-center pt-8">
            <Rocket className="w-[5.208vw] h-[5.208vw] p-2 rounded-lg bg-gradient-to-tr from-[#2c67f2] to-[#62cff4]" />
          </div>
          <CardHeader>
            <CardTitle className="text-[2.5vw] flex justify-center">
              Fun
            </CardTitle>
            <CardDescription className="pt-2 text-center">
              Learning is an adventure! With our rocket-themed design, your
              journey through knowledge feels like a thrilling mission to
              explore new worlds. Let our AI guide you to discovery with a
              playful and engaging experience that keeps you motivated and
              entertained.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="w-[25vw] text-[#213178] bg-[#f3f3f7] drop-shadow-lg border-none hover:-translate-y-2">
          <div className="w-full flex justify-center pt-8">
            <Smile className="w-[5.208vw] h-[5.208vw] p-2 rounded-lg bg-gradient-to-t from-[#2c67f2] to-[#62cff4]" />
          </div>
          <CardHeader>
            <CardTitle className="text-[2.5vw] flex justify-center">
              Personalized
            </CardTitle>
            <CardDescription className="pt-2 text-center">
              Your learning, your way. Tailor your study sessions by choosing
              the topics and units that matter most to you. Our AI curates
              content just for you, ensuring every video and quiz is relevant to
              your interests and goals.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="w-[25vw] text-[#213178] bg-[#f3f3f7] drop-shadow-lg border-none hover:-translate-y-2">
          <div className="w-full flex justify-center pt-8">
            <LayoutPanelTop className="w-[5.208vw] h-[5.208vw] p-2 rounded-lg bg-gradient-to-tl from-[#2c67f2] to-[#62cff4]" />
          </div>
          <CardHeader>
            <CardTitle className="text-[2.5vw] flex justify-center">
              Structured
            </CardTitle>
            <CardDescription className="pt-2 text-center">
              Stay on course with a clear and organized learning path. Our AI
              not only selects the best content but also provides summaries and
              quizzes to help reinforce your understanding, keeping your studies
              on track and efficient.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Carousel for mobile mode */}
      <div className="md:hidden">
        <Carousel
          opts={{ loop: true }}
          className="w-full max-w-md items-center"
          plugins={[Autoplay({ delay: 2000, stopOnInteraction: true })]}
        >
          <CarouselContent className="">
            <CarouselItem className="">
              <div className="p-10 mx-auto">
                <Card className="text-[#213178] bg-[#f3f3f7]">
                  <CardContent className="flex aspect-square items-center justify-center flex-col">
                    <div className="w-full flex justify-center mt-4">
                      <Rocket
                        width={100}
                        height={100}
                        className="p-2 rounded-lg bg-gradient-to-tr from-[#2c67f2] to-[#62cff4]"
                      />
                    </div>
                    <CardTitle className="text-4xl pt-4 pb-4 flex justify-center">
                      Fun
                    </CardTitle>
                    <CardDescription className="pt-2 text-center">
                      Learning is an adventure! With our rocket-themed design,
                      your journey through knowledge feels like a thrilling
                      mission to explore new worlds. Let our AI guide you to
                      discovery with a playful and engaging experience that
                      keeps you motivated and entertained.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-10 mx-auto">
                <Card className="text-[#213178] bg-[#f3f3f7]">
                  <CardContent className="flex aspect-square items-center justify-center flex-col">
                    <div className="w-full flex justify-center mt-4">
                      <Smile
                        width={100}
                        height={100}
                        className="p-2 rounded-lg bg-gradient-to-tr from-[#2c67f2] to-[#62cff4]"
                      />
                    </div>
                    <CardTitle className="text-4xl pt-4 pb-4 flex justify-center">
                      Personalized
                    </CardTitle>
                    <CardDescription className="pt-2 text-center">
                      Your learning, your way. Tailor your study sessions by
                      choosing the topics and units that matter most to you. Our
                      AI curates content just for you, ensuring every video and
                      quiz is relevant to your interests and goals.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-10 mx-auto">
                <Card className="text-[#213178] bg-[#f3f3f7]">
                  <CardContent className="flex aspect-square items-center justify-center flex-col">
                    <div className="w-full flex justify-center mt-4">
                      <LayoutPanelTop
                        width={100}
                        height={100}
                        className="p-2 rounded-lg bg-gradient-to-tr from-[#2c67f2] to-[#62cff4]"
                      />
                    </div>
                    <CardTitle className="text-4xl pt-4 pb-4 flex justify-center">
                      Structured
                    </CardTitle>
                    <CardDescription className="pt-2 text-center">
                      Stay on course with a clear and organized learning path.
                      Our AI not only selects the best content but also provides
                      summaries and quizzes to help reinforce your
                      understanding, keeping your studies on track and
                      efficient.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default CardSection;
