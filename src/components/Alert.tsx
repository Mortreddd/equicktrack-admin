import { cn } from "@/utils/StyleUtil";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const alertVariants = cva("alert my-1 md:my-2", {
  variants: {
    variant: {
      danger: "alert-error text-white",
      success: "alert-success text-white",
      warning: "alert-warning text-white",
      info: "alert-info",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

interface AlertVariantsProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}
export default function Alert({
  className,
  variant,
  children,
  ...rest
}: AlertVariantsProps) {
  return (
    <div className={cn(alertVariants({ className, variant }))} {...rest}>
      {children}
    </div>
  );
}
