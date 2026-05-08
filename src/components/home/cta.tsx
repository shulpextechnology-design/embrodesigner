import Link from "next/link";
import { ArrowRight, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#1a1a2e] to-[#16213e] py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-[#e94560]" />
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-[#e94560]" />
        <div className="absolute right-1/4 top-1/4 h-64 w-64 rounded-full bg-white" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center lg:flex-row lg:text-left lg:items-start lg:justify-between">
          {/* Left Content */}
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/80">
              <Palette className="h-4 w-4" />
              Start Creating Today
            </div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Turn Your Designs Into
              <span className="text-[#e94560]"> Revenue</span>
            </h2>
            <p className="mt-4 text-lg text-white/70">
              Join thousands of designers selling their embroidery creations on Embro Designer.
              Set your own prices, keep 80% of every sale, and reach customers worldwide.
            </p>

            {/* Benefits */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[
                "80% revenue share",
                "Instant payouts",
                "Global reach",
                "Marketing tools",
                "Analytics dashboard",
                "24/7 support",
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 text-white/90">
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-[#10b981]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right CTA */}
          <div className="mt-10 flex flex-col gap-4 lg:mt-0">
            <Button
              size="lg"
              className="gap-2 whitespace-nowrap bg-[#e94560] px-8 py-4 text-lg font-semibold hover:bg-[#ff6b6b]"
              asChild
            >
              <Link href="/seller/register">
                Start Selling
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="whitespace-nowrap text-white hover:bg-white/10"
              asChild
            >
              <Link href="/seller/dashboard">
                Learn More About Selling
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
