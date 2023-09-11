import { Route, Routes, useNavigate } from "react-router-dom";
import { useUsersQuery } from "./api";
import Dashboard from "./dashboard/Dashboard";
import Login from "./auth/Login";
import { useEffect } from "react";
import Signup from "./auth/Signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
