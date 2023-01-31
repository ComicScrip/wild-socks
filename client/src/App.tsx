import { useProductsQuery } from "./gql/generated/schema";

function App() {
  const { data, error } = useProductsQuery();

  console.log({ data, error });

  return <div>products</div>;
}

export default App;
