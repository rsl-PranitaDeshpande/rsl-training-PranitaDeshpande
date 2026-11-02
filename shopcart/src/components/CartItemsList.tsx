import React from "react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  cartAtom,
  totalPriceAtom,
  removeFromCartAtom,
} from "../store/jotaiStore";

export const CartItemsList: React.FC = () => {
  const cart = useAtomValue(cartAtom);
  const totalPrice = useAtomValue(totalPriceAtom);
  const removeFromCart = useSetAtom(removeFromCartAtom);

  if (cart.length === 0) {
    return <p className="empty-cart">Your cart is empty.</p>;
  }

  return (
    <div className="cart-items-list">
      {cart.map((item) => (
        <div key={item.product.id} className="cart-item-row">
          <div>
            <h4>{item.product.name}</h4>
            <p>
              Qty: {item.quantity} × ${item.product.price.toFixed(2)}
            </p>
          </div>
          <div>
            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            <button onClick={() => removeFromCart(item.product.id)}>
              Remove
            </button>
          </div>
        </div>
      ))}
      <div className="cart-total">
        <strong>Total:</strong> ${totalPrice.toFixed(2)}
      </div>
    </div>
  );
};
