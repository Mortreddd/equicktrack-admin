import { RouteProps } from "react-router-dom";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import Equipment from "./pages/Equipment";
import UserManagement from "./pages/UserManagement";
import Register from "./pages/auth/Register";
import VerifyPhone from "./pages/auth/VerifyPhone";
import EmailVerification from "./pages/auth/EmailVerification";
import VerifyEmailRedirection from "./pages/auth/VerifyEmailRedirection";

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
