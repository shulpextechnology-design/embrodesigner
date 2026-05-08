import Link from "next/link";
import Image from "next/image";
import { getFeaturedDesigns } from "@/data/designs";

export function Hero() {
  const featuredDesigns = getFeaturedDesigns().slice(0, 3);

  return (
    <section style={{ backgroundColor: "#faf9f7", paddingTop: "40px", paddingBottom: "60px" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-xl mb-10">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <div style={{ width: "32px", height: "2px", backgroundColor: "#c2410c" }}></div>
            <span style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#c2410c" }}>Curated Collection</span>
          </div>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, lineHeight: 1.1, marginBottom: "16px", color: "#1a1a1a" }}>
            Where Thread <span style={{ color: "#c2410c", fontStyle: "italic" }}>Meets Art</span>
          </h1>
          <p style={{ fontSize: "18px", color: "#6b6b6b", marginBottom: "24px", lineHeight: 1.6 }}>
            Discover exceptional embroidery designs crafted by artisans worldwide. Each pattern tells a story.
          </p>
          <Link href="/browse" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", backgroundColor: "#1a1a1a", color: "white", fontSize: "14px", fontWeight: 500, borderRadius: "9999px" }}>
            Explore Collection
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Large Feature */}
          <Link href={`/design/${featuredDesigns[0].id}`} className="lg:col-span-2 relative block rounded-2xl overflow-hidden" style={{ height: "450px" }}>
            <Image src={featuredDesigns[0].thumbnail} alt={featuredDesigns[0].title} fill style={{ objectFit: "cover" }} priority />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)" }} />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span style={{ display: "inline-block", padding: "4px 12px", backgroundColor: "#c2410c", color: "white", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", borderRadius: "9999px", marginBottom: "8px" }}>Featured</span>
              <h3 style={{ fontSize: "24px", fontWeight: 700, color: "white", marginBottom: "4px" }}>{featuredDesigns[0].title}</h3>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", marginBottom: "16px" }}>{featuredDesigns[0].category}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "20px", fontWeight: 700, color: "white" }}>${featuredDesigns[0].price.toFixed(2)}</span>
                <span style={{ padding: "8px 16px", backgroundColor: "white", color: "#1a1a1a", fontSize: "14px", fontWeight: 500, borderRadius: "9999px" }}>View Design</span>
              </div>
            </div>
          </Link>

          {/* Side Cards */}
          <div className="flex flex-col gap-4">
            {featuredDesigns.slice(1, 3).map((design) => (
              <Link key={design.id} href={`/design/${design.id}`} className="relative block rounded-2xl overflow-hidden flex-1" style={{ minHeight: "200px" }}>
                <Image src={design.thumbnail} alt={design.title} fill style={{ objectFit: "cover" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "4px" }}>{design.category}</p>
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "white", marginBottom: "4px" }}>{design.title}</h3>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "white" }}>${design.price.toFixed(2)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Features Bar */}
        <div className="mt-10 p-6 bg-white rounded-2xl" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            <span style={{ fontSize: "14px", fontWeight: 500 }}>Premium Quality Guaranteed</span>
          </div>
          <div style={{ display: "flex", gap: "32px", fontSize: "14px", color: "#6b6b6b" }}>
            <span>25,000+ Designs</span>
            <span>Instant Download</span>
            <span>Lifetime Access</span>
          </div>
        </div>
      </div>
    </section>
  );
}