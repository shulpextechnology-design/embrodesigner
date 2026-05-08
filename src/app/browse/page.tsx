"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, Heart, ShoppingCart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { designs, designers, categories } from "@/data/designs";

import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

const sortOptions = [
  { value: "relevance", label: "Most Relevant" },
  { value: "newest", label: "Newest First" },
  { value: "popular", label: "Most Popular" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

function BrowseContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState("newest");
  const categoryParam = searchParams.get("category");
  
  const [firestoreDesigns, setFirestoreDesigns] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchDesigns() {
      try {
        const snapshot = await getDocs(collection(db, "designs"));
        const fDesigns = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Normalize to match static data structure for the UI
          thumbnail: doc.data().thumbnailUrl || "https://placehold.co/400x400?text=No+Image",
          price: parseFloat(doc.data().price) || 0,
          salePrice: doc.data().salePrice ? parseFloat(doc.data().salePrice) : undefined,
          formats: doc.data().formats || ["ZIP", "PES"],
        }));
        setFirestoreDesigns(fDesigns);
      } catch (error) {
        console.error("Error fetching designs:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDesigns();
  }, []);

  const getDesigner = (designerId: string) => designers.find((d) => d.id === designerId);

  // Combine static and firestore designs
  let filteredDesigns = [...firestoreDesigns, ...designs];

  if (categoryParam) {
    filteredDesigns = filteredDesigns.filter((d) => d.category.toLowerCase().includes(categoryParam.toLowerCase()));
  }

  if (searchQuery) {
    filteredDesigns = filteredDesigns.filter((d) =>
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (d.tags && d.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    );
  }

  switch (sortBy) {
    case "newest":
      filteredDesigns.sort((a, b) => {
        const timeA = a.createdAt?.seconds ? a.createdAt.seconds * 1000 : new Date(a.createdAt || 0).getTime();
        const timeB = b.createdAt?.seconds ? b.createdAt.seconds * 1000 : new Date(b.createdAt || 0).getTime();
        return timeB - timeA;
      });
      break;
    case "popular":
      filteredDesigns.sort((a, b) => (b.favorites || 0) - (a.favorites || 0));
      break;
    case "price-low":
      filteredDesigns.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
      break;
    case "price-high":
      filteredDesigns.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
      break;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-[#d9d9d9] bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-xl font-bold text-[#333333]">
            {categoryParam ? categories.find((c) => c.id === categoryParam)?.name || "Browse" : "Browse All Designs"}
          </h1>
          <p className="mt-1 text-sm text-[#666666]">{filteredDesigns.length} designs</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Search & Sort */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999999]" />
            <input
              type="text"
              placeholder="Search designs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded border border-[#d9d9d9] bg-[#fafafa] pl-9 pr-4 text-sm text-[#333333] placeholder:text-[#999999] focus:border-[#d23368] focus:bg-white focus:outline-none"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-10 rounded border border-[#d9d9d9] bg-white px-4 text-sm text-[#333333] focus:border-[#d23368] focus:outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Categories */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/browse?category=${cat.id}`}
              className={cn(
                "rounded border px-3 py-1.5 text-xs font-medium transition-colors",
                categoryParam === cat.id
                  ? "border-[#d23368] bg-[#d23368] text-white"
                  : "border-[#d9d9d9] bg-[#fafafa] text-[#666666] hover:border-[#d23368] hover:text-[#d23368]"
              )}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="py-20 text-center text-[#666666]">Loading designs...</div>
        ) : filteredDesigns.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filteredDesigns.map((design) => {
              const isOnSale = design.salePrice && design.salePrice < design.price;
              const isNew = !isOnSale;
              return (
                <Link key={design.id} href={`/design/${design.id}`} className="group">
                  <div className="overflow-hidden rounded bg-white">
                    <div className="relative aspect-square bg-[#f5f5f5]">
                      <Image src={design.thumbnail || "https://placehold.co/400x400?text=No+Image"} alt={design.title} fill className="object-cover" sizes="(max-width: 640px) 50vw, 25vw" />
                      {isNew && (
                        <span className="absolute left-2 top-2 flex h-5 items-center rounded-sm bg-[#00a79d] px-1.5 text-[10px] font-bold uppercase text-white">NEW</span>
                      )}
                      <button className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm hover:scale-110 transition-transform">
                        <Heart className="h-3 w-3 text-[#d23368]" />
                      </button>
                    </div>
                    <div className="border border-t-0 border-[#e6e6e6] p-3">
                      <p className="mb-0.5 text-[11px] text-[#999999]">SKU: {design.id.slice(0, 8).toUpperCase()}</p>
                      <h3 className="mb-1 line-clamp-2 text-xs font-medium text-[#1a1a1a]">{design.title}</h3>
                      <div className="flex items-center gap-1.5">
                        {isOnSale ? (
                          <>
                            <span className="text-sm font-bold text-[#d23368]">${design.salePrice?.toFixed(2)}</span>
                            <span className="text-xs text-[#999999] line-through">${design.price.toFixed(2)}</span>
                          </>
                        ) : (
                          <span className="text-sm font-bold text-[#333333]">${design.price.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                    {isOnSale && <div className="bg-[#ed1b4b] px-2 py-1"><span className="text-[10px] font-bold uppercase text-white">SALE</span></div>}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg font-semibold text-[#333333]">No designs found</p>
            <p className="mt-2 text-sm text-[#666666]">Try adjusting your search</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BrowsePage() {
  return (
    <React.Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <BrowseContent />
    </React.Suspense>
  );
}