import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[#1a1a2e] text-white",
        secondary: "bg-[#f1f5f9] text-[#64748b]",
        accent: "bg-[#e94560] text-white",
        success: "bg-[#10b981]/10 text-[#10b981]",
        warning: "bg-[#f59e0b]/10 text-[#f59e0b]",
        error: "bg-[#ef4444]/10 text-[#ef4444]",
        outline: "border border-[#e2e8f0] text-[#64748b]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
