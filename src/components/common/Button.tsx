import { cva, VariantProps } from "class-variance-authority";
import { FC, forwardRef, HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/utils/StyleUtil";
import LoadingCircle from "./LoadingCircle";

interface ButtonProps
  extends PropsWithChildren,
    VariantProps<typeof buttonVariant>,
    HTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}

const buttonVariant = cva(
  "px-4 py-2 md:text-md transition-colors duration-300  ease-in-out",
  {
    variants: {
      variant: {
        primary: "text-white bg-primary hover:bg-primary/80",
        light: "text-black bg-white hover:bg-gray-400",
        danger: "text-white bg-red-500 hover:bg-red-700",
        success: "text-white bg-green-500 hover:bg-green-700",
        warning: "text-white bg-yellow-500 hover:bg-yellow-700",
        muted: "text-black bg-gray-300 hover:bg-gray-400",
        info: "text-white bg-blue-500 hover:bg-blue-700",
      },
      // outlined : {
      //   primary: "text-primary outline-primary outline-2 bg-transparent hover:bg-primary hover:text-white",
      //   danger: "text-red-500 outline-red-500 outline-2 bg-transparent hover:bg-red-500 hover:text-white",
      //   warning: "text-yellow-500 outline-yellow-500 outline-2 bg-transparent hover:bg-yellow-500 hover:text-white",
      //   success: "text-green-700 outline-green-700 outline-2 bg-transparent hover:bg-green-700 hover:text-white",
      // },
      size: {
        default: "w-auto",
        full: "w-full",
      },

      rounded: {
        full: "rounded-full",
        default: "rounded",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { type, className, variant, loading, size, rounded, children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={loading}
        {...props}
        className={cn(buttonVariant({ rounded, variant, size, className }))}
      >
        {loading ? (
          <div className="w-full flex justify-center">
            <LoadingCircle size={"lg"} />
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);

export { Button, buttonVariant };
