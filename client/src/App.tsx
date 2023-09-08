import { Route, Routes, useNavigate } from "react-router-dom";
import { useUsersQuery } from "./api";
import Dashboard from "./dashboard/Dashboard";
import Login from "./auth/Login";
import { useEffect } from "react";

function App() {
  const { data, isLoading, isError, error, isSuccess } = useUsersQuery();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !data) navigate("/login");
  }, [data, isLoading]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
