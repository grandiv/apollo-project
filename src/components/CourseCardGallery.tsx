import React from "react";
import { Course, Unit, Chapter } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Props = {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
};

const CourseCardGallery = async ({ course }: Props) => {
  return (
    <>
      <div className="p-2 flex flex-col md:flex-row w-full justify-evenly">
        <Card className="w-[350px] h-[350px] text-[#f3f3f7] drop-shadow-lg border-none">
          <div className="w-full flex justify-center">
            <Link
              href={`/course/${course.id}/0/0`}
              className="relative block w-full"
            >
              <div className="overflow-hidden h-[300px] w-[300px]">
                <Image
                  src={course.image || ""}
                  className="object-cover w-full h-full rounded-t-lg"
                  width={250}
                  height={250}
                  alt="picture of the course"
                />
              </div>
              <CardHeader className="p-3">
                <CardTitle className="text-xl capitalize flex mx-auto text-center">
                  {course.name}
                </CardTitle>
              </CardHeader>
            </Link>
          </div>
        </Card>
      </div>
    </>
  );
};

export default CourseCardGallery;
