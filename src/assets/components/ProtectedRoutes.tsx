import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../AuthContext";

const ProtectedRoute = ({ type }: { type: "authorized" | "unauthorized" }) => {
  const { authData } = useAuthContext();

  if (type === "authorized") {
    return authData ? <Outlet /> : <Navigate to="/login" replace />;
  }

  return !authData ? <Outlet /> : <Navigate to="/quizzes" replace />;
};

export default ProtectedRoute;
