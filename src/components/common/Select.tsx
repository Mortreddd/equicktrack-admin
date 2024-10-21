import { cn } from "@/utils/StyleUtil";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, HTMLAttributes } from "react";

const selectVariants = cva(
  "select select-bordered md:text-md md:select-md select-sm",
  {
    variants: {
      variant: {
        primary: "select-primary",
      },
      variantSize: {
        full: "w-full",
        auto: "w-auto",
      },
    },
    defaultVariants: {
      variant: "primary",
      variantSize: "full",
    },
  }
);

interface SelectProps
  extends HTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariants> {
  items: Array<{
    value: string | number;
    label: string | number;
  }>;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant, variantSize, items, ...rest }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(selectVariants({ className, variant, variantSize }))}
        {...rest}
      >
        {items.map((item, key) => (
          <option key={key} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    );
  }
);

export default Select;
