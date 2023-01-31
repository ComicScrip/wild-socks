import { gql, useQuery } from "@apollo/client";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import { useProductsQuery } from "./gql/generated/schema";

function App() {
  const { data } = useProductsQuery();

  const products = data?.products || [];

  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        {products.map((p) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </div>
    </div>
  );
}

export default App;
