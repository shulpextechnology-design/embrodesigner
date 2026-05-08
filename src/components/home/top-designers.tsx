"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
import { DesignerCard } from "@/components/ui/designer-card";
import { Button } from "@/components/ui/button";
import { designers } from "@/data/designs";

export function TopDesigners() {
  const topDesigners = designers.slice(0, 4);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex items-end justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#f59e0b] to-[#fbbf24]">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#1a1a2e] sm:text-4xl">
                Top Designers
              </h2>
              <p className="mt-1 text-[#64748b]">
                Meet our most talented creators
              </p>
            </div>
          </div>
          <Link
            href="/designers"
            className="hidden items-center gap-2 text-sm font-medium text-[#e94560] hover:text-[#ff6b6b] sm:flex"
          >
            View All Designers
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Designers Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {topDesigners.map((designer, index) => (
            <div
              key={designer.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <DesignerCard designer={designer} />
            </div>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-10 flex justify-center sm:hidden">
          <Button variant="outline" className="gap-2" asChild>
            <Link href="/designers">
              View All Designers
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
