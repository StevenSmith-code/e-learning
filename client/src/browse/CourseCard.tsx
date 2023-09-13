import { formatPrice } from "@/lib/format";
import { BookOpen, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface CourseCardProps {
  title: string;
  id: number;
  author: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
}

function CourseCard({
  id,
  title,
  author,
  imageUrl,
  chaptersLength,
  price,
}: CourseCardProps) {
  return (
    <Link to={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <img className="object-cover" alt={title} src={imageUrl} />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>
          <p className="text-sm md:text-xs text-slate-500">{author}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <div className="rounded-full bg-sky-100 p-1 flex items-center justify-center">
                <BookOpen className="text-sky-500 h-5 w-5 md:h-3 md:w-3" />
              </div>
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
            <div className="flex items-center gap-x-1 text-slate-500">
              <div className="rounded-full bg-indigo-100 p-1 flex items-center justify-center">
                <Clock className="text-indigo-500 h-5 w-5 md:h-3 md:w-3" />
              </div>
              <span>4.6 Hours</span>
            </div>
          </div>
          <p className="text-md md:text-sm font-medium text-slate-700">
            {formatPrice(price)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;
