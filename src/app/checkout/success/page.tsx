"use client";

import * as React from "react";
import Link from "next/link";
import { Check, Download, Package } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchOrder() {
      if (!orderId) {
        setIsLoading(false);
        return;
      }
      try {
        const docRef = doc(db, "orders", orderId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setOrder({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchOrder();
  }, [orderId]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-12">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#10b981]/10">
        <Check className="h-12 w-12 text-[#10b981]" />
      </div>
      <h1 className="text-3xl font-bold text-[#1a1a2e]">Payment Successful!</h1>
      <p className="mt-2 max-w-md text-center text-[#64748b]">
        Your purchase was successful and your payment has been processed. You can now download your embroidery files.
      </p>

      {orderId && (
        <div className="mt-4 text-sm text-[#94a3b8]">
          Order ID: <span className="font-medium text-[#1a1a2e]">{orderId}</span>
        </div>
      )}

      {isLoading ? (
        <div className="mt-8">Loading order details...</div>
      ) : order ? (
        <div className="mt-8 w-full max-w-lg rounded-xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#1a1a2e] mb-4">Your Downloads</h2>
          <div className="space-y-4">
            {order.items?.map((item: any) => (
              <div key={item.designId} className="flex items-center justify-between rounded-lg bg-[#f8f9fc] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-white shadow-sm">
                    <Package className="h-5 w-5 text-[#64748b]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1a1a2e]">{item.title}</p>
                    <p className="text-xs text-[#64748b]">ZIP File (PES, DST, EXP)</p>
                  </div>
                </div>
                {/* In a real app, this would be a secure download signed URL. */}
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" /> Download
                </Button>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-8 flex gap-4">
        <Link href="/browse">
          <Button variant="outline" className="px-6 py-2.5">
            Continue Shopping
          </Button>
        </Link>
        <Link href="/buyer/dashboard">
          <Button className="px-6 py-2.5">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
