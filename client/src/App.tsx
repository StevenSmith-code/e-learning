import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./api";

import { useEffect } from "react";

type UserType = {
  id: number;
  username: string;
  email: string;
  enrollments: [];
  courses: [];
};

function App() {
  return <></>;
}

export default App;
