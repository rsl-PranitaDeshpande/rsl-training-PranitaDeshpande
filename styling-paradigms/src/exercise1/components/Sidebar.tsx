import React, { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Layers,
  Settings,
  Menu,
  X,
} from "lucide-react";

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, active: true },
    { label: "Products", icon: Package, active: false },
    { label: "Categories", icon: Layers, active: false },
    { label: "Settings", icon: Settings, active: false },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-brand-600 text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
        aria-label="Toggle Navigation"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Navigation Drawer / Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-surface-sidebar text-slate-300 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-500 rounded-custom flex items-center justify-center text-white font-bold">
            S
          </div>
          <span className="text-lg font-bold text-white tracking-wide">
            ShopAdmin
          </span>
        </div>

        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href="#"
                className={`flex items-center gap-3 px-4 py-3 rounded-custom text-sm font-medium transition-colors duration-150 ${
                  item.active
                    ? "bg-brand-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
