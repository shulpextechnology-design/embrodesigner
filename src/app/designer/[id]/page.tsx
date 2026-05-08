"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MapPin, Calendar, Clock, Star, ShoppingBag, Users, Heart, MessageCircle, Share2, BadgeCheck, Filter } from "lucide-react";
import { cn, formatNumber, formatPrice, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DesignCard } from "@/components/ui/design-card";
import { getDesignerById, getDesignsByDesigner } from "@/data/designs";

export default function DesignerProfilePage() {
  const params = useParams();
  const designer = getDesignerById(params.id as string);
  const designerDesigns = designer ? getDesignsByDesigner(designer.id) : [];
  const [activeTab, setActiveTab] = React.useState("all");
  const [sortBy, setSortBy] = React.useState("newest");

  if (!designer) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-[#1a1a2e]">Designer not found</h1>
        <p className="mt-2 text-[#64748b]">The designer you&apos;re looking for doesn&apos;t exist.</p>
        <Button className="mt-6" asChild>
          <Link href="/designers">Browse Designers</Link>
        </Button>
      </div>
    );
  }

  const tabs = [
    { id: "all", label: "All Designs", count: designerDesigns.length },
    { id: "newest", label: "Newest", count: designerDesigns.filter(d => new Date(d.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length },
  ];

  const filteredDesigns = designerDesigns.filter(d => {
    if (activeTab === "newest") {
      return new Date(d.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === "popular") return b.favorites - a.favorites;
    if (sortBy === "price-low") return (a.salePrice || a.price) - (b.salePrice || b.price);
    if (sortBy === "price-high") return (b.salePrice || b.price) - (a.salePrice || a.price);
    return 0;
  });

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: designer.shopName,
        text: `Check out ${designer.shopName} on Embro Designer!`,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      {/* Cover Image */}
      <div className="relative h-48 sm:h-64 lg:h-80 overflow-hidden bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
        <Image
          src={designer.coverImage}
          alt="Cover"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Profile Header */}
      <div className="border-b border-[#e2e8f0] bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-20 pb-6 sm:-mt-24 lg:-mt-28">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end lg:items-start">
              {/* Avatar */}
              <div className="relative">
                <div className="h-32 w-32 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-xl sm:h-40 sm:w-40 lg:h-48 lg:w-48">
                  <Image
                    src={designer.avatar}
                    alt={designer.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {designer.isVerified && (
                  <div className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#10b981] shadow-lg">
                    <BadgeCheck className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 pt-4 sm:pt-0">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-[#1a1a2e] sm:text-3xl">
                      {designer.shopName}
                    </h1>
                    <p className="mt-1 text-[#64748b]">{designer.tagline}</p>

                    {/* Meta */}
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[#64748b]">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Member since {designer.memberSince}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {designer.responseTime}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="outline" className="gap-2" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                    <Button className="gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { icon: ShoppingBag, value: formatNumber(designer.totalSales), label: "Total Sales", color: "text-[#e94560]" },
                { icon: Star, value: designer.rating.toFixed(1), label: "Rating", color: "text-[#f59e0b]" },
                { icon: Heart, value: formatNumber(designer.designs * 234), label: "Favorites", color: "text-[#ec4899]" },
                { icon: Users, value: formatNumber(designer.followers), label: "Followers", color: "text-[#10b981]" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3 rounded-xl border border-[#e2e8f0] bg-white p-4">
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg bg-[#f8f9fc]", stat.color)}>
                    <stat.icon className={cn("h-5 w-5", stat.color)} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[#1a1a2e]">{stat.value}</p>
                    <p className="text-xs text-[#64748b]">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="mb-6 flex items-center justify-between border-b border-[#e2e8f0]">
              <div className="flex gap-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "relative pb-4 text-sm font-medium transition-colors",
                      activeTab === tab.id ? "text-[#e94560]" : "text-[#64748b] hover:text-[#1a1a2e]"
                    )}
                  >
                    {tab.label}
                    <span className="ml-1 text-[#94a3b8]">({tab.count})</span>
                    {activeTab === tab.id && (
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#e94560]" />
                    )}
                  </button>
                ))}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none rounded-lg border border-[#e2e8f0] bg-white px-3 py-2 pr-8 text-sm text-[#1a1a2e] outline-none focus:border-[#e94560] cursor-pointer"
              >
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Designs Grid */}
            {filteredDesigns.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {filteredDesigns.map((design, index) => (
                  <div
                    key={design.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <DesignCard design={design} showDesigner={false} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-[#64748b]">No designs found in this category.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* About */}
            <div className="rounded-xl border border-[#e2e8f0] bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold text-[#1a1a2e]">About the Shop</h3>
              <p className="text-sm text-[#64748b] leading-relaxed">{designer.bio}</p>
            </div>

            {/* Policies */}
            <div className="rounded-xl border border-[#e2e8f0] bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold text-[#1a1a2e]">Shop Policies</h3>
              <div className="space-y-4">
                {[
                  { title: "Instant Download", description: "Your files will be available immediately after purchase." },
                  { title: "Returns", description: "Due to the nature of digital products, all sales are final." },
                  { title: "Support", description: `${designer.responseTime} response time.` },
                ].map((policy) => (
                  <div key={policy.title}>
                    <p className="font-medium text-[#1a1a2e]">{policy.title}</p>
                    <p className="mt-1 text-sm text-[#64748b]">{policy.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Designs */}
            <div className="rounded-xl border border-[#e2e8f0] bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold text-[#1a1a2e]">Top Designs</h3>
              <div className="space-y-4">
                {designerDesigns.slice(0, 3).map((design) => (
                  <Link
                    key={design.id}
                    href={`/design/${design.id}`}
                    className="flex gap-3 rounded-lg p-2 transition-colors hover:bg-[#f8f9fc]"
                  >
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-[#f8f9fc]">
                      <Image
                        src={design.thumbnail}
                        alt={design.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="line-clamp-2 text-sm font-medium text-[#1a1a2e]">{design.title}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <Star className="h-3 w-3 fill-[#f59e0b] text-[#f59e0b]" />
                        <span className="text-xs text-[#64748b]">{design.rating}</span>
                        <span className="text-sm font-semibold text-[#e94560]">{formatPrice(design.salePrice || design.price)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
