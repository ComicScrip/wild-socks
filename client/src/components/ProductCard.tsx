import { Product } from "../gql/generated/schema";
import useCartItems from "../hooks/useCartItems";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product: { id, name, pictureUrl, price },
}: ProductCardProps) {
  const { addProductToCart } = useCartItems();

  return (
    <div
      data-testid={`productCard-${id}`}
      style={{ width: 250, height: 250, border: "1px solid black", margin: 20 }}
      onClick={() => addProductToCart({ id, name, pictureUrl, price })}
    >
      <img style={{ width: 250, height: 200 }} src={pictureUrl} alt={name} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>{name}</p>
        <p>${price}</p>
      </div>
    </div>
  );
}
