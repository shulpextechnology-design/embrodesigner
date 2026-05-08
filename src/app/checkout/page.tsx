"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { CreditCard, Lock, ArrowLeft, Check, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/store";
import { useAuthStore } from "@/components/auth-provider";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment } from "firebase/firestore";
export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isComplete, setIsComplete] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    name: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.0;
  const total = subtotal + tax;

  const { user } = useAuthStore();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // 1. Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // 2. Record the order in Firestore
      const orderData = {
        userId: user?.uid || "guest",
        customerEmail: formData.email,
        customerName: formData.name,
        items: items.map(item => ({
          designId: item.design.id,
          title: item.design.title,
          price: item.design.salePrice || item.design.price,
          designUrl: item.design.designUrl || null,
          thumbnailUrl: item.design.thumbnailUrl || item.design.thumbnail || null,
        })),
        subtotal,
        tax,
        total,
        status: "completed",
        createdAt: serverTimestamp()
      };
      
      const orderRef = await addDoc(collection(db, "orders"), orderData);

      // 3. Increment sales counts for the designs (if they are Firestore designs)
      for (const item of items) {
        try {
          if (item.design.id.length > 10) { // Simple check for Firestore UUID vs static 'd1'
            const designRef = doc(db, "designs", item.design.id);
            await updateDoc(designRef, {
              sales: increment(1)
            });
          }
        } catch (e) {
          console.log("Static design, skipping sales increment");
        }
      }

      setIsComplete(true);
      clearCart();
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isComplete) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#10b981]/10">
          <Check className="h-10 w-10 text-[#10b981]" />
        </div>
        <h1 className="text-3xl font-bold text-[#1a1a2e]">Thank You!</h1>
        <p className="mt-2 text-center text-[#64748b]">
          Your purchase was successful. Check your email for download links.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/browse"
            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#e2e8f0] px-6 py-2.5 text-sm font-medium text-[#1a1a2e] transition-colors hover:border-[#e94560] hover:text-[#e94560]"
          >
            Continue Shopping
          </Link>
          <Link
            href="/orders"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#e94560] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#ff6b6b]"
          >
            View Orders
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#f8f9fc]">
          <ShoppingBag className="h-10 w-10 text-[#94a3b8]" />
        </div>
        <h1 className="text-2xl font-bold text-[#1a1a2e]">Your cart is empty</h1>
        <p className="mt-2 text-[#64748b]">Add some designs to your cart to checkout.</p>
        <Link
          href="/browse"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-[#e94560] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#ff6b6b]"
        >
          Browse Designs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <div className="border-b border-[#e2e8f0] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              href="/browse"
              className="flex items-center gap-2 text-sm text-[#64748b] hover:text-[#1a1a2e]"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-[#10b981]" />
              <span className="text-sm text-[#64748b]">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h1 className="mb-8 text-2xl font-bold text-[#1a1a2e]">Checkout</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="mb-4 text-lg font-semibold text-[#1a1a2e]">Contact Information</h2>
                <div className="space-y-4">
                  <Input
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <Input
                    label="Full Name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[#1a1a2e]">
                  <CreditCard className="h-5 w-5" />
                  Payment Details
                </h2>
                <div className="space-y-4 rounded-xl border border-[#e2e8f0] bg-white p-6">
                  <div className="mb-4 flex items-center justify-between rounded-lg bg-[#f8f9fc] p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-12 rounded bg-[#1a1a2e]" />
                      <span className="text-sm text-[#64748b]">Secure payment via Stripe</span>
                    </div>
                    <Lock className="h-4 w-4 text-[#10b981]" />
                  </div>

                  <Input
                    label="Card Number"
                    placeholder="4242 4242 4242 4242"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                      required
                    />
                    <Input
                      label="CVC"
                      placeholder="123"
                      value={formData.cvc}
                      onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                isLoading={isProcessing}
              >
                {isProcessing ? "Processing..." : `Pay ${formatPrice(total)}`}
              </Button>

              <p className="text-center text-xs text-[#94a3b8]">
                By completing this purchase, you agree to our Terms of Service and Privacy Policy.
                Digital downloads are available immediately after payment.
              </p>
            </form>
          </div>

          <div>
            <div className="sticky top-24 rounded-xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-lg font-semibold text-[#1a1a2e]">Order Summary</h2>

              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.design.id} className="flex gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-[#f8f9fc]">
                      <Image
                        src={item.design.thumbnail || item.design.thumbnailUrl || "https://placehold.co/100x100"}
                        alt={item.design.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="line-clamp-2 text-sm font-medium text-[#1a1a2e]">
                        {item.design.title}
                      </p>
                      <p className="mt-1 text-xs text-[#94a3b8]">
                        {item.design.formats?.slice(0, 2).join(", ") || "ZIP"}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[#e94560]">
                        {formatPrice(item.design.salePrice || item.design.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="my-6 border-t border-[#e2e8f0]" />

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#64748b]">Subtotal</span>
                  <span className="text-[#1a1a2e]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#64748b]">Tax</span>
                  <span className="text-[#1a1a2e]">{formatPrice(tax)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-[#e2e8f0] pt-3">
                  <span className="font-semibold text-[#1a1a2e]">Total</span>
                  <span className="text-xl font-bold text-[#e94560]">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3 rounded-lg bg-[#f8f9fc] p-4">
                {[
                  "Instant digital download",
                  "Lifetime access to files",
                  "Multiple file formats included",
                  "30-day money-back guarantee",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-[#64748b]">
                    <Check className="h-4 w-4 text-[#10b981]" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
