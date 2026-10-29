import React from "react";
import { useCartStore, selectTotalPrice } from "../store/useCartStore";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const checkoutStatus = useCartStore((state) => state.checkoutStatus);
  const checkoutError = useCartStore((state) => state.checkoutError);
  const lastOrderResult = useCartStore((state) => state.lastOrderResult);
  const checkout = useCartStore((state) => state.checkout);
  const resetCheckout = useCartStore((state) => state.resetCheckout);

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

        {checkoutStatus === "success" ? (
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <h3 style={{ color: "#059669" }}>🎉 Checkout Successful!</h3>
            <p>
              Order ID: <strong>{lastOrderResult?.id}</strong>
            </p>
            <p>
              Total Paid: <strong>${lastOrderResult?.total.toFixed(2)}</strong>
            </p>
            <button
              style={{
                background: "#2563eb",
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: "1rem",
              }}
              onClick={() => {
                resetCheckout();
                onClose();
              }}
            >
              Back to Store
            </button>
          </div>
        ) : (
          <>
            <CartItemsList />

            {checkoutError && (
              <p
                style={{
                  color: "#ef4444",
                  marginTop: "1rem",
                  fontSize: "0.9rem",
                }}
              >
                {checkoutError}
              </p>
            )}

            <div style={{ marginTop: "2rem" }}>
              <button
                disabled={checkoutStatus === "submitting"}
                style={{
                  background:
                    checkoutStatus === "submitting" ? "#93c5fd" : "#2563eb",
                  color: "#fff",
                  border: "none",
                  padding: "12px",
                  borderRadius: "4px",
                  cursor:
                    checkoutStatus === "submitting" ? "not-allowed" : "pointer",
                  width: "100%",
                }}
                onClick={checkout}
              >
                {checkoutStatus === "submitting"
                  ? "Processing Checkout..."
                  : "Proceed to Checkout"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartItemsList: React.FC = () => {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const totalPrice = useCartStore(selectTotalPrice); // Derived selector

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
              onClick={() => removeItem(item.product.id)}
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
        <span>${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};
