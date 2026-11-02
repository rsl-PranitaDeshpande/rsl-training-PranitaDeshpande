import { atom } from "jotai";
import type { CartItem, Product } from "../types";

// 1. Primitive Atom - Base Cart State
export const cartAtom = atom<CartItem[]>([]);

// 2. Derived Atoms - Computed values without state duplication
export const totalItemsAtom = atom<number>((get) => {
  const items = get(cartAtom);
  return items.reduce((sum, item) => sum + item.quantity, 0);
});

export const totalPriceAtom = atom<number>((get) => {
  const items = get(cartAtom);
  return items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
});

// 3. Action Atoms (Write-only)
export const addToCartAtom = atom(null, (get, set, product: Product) => {
  const currentItems = get(cartAtom);
  const existingItem = currentItems.find(
    (item) => item.product.id === product.id,
  );

  if (existingItem) {
    set(
      cartAtom,
      currentItems.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  } else {
    set(cartAtom, [...currentItems, { product, quantity: 1 }]);
  }
});

export const removeFromCartAtom = atom(null, (get, set, productId: string) => {
  const currentItems = get(cartAtom);
  set(
    cartAtom,
    currentItems.filter((item) => item.product.id !== productId),
  );
});

export const clearCartAtom = atom(null, (_get, set) => {
  set(cartAtom, []);
});
