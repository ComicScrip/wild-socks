import { Product } from "../gql/generated/schema";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product: { name, pictureUrl, price },
}: ProductCardProps) {
  return (
    <div
      style={{ width: 250, height: 250, border: "1px solid black", margin: 20 }}
    >
      <img style={{ width: 250, height: 200 }} src={pictureUrl} alt={name} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>{name}</p>
        <p>${price}</p>
      </div>
    </div>
  );
}
