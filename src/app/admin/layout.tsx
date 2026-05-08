import * as React from "react";
import Link from "next/link";
import { LayoutDashboard, Users, Package, Settings, ShieldCheck } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-[#f8f9fc]">
      {/* Sidebar */}
      <div className="w-64 border-r border-[#e2e8f0] bg-[#1a1a2e] px-4 py-8 text-white hidden md:block">
        <div className="mb-6 flex items-center gap-2 px-2">
          <ShieldCheck className="h-6 w-6 text-[#e94560]" />
          <h2 className="text-lg font-bold">Admin Panel</h2>
        </div>
        <nav className="space-y-2">
          <Link href="/admin/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-white/10 transition-colors">
            <LayoutDashboard className="h-5 w-5 text-[#94a3b8]" />
            Dashboard
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-white/10 transition-colors">
            <Users className="h-5 w-5 text-[#94a3b8]" />
            Manage Users
          </Link>
          <Link href="/admin/designs" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-white/10 transition-colors">
            <Package className="h-5 w-5 text-[#94a3b8]" />
            Manage Designs
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-white/10 transition-colors">
            <Settings className="h-5 w-5 text-[#94a3b8]" />
            Platform Settings
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
