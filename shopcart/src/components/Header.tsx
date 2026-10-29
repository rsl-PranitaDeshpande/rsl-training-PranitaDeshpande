import React from "react";
import { useCartStore, selectTotalCount } from "../store/useCartStore";

interface HeaderProps {
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCart }) => {
  return (
    <header className="header">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
          background: "#1e293b",
          color: "#fff",
        }}
      >
        <h2>ShopCart</h2>
        <button
          onClick={onOpenCart}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          🛒 Cart <CartBadge />
        </button>
      </div>
    </header>
  );
};

const CartBadge: React.FC = () => {
  // Subscribes only to the total count computed state
  const totalCount = useCartStore(selectTotalCount);

  if (totalCount === 0) return null;

  return (
    <span
      style={{
        background: "#ef4444",
        color: "#fff",
        borderRadius: "50%",
        padding: "2px 8px",
        marginLeft: "6px",
        fontSize: "0.8rem",
      }}
    >
      {totalCount}
    </span>
  );
};
