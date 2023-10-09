import { Tag, Chapter, Course } from "@prisma/client";

import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";

type CourseWithProgressWithTags = Course & {
  tags: ({ tag: { id: string; name: string } } & {
    courseId: string;
    tagId: string;
  })[];
  chapters: { id: string }[];
  progress: number | null;
};

type DashboardCourses = {
  completedCourses: CourseWithProgressWithTags[];
  coursesInProgress: CourseWithProgressWithTags[];
};

export const getDashboardCourses = async (
  userId: string
): Promise<DashboardCourses> => {
  try {
    const purchasedCourses = await db.purchase.findMany({
      where: {
        userId: userId,
      },
      select: {
        course: {
          include: {
            tags: {
              select: {
                tag: true, // Fetch related Tag objects
              },
            },
            chapters: {
              where: {
                isPublished: true,
              },
            },
          },
        },
      },
    });

    const courses: CourseWithProgressWithTags[] = purchasedCourses.map(
      (purchase) => {
        return {
          ...purchase.course,
          tags: purchase.course.tags.map((t) => ({
            tag: t.tag,
            courseId: purchase.course.id,
            tagId: t.tag.id,
          })),
          progress: null,
        };
      }
    );

    for (let course of courses) {
      const progress = await getProgress(userId, course.id);
      course.progress = progress;
    }

    const completedCourses = courses.filter(
      (course) => course.progress === 100
    );
    const coursesInProgress = courses.filter(
      (course) => (course.progress ?? 0) < 100
    );

    return {
      completedCourses,
      coursesInProgress,
    };
  } catch (error) {
    console.log("[GET_DASHBOARD_COURSES]", error);
    return {
      completedCourses: [],
      coursesInProgress: [],
    };
  }
};
