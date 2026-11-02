import React, { useState } from "react";
import { CheckoutProvider } from "./context/CheckoutContext";
import { Header } from "./components/Header";
import { Catalog } from "./components/Catalog";
import { CartDrawer } from "./components/CartDrawer";
import { PaymentPanel } from "./components/PaymentPanel";

export const App: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <CheckoutProvider>
      <div
        style={{
          fontFamily: "sans-serif",
          minHeight: "100vh",
          background: "#f8fafc",
        }}
      >
        <Header onOpenCart={() => setIsDrawerOpen(true)} />
        <Catalog />

        {/* Mount PaymentPanel on the main page */}
        <PaymentPanel />

        <CartDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      </div>
    </CheckoutProvider>
  );
};

export default App;
