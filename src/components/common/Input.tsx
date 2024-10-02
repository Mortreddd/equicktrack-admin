import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/utils/StyleUtil";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const inputVariants = cva(
  "input input-bordered md:text-md md:input-md input-sm input-primary",
  {
    variants: {
      variantSize: {
        full: "w-full",
        auto: "w-auto",
      },
    },
  }
);

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variantSize, className, ...rest }, ref) => {
    return (
      <>
        <input
          ref={ref}
          className={cn(inputVariants({ variantSize, className }))}
          {...rest}
        />
      </>
    );
  }
);

export default Input;
