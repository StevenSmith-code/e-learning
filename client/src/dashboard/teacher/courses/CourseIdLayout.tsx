import { useUser } from "@/context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { getUserCourse } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { CircleDollarSign, File, LayoutDashboard } from "lucide-react";
import { Banner } from "@/Banner";
import { CourseActions } from "@/CourseActions";
import { TitleEdit } from "@/TitleEdit";
import { DescriptionEdit } from "@/DescriptionEdit";
import { ImageEdit } from "@/ImageEdit";
import { PriceEdit } from "@/PriceEdit";
import ContentLinkEdit from "@/ContentLinkEdit";

type CoursesType = {
  id: number;
  title: string;
  description: string;
  content_link: string;
  img_url: string;
  price: number;
  duration: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

function CourseIdLayout() {
  const { user } = useUser();
  const navigate = useNavigate();
  const { courseId } = useParams();
  if (!user) {
    navigate("/");
    return null;
  }

  const { data: course } = useQuery<CoursesType>({
    queryKey: ["user_course"],
    queryFn: () => getUserCourse(user.id, courseId!),
  });

  if (!course) {
    navigate("/");
    return null;
  }

  const requiredFields = [
    course.title,
    course.description,
    course.img_url,
    course.price,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);
  return (
    <>
      {!course.is_published && (
        <Banner label="This course is unpublished. It will not be visible to students." />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <CourseActions
            disabled={!isComplete}
            courseId={courseId!}
            isPublished={course.is_published}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <div className="rounded-full bg-sky-100 p-2 flex items-center justify-center">
                <LayoutDashboard className="text-sky-700 h-8 w-8" />
              </div>
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <TitleEdit initialData={course} courseId={course.id} />
            <DescriptionEdit initialData={course} courseId={course.id!} />
            <ImageEdit initialData={course} courseId={course.id!} />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <div className="rounded-full bg-sky-100 p-2 flex items-center justify-center">
                  <CircleDollarSign className="text-sky-700 h-8 w-8" />
                </div>
                <h2 className="text-xl">Sell your course</h2>
              </div>
              <PriceEdit initialData={course} courseId={course.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <div className="rounded-full bg-sky-100 p-2 flex items-center justify-center">
                  <File className="text-sky-700 h-8 w-8" />
                </div>
                <h2 className="text-xl">Resources & Attachments</h2>
              </div>
              <ContentLinkEdit initialData={course} courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseIdLayout;
