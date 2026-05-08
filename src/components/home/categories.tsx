import Link from "next/link";

const categories = [
  { id: "floral", name: "Floral", count: 5420, color: "#d4a574" },
  { id: "geometric", name: "Geometric", count: 3210, color: "#1e3a5f" },
  { id: "monogram", name: "Monogram", count: 1890, color: "#c2410c" },
  { id: "seasonal", name: "Seasonal", count: 4100, color: "#4a7c59" },
  { id: "kids", name: "Kids", count: 2750, color: "#e07b39" },
  { id: "vintage", name: "Vintage", count: 1980, color: "#8b5a2b" },
  { id: "nature", name: "Nature", count: 3100, color: "#2d5a27" },
  { id: "abstract", name: "Abstract", count: 1650, color: "#6b4c8a" },
];

export function Categories() {
  return (
    <section style={{ padding: "64px 0", backgroundColor: "white" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px" }}>
          <div>
            <span style={{ display: "block", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#c2410c", marginBottom: "8px" }}>Browse By</span>
            <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#1a1a1a" }}>Categories</h2>
          </div>
          <Link href="/browse" style={{ fontSize: "14px", fontWeight: 500, color: "#c2410c" }}>View All →</Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/browse?category=${cat.id}`} className="relative block rounded-2xl overflow-hidden" style={{ height: "180px" }}>
              <div style={{ position: "absolute", inset: 0, backgroundColor: cat.color }} />
              <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.2)" }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "white" }}>
                <span style={{ fontSize: "18px", fontWeight: 700, marginBottom: "4px" }}>{cat.name}</span>
                <span style={{ fontSize: "12px", opacity: 0.7 }}>{cat.count.toLocaleString()} designs</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}