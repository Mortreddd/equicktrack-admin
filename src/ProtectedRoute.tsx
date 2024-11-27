import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  isVerifiedUser: boolean;
  isEmailNotVerified: boolean;
}
export default function ProtectedRoute({
  isVerifiedUser,
  isEmailNotVerified,
}: ProtectedRouteProps) {
  if (isVerifiedUser) {
    return <Outlet />;
  } else if (isEmailNotVerified) {
    return <Navigate to={"/auth/verify-email"} replace={true} />;
  } else {
    return <Navigate to={"/"} replace={true} />;
  }
}
