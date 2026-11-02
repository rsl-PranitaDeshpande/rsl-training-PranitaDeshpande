import { setup, assign, fromPromise } from "xstate";
import type { CartItem, CheckoutResult } from "../types";

export interface CheckoutContext {
  items: CartItem[];
  error: string | null;
  lastOrder: CheckoutResult | null;
}

export type CheckoutEvent =
  | { type: "SYNC_ITEMS"; items: CartItem[] }
  | { type: "SUBMIT_PAYMENT" }
  | { type: "CANCEL_PAYMENT" }
  | { type: "RESET" };

const submitOrderPromise = fromPromise<
  CheckoutResult,
  { items: CartItem[] }
>(async ({ input, signal }) => {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal,
    body: JSON.stringify({
      items: input.items,
      total: input.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      ),
      createdAt: new Date().toISOString(),
    }),
  });
  if (!response.ok) throw new Error("Payment processing failed");
  return response.json() as Promise<CheckoutResult>;
});

export const checkoutMachine = setup({
  types: {
    context: {} as CheckoutContext,
    events: {} as CheckoutEvent,
  },
  guards: {
    hasItems: ({ context }) => context.items.length > 0,
  },
  actors: {
    submitOrder: submitOrderPromise,
  },
}).createMachine({
  id: "checkout",
  initial: "review",
  context: {
    items: [],
    error: null,
    lastOrder: null,
  },
  on: {
    SYNC_ITEMS: {
      actions: assign({ items: ({ event }) => event.items }),
    },
  },
  states: {
    review: {
      on: {
        SUBMIT_PAYMENT: {
          guard: "hasItems",
          target: "submitting",
        },
      },
    },
    submitting: {
      entry: assign({ error: null }),
      invoke: {
        src: "submitOrder",
        input: ({ context }) => ({ items: context.items }),
        onDone: {
          target: "success",
          actions: assign({
            lastOrder: ({ event }) => event.output,
          }),
        },
        onError: {
          target: "review",
          actions: assign({
            error: ({ event }) =>
              event.error instanceof Error
                ? event.error.message
                : "Payment failed",
          }),
        },
      },
      on: {
        CANCEL_PAYMENT: {
          target: "review",
        },
      },
    },
    success: {
      on: {
        RESET: {
          target: "review",
          actions: assign({ lastOrder: null, error: null }),
        },
      },
    },
  },
});
