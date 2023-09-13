import { useNavigate } from "react-router-dom";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { useUser } from "@/context/UserContext";
import { getUserCourses } from "@/api";
import { useQuery } from "@tanstack/react-query";

type CoursesType = {
  id: number;
  title: string;
  description: string;
  content_link: string;
  img_url: string;
  price: number;
  duration: number;
  created_at: string;
  updated_at: string;
};
function CourseLayout() {
  const navigate = useNavigate();
  const { user } = useUser();

  const queryInfo =
    user && user.id
      ? useQuery<Array<CoursesType>>({
          queryKey: ["user_courses"],
          queryFn: () => getUserCourses(user.id),
        })
      : null;

  if (!user) navigate("/login");

  return (
    <div className="p-6">
      {queryInfo?.isLoading ? (
        <div>Loading...</div>
      ) : queryInfo?.isError ? (
        <div>Error fetching courses</div>
      ) : (
        <DataTable columns={columns} data={queryInfo?.data || []} />
      )}
    </div>
  );
}

export default CourseLayout;
