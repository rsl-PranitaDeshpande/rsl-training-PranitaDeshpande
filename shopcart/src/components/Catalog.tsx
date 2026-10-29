// src/components/Catalog.tsx
import React, { useEffect, useState } from "react";
import type { Product } from "../types";
import { useCartStore } from "../store/useCartStore";

export const Catalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: "2rem" }}>Loading products...</p>;
  if (error)
    return <p style={{ padding: "2rem", color: "red" }}>Error: {error}</p>;

  return (
    <main style={{ padding: "2rem" }}>
      <h2>Catalog (Zustand Powered)</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  // CRITICAL: Subscribes strictly to the addItem function pointer.
  // This component will NEVER re-render when cart items update!
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        background: "#fff",
      }}
    >
      <h3>{product.name}</h3>
      <p style={{ fontWeight: "bold" }}>${product.price.toFixed(2)}</p>
      <button
        style={{
          background: "#059669",
          color: "#fff",
          border: "none",
          padding: "8px 12px",
          borderRadius: "4px",
          cursor: "pointer",
          width: "100%",
        }}
        onClick={() => addItem(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};
