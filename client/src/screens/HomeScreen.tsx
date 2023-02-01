import Cart from "../components/Cart";
import ProductCard from "../components/ProductCard";
import { useProductsQuery } from "../gql/generated/schema";

export function HomeScreen() {
  const { data } = useProductsQuery();
  const products = data?.products || [];

  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex" }}>
        {products.map((p) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </div>
      <Cart />
    </div>
  );
}
