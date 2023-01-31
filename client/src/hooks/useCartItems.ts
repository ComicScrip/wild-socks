import createPersistedState from "use-persisted-state";
import { Product } from "../gql/generated/schema";

interface CartItem {
  name: string;
  pictureUrl: string;
  price: number;
  quantity: number;
  id: number;
}

const useCartItemsState = createPersistedState<CartItem[]>("cartItems");

export default function useCartItems() {
  const [cartItems, setCartItems] = useCartItemsState([]);

  function addProductToCart(p: Product) {
    if (!cartItems.some((item) => item.id === p.id))
      setCartItems((oldList) => [
        ...oldList,
        {
          ...p,
          quantity: 1,
        },
      ]);
  }

  function removeProductFromCart(p: Product) {
    setCartItems((oldList) => oldList.filter((item) => item.id !== p.id));
  }

  function updateQuantity(p: Product, newQuantity: number) {
    if (newQuantity === 0) removeProductFromCart(p);
    else
      setCartItems((oldList) =>
        oldList.map((item) => {
          if (item.id === p.id) return { ...item, quantity: newQuantity };
          return item;
        })
      );
  }

  const total = cartItems.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  return { cartItems, setCartItems, addProductToCart, updateQuantity, total };
}
