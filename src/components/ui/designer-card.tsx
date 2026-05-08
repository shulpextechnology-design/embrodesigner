"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, Users, Clock, BadgeCheck } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import type { Designer } from "@/data/designs";

interface DesignerCardProps {
  designer: Designer;
  className?: string;
}

export function DesignerCard({ designer, className }: DesignerCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Link href={`/designer/${designer.id}`}>
      <div
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-sm transition-all duration-300 hover:shadow-xl",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Cover Image */}
        <div className="relative h-24 overflow-hidden bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
          <Image
            src={designer.coverImage}
            alt="Cover"
            fill
            className="object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Avatar */}
        <div className="relative px-5">
          <div className="absolute -top-10 h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-white shadow-md">
            <Image
              src={designer.avatar}
              alt={designer.name}
              fill
              className="object-cover"
            />
          </div>
          {designer.isVerified && (
            <div className="absolute left-[68px] top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#10b981]">
              <BadgeCheck className="h-4 w-4 text-white" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 pt-0">
          <div className="mb-1 flex items-center gap-2 pt-12">
            <h3 className="text-lg font-semibold text-[#1a1a2e]">
              {designer.shopName}
            </h3>
          </div>
          <p className="mb-4 text-sm text-[#64748b]">{designer.tagline}</p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 rounded-lg bg-[#f8f9fc] p-2.5">
              <ShoppingBag className="h-4 w-4 text-[#e94560]" />
              <div>
                <p className="text-xs text-[#94a3b8]">Sales</p>
                <p className="text-sm font-semibold text-[#1a1a2e]">
                  {formatNumber(designer.totalSales)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-[#f8f9fc] p-2.5">
              <Star className="h-4 w-4 text-[#f59e0b]" />
              <div>
                <p className="text-xs text-[#94a3b8]">Rating</p>
                <p className="text-sm font-semibold text-[#1a1a2e]">
                  {designer.rating.toFixed(1)}
                </p>
              </div>
            </div>
          </div>

          {/* Hover Stats */}
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 translate-y-full rounded-b-2xl bg-[#1a1a2e] p-4 text-white transition-all duration-300",
              isHovered ? "opacity-100 translate-y-0" : "opacity-0"
            )}
          >
            <div className="flex justify-between">
              <div className="text-center">
                <p className="text-lg font-bold">{formatNumber(designer.designs)}</p>
                <p className="text-xs text-white/70">Designs</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold">{formatNumber(designer.followers)}</p>
                <p className="text-xs text-white/70">Followers</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Clock className="h-4 w-4 text-white/70" />
                  <p className="text-xs text-white/70">Response</p>
                </div>
                <p className="text-xs font-medium text-white/90">{designer.responseTime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
