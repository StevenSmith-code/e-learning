import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!
);

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    for (const chapter of course.chapters) {
      if (chapter.muxData?.assetId) {
        await Video.Assets.del(chapter.muxData.assetId);
      }
    }

    const deletedCourse = await db.course.delete({
      where: {
        id: params.courseId,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[COURSE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId } = params;
    const values = await req.json();
    const { tagIds } = values; // assuming tagIds is an array of tag ids to connect

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingCourse = await db.course.findUnique({
      where: { id: courseId },
      select: { tags: true },
    });

    const tags = existingCourse?.tags.map((tag) => tag.tagId);

    const newTagIds = tagIds.filter((tagId: string) => !tags?.includes(tagId));
    if (!existingCourse) {
      console.log(`[ERROR] Course with id ${courseId} not found.`);
      // Provide a user-friendly message in production
      return new NextResponse("Course not found", { status: 404 });
    }

    const course = await db.course.update({
      where: {
        id: courseId,
      },
      data: {
        tags: {
          create: newTagIds.map((tagId: string) => ({
            tag: {
              connect: { id: tagId },
            },
          })),
        },
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
