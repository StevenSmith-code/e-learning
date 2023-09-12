import { useCourseQuery } from "@/api";
import Categories from "./Categories";
import CourseCard from "./CourseCard";

function Browse() {
  const { data, isSuccess, isLoading, isError } = useCourseQuery();
  return (
    <div className="p-6">
      <Categories />
      <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {data?.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            author="StevenSmithCode"
            imageUrl={course.img_url!}
            chaptersLength={course.duration}
            price={course.price!}
          />
        ))}
      </div>
    </div>
  );
}

export default Browse;
