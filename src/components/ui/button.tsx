"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#d23368] text-white hover:bg-[#a82852]",
        secondary:
          "bg-[#333333] text-white hover:bg-[#4d4d4d]",
        outline:
          "border border-[#d9d9d9] bg-white text-[#333333] hover:border-[#d23368] hover:text-[#d23368]",
        ghost:
          "bg-transparent text-[#666666] hover:bg-[#f5f5f5] hover:text-[#333333]",
        link: "bg-transparent text-[#d23368] hover:underline underline-offset-4",
        danger:
          "bg-[#ed1b4b] text-white hover:bg-[#c4153d]",
      },
      size: {
        default: "h-[36px] px-4 py-2 rounded-[4px] text-[13px]",
        sm: "h-[28px] px-3 py-1 rounded-[3px] text-[12px]",
        lg: "h-[42px] px-6 py-2 rounded-[4px] text-[14px]",
        icon: "h-[34px] w-[34px] rounded-full",
        "icon-sm": "h-[28px] w-[28px] rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      asChild,
      ...props
    },
    ref
  ) => {
    const buttonClass = buttonVariants({ variant, size, className });

    if (asChild && React.isValidElement(children)) {
      return (
        <Slot ref={ref} className={buttonClass} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <button
        className={buttonClass}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : leftIcon ? (
          leftIcon
        ) : null}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
