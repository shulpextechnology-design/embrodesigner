"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  showValue = false,
  interactive = false,
  onChange,
  className,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);
  const displayRating = hoverRating ?? rating;

  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const handleClick = (index: number) => {
    if (interactive && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center">
        {Array.from({ length: maxRating }).map((_, index) => {
          const filled = displayRating >= index + 1;
          const halfFilled = !filled && displayRating >= index + 0.5;

          return (
            <button
              key={index}
              type="button"
              disabled={!interactive}
              onClick={() => handleClick(index)}
              onMouseEnter={() => interactive && setHoverRating(index + 1)}
              onMouseLeave={() => interactive && setHoverRating(null)}
              className={cn(
                "relative transition-transform",
                interactive && "cursor-pointer hover:scale-110",
                !interactive && "cursor-default"
              )}
            >
              <Star
                className={cn(
                  sizeClasses[size],
                  "transition-colors",
                  filled
                    ? "fill-[#f59e0b] text-[#f59e0b]"
                    : halfFilled
                    ? "fill-[#f59e0b]/50 text-[#f59e0b]"
                    : "fill-transparent text-[#e2e8f0]"
                )}
              />
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className="ml-1 text-sm font-medium text-[#1a1a2e]">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

interface RatingBarProps {
  rating: number;
  count: number;
  total: number;
  onClick?: () => void;
}

export function RatingBar({ rating, count, total, onClick }: RatingBarProps) {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={cn(
        "flex items-center gap-3 text-sm",
        onClick && "cursor-pointer hover:bg-[#f8f9fc] rounded-lg px-2 py-1 -mx-2"
      )}
    >
      <span className="w-8 text-right font-medium text-[#1a1a2e]">{rating}</span>
      <Star className="h-3.5 w-3.5 fill-[#f59e0b] text-[#f59e0b]" />
      <div className="h-2 w-32 overflow-hidden rounded-full bg-[#e2e8f0]">
        <div
          className="h-full rounded-full bg-[#f59e0b] transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-8 text-right text-[#64748b]">({count})</span>
    </button>
  );
}
