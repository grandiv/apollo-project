import React from "react";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import SearchGallery from "@/components/SearchGallery";
import { redirect } from "next/navigation";

type Props = {};

const GalleryPage = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  } else {
    const courses = await prisma.course.findMany({
      where: {
        userId: session?.user.id,
      },
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
  }
};

export default GalleryPage;
