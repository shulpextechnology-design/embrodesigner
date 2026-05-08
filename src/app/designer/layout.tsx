import * as React from "react";
import Link from "next/link";
import { LayoutDashboard, UploadCloud, Settings, Package } from "lucide-react";

export default function DesignerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-[#f8f9fc]">
      {/* Sidebar */}
      <div className="w-64 border-r border-[#e2e8f0] bg-white px-4 py-8 hidden md:block">
        <h2 className="text-lg font-bold text-[#1a1a2e] mb-6 px-2">Designer Portal</h2>
        <nav className="space-y-1">
          <Link href="/designer/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium bg-[#e94560]/10 text-[#e94560]">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="/designer/designs" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#64748b] hover:bg-[#f8f9fc] hover:text-[#1a1a2e]">
            <Package className="h-5 w-5" />
            My Designs
          </Link>
          <Link href="/designer/upload" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#64748b] hover:bg-[#f8f9fc] hover:text-[#1a1a2e]">
            <UploadCloud className="h-5 w-5" />
            Upload Design
          </Link>
          <Link href="/designer/settings" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#64748b] hover:bg-[#f8f9fc] hover:text-[#1a1a2e]">
            <Settings className="h-5 w-5" />
            Settings
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
