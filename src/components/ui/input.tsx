import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, error, label, hint, leftIcon, rightIcon, ...props },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-1.5 block text-sm font-medium text-[#1a1a2e]">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-11 w-full rounded-lg border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#1a1a2e] transition-all duration-200 placeholder:text-[#94a3b8] focus:border-[#e94560] focus:outline-none focus:ring-2 focus:ring-[#e94560]/20 disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-[#ef4444] focus:border-[#ef4444] focus:ring-[#ef4444]/20",
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1.5 text-sm text-[#ef4444]">{error}</p>}
        {hint && !error && (
          <p className="mt-1.5 text-sm text-[#94a3b8]">{hint}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
