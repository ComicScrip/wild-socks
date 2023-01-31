import useCartItems from "../hooks/useCartItems";

export default function Cart() {
  const { cartItems, updateQuantity } = useCartItems();

  return (
    <div>
      <h2>Cart</h2>

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
    </div>
  );
}
