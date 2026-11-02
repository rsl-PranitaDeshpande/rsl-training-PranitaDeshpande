import React from "react";
import { useSelector } from "@xstate/react";
import { useCheckoutActor } from "../context/CheckoutContext";

export const PaymentPanel: React.FC = () => {
  const actorRef = useCheckoutActor();

  const isSubmitting = useSelector(actorRef, (snapshot: any) =>
    snapshot.matches("submitting"),
  );
  const isSuccess = useSelector(actorRef, (snapshot: any) =>
    snapshot.matches("success"),
  );
  const error = useSelector(
    actorRef,
    (snapshot: any) => snapshot.context.error,
  );

  if (!isSubmitting && !isSuccess && !error) return null;

  return (
    <div
      style={{
        border: "1px solid #cbd5e1",
        padding: "1rem",
        margin: "1rem",
        borderRadius: "8px",
      }}
    >
      <h3>Payment Status Panel</h3>
      {isSubmitting && (
        <div>
          <p>⏳ Processing payment with server...</p>
          <button onClick={() => actorRef.send({ type: "CANCEL_PAYMENT" })}>
            Cancel Payment
          </button>
        </div>
      )}
      {isSuccess && (
        <p style={{ color: "green" }}>✅ Order placed successfully!</p>
      )}
      {error && <p style={{ color: "red" }}>❌ Error: {error}</p>}
    </div>
  );
};
