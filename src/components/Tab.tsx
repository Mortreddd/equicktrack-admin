import { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";

interface TabProps extends PropsWithChildren {
  to: string;
}
export default function Tab({ to, children }: TabProps) {
  const activeLink = "border-b-2 border-black border-solid font-semibold";
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `bg-transparent font-sans text-black px-4 py-2 transition-all text-xl md:text-md duration-200 ease-in-out ${
          isActive ? activeLink : ""
        }`
      }
    >
      {children}
    </NavLink>
  );
}
