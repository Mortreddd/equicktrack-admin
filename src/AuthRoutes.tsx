import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

export default function AuthRoutes() {
  const { authToken } = useAuth();

  return authToken ? <Outlet /> : <Navigate to={"/"} replace={true} />;
  // return <Outlet />;
}
