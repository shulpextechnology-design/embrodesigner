"use client";

import * as React from "react";
import { Camera, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StarRating } from "./star-rating";

interface ReviewFormProps {
  designTitle: string;
  onSubmit: (review: {
    rating: number;
    qualityRating: number;
    accuracyRating: number;
    comment: string;
    images: string[];
  }) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export function ReviewForm({
  designTitle,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ReviewFormProps) {
  const [rating, setRating] = React.useState(0);
  const [qualityRating, setQualityRating] = React.useState(0);
  const [accuracyRating, setAccuracyRating] = React.useState(0);
  const [comment, setComment] = React.useState("");
  const [images, setImages] = React.useState<string[]>([]);
  const [hoverRating, setHoverRating] = React.useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || comment.trim().length < 10) return;

    onSubmit({
      rating,
      qualityRating: qualityRating || rating,
      accuracyRating: accuracyRating || rating,
      comment: comment.trim(),
      images,
    });
  };

  const isValid = rating > 0 && comment.trim().length >= 10;

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-[#e2e8f0] bg-white p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[#1a1a2e]">Write a Review</h3>
        <p className="mt-1 text-sm text-[#64748b]">
          Reviewing: <span className="font-medium">{designTitle}</span>
        </p>
      </div>

      {/* Overall Rating */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-[#1a1a2e]">
          Overall Rating <span className="text-[#e94560]">*</span>
        </label>
        <div className="flex items-center gap-4">
          <StarRating
            rating={rating}
            interactive
            onChange={setRating}
            size="lg"
          />
          <span className="text-sm text-[#64748b]">
            {rating === 5 && "Excellent!"}
            {rating === 4 && "Great"}
            {rating === 3 && "Good"}
            {rating === 2 && "Fair"}
            {rating === 1 && "Poor"}
            {rating === 0 && "Tap to rate"}
          </span>
        </div>
      </div>

      {/* Quality & Accuracy Ratings */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#1a1a2e]">
            Design Quality
          </label>
          <StarRating
            rating={qualityRating}
            interactive
            onChange={setQualityRating}
            size="sm"
          />
          <p className="mt-1 text-xs text-[#94a3b8]">
            {qualityRating === 0 ? "How is the stitch quality?" : ""}
          </p>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-[#1a1a2e]">
            Pattern Accuracy
          </label>
          <StarRating
            rating={accuracyRating}
            interactive
            onChange={setAccuracyRating}
            size="sm"
          />
          <p className="mt-1 text-xs text-[#94a3b8]">
            {accuracyRating === 0 ? "Does it match the preview?" : ""}
          </p>
        </div>
      </div>

      {/* Comment */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-[#1a1a2e]">
          Your Review <span className="text-[#e94560]">*</span>
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this design. What did you like? How did it stitch out? Would you recommend it?"
          rows={5}
          className={cn(
            "w-full resize-none rounded-lg border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1a1a2e] placeholder:text-[#94a3b8] transition-colors focus:border-[#e94560] focus:outline-none focus:ring-2 focus:ring-[#e94560]/20"
          )}
          maxLength={1000}
        />
        <div className="mt-1 flex items-center justify-between">
          <p className="text-xs text-[#94a3b8]">
            {comment.length < 10 && "Minimum 10 characters required"}
          </p>
          <p className="text-xs text-[#94a3b8]">{comment.length}/1000</p>
        </div>
      </div>

      {/* Photo Upload */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-[#1a1a2e]">
          Add Photos (Optional)
        </label>
        <div className="flex flex-wrap gap-3">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative h-20 w-20 overflow-hidden rounded-lg border border-[#e2e8f0]"
            >
              <img
                src={image}
                alt={`Upload ${index + 1}`}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => setImages(images.filter((_, i) => i !== index))}
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#ef4444] text-white shadow"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          {images.length < 5 && (
            <button
              type="button"
              onClick={() => {
                // In a real app, this would open a file picker
                // For demo, we'll add a placeholder
                if (images.length < 5) {
                  setImages([...images, "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop"]);
                }
              }}
              className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-dashed border-[#e2e8f0] text-[#94a3b8] transition-colors hover:border-[#e94560] hover:text-[#e94560]"
            >
              <Camera className="h-6 w-6" />
            </button>
          )}
        </div>
        <p className="mt-2 text-xs text-[#94a3b8]">
          Upload up to 5 photos showing your stitched result
        </p>
      </div>

      {/* Guidelines */}
      <div className="mb-6 rounded-lg bg-[#f8f9fc] p-4">
        <p className="mb-2 text-sm font-medium text-[#1a1a2e]">Review Guidelines</p>
        <ul className="space-y-1 text-xs text-[#64748b]">
          <li className="flex items-start gap-2">
            <span className="text-[#10b981]">✓</span>
            Share your honest experience with the design
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#10b981]">✓</span>
            Mention the machine/hoop size you used
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#10b981]">✓</span>
            Include tips that would help other buyers
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#ef4444]">✗</span>
            Don&apos;t include personal contact information
          </li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          isLoading={isSubmitting}
          className="gap-2"
        >
          <Send className="h-4 w-4" />
          Submit Review
        </Button>
      </div>
    </form>
  );
}
