import React from "react";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
}) => {
  const statusStyles = {
    "In Stock": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Low Stock": "bg-amber-50 text-amber-700 border-amber-200",
    "Out of Stock": "bg-slate-100 text-slate-500 border-slate-200",
  };

  return (
    <div className="bg-surface-card rounded-custom border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col justify-between">
      <div>
        {/* Product Image & Status Badge */}
        <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <span
            className={`absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold rounded-full border shadow-xs ${
              statusStyles[product.status]
            }`}
          >
            {product.status}
          </span>
        </div>

        {/* Product Info */}
        <div className="p-5 space-y-2">
          <span className="text-xs font-medium uppercase tracking-wider text-brand-600">
            {product.category}
          </span>
          <h3 className="text-lg font-semibold text-slate-800 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xl font-bold text-slate-900">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-5 pb-5 pt-2">
        <button
          disabled={!product.isAvailable}
          onClick={() => onSelectProduct(product)}
          className="w-full py-2.5 px-4 rounded-custom text-sm font-semibold transition-all duration-150
            bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800
            focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2
            disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed disabled:shadow-none shadow-sm"
        >
          {product.isAvailable ? "Manage Item" : "Unavailable"}
        </button>
      </div>
    </div>
  );
};
