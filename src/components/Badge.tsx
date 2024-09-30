import { cn } from "@/utils/StyleUtil";
import { PropsWithChildren } from "react";

type Size = "lg" | "sm" | "md" | "xl" | "2xl";
type Color = "success" | "danger" | "warning" | "primary";
interface BadgeProps extends PropsWithChildren {
  variant?: Size;
  className?: string;
  color?: Color;
}
export default function Badge({
  variant = "sm",
  color = "success",
  children,
}: BadgeProps) {
  const background = (_c: Color) => {
    switch (_c) {
      case "success":
        return "bg-green-500 text-white";
      case "danger":
        return "bg-red-500 text-white";
      case "warning":
        return "bg-yellow-500 text-white";
      case "primary":
        return "bg-blue-500 text-white";
    }
  };

  return (
    <div
      className={cn(
        `rounded-full p-1 flex justify-center items-center`,
        `${background(color)}`,
        `text-${variant}`
      )}
    >
      {children}
    </div>
  );
}
