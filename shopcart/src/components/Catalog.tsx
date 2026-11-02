import React, { useEffect, useState } from "react";
import { useSetAtom } from "jotai";
import { addToCartAtom } from "../store/jotaiStore";
import type { Product } from "../types";

export const Catalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: "1rem" }}>Loading products...</p>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  // ✅ Subscribes ONLY to the setter action (never re-renders on cart changes)
  const addToCart = useSetAtom(addToCartAtom);

  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "1rem",
        background: "#fff",
      }}
    >
      <h3>{product.name}</h3>
      <p style={{ fontWeight: "bold", color: "#2563eb" }}>
        ${product.price.toFixed(2)}
      </p>
      <button
        onClick={() => addToCart(product)}
        style={{
          background: "#10b981",
          color: "#fff",
          border: "none",
          padding: "8px 12px",
          borderRadius: "4px",
          cursor: "pointer",
          width: "100%",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};
