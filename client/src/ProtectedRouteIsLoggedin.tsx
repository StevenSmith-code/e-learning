import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  id: number;
};

type ProtectedRouteProps = {
  user: User | null;
  children: ReactNode;
};

const ProtectedRouteIsLoggedin: React.FC<ProtectedRouteProps> = ({
  user,
  children,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate(`/users/${user.id}/profile`);
    }
  }, [user, navigate]);

  if (user) {
    return null; // Return null or some loading spinner until navigation is complete.
  }
  return <>{children}</>;
};

export default ProtectedRouteIsLoggedin;
