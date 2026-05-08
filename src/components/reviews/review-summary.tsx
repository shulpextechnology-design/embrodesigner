"use client";

import * as React from "react";
import { Star, ThumbsUp, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { StarRating, RatingBar } from "./star-rating";

interface ReviewSummaryProps {
  averageRating: number;
  averageQuality: number;
  averageAccuracy: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  onRatingFilter?: (rating: number) => void;
  selectedRating?: number | null;
}

export function ReviewSummary({
  averageRating,
  averageQuality,
  averageAccuracy,
  totalReviews,
  ratingDistribution,
  onRatingFilter,
  selectedRating,
}: ReviewSummaryProps) {
  const total = Object.values(ratingDistribution).reduce((a, b) => a + b, 0);

  return (
    <div className="rounded-xl border border-[#e2e8f0] bg-white p-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left - Overall Rating */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-6xl font-bold text-[#1a1a2e]">
            {averageRating.toFixed(1)}
          </div>
          <div className="mt-2 flex items-center justify-center">
            <StarRating rating={averageRating} size="lg" />
          </div>
          <p className="mt-2 text-sm text-[#64748b]">
            Based on {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
          </p>

          {/* Rating Categories */}
          <div className="mt-6 grid w-full grid-cols-2 gap-4">
            <div className="rounded-lg bg-[#f8f9fc] p-3 text-center">
              <p className="text-xs text-[#94a3b8]">Quality</p>
              <p className="text-lg font-bold text-[#1a1a2e]">{averageQuality.toFixed(1)}</p>
            </div>
            <div className="rounded-lg bg-[#f8f9fc] p-3 text-center">
              <p className="text-xs text-[#94a3b8]">Accuracy</p>
              <p className="text-lg font-bold text-[#1a1a2e]">{averageAccuracy.toFixed(1)}</p>
            </div>
          </div>
        </div>

        {/* Right - Rating Distribution */}
        <div className="flex flex-col justify-center">
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <RatingBar
                key={rating}
                rating={rating}
                count={ratingDistribution[rating as keyof typeof ratingDistribution]}
                total={total}
                onClick={onRatingFilter ? () => onRatingFilter(rating) : undefined}
              />
            ))}
          </div>

          {/* Verified Badge */}
          <div className="mt-6 flex items-center gap-2 text-sm text-[#64748b]">
            <CheckCircle className="h-4 w-4 text-[#10b981]" />
            <span>All reviews are from verified purchases</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface RatingHighlightsProps {
  positiveReviews: string[];
  criticalReviews: string[];
}

export function RatingHighlights({ positiveReviews, criticalReviews }: RatingHighlightsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Pros */}
      <div className="rounded-xl border border-[#10b981]/30 bg-[#10b981]/5 p-4">
        <div className="mb-3 flex items-center gap-2">
          <ThumbsUp className="h-5 w-5 text-[#10b981]" />
          <h4 className="font-semibold text-[#1a1a2e]">What Buyers Love</h4>
        </div>
        <ul className="space-y-2">
          {positiveReviews.map((review, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-[#64748b]">
              <span className="text-[#10b981]">✓</span>
              {review}
            </li>
          ))}
        </ul>
      </div>

      {/* Cons */}
      <div className="rounded-xl border border-[#f59e0b]/30 bg-[#f59e0b]/5 p-4">
        <div className="mb-3 flex items-center gap-2">
          <svg className="h-5 w-5 text-[#f59e0b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h4 className="font-semibold text-[#1a1a2e]">Considerations</h4>
        </div>
        <ul className="space-y-2">
          {criticalReviews.map((review, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-[#64748b]">
              <span className="text-[#f59e0b]">!</span>
              {review}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
