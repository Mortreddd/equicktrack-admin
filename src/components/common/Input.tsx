import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/utils/StyleUtil";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const inputVariants = cva(
  "input input-bordered md:text-md md:input-md px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm",
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
