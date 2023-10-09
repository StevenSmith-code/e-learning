import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";

import { Course, Tag } from "@prisma/client";

type CourseWithProgressWithTags = Course & {
  tags: ({ tag: { id: string; name: string } } & {
    courseId: string;
    tagId: string;
  })[];
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  userId: string;
  title?: string;
  tagId?: string;
};

export const getCourses = async ({
  userId,
  title,
  tagId,
}: GetCourses): Promise<CourseWithProgressWithTags[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title || "", // Adding fallback in case title is undefined
        },
        tags: {
          some: {
            tagId,
          },
        },
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchases: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const coursesWithProgress: CourseWithProgressWithTags[] = await Promise.all(
      courses.map(async (course) => {
        if (course.purchases.length === 0) {
          return {
            ...course,
            progress: null,
          };
        }

        const progressPercentage = await getProgress(userId, course.id);

        return {
          ...course,
          progress: progressPercentage,
        };
      })
    );

    return coursesWithProgress;
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
};
