"use client";

import * as React from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, Sparkles, User, Store, ShoppingBag, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    role: "buyer" as "buyer" | "seller" | "both",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  const roles = [
    { id: "buyer", label: "Buyer", description: "I want to buy designs", icon: ShoppingBag },
    { id: "seller", label: "Seller", description: "I want to sell designs", icon: Store },
    { id: "both", label: "Both", description: "Buy and sell designs", icon: User },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Left - Form */}
      <div className="flex flex-1 flex-col justify-center px-8 py-12 lg:w-1/2">
        <div className="mx-auto w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="mb-8 inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#e94560] to-[#ff6b6b]">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-[#1a1a2e]">
              Embro<span className="text-[#e94560]">Designer</span>
            </span>
          </Link>

          <h1 className="text-3xl font-bold text-[#1a1a2e]">Create your account</h1>
          <p className="mt-2 text-[#64748b]">
            Join thousands of embroidery enthusiasts and creators.
          </p>

          {/* Role Selection */}
          <div className="mt-8">
            <p className="mb-3 text-sm font-medium text-[#1a1a2e]">I want to...</p>
            <div className="grid grid-cols-3 gap-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setFormData({ ...formData, role: role.id as any })}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all",
                    formData.role === role.id
                      ? "border-[#e94560] bg-[#e94560]/5"
                      : "border-[#e2e8f0] hover:border-[#e94560]/50"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full",
                      formData.role === role.id
                        ? "bg-[#e94560] text-white"
                        : "bg-[#f8f9fc] text-[#64748b]"
                    )}
                  >
                    <role.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-[#1a1a2e]">{role.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Social Login */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 rounded-lg border-2 border-[#e2e8f0] px-4 py-2.5 text-sm font-medium text-[#1a1a2e] transition-colors hover:border-[#e94560]">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 rounded-lg border-2 border-[#e2e8f0] px-4 py-2.5 text-sm font-medium text-[#1a1a2e] transition-colors hover:border-[#e94560]">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Apple
            </button>
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#e2e8f0]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-[#f8f9fc] px-4 text-[#64748b]">or register with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full Name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              leftIcon={<User className="h-5 w-5" />}
              required
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              leftIcon={<Mail className="h-5 w-5" />}
              required
            />
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                leftIcon={<Lock className="h-5 w-5" />}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-[#94a3b8] hover:text-[#64748b]"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Password Requirements */}
            <div className="grid grid-cols-2 gap-2 text-xs text-[#64748b]">
              {[
                "At least 8 characters",
                "One uppercase letter",
                "One number",
                "One special character",
              ].map((req) => (
                <div key={req} className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-[#94a3b8]" />
                  {req}
                </div>
              ))}
            </div>

            <p className="text-xs text-[#94a3b8]">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="text-[#e94560] hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[#e94560] hover:underline">
                Privacy Policy
              </Link>
              .
            </p>

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              Create Account
            </Button>
          </form>

          {/* Login */}
          <p className="mt-8 text-center text-sm text-[#64748b]">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-medium text-[#e94560] hover:text-[#ff6b6b]">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right - Visual */}
      <div className="hidden flex-1 flex-col justify-center bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-12 lg:flex">
        <div className="mx-auto max-w-lg text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#e94560]/20 blur-xl" />
              <div className="relative flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-[#e94560] to-[#ff6b6b] shadow-2xl">
                <Sparkles className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white">Start Your Creative Journey</h2>
          <p className="mt-4 text-lg text-white/70">
            Whether you&apos;re looking for unique designs or want to showcase your talent, Embro Designer has everything you need.
          </p>

          <div className="mt-12 space-y-4 text-left">
            {[
              "Access thousands of premium designs",
              "Sell your creations worldwide",
              "Join a supportive community",
              "Get instant digital downloads",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3 rounded-xl bg-white/10 p-4">
                <Check className="h-5 w-5 text-[#10b981]" />
                <span className="text-white/90">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
