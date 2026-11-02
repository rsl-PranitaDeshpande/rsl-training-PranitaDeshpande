import React from "react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  cartAtom,
  totalPriceAtom,
  removeFromCartAtom,
  clearCartAtom,
} from "../store/jotaiStore";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: "360px",
        background: "#fff",
        boxShadow: "-2px 0 8px rgba(0,0,0,0.15)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "1rem",
          background: "#1e293b",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0, color: "#fff" }}>Your Cart</h3>
        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        >
          ✕
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
        <CartItemsList />
      </div>
    </div>
  );
};

const CartItemsList: React.FC = () => {
  // ✅ Read state directly from Jotai atoms
  const cart = useAtomValue(cartAtom);
  const totalPrice = useAtomValue(totalPriceAtom);

  // ✅ Get action triggers via useSetAtom
  const removeFromCart = useSetAtom(removeFromCartAtom);
  const clearCart = useSetAtom(clearCartAtom);

  if (cart.length === 0) {
    return <p style={{ color: "#64748b" }}>Your cart is empty.</p>;
  }

  return (
    <div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {cart.map((item) => (
          <li
            key={item.product.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
              paddingBottom: "0.5rem",
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            <div>
              <p style={{ margin: 0, fontWeight: 600 }}>{item.product.name}</p>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>
                Qty: {item.quantity} × ${item.product.price.toFixed(2)}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: "0 0 4px 0", fontWeight: 600 }}>
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(item.product.id)}
                style={{
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                }}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div
        style={{
          marginTop: "1rem",
          paddingTop: "1rem",
          borderTop: "2px solid #e2e8f0",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "1.1rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>

        <button
          onClick={() => clearCart()}
          style={{
            width: "100%",
            background: "#94a3b8",
            color: "#fff",
            border: "none",
            padding: "8px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};
