"use client";

import * as React from "react";
import { useAuthStore } from "@/components/auth-provider";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import Link from "next/link";
import { Package, Download, ExternalLink, Calendar, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function BuyerDashboardPage() {
  const { user, loading } = useAuthStore();
  const [orders, setOrders] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchOrders() {
      if (!user) {
        setIsLoading(false);
        return;
      }
      
      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid)
        );
        const snapshot = await getDocs(q);
        const fetchedOrders = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Sort locally to avoid needing composite indexes for simple MVP
        fetchedOrders.sort((a: any, b: any) => {
          const timeA = a.createdAt?.seconds || 0;
          const timeB = b.createdAt?.seconds || 0;
          return timeB - timeA;
        });

        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (!loading) {
      fetchOrders();
    }
  }, [user, loading]);

  if (loading || isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#f8f9fc]">
        <p className="text-[#64748b]">Loading your dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[#f8f9fc]">
        <p className="text-[#64748b] mb-4">Please log in to view your dashboard.</p>
        <Link href="/auth/login">
          <Button>Log In</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc] py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#1a1a2e]">My Purchases</h1>
            <p className="mt-2 text-[#64748b]">View your order history and re-download your embroidery files.</p>
          </div>
          <Link href="/browse">
            <Button variant="outline" className="gap-2">
              <Package className="h-4 w-4" />
              Keep Shopping
            </Button>
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#e2e8f0] bg-white py-24 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f8f9fc]">
              <Receipt className="h-8 w-8 text-[#94a3b8]" />
            </div>
            <h3 className="text-lg font-bold text-[#1a1a2e]">No orders yet</h3>
            <p className="mt-1 text-[#64748b]">
              You haven't made any purchases yet. Your downloaded designs will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="overflow-hidden rounded-xl border border-[#e2e8f0] bg-white shadow-sm">
                
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#e2e8f0] bg-[#f8f9fc] px-6 py-4">
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm">
                    <div>
                      <p className="font-medium text-[#1a1a2e]">Order Date</p>
                      <p className="text-[#64748b]">
                        {order.createdAt ? new Date(order.createdAt.seconds * 1000).toLocaleDateString() : "Recently"}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-[#1a1a2e]">Total</p>
                      <p className="text-[#64748b]">${parseFloat(order.total || 0).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#1a1a2e]">Order ID</p>
                      <p className="text-[#64748b] font-mono text-xs mt-0.5">{order.id}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="px-6 py-4 space-y-6">
                  {order.items?.map((item: any, index: number) => (
                    <div key={index} className="flex flex-col sm:flex-row gap-6">
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-[#e2e8f0] bg-[#f8f9fc]">
                        <Image 
                          src={item.thumbnailUrl || "https://placehold.co/400x400?text=No+Image"} 
                          alt={item.title} 
                          fill 
                          className="object-cover" 
                        />
                      </div>
                      
                      <div className="flex flex-1 flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h4 className="font-bold text-[#1a1a2e] text-lg">{item.title}</h4>
                          <p className="mt-1 text-sm text-[#64748b]">Formats included: ZIP, PES, DST, EXP</p>
                          <Link href={`/design/${item.designId}`} className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline">
                            View original listing <ExternalLink className="h-3 w-3" />
                          </Link>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {item.designUrl ? (
                            <a href={item.designUrl} download target="_blank" rel="noopener noreferrer">
                              <Button className="gap-2 w-full sm:w-auto bg-[#10b981] hover:bg-[#059669]">
                                <Download className="h-4 w-4" /> Download Files
                              </Button>
                            </a>
                          ) : (
                            <Button className="gap-2 w-full sm:w-auto bg-[#10b981] hover:bg-[#059669]">
                                <Download className="h-4 w-4" /> Download Files
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
