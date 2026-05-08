import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Design } from "@/data/designs";

export interface CartItem {
  design: Design;
  quantity: number;
  addedAt: Date;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (design: Design) => void;
  removeItem: (designId: string) => void;
  updateQuantity: (designId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (design) => {
        const items = get().items;
        const existing = items.find((item) => item.design.id === design.id);

        if (existing) {
          set({
            items: items.map((item) =>
              item.design.id === design.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            items: [...items, { design, quantity: 1, addedAt: new Date() }],
          });
        }
      },

      removeItem: (designId) => {
        set({
          items: get().items.filter((item) => item.design.id !== designId),
        });
      },

      updateQuantity: (designId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(designId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.design.id === designId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set({ isOpen: !get().isOpen });
      },

      setCartOpen: (open) => {
        set({ isOpen: open });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.design.salePrice || item.design.price;
          return total + price * item.quantity;
        }, 0);
      },
    }),
    {
      name: "embro-designer-cart",
    }
  )
);

interface FavoritesStore {
  ids: string[];
  addFavorite: (designId: string) => void;
  removeFavorite: (designId: string) => void;
  toggleFavorite: (designId: string) => void;
  isFavorite: (designId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      ids: [],

      addFavorite: (designId) => {
        if (!get().ids.includes(designId)) {
          set({ ids: [...get().ids, designId] });
        }
      },

      removeFavorite: (designId) => {
        set({ ids: get().ids.filter((id) => id !== designId) });
      },

      toggleFavorite: (designId) => {
        if (get().ids.includes(designId)) {
          get().removeFavorite(designId);
        } else {
          get().addFavorite(designId);
        }
      },

      isFavorite: (designId) => {
        return get().ids.includes(designId);
      },
    }),
    {
      name: "embro-designer-favorites",
    }
  )
);

interface ReviewsStore {
  purchasedDesigns: string[];
  helpfulReviews: string[];
  markAsPurchased: (designId: string) => void;
  hasPurchased: (designId: string) => boolean;
  markHelpful: (reviewId: string) => void;
  isHelpful: (reviewId: string) => boolean;
}

export const useReviewsStore = create<ReviewsStore>()(
  persist(
    (set, get) => ({
      purchasedDesigns: [],
      helpfulReviews: [],

      markAsPurchased: (designId) => {
        if (!get().purchasedDesigns.includes(designId)) {
          set({ purchasedDesigns: [...get().purchasedDesigns, designId] });
        }
      },

      hasPurchased: (designId) => {
        return get().purchasedDesigns.includes(designId);
      },

      markHelpful: (reviewId) => {
        if (!get().helpfulReviews.includes(reviewId)) {
          set({ helpfulReviews: [...get().helpfulReviews, reviewId] });
        }
      },

      isHelpful: (reviewId) => {
        return get().helpfulReviews.includes(reviewId);
      },
    }),
    {
      name: "embro-designer-reviews",
    }
  )
);

interface UIStore {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Design[] | null;
  setSearchResults: (results: Design[] | null) => void;
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}

export const useUIStore = create<UIStore>()((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  searchResults: null,
  setSearchResults: (results) => set({ searchResults: results }),
  isSearchOpen: false,
  setSearchOpen: (open) => set({ isSearchOpen: open }),
}));
