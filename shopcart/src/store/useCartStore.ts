// src/store/useCartStore.ts
import { create } from "zustand";
import type { Product, CartItem, CheckoutResult } from "../types";

export type CheckoutStatus = "idle" | "submitting" | "success" | "error";

interface CartStoreState {
  items: CartItem[];
  checkoutStatus: CheckoutStatus;
  checkoutError: string | null;
  lastOrderResult: CheckoutResult | null;

  // Actions
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  checkout: () => Promise<void>;
  resetCheckout: () => void;
}

export const useCartStore = create<CartStoreState>((set, get) => ({
  items: [],
  checkoutStatus: "idle",
  checkoutError: null,
  lastOrderResult: null,

  addItem: (product) =>
    set((state) => {
      const existingIndex = state.items.findIndex(
        (i) => i.product.id === product.id,
      );
      if (existingIndex > -1) {
        const updated = [...state.items];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return { items: updated };
      }
      return { items: [...state.items, { product, quantity: 1 }] };
    }),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.product.id !== productId),
    })),

  clearCart: () => set({ items: [] }),

  // Asynchronous Checkout Action reading state directly via get()
  checkout: async () => {
    const { items } = get();
    if (items.length === 0) return;

    set({ checkoutStatus: "submitting", checkoutError: null });

    const total = selectTotalPrice(get());

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          total,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Order failed with status ${response.status}`);
      }

      const result: CheckoutResult = await response.json();

      set({
        checkoutStatus: "success",
        lastOrderResult: result,
        items: [], // Clear cart on success
      });
    } catch (err: any) {
      set({
        checkoutStatus: "error",
        checkoutError:
          err.message || "An unexpected error occurred during checkout",
      });
    }
  },

  resetCheckout: () => set({ checkoutStatus: "idle", checkoutError: null }),
}));

// Derived Selectors (Pure functions on store state)
export const selectTotalPrice = (state: CartStoreState): number =>
  state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

export const selectTotalCount = (state: CartStoreState): number =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);
