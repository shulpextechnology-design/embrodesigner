"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { DollarSign, TrendingUp, ShoppingBag, Eye, Plus, FileText, Star, Download } from "lucide-react";
import { cn, formatPrice, formatNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { designs } from "@/data/designs";

const sellerDesigns = designs.slice(0, 4);

export default function SellerDashboardPage() {
  const stats = [
    { label: "Total Earnings", value: "$12,847", change: "+12.5%", icon: DollarSign, color: "text-[#10b981]" },
    { label: "Designs Sold", value: "1,284", change: "+8.2%", icon: ShoppingBag, color: "text-[#e94560]" },
    { label: "Total Views", value: "48.2K", change: "+23.1%", icon: Eye, color: "text-[#6366f1]" },
    { label: "Avg. Rating", value: "4.9", change: "+0.1", icon: Star, color: "text-[#f59e0b]" },
  ];

  const recentOrders = [
    { id: "ORD-001", design: "Magnolia Bloom Collection", buyer: "Sarah M.", amount: 19.99, date: "2 hours ago" },
    { id: "ORD-002", design: "Royal Monogram Frame", buyer: "John D.", amount: 14.99, date: "5 hours ago" },
    { id: "ORD-003", design: "Modern Geometric Set", buyer: "Emily R.", amount: 34.99, date: "1 day ago" },
    { id: "ORD-004", design: "Holiday Wreath Bundle", buyer: "Michael S.", amount: 29.99, date: "2 days ago" },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed inset-y-0 left-0 z-40 w-64 border-r border-[#e2e8f0] bg-white pt-16">
          <nav className="flex flex-col gap-1 p-4">
            {[
              { icon: TrendingUp, label: "Dashboard", href: "/seller/dashboard", active: true },
              { icon: ShoppingBag, label: "Designs", href: "/seller/designs", active: false },
              { icon: DollarSign, label: "Orders", href: "/seller/orders", active: false },
              { icon: Eye, label: "Earnings", href: "/seller/earnings", active: false },
              { icon: FileText, label: "Analytics", href: "/seller/analytics", active: false },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  link.active
                    ? "bg-[#e94560]/10 text-[#e94560]"
                    : "text-[#64748b] hover:bg-[#f8f9fc] hover:text-[#1a1a2e]"
                )}
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 pl-64">
          <header className="sticky top-0 z-30 border-b border-[#e2e8f0] bg-white/95 backdrop-blur-sm">
            <div className="flex items-center justify-between px-8 py-4">
              <div>
                <h1 className="text-xl font-bold text-[#1a1a2e]">Dashboard</h1>
                <p className="text-sm text-[#64748b]">Welcome back, Elena</p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Export Data
                </Button>
                <Link
                  href="/seller/designs/new"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#e94560] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#ff6b6b]"
                >
                  <Plus className="h-4 w-4" />
                  Add New Design
                </Link>
              </div>
            </div>
          </header>

          <div className="p-8">
            {/* Stats Grid */}
            <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Card key={stat.label} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-[#64748b]">{stat.label}</p>
                        <p className="mt-1 text-2xl font-bold text-[#1a1a2e]">{stat.value}</p>
                        <p className={cn("mt-1 text-xs font-medium", stat.color)}>
                          {stat.change} from last month
                        </p>
                      </div>
                      <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl bg-[#f8f9fc]", stat.color)}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Recent Orders */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Recent Orders</CardTitle>
                    <Link href="/seller/orders" className="text-sm text-[#e94560] hover:text-[#ff6b6b]">
                      View All
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between rounded-lg border border-[#e2e8f0] p-4 transition-all hover:shadow-md"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f8f9fc]">
                              <Download className="h-5 w-5 text-[#64748b]" />
                            </div>
                            <div>
                              <p className="font-medium text-[#1a1a2e]">{order.design}</p>
                              <p className="text-sm text-[#64748b]">
                                {order.buyer} • {order.date}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-[#10b981]">{formatPrice(order.amount)}</p>
                            <Badge variant="success" className="mt-1">Completed</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Top Designs */}
              <div>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Top Designs</CardTitle>
                    <Link href="/seller/designs" className="text-sm text-[#e94560] hover:text-[#ff6b6b]">
                      View All
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sellerDesigns.map((design) => (
                        <Link
                          key={design.id}
                          href={`/design/${design.id}`}
                          className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-[#f8f9fc]"
                        >
                          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-[#f8f9fc]">
                            <Image
                              src={design.thumbnail}
                              alt={design.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="line-clamp-1 text-sm font-medium text-[#1a1a2e]">{design.title}</p>
                            <div className="mt-1 flex items-center gap-2">
                              <Star className="h-3 w-3 fill-[#f59e0b] text-[#f59e0b]" />
                              <span className="text-xs text-[#64748b]">{design.rating}</span>
                              <span className="text-xs text-[#94a3b8]">•</span>
                              <span className="text-xs text-[#64748b]">{design.favorites} favorites</span>
                            </div>
                          </div>
                          <p className="text-sm font-semibold text-[#10b981]">{formatPrice(design.price)}</p>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Quick Tips */}
            <Card className="mt-8">
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#e94560]/10">
                    <TrendingUp className="h-7 w-7 text-[#e94560]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a1a2e]">Sales Tip</h3>
                    <p className="mt-1 text-sm text-[#64748b]">
                      Designs with multiple preview images sell 40% more. Add different angles and stitched examples to your listings!
                    </p>
                  </div>
                  <button className="ml-auto rounded-lg border border-[#e2e8f0] px-4 py-2 text-sm font-medium text-[#1a1a2e] transition-colors hover:border-[#e94560] hover:text-[#e94560]">
                    Learn More
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
