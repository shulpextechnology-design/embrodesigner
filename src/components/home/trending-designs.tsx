import Link from "next/link";
import Image from "next/image";
import { getTrendingDesigns } from "@/data/designs";

export function TrendingDesigns() {
  const designs = getTrendingDesigns().slice(0, 4);

  return (
    <section style={{ padding: "64px 0", backgroundColor: "#faf9f7" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#c2410c" }} />
              <span style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#c2410c" }}>Trending Now</span>
            </div>
            <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#1a1a1a" }}>Best Sellers</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {designs.map((design, index) => (
            <Link key={design.id} href={`/design/${design.id}`}>
              <div style={{ backgroundColor: "white", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", transition: "box-shadow 0.2s" }}>
                <div className="relative" style={{ height: "200px", backgroundColor: "#f0f0f0" }}>
                  <Image src={design.thumbnail} alt={design.title} fill style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: "12px", left: "12px", width: "32px", height: "32px", backgroundColor: "#1a1a1a", color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700 }}>
                    {index + 1}
                  </div>
                </div>
                <div style={{ padding: "16px" }}>
                  <p style={{ fontSize: "12px", color: "#6b6b6b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>{design.category}</p>
                  <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a1a", marginBottom: "12px", lineHeight: 1.4 }}>{design.title}</h3>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "16px", fontWeight: 700, color: "#1a1a1a" }}>${design.price.toFixed(2)}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#6b6b6b" }}>
                      <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      {design.rating}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: "32px", textAlign: "center" }}>
          <Link href="/browse?sort=bestsellers" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", border: "2px solid #1a1a1a", color: "#1a1a1a", fontSize: "14px", fontWeight: 500, borderRadius: "9999px" }}>
            View All Best Sellers
          </Link>
        </div>
      </div>
    </section>
  );
}