import React from "react";
import { useCartState, useCartDispatch } from "../context/CartContext";

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
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "flex-end",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "380px",
          background: "#fff",
          height: "100%",
          padding: "1.5rem",
          boxSizing: "border-box",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #eee",
            paddingBottom: "1rem",
          }}
        >
          <h2>Your Cart</h2>
          <button
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <CartItemsList />

        <div style={{ marginTop: "2rem" }}>
          <button
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              padding: "12px",
              borderRadius: "4px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

const CartItemsList: React.FC = () => {
  const { items } = useCartState();
  const dispatch = useCartDispatch();

  const grandTotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  if (items.length === 0) {
    return <p style={{ marginTop: "1.5rem" }}>Your cart is empty.</p>;
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item) => (
          <li
            key={item.product.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
              borderBottom: "1px solid #f0f0f0",
              paddingBottom: "0.5rem",
            }}
          >
            <div>
              <strong>{item.product.name}</strong>
              <div style={{ fontSize: "0.85rem", color: "#666" }}>
                ${item.product.price} × {item.quantity}
              </div>
            </div>
            <button
              style={{
                background: "#ef4444",
                color: "#fff",
                border: "none",
                padding: "4px 8px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() =>
                dispatch({
                  type: "REMOVE_ITEM",
                  payload: { id: item.product.id },
                })
              }
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
          fontSize: "1.1rem",
          marginTop: "1rem",
        }}
      >
        <span>Total:</span>
        <span>${grandTotal.toFixed(2)}</span>
      </div>
    </div>
  );
};
