"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/store";

export function CartSidebar() {
  const { items, isOpen, setCartOpen, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
      <div className="fixed inset-y-0 right-0 z-[80] w-full max-w-[380px] bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8e4dd]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1a1a1a] rounded-xl flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-[#1a1a1a]">Your Cart</h2>
              <p className="text-sm text-[#6b6b6b]">{items.length} {items.length === 1 ? "item" : "items"}</p>
            </div>
          </div>
          <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-[#faf9f7] rounded-lg transition-colors">
            <X className="h-5 w-5 text-[#6b6b6b]" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-[#faf9f7] rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="h-8 w-8 text-[#6b6b6b]" />
              </div>
              <h3 className="font-bold text-[#1a1a1a] mb-2">Your cart is empty</h3>
              <p className="text-sm text-[#6b6b6b] mb-6">Add designs to get started</p>
              <button
                onClick={() => setCartOpen(false)}
                className="px-6 py-3 bg-[#1a1a1a] text-white text-sm font-medium rounded-full"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.design.id} className="flex gap-4 p-4 bg-[#faf9f7] rounded-xl">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white flex-shrink-0">
                    <Image src={item.design.thumbnail} alt={item.design.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/design/${item.design.id}`} onClick={() => setCartOpen(false)} className="font-medium text-[#1a1a1a] text-sm line-clamp-2 hover:text-[#c2410c]">
                      {item.design.title}
                    </Link>
                    <p className="text-xs text-[#6b6b6b] mt-1">{item.design.category}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.design.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#e8e4dd] hover:border-[#c2410c] transition-colors">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.design.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#e8e4dd] hover:border-[#c2410c] transition-colors">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-bold text-[#c2410c]">${((item.design.salePrice || item.design.price) * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.design.id)} className="p-1 text-[#6b6b6b] hover:text-red-500 transition-colors self-start">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#e8e4dd]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#6b6b6b]">Subtotal</span>
              <span className="text-xl font-bold text-[#1a1a1a]">${getTotalPrice().toFixed(2)}</span>
            </div>
            <button className="w-full py-4 bg-[#c2410c] text-white font-bold rounded-full hover:bg-[#a33a0f] transition-colors">
              Checkout
            </button>
            <button onClick={() => setCartOpen(false)} className="w-full text-center text-sm text-[#6b6b6b] mt-3 hover:text-[#1a1a1a]">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}