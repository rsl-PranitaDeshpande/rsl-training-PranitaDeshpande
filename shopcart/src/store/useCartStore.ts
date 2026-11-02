import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem, Product } from "../types";

type Order = Record<string, unknown>;

export interface CartStore {
  items: CartItem[];
  checkoutStatus: "idle" | "submitting" | "success" | "error";
  checkoutError: string | null;
  lastOrderResult: Order | null;

  // Actions
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  checkout: () => Promise<void>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      checkoutStatus: "idle",
      checkoutError: null,
      lastOrderResult: null,

      addItem: (product: Product) => {
        const { items } = get();
        const existingItem = items.find(
          (item) => item.product.id === product.id,
        );

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
        } else {
          set({
            items: [...items, { product, quantity: 1 }],
          });
        }
      },

      removeItem: (productId: string) => {
        const { items } = get();
        set({
          items: items.filter((item) => item.product.id !== productId),
        });
      },

      clearCart: () => set({ items: [] }),

      checkout: async () => {
        const { items } = get();
        if (items.length === 0) return;

        set({ checkoutStatus: "submitting", checkoutError: null });

        try {
          const response = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              items,
              total: selectTotalPrice(get()),
              createdAt: new Date().toISOString(),
            }),
          });

          if (!response.ok) throw new Error("Order submission failed");

          const orderData: Order = await response.json();

          set({
            items: [],
            checkoutStatus: "success",
            lastOrderResult: orderData,
          });
        } catch (error: any) {
          set({
            checkoutStatus: "error",
            checkoutError: error.message || "Something went wrong",
          });
        }
      },
    }),
    {
      name: "shopcart-storage", // Key used in localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

// Derived Selectors (Kept outside store definition for optimal re-render isolation)
export const selectTotalCount = (state: CartStore) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectTotalPrice = (state: CartStore) =>
  state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
