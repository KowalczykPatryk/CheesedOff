import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface AuthenticatedRouteProps {
  children: ReactNode;
}

function AuthenticatedRoute({ children }: AuthenticatedRouteProps) {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to="/login" replace state={{
      notification: {
        message: "Please log in to access this page.",
        severity: "warning"
      }
    }}/>;
  }

  return <>{children}</>;
}

export default AuthenticatedRoute;