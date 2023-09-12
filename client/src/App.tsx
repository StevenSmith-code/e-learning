import { Route, Routes } from "react-router-dom";

import DashboardLayout from "./dashboard/DashboardLayout";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import ProtectedRouteIsLoggedin from "./ProtectedRouteIsLoggedin";
import { useUser } from "./context/UserContext";
import { useLoginQuery } from "./api";
import { useEffect } from "react";
import Dashboard from "./dashboard/Dashboard";
import Browse from "./browse/Browse";

function App() {
  const { user, setUser } = useUser();
  const { data, isSuccess } = useLoginQuery();
  useEffect(() => {
    if (isSuccess) {
      setUser(data);
    }
  }, [isSuccess, data, setUser]);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/search"
          element={
            <DashboardLayout>
              <Browse />
            </DashboardLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <DashboardLayout>
              <p>settings</p>
            </DashboardLayout>
          }
        />

        <Route
          path="/login"
          element={
            <ProtectedRouteIsLoggedin user={user}>
              <Login />
            </ProtectedRouteIsLoggedin>
          }
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
