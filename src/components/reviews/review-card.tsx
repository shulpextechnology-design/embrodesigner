"use client";

import * as React from "react";
import Image from "next/image";
import { ThumbsUp, Flag, ChevronDown, ChevronUp } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "./star-rating";
import type { Review } from "@/data/reviews";

interface ReviewCardProps {
  review: Review;
  onHelpful?: (reviewId: string) => void;
}

export function ReviewCard({ review, onHelpful }: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const [helpful, setHelpful] = React.useState(false);
  const maxLength = 300;
  const isLongComment = review.comment.length > maxLength;

  const handleHelpful = () => {
    if (!helpful) {
      setHelpful(true);
      onHelpful?.(review.id);
    }
  };

  const openImageModal = (image: string) => {
    setSelectedImage(image);
    setIsImageModalOpen(true);
  };

  return (
    <>
      <div className="group rounded-xl border border-[#e2e8f0] bg-white p-6 transition-all hover:shadow-md">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-[#f1f5f9]">
              <Image
                src={review.userAvatar}
                alt={review.userName}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-[#1a1a2e]">{review.userName}</span>
                {review.verified && (
                  <Badge variant="success" className="text-[10px]">Verified Purchase</Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <StarRating rating={review.rating} size="sm" />
                <span className="text-xs text-[#94a3b8]">
                  {formatDate(review.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Rating Categories */}
          <div className="hidden gap-4 sm:flex">
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-wider text-[#94a3b8]">Quality</p>
              <p className="text-sm font-semibold text-[#1a1a2e]">{review.qualityRating}/5</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-wider text-[#94a3b8]">Accuracy</p>
              <p className="text-sm font-semibold text-[#1a1a2e]">{review.accuracyRating}/5</p>
            </div>
          </div>
        </div>

        {/* Comment */}
        <div className="mt-4">
          <p className={cn(
            "text-[#64748b] leading-relaxed",
            !isExpanded && isLongComment && "line-clamp-3"
          )}>
            {isExpanded ? review.comment : review.comment}
          </p>
          {isLongComment && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 flex items-center gap-1 text-sm font-medium text-[#e94560] hover:text-[#ff6b6b]"
            >
              {isExpanded ? (
                <>
                  Show less <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Read more <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>

        {/* Images */}
        {review.images.length > 0 && (
          <div className="mt-4 flex gap-2">
            {review.images.map((image, index) => (
              <button
                key={index}
                onClick={() => openImageModal(image)}
                className="relative h-20 w-20 overflow-hidden rounded-lg border border-[#e2e8f0] transition-all hover:border-[#e94560] hover:shadow-md"
              >
                <Image
                  src={image}
                  alt={`Review image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="mt-4 flex items-center justify-between border-t border-[#e2e8f0] pt-4">
          <button
            onClick={handleHelpful}
            className={cn(
              "flex items-center gap-2 text-sm transition-colors",
              helpful
                ? "text-[#10b981]"
                : "text-[#64748b] hover:text-[#1a1a2e]"
            )}
          >
            <ThumbsUp className={cn("h-4 w-4", helpful && "fill-current")} />
            Helpful ({review.helpful + (helpful ? 1 : 0)})
          </button>
          <button className="flex items-center gap-1 text-sm text-[#94a3b8] hover:text-[#64748b]">
            <Flag className="h-3.5 w-3.5" />
            Report
          </button>
        </div>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsImageModalOpen(false)}
        >
          <button
            onClick={() => setIsImageModalOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative h-[80vh] w-full max-w-3xl overflow-hidden rounded-xl">
            <Image
              src={selectedImage}
              alt="Review image enlarged"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
