import { RouteProps } from "react-router-dom";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import Equipment from "./pages/Equipment";
import UserManagement from "./pages/UserManagement";
import Register from "./pages/auth/Register";
import EmailVerification from "./pages/auth/EmailVerification";
import VerifyEmailRedirection from "./pages/auth/VerifyEmailRedirection";
import VerifyPhone from "./pages/auth/VerifyPhone";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ForgotPasswordRedirection from "./pages/auth/ForgotPasswordRedirection";
import ResetPassword from "./pages/auth/ResetPassword";
import About from "./pages/about/About";
import TermsAndPrivacy from "./pages/about/TermsAndPrivacy";
import PrivacyPolicy from "./pages/about/PrivacyPolicy";

export const guestRoutes: Array<RouteProps> = [
  {
    path: "/",
    index: true,
    element: <Home />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/auth/verify-email",
    element: <EmailVerification />,
  },
  {
    path: "/auth/verify-phone",
    element: <VerifyPhone />,
  },
  {
    path: "/auth/verify-email/:uuid",
    element: <VerifyEmailRedirection />,
  },
  {
    path: "/auth/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/auth/forgot-password/:uuid",
    element: <ForgotPasswordRedirection />,
  },
  {
    path: "/auth/reset-password/:uuid",
    element: <ResetPassword />,
  },

  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/terms-privacy",
    element: <TermsAndPrivacy />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
];

export const protectedRoutes: Array<RouteProps> = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/inventory",
    element: <Inventory />,
  },
  {
    path: "/transactions",
    element: <Transaction />,
  },
  {
    path: "/equipments",
    element: <Equipment />,
  },
  {
    path: "/users",
    element: <UserManagement />,
  },
];
