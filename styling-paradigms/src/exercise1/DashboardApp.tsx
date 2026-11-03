import React, { useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { ProductGrid } from "./components/ProductGrid";
import { mockProducts } from "./data/products";
import type { Product } from "./types";

export const DashboardApp: React.FC = () => {
  const [products] = useState<Product[]>(mockProducts);

  const handleAddProduct = () => {
    alert("Add Product Modal Triggered");
  };

  const handleSelectProduct = (product: Product) => {
    alert(`Managing Product: ${product.name}`);
  };

  return (
    <div className="min-h-screen bg-surface-main flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onAddProduct={handleAddProduct} />
        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <ProductGrid
            products={products}
            onSelectProduct={handleSelectProduct}
          />
        </main>
      </div>
    </div>
  );
};
