import { Shield, Zap, Download, Headphones, CreditCard, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "Every design is reviewed for quality and stitch-ability. Not satisfied? Full refund within 30 days.",
  },
  {
    icon: Zap,
    title: "Instant Download",
    description: "Get your designs immediately after purchase. Multiple file formats included with every design.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Shop with confidence. All transactions are protected by industry-leading encryption.",
  },
  {
    icon: Download,
    title: "Unlimited Downloads",
    description: "Download your purchased designs any time. Files are stored in your account forever.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our team is here to help anytime. Get answers to your questions around the clock.",
  },
  {
    icon: CheckCircle,
    title: "Verified Designers",
    description: "All sellers are vetted for quality. Read reviews and shop with confidence.",
  },
];

export function Features() {
  return (
    <section className="bg-gradient-to-b from-[#f8f9fc] to-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-[#1a1a2e] sm:text-4xl">
            Why Choose Embro Designer?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#64748b]">
            We&apos;re committed to making your embroidery journey seamless and enjoyable.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#e94560]/10 to-[#e94560]/5 text-[#e94560] transition-all group-hover:scale-110 group-hover:bg-[#e94560] group-hover:text-white">
                <feature.icon className="h-7 w-7" />
              </div>

              {/* Content */}
              <h3 className="mb-2 text-lg font-semibold text-[#1a1a2e]">
                {feature.title}
              </h3>
              <p className="text-sm text-[#64748b] leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative Corner */}
              <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-[#e94560]/5 transition-all group-hover:bg-[#e94560]/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
