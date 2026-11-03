import React from "react";
import { Plus, Bell } from "lucide-react";

interface HeaderProps {
  onAddProduct: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddProduct }) => {
  return (
    <header className="bg-surface-card border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
          Product Dashboard
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Manage inventory, prices, and status
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          aria-label="Notifications"
          className="p-2 text-slate-600 hover:text-brand-600 hover:bg-brand-50 rounded-custom transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <Bell className="w-5 h-5" />
        </button>
        <button
          onClick={onAddProduct}
          className="flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-medium px-4 py-2 rounded-custom shadow-sm hover:shadow transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>
    </header>
  );
};
