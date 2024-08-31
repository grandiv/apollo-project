import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "./ui/card";
import { Rocket, Smile, LayoutPanelTop } from "lucide-react";

type Props = {};

const CardSection = (props: Props) => {
  return (
    <div className="bg-[#ebeff7] pb-9 pt-9 h-screen items-center flex relative flex-col">
      <h1 className="text-6xl font-bold text-black">Built with FPS</h1>
      <div className="p-9 flex flex-col md:flex-row w-full justify-evenly">
        <Card className="w-[350px] text-black bg-[#f3f3f7] drop-shadow-lg border-none hover:-translate-y-2">
          <div className="w-full flex justify-center pt-8">
            <Rocket
              width={100}
              height={100}
              className="p-2 rounded-lg bg-gradient-to-tr from-[#2c67f2] to-[#62cff4]"
            />
          </div>
          <CardHeader>
            <CardTitle className="text-6xl flex justify-center">Fun</CardTitle>
            <CardDescription className="pt-2 text-center">
              Learning is an adventure! With our rocket-themed design, your
              journey through knowledge feels like a thrilling mission to
              explore new worlds. Let our AI guide you to discovery with a
              playful and engaging experience that keeps you motivated and
              entertained.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="w-[350px] text-black bg-[#f3f3f7] drop-shadow-lg border-none hover:-translate-y-2">
          <div className="w-full flex justify-center pt-8">
            <Smile
              width={100}
              height={100}
              className="p-2 rounded-lg bg-gradient-to-t from-[#2c67f2] to-[#62cff4]"
            />
          </div>
          <CardHeader>
            <CardTitle className="text-5xl flex justify-center">
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
        <Card className="w-[350px] text-black bg-[#f3f3f7] drop-shadow-lg border-none hover:-translate-y-2">
          <div className="w-full flex justify-center pt-8">
            <LayoutPanelTop
              width={100}
              height={100}
              className="p-2 rounded-lg bg-gradient-to-tl from-[#2c67f2] to-[#62cff4]"
            />
          </div>
          <CardHeader>
            <CardTitle className="text-5xl flex justify-center">
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
    </div>
  );
};

export default CardSection;
