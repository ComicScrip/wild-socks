import React, { useState } from "react";
import { useCreateOrderMutation } from "../gql/generated/schema";
import useCartItems from "../hooks/useCartItems";

export default function Cart() {
  const { cartItems, updateQuantity, total, setCartItems } = useCartItems();
  const [customerName, setCustomerName] = useState("");
  const [customerAddr, setCustomerAddr] = useState("");

  const [createOrder] = useCreateOrderMutation();

  return (
    <div>
      <h2>Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty for now</p>
      ) : (
        <>
          {cartItems.map((item, idx) => (
            <div key={idx} style={{ display: "flex" }}>
              <img
                src={item.pictureUrl}
                alt={item.name}
                style={{ height: 70, width: 70 }}
              />
              <p>{item.name}</p>
              <button
                onClick={() => {
                  updateQuantity(item, item.quantity - 1);
                }}
              >
                -
              </button>
              <p>{item.quantity}</p>
              <button
                onClick={() => {
                  updateQuantity(item, item.quantity + 1);
                }}
              >
                +
              </button>
            </div>
          ))}

          <p>Total: ${total}</p>

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
            />

            <input
              type="text"
              required
              value={customerAddr}
              onChange={(e) => setCustomerAddr(e.target.value)}
              placeholder="Your address"
            />
            <button type="submit">ORDER NOW</button>
          </form>
        </>
      )}
    </div>
  );
}
