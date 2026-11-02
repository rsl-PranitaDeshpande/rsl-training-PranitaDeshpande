import React, { useState } from "react";
import { Header } from "./components/Header";
import { Catalog } from "./components/Catalog";
import { CartDrawer } from "./components/CartDrawer";

export const App: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        minHeight: "100vh",
        background: "#f8fafc",
      }}
    >
      <Header onOpenCart={() => setIsDrawerOpen(true)} />
      <Catalog />
      <CartDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};

export default App;
