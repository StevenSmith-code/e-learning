import { useMatch, useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";
import { LogOut } from "lucide-react";
import { SearchInput } from "./SearchInput";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "./api";
import { useUser } from "./context/UserContext";

function Navbar() {
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      navigate(`/`);
    },
  });
  const { user } = useUser();
  const matchSearchPage = useMatch("/search");
  const matchTeacher = useMatch("/teacher/*");

  const navigate = useNavigate();

  const isSearchPage = !!matchSearchPage;
  const isTeacher = !!matchTeacher;

  return (
    <>
      {isSearchPage && <SearchInput />}
      <div className="flex gap-x-2 ml-auto">
        {isTeacher ? (
          <Button onClick={() => navigate("/")} size="sm" variant="ghost">
            <LogOut className="h-4 w-4 mr-2" />
            Exit
          </Button>
        ) : (
          <Button
            onClick={() => navigate("/teacher/courses")}
            size="sm"
            variant="ghost"
          >
            Teacher mode
          </Button>
        )}
        <Button onClick={() => logoutMutation.mutate(user?.id || 0)} />
      </div>
    </>
  );
}

export default Navbar;
