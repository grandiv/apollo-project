"use client";

import React, { useState, useMemo } from "react";
import { Course, Unit, Chapter } from "@prisma/client";
import CourseCardGallery from "./CourseCardGallery";
import { Input } from "./ui/input";

type Props = {
  courses: (Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  })[];
};

const SearchGallery: React.FC<Props> = ({ courses }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = useMemo(() => {
    return courses.filter((course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, courses]);

  return (
    <div>
      <div className="flex justify-end w-full">
        <Input
          type="search"
          placeholder="Search"
          className="w-full max-w-sm h-8 font-semibold"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="pt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
        {filteredCourses.length > 0
          ? filteredCourses.map((course) => (
              <CourseCardGallery course={course} key={course.id} />
            ))
          : "No courses found"}
      </div>
    </div>
  );
};

export default SearchGallery;
