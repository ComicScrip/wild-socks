import { useState } from "react";
import Cart from "../components/Cart";
import ProductCard from "../components/ProductCard";
import { useProductsQuery } from "../gql/generated/schema";

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={{ display: "flex" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log({ email, password });
        }}
      >
        <input
          required
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Log in</button>
      </form>
    </div>
  );
}
