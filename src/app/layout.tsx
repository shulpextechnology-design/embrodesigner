import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { CartSidebar } from "@/components/layout/cart-sidebar";
import { AuthProvider } from "@/components/auth-provider";
export const metadata: Metadata = {
  title: "Embro Designer - Premium Embroidery Design Marketplace",
  description: "Discover thousands of premium embroidery designs from talented creators worldwide. Shop floral, geometric, monogram, and custom designs for machine embroidery.",
  keywords: ["embroidery designs", "machine embroidery", "embroidery patterns", "DST files", "PES files", "digitizing"],
  authors: [{ name: "Embro Designer" }],
  openGraph: {
    title: "Embro Designer - Premium Embroidery Design Marketplace",
    description: "Discover thousands of premium embroidery designs from talented creators worldwide.",
    type: "website",
    locale: "en_US",
    siteName: "Embro Designer",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@500&family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23e94560'/><text y='.9em' x='50%' text-anchor='middle' font-size='60'>✨</text></svg>"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-[#faf9f7]">
        <AuthProvider>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartSidebar />
        </AuthProvider>
      </body>
    </html>
  );
}
