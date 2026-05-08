import Link from "next/link";

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#1a1a1a", paddingTop: "64px", paddingBottom: "32px" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ width: "40px", height: "40px", backgroundColor: "#c2410c", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "white", fontWeight: 700, fontSize: "14px" }}>ED</span>
              </div>
              <span style={{ fontSize: "18px", fontWeight: 700, color: "white" }}>StitchVault</span>
            </Link>
            <p style={{ fontSize: "14px", color: "#6b6b6b", lineHeight: 1.6 }}>
              Where thread meets art. Premium embroidery designs for every creative vision.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b6b6b", marginBottom: "16px" }}>Shop</h4>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
              {["New Arrivals", "Best Sellers", "On Sale", "All Designs"].map((link) => (
                <li key={link}>
                  <Link href="#" style={{ fontSize: "14px", color: "white", opacity: 0.8 }}>{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b6b6b", marginBottom: "16px" }}>Help</h4>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
              {["Help Center", "Shipping", "Returns", "Contact"].map((link) => (
                <li key={link}>
                  <Link href="#" style={{ fontSize: "14px", color: "white", opacity: 0.8 }}>{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b6b6b", marginBottom: "16px" }}>Company</h4>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
              {["About Us", "Designers", "Blog", "Careers"].map((link) => (
                <li key={link}>
                  <Link href="#" style={{ fontSize: "14px", color: "white", opacity: 0.8 }}>{link}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #333", paddingTop: "24px", display: "flex", flexDirection: "column md:flex-row", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
          <p style={{ fontSize: "12px", color: "#6b6b6b" }}>© 2024 StitchVault. All rights reserved.</p>
          <div style={{ display: "flex", gap: "12px", fontSize: "12px", color: "#6b6b6b" }}>
            <Link href="#" style={{ color: "#6b6b6b" }}>Privacy</Link>
            <span>•</span>
            <Link href="#" style={{ color: "#6b6b6b" }}>Terms</Link>
            <span>•</span>
            <Link href="#" style={{ color: "#6b6b6b" }}>Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}