import React, { createContext, useContext } from "react";
import { useActorRef, useSelector } from "@xstate/react";
import { checkoutMachine } from "../machines/checkoutMachine";
import { useCartStore } from "../store/useCartStore";

const CheckoutActorContext = createContext<any>(null);

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const actorRef = useActorRef(checkoutMachine);
  return (
    <CheckoutActorContext.Provider value={actorRef}>
      <CartSynchronizer />
      <OrderCompletionBridge />
      {children}
    </CheckoutActorContext.Provider>
  );
};

export const useCheckoutActor = () => useContext(CheckoutActorContext);

// Headless Bridge 1: Zustand Store -> XState Machine
const CartSynchronizer = () => {
  const actorRef = useCheckoutActor();
  const items = useCartStore((state) => state.items);

  React.useEffect(() => {
    actorRef.send({ type: "SYNC_ITEMS", items });
  }, [items, actorRef]);

  return null;
};

// Headless Bridge 2: XState Machine -> Zustand Clear
const OrderCompletionBridge = () => {
  const actorRef = useCheckoutActor();
  const clearCart = useCartStore((state) => state.clearCart);

  const isSuccess = useSelector(actorRef, (snapshot: any) =>
    snapshot.matches("success"),
  );

  React.useEffect(() => {
    if (isSuccess) {
      clearCart();
    }
  }, [isSuccess, clearCart]);

  return null;
};
