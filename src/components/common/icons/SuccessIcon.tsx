import { cn } from "@/utils/StyleUtil";
import { AlertIconProps } from "./AlertImpl";

export default function SuccessIcon({
  iconSize = "size-6",
  className,
}: AlertIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0 stroke-current", className, iconSize)}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
