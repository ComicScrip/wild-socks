import React, { useState } from "react";
import { useCreateOrderMutation } from "../gql/generated/schema";
import useCartItems from "../hooks/useCartItems";

export default function Cart() {
  const { cartItems, updateQuantity, total, setCartItems } = useCartItems();
  const [customerName, setCustomerName] = useState("");
  const [customerAddr, setCustomerAddr] = useState("");

  const [createOrder] = useCreateOrderMutation();

  return (
    <div data-testid="cartContainer">
      <h2>Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty for now</p>
      ) : (
        <>
          {cartItems.map((item, idx) => (
            <div
              key={idx}
              style={{ display: "flex" }}
              data-testid={`cartItem-${item.id}`}
            >
              <img
                src={item.pictureUrl}
                alt={item.name}
                style={{ height: 70, width: 70 }}
              />
              <p>{item.name}</p>
              <button
                data-testid={`cartItem-${item.id}-decrementQuantityButton`}
                onClick={() => {
                  updateQuantity(item, item.quantity - 1);
                }}
              >
                -
              </button>
              <p>{item.quantity}</p>
              <button
                data-testid={`cartItem-${item.id}-incrementQuantityButton`}
                onClick={() => {
                  updateQuantity(item, item.quantity + 1);
                }}
              >
                +
              </button>
            </div>
          ))}

          <p data-testid="cartTotal">Total: ${total}</p>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await createOrder({
                variables: {
                  data: {
                    customerAddr,
                    customerName,
                    items: cartItems.map((item) => ({
                      productId: item.id,
                      quantity: item.quantity,
                    })),
                  },
                },
              });
              alert("Thank you !");
              setCartItems([]);
              setCustomerAddr("");
              setCustomerName("");
            }}
          >
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Your name"
              required
              data-testid="createOrderNameInput"
            />

            <input
              type="text"
              required
              value={customerAddr}
              onChange={(e) => setCustomerAddr(e.target.value)}
              placeholder="Your address"
              data-testid="createOrderAddrInput"
            />
            <button type="submit" data-testid="createOrderBtn">
              ORDER NOW
            </button>
          </form>
        </>
      )}
    </div>
  );
}
