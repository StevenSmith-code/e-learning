import qs from "query-string";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { useDebounce } from "./hooks/use-debounce";
import { Search } from "lucide-react";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const pathname = location.pathname;

  const currentCategory = searchParams.get("category");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          category: currentCategory,
          search: debouncedValue,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    navigate(url);
  }, [debouncedValue, currentCategory, navigate, pathname]);

  return (
    <div className="relative">
      <Search className="absolute top-3 left-3 text-slate-600" />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
        placeholder="Search for a course"
      />
    </div>
  );
};
