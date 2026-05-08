"use client";

import Link from "next/link";
import { useCartStore } from "@/store/store";
import { useAuthStore } from "@/components/auth-provider";
import { LogOut, User, LayoutDashboard, ShieldCheck, ShoppingCart, Search, Menu } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export function Navigation() {
  const { items } = useCartStore();
  const { user, role } = useAuthStore();
  const router = useRouter();

  const cartCount = items.length;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#e94560] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">ED</span>
            </div>
            <div>
              <h1 className="font-bold text-lg text-[#1a1a2e]">Embro Designer</h1>
              <p className="text-xs text-gray-500">Premium Designs</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/browse" className="text-sm font-medium text-[#1a1a2e] hover:text-[#e94560] transition-colors">Browse</Link>
            <Link href="/browse?category=floral" className="text-sm font-medium text-[#1a1a2e] hover:text-[#e94560] transition-colors">Floral</Link>
            <Link href="/browse?category=monogram" className="text-sm font-medium text-[#1a1a2e] hover:text-[#e94560] transition-colors">Monograms</Link>
          </nav>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search designs..." className="w-64 h-9 pl-10 pr-4 text-sm border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:border-[#e94560]" />
            </div>

            <Link href="/checkout" className="relative flex-shrink-0 text-gray-600 hover:text-[#e94560] transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#e94560] text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth specific links */}
            {user ? (
              <div className="flex items-center gap-4 border-l border-gray-200 pl-4 sm:pl-6">
                {role === "ADMIN" && (
                  <Link href="/admin/dashboard" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[#e94560] hover:text-[#ff6b6b] transition-colors">
                    <ShieldCheck className="w-4 h-4" />
                    Admin
                  </Link>
                )}
                {role === "DESIGNER" && (
                  <Link href="/designer/dashboard" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[#00a79d] hover:text-[#00c2b6] transition-colors">
                    <LayoutDashboard className="w-4 h-4" />
                    Portal
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4 border-l border-gray-200 pl-4 sm:pl-6">
                <Link href="/auth/login" className="text-sm font-medium text-[#1a1a2e] hover:text-[#e94560] transition-colors">
                  Login
                </Link>
                <Link href="/auth/register" className="hidden sm:flex items-center justify-center rounded-full bg-[#e94560] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#ff6b6b]">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}