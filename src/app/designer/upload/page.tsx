"use client";

import * as React from "react";
import { Upload, X, Image as ImageIcon, File as FileIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/components/auth-provider";
import { db, storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "floral", name: "Floral & Botanical" },
  { id: "geometric", name: "Geometric Patterns" },
  { id: "monogram", name: "Monograms & Letters" },
  { id: "animals", name: "Animals & Pets" },
  { id: "holidays", name: "Holidays & Seasonal" },
  { id: "custom", name: "Custom & Special" },
];

export default function UploadDesignPage() {
  const { user, role } = useAuthStore();
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    price: "",
    salePrice: "",
    category: "floral",
    tags: "",
  });

  const [thumbnailFile, setThumbnailFile] = React.useState<File | null>(null);
  const [designFile, setDesignFile] = React.useState<File | null>(null);

  React.useEffect(() => {
    if (role && role !== "DESIGNER") {
      router.push("/");
    }
  }, [role, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!thumbnailFile || !designFile) {
      setError("Please upload both a thumbnail image and the embroidery file.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 1. Upload Thumbnail
      const thumbRef = ref(storage, `thumbnails/${user.uid}/${Date.now()}_${thumbnailFile.name}`);
      await uploadBytes(thumbRef, thumbnailFile);
      const thumbnailUrl = await getDownloadURL(thumbRef);

      // 2. Upload Design File
      const designRef = ref(storage, `designs/${user.uid}/${Date.now()}_${designFile.name}`);
      await uploadBytes(designRef, designFile);
      const designUrl = await getDownloadURL(designRef);

      // 3. Save to Firestore
      const tagsArray = formData.tags.split(",").map(tag => tag.trim()).filter(Boolean);
      
      await addDoc(collection(db, "designs"), {
        designerId: user.uid,
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price) || 0,
        salePrice: formData.salePrice ? parseFloat(formData.salePrice) : null,
        category: formData.category,
        tags: tagsArray,
        thumbnailUrl,
        designUrl,
        favorites: 0,
        sales: 0,
        createdAt: serverTimestamp(),
      });

      router.push("/designer/designs");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to upload design. Check your Firebase Storage rules.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1a1a2e]">Upload New Design</h1>
        <p className="mt-1 text-[#64748b]">Fill out the details and upload your embroidery files.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 rounded-xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-500 border border-red-100">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[#1a1a2e]">Basic Information</h2>
          <Input
            label="Design Title"
            placeholder="e.g., Summer Rose Bouquet"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#1a1a2e]">Description</label>
            <textarea
              required
              rows={4}
              placeholder="Describe your design, recommended thread colors, stitch count, etc."
              className="w-full rounded-md border border-[#e2e8f0] bg-white px-3 py-2 text-sm text-[#1a1a2e] focus:border-[#e94560] focus:outline-none focus:ring-1 focus:ring-[#e94560]"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Price ($)"
              type="number"
              step="0.01"
              min="0"
              placeholder="9.99"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
            <Input
              label="Sale Price ($) (Optional)"
              type="number"
              step="0.01"
              min="0"
              placeholder="7.99"
              value={formData.salePrice}
              onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#1a1a2e]">Category</label>
              <select
                required
                className="w-full rounded-md border border-[#e2e8f0] bg-white px-3 py-2 text-sm text-[#1a1a2e] focus:border-[#e94560] focus:outline-none focus:ring-1 focus:ring-[#e94560]"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <Input
              label="Tags (Comma separated)"
              placeholder="floral, rose, spring"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#e2e8f0]">
          <h2 className="text-lg font-semibold text-[#1a1a2e]">Files</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {/* Thumbnail Upload */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#1a1a2e]">Preview Image (JPG/PNG)</label>
              <div className="relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#e2e8f0] bg-[#f8f9fc] p-6 text-center hover:border-[#e94560] hover:bg-[#e94560]/5">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 cursor-pointer opacity-0"
                  onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                />
                {thumbnailFile ? (
                  <div className="flex flex-col items-center gap-2">
                    <ImageIcon className="h-8 w-8 text-[#e94560]" />
                    <span className="text-sm font-medium text-[#1a1a2e]">{thumbnailFile.name}</span>
                    <span className="text-xs text-[#64748b]">Click to change</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-[#94a3b8]" />
                    <span className="text-sm font-medium text-[#1a1a2e]">Upload Thumbnail</span>
                    <span className="text-xs text-[#64748b]">Square image recommended</span>
                  </div>
                )}
              </div>
            </div>

            {/* Design File Upload */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#1a1a2e]">Embroidery File (ZIP/DST/PES)</label>
              <div className="relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#e2e8f0] bg-[#f8f9fc] p-6 text-center hover:border-[#e94560] hover:bg-[#e94560]/5">
                <input
                  type="file"
                  accept=".zip,.dst,.pes,.jef,.exp"
                  className="absolute inset-0 cursor-pointer opacity-0"
                  onChange={(e) => setDesignFile(e.target.files?.[0] || null)}
                />
                {designFile ? (
                  <div className="flex flex-col items-center gap-2">
                    <FileIcon className="h-8 w-8 text-[#e94560]" />
                    <span className="text-sm font-medium text-[#1a1a2e]">{designFile.name}</span>
                    <span className="text-xs text-[#64748b]">Click to change</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-[#94a3b8]" />
                    <span className="text-sm font-medium text-[#1a1a2e]">Upload File</span>
                    <span className="text-xs text-[#64748b]">Max file size: 50MB</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-[#e2e8f0]">
          <Link href="/designer/dashboard">
            <Button type="button" variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" isLoading={isLoading}>
            Publish Design
          </Button>
        </div>
      </form>
    </div>
  );
}
