import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";
import type { Product, CartItem } from "../types";

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "CLEAR_CART" };

const initialState: CartState = {
  items: [],
};

// Pure Reducer Function
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === action.payload.id,
      );
      if (existingIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + 1,
        };
        return { ...state, items: updatedItems };
      }
      return {
        ...state,
        items: [...state.items, { product: action.payload, quantity: 1 }],
      };
    }
    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter(
          (item) => item.product.id !== action.payload.id,
        ),
      };
    }
    case "CLEAR_CART":
      return { items: [] };
    default:
      return state;
  }
}

// Split Contexts
const CartStateContext = createContext<CartState | undefined>(undefined);
const CartDispatchContext = createContext<
  React.Dispatch<CartAction> | undefined
>(undefined);

// Provider Component
export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

// Custom Hooks with Guard Statements
export function useCartState(): CartState {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error("useCartState must be used within a CartProvider");
  }
  return context;
}

export function useCartDispatch(): React.Dispatch<CartAction> {
  const context = useContext(CartDispatchContext);
  if (context === undefined) {
    throw new Error("useCartDispatch must be used within a CartProvider");
  }
  return context;
}
