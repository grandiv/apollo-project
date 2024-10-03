"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Course, Unit, Chapter } from "@prisma/client";
import CourseCardGallery from "./CourseCardGallery";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useDebounce } from "@uidotdev/usehooks";
type Props = {
  courses: (Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  })[];
  type?: "person" | "team";
  id?: string;
};

const SearchGallery: React.FC<Props> = ({ courses, type = "person", id }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const filteredCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    setFilteredCourses(filteredCourses);  
  }, [debouncedSearchTerm, courses]);


  return (
    <div>
      <div className="flex justify-end w-full">
        {type === "team" && (
          <div className="flex justify-center w-full">
            <Button
              onClick={() => router.push(`/teams/courses/${id}/`)}
              className="w-full max-w-sm h-8 font-semibold"
            >
              Create Course
            </Button>
          </div>
        )}
        <Input
          type="search"
          placeholder="Search"
          className="w-full max-w-sm h-8 font-semibold"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="pt-9 grid grid-cols-1 gap-x-60 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCardGallery course={course} key={course.id} />
          ))
        ) : type === "team" ? (
          <div className="flex flex-col items-center justify-center gap-y-4">
            <span>No Courses Found</span>
          </div>
        ) : (
          "No courses found"
        )}
      </div>
    </div>
  );
};

export default SearchGallery;
