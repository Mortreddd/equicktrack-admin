import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import AuthRoutes from "./AuthRoutes";
import Equipment from "./pages/Equipment";
import VerifyEmail from "./pages/auth/VerifyEmail";
import UserManagement from "./pages/UserManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    element: <AuthRoutes />,
    children: [
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
    ],
  },

  {
    path: "/verify-email/:uuid",
    element: <VerifyEmail />,
  },
]);
