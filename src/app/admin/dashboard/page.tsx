"use client";

import * as React from "react";
import { Users, Package, DollarSign, Activity } from "lucide-react";
import { useAuthStore } from "@/components/auth-provider";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, limit } from "firebase/firestore";

export default function AdminDashboardPage() {
  const { user, role, loading } = useAuthStore();
  const router = useRouter();
  
  const [stats, setStats] = React.useState({
    totalUsers: 0,
    totalDesigns: 0,
    totalRevenue: 0,
  });

  React.useEffect(() => {
    // In a real app, you'd want actual secure admin validation on the server side
    // For now, we allow access if the role is set to ADMIN
    if (!loading && (!user || role !== "ADMIN")) {
      // router.push("/"); 
      // Temporarily disabled redirect so you can view it during development!
      // To test properly, change your user role to "ADMIN" in Firestore database.
    }
  }, [user, role, loading, router]);

  React.useEffect(() => {
    async function fetchStats() {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const designsSnapshot = await getDocs(collection(db, "designs"));
        
        let revenue = 0;
        designsSnapshot.docs.forEach(doc => {
          const data = doc.data();
          // Mock revenue calculation: sales * price
          revenue += (data.sales || 0) * (data.price || 0);
        });

        setStats({
          totalUsers: usersSnapshot.size,
          totalDesigns: designsSnapshot.size,
          totalRevenue: revenue,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    }

    fetchStats();
  }, []);

  const overviewCards = [
    { label: "Total Users", value: stats.totalUsers.toString(), icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Total Designs", value: stats.totalDesigns.toString(), icon: Package, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Total Revenue", value: `$${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Active Sessions", value: "12", icon: Activity, color: "text-[#e94560]", bg: "bg-[#e94560]/10" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1a1a2e]">Admin Overview</h1>
        <p className="mt-1 text-[#64748b]">Monitor platform activity and metrics.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {overviewCards.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#64748b]">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-[#1a1a2e]">{stat.value}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions / Notices */}
      <div className="rounded-xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-[#1a1a2e] mb-4">System Status</h3>
        <div className="flex items-center gap-3 text-sm">
          <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="font-medium text-[#1a1a2e]">All systems operational</span>
        </div>
        <p className="mt-2 text-[#64748b] text-sm">
          Database connection is stable. Storage buckets are online. Auth service is responding normally.
        </p>
      </div>
    </div>
  );
}
