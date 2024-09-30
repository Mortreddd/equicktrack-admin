import { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";

interface DrawerLinkProps extends PropsWithChildren {
  to: string;
}
export default function DrawerLink({ to, children }: DrawerLinkProps) {
  const defaultLink = "bg-white text-black hover:bg-gray-400";
  const activeLink = "bg-primary text-white hover:bg-primary/90";
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${
          isActive ? activeLink : defaultLink
        } transition-colors duration-200 ease-in-out md:px-4 md:py-3 md:text-md text-xs`
      }
    >
      {children}
    </NavLink>
  );
}
