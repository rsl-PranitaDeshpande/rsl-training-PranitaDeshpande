import React from "react";
import { useSelector } from "@xstate/react";
import { useCheckoutActor } from "../context/CheckoutContext";

export const CheckoutButton: React.FC = () => {
  const actorRef = useCheckoutActor();

  // Declarative query: check if SUBMIT_PAYMENT transition is allowed
  const canSubmit = useSelector(actorRef, (snapshot: any) =>
    snapshot.can({ type: "SUBMIT_PAYMENT" }),
  );
  const isSubmitting = useSelector(actorRef, (snapshot: any) =>
    snapshot.matches("submitting"),
  );

  return (
    <button
      disabled={!canSubmit || isSubmitting}
      onClick={() => actorRef.send({ type: "SUBMIT_PAYMENT" })}
      style={{
        width: "100%",
        padding: "10px",
        background: canSubmit ? "#2563eb" : "#94a3b8",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: canSubmit ? "pointer" : "not-allowed",
      }}
    >
      {isSubmitting ? "Processing..." : "Proceed to Checkout"}
    </button>
  );
};
