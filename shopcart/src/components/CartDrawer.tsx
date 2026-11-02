import React from "react";
import { useCheckoutActor } from "../context/CheckoutContext";
import { useSelector } from "@xstate/react";
import { CheckoutButton } from "./CheckoutButton";
import { useCartStore, selectTotalPrice } from "../store/useCartStore";

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
        <CartErrorBanner />
        <CartItemsList />
      </div>

      <div style={{ padding: "1rem", borderTop: "1px solid #e2e8f0" }}>
        <CheckoutButton />
      </div>
    </div>
  );
};

// Internal leaf component reading items directly from Zustand
const CartItemsList: React.FC = () => {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const totalPrice = useCartStore(selectTotalPrice);

  if (items.length === 0) {
    return <p style={{ color: "#64748b" }}>Your cart is empty.</p>;
  }

  return (
    <div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((item) => (
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
            <button
              onClick={() => removeItem(item.product.id)}
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
          </li>
        ))}
      </ul>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold",
          marginTop: "1rem",
        }}
      >
        <span>Total:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};

const CartErrorBanner: React.FC = () => {
  const actorRef = useCheckoutActor();
  const error = useSelector(
    actorRef,
    (snapshot) =>
      (snapshot as { context: { error: string | null } }).context.error,
  );

  if (!error) return null;

  return (
    <p
      role="alert"
      style={{
        color: "#b91c1c",
        background: "#fef2f2",
        border: "1px solid #fecaca",
        borderRadius: "4px",
        padding: "0.75rem",
        margin: "0 0 1rem",
      }}
    >
      {error}
    </p>
  );
};
