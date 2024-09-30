import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { Button } from "./common/Button";
import ApplicationLogo from "./ApplicationLogo";
import DrawerLink from "./DrawerLink";
import { useAuth } from "@/contexts/AuthContext";

interface DrawerProps extends PropsWithChildren {}
export default function Drawer({ children }: DrawerProps) {
  const { performLogout, loading } = useAuth();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}

        <Button variant={"primary"} className={"drawer-button lg:hidden"}>
          <label htmlFor="my-drawer-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </label>
        </Button>
        <main className="w-full antialiased font-sans bg-white">
          {/* <AuthenticatedNavbar /> */}
          {children}
        </main>
      </div>
      <div className="drawer-side border-l-2 border-solid border-gray-700">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-gray-200 min-h-full w-80 py-4 px-6 gap-2  shadow-md">
          {/* Sidebar content here */}
          <li>
            <div className="flex-1 mx-auto">
              <Link to={"/"}>
                <ApplicationLogo />
              </Link>
            </div>
          </li>
          <li>
            <DrawerLink to="/dashboard">Dashboard</DrawerLink>
          </li>
          <li>
            <DrawerLink to="/inventory">Inventory</DrawerLink>
          </li>
          <li>
            <DrawerLink to="/transactions">Transactions</DrawerLink>
          </li>
          <li>
            <DrawerLink to="/equipments">Equipments</DrawerLink>
          </li>
          <li>
            <DrawerLink to="/users">Manage Users</DrawerLink>
          </li>
          <li>
            <Button
              variant={"danger"}
              className="w-full"
              loading={loading}
              rounded={"default"}
              onClick={performLogout}
            >
              Logout
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}
