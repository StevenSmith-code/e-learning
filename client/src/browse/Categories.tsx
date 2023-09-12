import { useTagsQuery } from "@/api";
import {
  BadgeDollarSign,
  Camera,
  Code2,
  FileText,
  Flame,
  Palette,
} from "lucide-react";
import { CategoriesItem } from "./CategoriesItem";

type CategoryDetail = {
  label: string;
  icon: React.ComponentType<any>;
};

function Categories() {
  const { data, isLoading, isError, isSuccess } = useTagsQuery();
  const CATEGORY_DETAILS: Record<string, CategoryDetail> = {
    "Web Development": {
      label: "Web Development",
      icon: Code2,
    },
    "Data Science": { label: "Data Science", icon: FileText },
    "Graphic Design": { label: "Graphic Design", icon: Palette },
    Business: { label: "Business", icon: BadgeDollarSign },
    Photography: { label: "Photography", icon: Camera },
  };
  const getCategoryDetails = (categoryName: string): CategoryDetail => {
    return (
      CATEGORY_DETAILS[categoryName] || { label: categoryName, icon: Flame }
    );
  };
  const categoriesWithDetails = data?.map((tag) => {
    const details = getCategoryDetails(tag.name);
    return {
      ...tag,
      label: details.label,
      icon: details.icon,
    };
  });

  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {categoriesWithDetails?.map((category) => (
        <CategoriesItem
          key={category.id}
          label={category.label}
          icon={category.icon}
          value={category.name}
        />
      ))}
    </div>
  );
}

export default Categories;
