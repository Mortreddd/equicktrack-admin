import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  isVerifiedUser: boolean;
  isEmailNotVerified: boolean;
  isContactNotNumberVerified: boolean;
}
export default function ProtectedRoute({
  isContactNotNumberVerified,
  isVerifiedUser,
  isEmailNotVerified,
}: ProtectedRouteProps) {
  if (isVerifiedUser) {
    return <Outlet />;
  } else if (isEmailNotVerified) {
    return <Navigate to={"/auth/verify-email"} replace={true} />;
  } else if (isContactNotNumberVerified) {
    return <Navigate to={"/auth/verify-phone"} replace={true} />;
  } else {
    return <Navigate to={"/"} replace={true} />;
  }
}
