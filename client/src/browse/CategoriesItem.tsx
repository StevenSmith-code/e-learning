import qs from "query-string";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CategoriesItemProps {
  label: string;
  icon: React.ComponentType<any>;
  value: string;
}

export const CategoriesItem = ({
  label,
  value,
  icon: Icon,
}: CategoriesItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get("category");
  const currentSearch = searchParams.get("search");
  const isSelected = currentCategory === value || (!value && !currentCategory);

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: location.pathname,
        query: {
          search: currentSearch,
          category: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    navigate(url);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
        isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
      )}
      type="button"
    >
      {Icon && <Icon size={20} />}
      <div className="truncate">{label}</div>
    </button>
  );
};
