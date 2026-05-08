"use client";

import * as React from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function AdminDesignsPage() {
  const [designs, setDesigns] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchDesigns = async () => {
    setIsLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "designs"));
      const fetchedDesigns = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDesigns(fetchedDesigns);
    } catch (error) {
      console.error("Error fetching designs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchDesigns();
  }, []);

  const handleDelete = async (designId: string) => {
    if (!window.confirm("Are you sure you want to delete this design?")) return;
    try {
      await deleteDoc(doc(db, "designs", designId));
      setDesigns(designs.filter(d => d.id !== designId));
    } catch (error) {
      console.error("Error deleting design:", error);
    }
  };

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center">Loading designs...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1a1a2e]">Manage Designs</h1>
        <p className="mt-1 text-[#64748b]">View, moderate, and manage all uploaded designs.</p>
      </div>

      <div className="rounded-xl border border-[#e2e8f0] bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f8f9fc] text-[#64748b]">
              <tr>
                <th className="px-6 py-4 font-medium">Design</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Sales</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {designs.map((d) => (
                <tr key={d.id} className="hover:bg-[#f8f9fc]">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-[#e2e8f0] overflow-hidden flex-shrink-0">
                        {d.thumbnailUrl && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={d.thumbnailUrl} alt={d.title} className="h-full w-full object-cover" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-[#1a1a2e]">{d.title}</div>
                        <div className="text-xs text-[#64748b]">ID: {d.designerId.slice(0, 8)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#64748b] capitalize">{d.category}</td>
                  <td className="px-6 py-4 text-[#1a1a2e] font-medium">${parseFloat(d.price).toFixed(2)}</td>
                  <td className="px-6 py-4 text-[#64748b]">{d.sales || 0}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/design/${d.id}`} className="text-blue-500 hover:text-blue-700 p-2" title="View Design">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(d.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                        title="Delete Design"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
