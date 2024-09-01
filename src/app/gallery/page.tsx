import React from "react";
import { prisma } from "@/lib/db";
import SearchGallery from "@/components/SearchGallery";

type Props = {};

const GalleryPage = async (props: Props) => {
  const courses = await prisma.course.findMany({
    include: {
      units: {
        include: {
          chapters: true,
        },
      },
    },
  });
  return (
    <div className="pt-20 pb-8 mx-auto max-w-7xl">
      <SearchGallery courses={courses} />
    </div>
  );
};

export default GalleryPage;
