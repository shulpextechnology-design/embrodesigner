"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Heart, ShoppingCart, Star, Download, Share2, ChevronLeft, ChevronRight, Shield, Check, Truck, Undo } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { useCartStore, useFavoritesStore } from "@/store/store";
import { getDesignById, getDesignerById, designs as allDesigns } from "@/data/designs";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function DesignDetailPage() {
  const params = useParams();
  const { addItem } = useCartStore();
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  
  const [design, setDesign] = React.useState<any>(null);
  const [designer, setDesigner] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedImage, setSelectedImage] = React.useState(0);

  React.useEffect(() => {
    async function fetchDesign() {
      setIsLoading(true);
      const id = params.id as string;
      
      // Try static first
      const staticDesign = getDesignById(id);
      if (staticDesign) {
        setDesign(staticDesign);
        setDesigner(getDesignerById(staticDesign.designerId));
        setIsLoading(false);
        return;
      }

      // Try Firestore
      try {
        const docRef = doc(db, "designs", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setDesign({
            id: docSnap.id,
            ...data,
            thumbnail: data.thumbnailUrl || "https://placehold.co/400x400?text=No+Image",
            previewImages: [data.thumbnailUrl || "https://placehold.co/400x400?text=No+Image"],
            formats: data.formats || ["ZIP", "PES", "DST"],
            stitchCount: data.stitchCount || 15000,
            width: data.width || 4.5,
            height: data.height || 4.5,
            colors: data.colors || 4,
            difficulty: data.difficulty || "Beginner",
          });
          
          // Try to fetch designer info
          if (data.designerId) {
            const designerDoc = await getDoc(doc(db, "users", data.designerId));
            if (designerDoc.exists()) {
              setDesigner({
                id: designerDoc.id,
                name: designerDoc.data().name,
                shopName: designerDoc.data().shopName || `${designerDoc.data().name}'s Shop`,
                avatar: designerDoc.data().avatar || "https://placehold.co/100x100?text=Avatar",
                totalSales: designerDoc.data().sales || 0,
              });
            }
          }
        }
      } catch (error) {
        console.error("Error fetching design:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDesign();
  }, [params.id]);

  const relatedDesigns = allDesigns
    .filter((d) => d.category === design?.category && d.id !== design?.id)
    .slice(0, 4);

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">Loading design...</div>;
  }

  if (!design) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex min-h-[60vh] flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-[#333333]">Design not found</h1>
          <p className="mt-2 text-[#666666]">The design you are looking for does not exist.</p>
          <Link href="/browse" className="mt-6 rounded bg-[#d23368] px-6 py-2 text-sm font-bold text-white hover:bg-[#a82852]">
            Browse Designs
          </Link>
        </div>
      </div>
    );
  }

  const favorite = isFavorite(design.id);
  const isOnSale = design.salePrice && design.salePrice < design.price;

  const handleAddToCart = () => {
    addItem(design);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-[#d9d9d9] bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-[#666666]">
            <Link href="/" className="hover:text-[#d23368]">Home</Link>
            <span>/</span>
            <Link href="/browse" className="hover:text-[#d23368]">Browse</Link>
            <span>/</span>
            <Link href={`/browse?category=${design.category.toLowerCase().split(" ")[0]}`} className="hover:text-[#d23368]">
              {design.category}
            </Link>
            <span>/</span>
            <span className="text-[#333333]">{design.title}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded bg-[#f5f5f5]">
              <Image
                src={design.previewImages[selectedImage] || design.thumbnail}
                alt={design.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {isOnSale && (
                <span className="absolute left-3 top-3 rounded-sm bg-[#ed1b4b] px-2 py-1 text-xs font-bold uppercase text-white">
                  SALE
                </span>
              )}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={() => setSelectedImage((prev) => prev > 0 ? prev - 1 : (design.previewImages.length || 1) - 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow"
                >
                  <ChevronLeft className="h-4 w-4 text-[#333333]" />
                </button>
                <button
                  onClick={() => setSelectedImage((prev) => prev < (design.previewImages.length || 1) - 1 ? prev + 1 : 0)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow"
                >
                  <ChevronRight className="h-4 w-4 text-[#333333]" />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedImage(0)}
                className={cn(
                  "relative h-16 w-16 overflow-hidden rounded border-2",
                  selectedImage === 0 ? "border-[#d23368]" : "border-[#e6e6e6] hover:border-[#d23368]"
                )}
              >
                <Image src={design.thumbnail} alt={design.title} fill className="object-cover" />
              </button>
              {design.previewImages.slice(1, 4).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index + 1)}
                  className={cn(
                    "relative h-16 w-16 overflow-hidden rounded border-2",
                    selectedImage === index + 1 ? "border-[#d23368]" : "border-[#e6e6e6] hover:border-[#d23368]"
                  )}
                >
                  <Image src={img} alt={`Preview ${index + 2}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Details */}
          <div className="space-y-5">
            {/* SKU */}
            <p className="text-xs font-medium uppercase tracking-wide text-[#999999]">
              SKU: {design.id.toUpperCase()}
            </p>

            {/* Title */}
            <h1 className="text-2xl font-bold text-[#333333]">{design.title}</h1>

            {/* Category */}
            <span className="inline-block rounded border border-[#d9d9d9] bg-[#fafafa] px-3 py-1 text-xs font-medium text-[#666666]">
              {design.category}
            </span>

            {/* Designer */}
            {designer && (
              <Link href={`/designer/${designer.id}`} className="flex items-center gap-3 rounded border border-[#e6e6e6] p-3 hover:border-[#d23368]">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-[#f5f5f5]">
                  <Image src={designer.avatar} alt={designer.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#333333]">{designer.shopName}</p>
                  <p className="text-xs text-[#999999]">{designer.totalSales.toLocaleString()} sales</p>
                </div>
                <span className="text-xs text-[#d23368]">View Shop →</span>
              </Link>
            )}

            {/* Price */}
            <div className="rounded border border-[#e6e6e6] p-4">
              <div className="flex items-baseline gap-2">
                {isOnSale ? (
                  <>
                    <span className="text-2xl font-bold text-[#d23368]">${design.salePrice?.toFixed(2)}</span>
                    <span className="text-sm text-[#999999] line-through">${design.price.toFixed(2)}</span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-[#333333]">${design.price.toFixed(2)}</span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                className="flex flex-1 items-center justify-center gap-2 rounded bg-[#d23368] py-3 text-sm font-bold text-white hover:bg-[#a82852]"
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </button>
              <button
                onClick={() => toggleFavorite(design.id)}
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded border",
                  favorite ? "border-[#d23368] text-[#d23368]" : "border-[#d9d9d9] text-[#666666] hover:border-[#d23368]"
                )}
              >
                <Heart className={cn("h-4 w-4", favorite && "fill-current")} />
              </button>
              <button className="flex h-11 w-11 items-center justify-center rounded border border-[#d9d9d9] text-[#666666] hover:border-[#d23368]">
                <Share2 className="h-4 w-4" />
              </button>
            </div>

            {/* Features */}
            <div className="space-y-2">
              {[
                { icon: Download, text: "Instant Download" },
                { icon: Shield, text: "Secure Payment" },
                { icon: Truck, text: "Download Anytime" },
                { icon: Undo, text: "30-Day Returns" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-xs text-[#666666]">
                  <item.icon className="h-3.5 w-3.5 text-[#00a79d]" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Details */}
            <div className="space-y-3 border-t border-[#e6e6e6] pt-4">
              <h3 className="text-sm font-bold text-[#333333]">Product Details</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between rounded bg-[#fafafa] p-2">
                  <span className="text-[#999999]">Stitch Count</span>
                  <span className="font-medium text-[#333333]">{design.stitchCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between rounded bg-[#fafafa] p-2">
                  <span className="text-[#999999]">Size</span>
                  <span className="font-medium text-[#333333]">{design.width}" × {design.height}"</span>
                </div>
                <div className="flex justify-between rounded bg-[#fafafa] p-2">
                  <span className="text-[#999999]">Colors</span>
                  <span className="font-medium text-[#333333]">{design.colors}</span>
                </div>
                <div className="flex justify-between rounded bg-[#fafafa] p-2">
                  <span className="text-[#999999]">Difficulty</span>
                  <span className="font-medium text-[#333333]">{design.difficulty}</span>
                </div>
              </div>
            </div>

            {/* Formats */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-[#333333]">File Formats Included</h3>
              <div className="flex flex-wrap gap-2">
                {design.formats.map((format) => (
                  <span key={format} className="rounded border border-[#d9d9d9] bg-[#fafafa] px-2 py-1 text-xs font-medium text-[#666666]">
                    {format}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2 border-t border-[#e6e6e6] pt-4">
              <h3 className="text-sm font-bold text-[#333333]">Description</h3>
              <p className="text-xs leading-relaxed text-[#666666]">{design.description}</p>
            </div>
          </div>
        </div>

        {/* Related Designs */}
        {relatedDesigns.length > 0 && (
          <div className="mt-12 border-t border-[#d9d9d9] pt-8">
            <h2 className="mb-6 text-lg font-bold text-[#333333]">You May Also Like</h2>
            <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: "none" }}>
              {relatedDesigns.map((d) => {
                const isOnSale = d.salePrice && d.salePrice < d.price;
                return (
                  <Link key={d.id} href={`/design/${d.id}`} className="flex-shrink-0" style={{ width: "220px" }}>
                    <div className="overflow-hidden rounded bg-white">
                      <div className="relative aspect-square bg-[#f5f5f5]">
                        <Image src={d.thumbnail} alt={d.title} fill className="object-cover" sizes="220px" />
                        <button className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm">
                          <Heart className="h-3 w-3 text-[#d23368]" />
                        </button>
                      </div>
                      <div className="border border-t-0 border-[#e6e6e6] p-2">
                        <h3 className="mb-1 line-clamp-2 text-xs font-medium text-[#1a1a1a]">{d.title}</h3>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-bold text-[#d23368]">${isOnSale ? d.salePrice?.toFixed(2) : d.price.toFixed(2)}</span>
                          {isOnSale && <span className="text-xs text-[#999999] line-through">${d.price.toFixed(2)}</span>}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}