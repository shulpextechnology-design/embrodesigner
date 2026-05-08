"use client";

import * as React from "react";
import { DollarSign, Upload, TrendingUp, Package } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/components/auth-provider";
import { useRouter } from "next/navigation";

export default function DesignerDashboard() {
  const { user, role, loading } = useAuthStore();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && (!user || role !== "DESIGNER")) {
      router.push("/");
    }
  }, [user, role, loading, router]);

  if (loading) {
    return <div className="flex h-64 items-center justify-center">Loading dashboard...</div>;
  }

  if (!user || role !== "DESIGNER") {
    return null; // Will redirect
  }

  const stats = [
    { label: "Total Revenue", value: "$0.00", icon: DollarSign, trend: "+0%" },
    { label: "Active Designs", value: "0", icon: Package, trend: "0" },
    { label: "Total Sales", value: "0", icon: TrendingUp, trend: "+0" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1a1a2e]">Welcome back, {user.displayName || "Designer"}!</h1>
        <p className="mt-1 text-[#64748b]">Here is what is happening with your store today.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#64748b]">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-[#1a1a2e]">{stat.value}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f8f9fc]">
                <stat.icon className="h-6 w-6 text-[#e94560]" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="font-medium text-[#10b981]">{stat.trend}</span>
              <span className="ml-2 text-[#64748b]">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl border border-[#e2e8f0] bg-white shadow-sm p-6">
        <h3 className="text-lg font-bold text-[#1a1a2e] mb-4">Quick Actions</h3>
        <div className="flex gap-4">
          <Link href="/designer/upload" className="flex items-center gap-2 rounded-lg bg-[#e94560] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#d23368]">
            <Upload className="h-4 w-4" />
            Upload New Design
          </Link>
        </div>
      </div>

      {/* Recent Activity placeholder */}
      <div className="rounded-xl border border-[#e2e8f0] bg-white shadow-sm overflow-hidden">
        <div className="border-b border-[#e2e8f0] px-6 py-4">
          <h3 className="text-lg font-bold text-[#1a1a2e]">Recent Sales</h3>
        </div>
        <div className="p-6 text-center text-[#64748b]">
          <p>No sales yet. Upload a design to get started!</p>
        </div>
      </div>
    </div>
  );
}
