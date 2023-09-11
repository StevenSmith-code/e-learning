import { Route, Routes } from "react-router-dom";

import Dashboard from "./dashboard/DashboardLayout";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import ProtectedRoute from "./ProtectedRoute";
import { useUser } from "./context/UserContext";
import { useLoginQuery } from "./api";
import { useEffect } from "react";

function App() {
  const { user, setUser } = useUser();
  const { data, isSuccess } = useLoginQuery();
  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      setUser(data);
    }
  }, [isSuccess, data, setUser]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute user={user}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
