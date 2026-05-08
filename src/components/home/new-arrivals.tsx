import Link from "next/link";
import Image from "next/image";
import { getNewArrivals } from "@/data/designs";

export function NewArrivals() {
  const designs = getNewArrivals().slice(0, 6);

  return (
    <section style={{ padding: "64px 0", backgroundColor: "#1a1a1a" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#d4a574" }} />
              <span style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#d4a574" }}>Just Dropped</span>
            </div>
            <h2 style={{ fontSize: "28px", fontWeight: 700, color: "white" }}>New Arrivals</h2>
          </div>
          <Link href="/browse?sort=newest" style={{ fontSize: "14px", fontWeight: 500, color: "#d4a574" }}>View All →</Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {designs.map((design) => (
            <Link key={design.id} href={`/design/${design.id}`}>
              <div style={{ backgroundColor: "#2a2a2a", borderRadius: "12px", overflow: "hidden" }}>
                <div className="relative" style={{ height: "150px", backgroundColor: "#333" }}>
                  <Image src={design.thumbnail} alt={design.title} fill style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: "8px", left: "8px", padding: "4px 8px", backgroundColor: "#d4a574", color: "#1a1a1a", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", borderRadius: "9999px" }}>
                    New
                  </div>
                </div>
                <div style={{ padding: "12px" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: 500, color: "white", marginBottom: "4px", lineHeight: 1.4 }}>{design.title}</h3>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#d4a574" }}>${design.price.toFixed(2)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <Link href="/browse?sort=newest" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", backgroundColor: "#d4a574", color: "#1a1a1a", fontSize: "14px", fontWeight: 700, borderRadius: "9999px" }}>
            Shop New Arrivals
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}