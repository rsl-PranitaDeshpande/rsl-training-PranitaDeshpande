import React from "react";
import { useAtomValue } from "jotai";
import { totalItemsAtom } from "../store/jotaiStore";

interface HeaderProps {
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCart }) => {
  return (
    <header className="header">
      <Toolbar onOpenCart={onOpenCart} />
    </header>
  );
};

const Toolbar: React.FC<{ onOpenCart: () => void }> = ({ onOpenCart }) => {
  return (
    <div
      className="toolbar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
        background: "#1e293b",
        color: "#fff",
      }}
    >
      <h2 style={{ color: "#fff" }}>ShopCart</h2>
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
  );
};

const CartBadge: React.FC = () => {
  // Reads total count directly from derived Jotai atom without recalculating in render
  const totalCount = useAtomValue(totalItemsAtom);

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
