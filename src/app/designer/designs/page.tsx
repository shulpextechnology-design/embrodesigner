"use client";

import * as React from "react";
import { useAuthStore } from "@/components/auth-provider";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Link from "next/link";
import { Plus, Edit, Trash2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DesignerDesignsPage() {
  const { user } = useAuthStore();
  const [designs, setDesigns] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchDesigns() {
      if (!user) return;
      try {
        const q = query(
          collection(db, "designs"),
          where("designerId", "==", user.uid)
        );
        const snapshot = await getDocs(q);
        const fetchedDesigns = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Sort client-side to avoid needing a composite index
        fetchedDesigns.sort((a: any, b: any) => {
          const dateA = a.createdAt?.toMillis() || 0;
          const dateB = b.createdAt?.toMillis() || 0;
          return dateB - dateA;
        });

        setDesigns(fetchedDesigns);
      } catch (error) {
        console.error("Error fetching designs:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDesigns();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-[#64748b]">
        Loading your designs...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a2e]">My Designs</h1>
          <p className="mt-1 text-[#64748b]">Manage and track the performance of your embroidery files.</p>
        </div>
        <Link href="/designer/upload">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Design
          </Button>
        </Link>
      </div>

      {designs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#e2e8f0] bg-white py-24 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f8f9fc]">
            <Package className="h-8 w-8 text-[#94a3b8]" />
          </div>
          <h3 className="text-lg font-bold text-[#1a1a2e]">No designs yet</h3>
          <p className="mt-1 max-w-sm text-[#64748b]">
            You haven&apos;t uploaded any embroidery designs yet. Click the button above to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {designs.map((design) => (
            <div key={design.id} className="group overflow-hidden rounded-xl border border-[#e2e8f0] bg-white shadow-sm transition-all hover:border-[#e94560] hover:shadow-md">
              <div className="relative aspect-square w-full overflow-hidden bg-[#f8f9fc]">
                {design.thumbnailUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={design.thumbnailUrl}
                    alt={design.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Package className="h-12 w-12 text-[#cbd5e1]" />
                  </div>
                )}
                
                {/* Overlay actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 bg-[#1a1a2e]/60 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1a1a2e] transition-transform hover:scale-110" title="Edit Design">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#e94560] transition-transform hover:scale-110" title="Delete Design">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="line-clamp-1 font-bold text-[#1a1a2e]">{design.title}</h3>
                <div className="mt-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-[#e94560]">${parseFloat(design.price).toFixed(2)}</span>
                  <span className="text-[#64748b]">{design.sales || 0} sales</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
