"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore, useFavoritesStore } from "@/store/store";
import type { Design, Designer } from "@/data/designs";

interface DesignCardProps {
  design: Design;
  designer?: Designer;
  className?: string;
  showDesigner?: boolean;
}

export function DesignCard({
  design,
  designer,
  className,
  showDesigner = false,
}: DesignCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  const isOnSale = design.salePrice && design.salePrice < design.price;
  const isNew = !isOnSale;
  const favorite = isFavorite(design.id);

  const handleCardClick = () => {
    router.push(`/design/${design.id}`);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(design.id);
  };

  return (
    <div
      className={cn("group flex-shrink-0", className)}
      style={{ width: "280px" }}
    >
      <div
        className="overflow-hidden rounded-[4px] bg-white"
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-[#f5f5f5]">
          <Image
            src={design.thumbnail}
            alt={design.title}
            fill
            sizes="280px"
            className={cn(
              "object-cover transition-transform duration-300",
              isHovered && "scale-105"
            )}
            loading="lazy"
          />

          {/* Top Left NEW Badge */}
          <div className="absolute left-2 top-2">
            {isNew && (
              <span className="flex h-[20px] items-center rounded-[3px] bg-[#00a79d] px-2 text-[10px] font-bold uppercase text-white">
                NEW
              </span>
            )}
          </div>

          {/* Top Right Favorite Heart */}
          <button
            onClick={handleToggleFavorite}
            className={cn(
              "absolute right-2 top-2 flex h-[26px] w-[26px] items-center justify-center rounded-full bg-white/90 shadow-sm transition-all hover:bg-white",
              favorite ? "text-[#d23368]" : "text-[#d23368]"
            )}
          >
            <Heart
              className={cn("h-[13px] w-[13px]", favorite && "fill-current")}
            />
          </button>
        </div>

        {/* Product Info */}
        <div className="border border-t-0 border-[#e6e6e6] px-3 py-3">
          <p className="mb-0.5 text-[11px] font-medium uppercase tracking-wide text-[#999999]">
            SKU: {design.id.toUpperCase()}
          </p>

          {/* Title */}
          <h3 className="mb-2 line-clamp-2 text-[13px] font-medium leading-snug text-[#1a1a1a]">
            {design.title}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            {isOnSale ? (
              <>
                <span className="text-[16px] font-bold text-[#d23368]">
                  ${design.salePrice?.toFixed(2)}
                </span>
                <span className="text-[12px] text-[#999999] line-through">
                  ${design.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-[16px] font-bold text-[#333333]">
                ${design.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* SALE Banner */}
        {isOnSale && (
          <div className="bg-[#ed1b4b] px-2 py-1.5">
            <span className="text-[10px] font-bold uppercase text-white">
              SALE
            </span>
          </div>
        )}
      </div>
    </div>
  );
}