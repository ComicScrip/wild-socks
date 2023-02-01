import { useState } from "react";
import {
  useGetProfileQuery,
  useLoginMutation,
  useLogoutMutation,
} from "../gql/generated/schema";

export function LoginScreen() {
  const [email, setEmail] = useState("admin@app.com");
  const [password, setPassword] = useState("Test@123");

  const [login] = useLoginMutation();

  const { data: currentUser, client } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  const [logout] = useLogoutMutation();

  return (
    <div style={{ display: "flex" }}>
      {currentUser?.profile ? (
        <div>
          <p>Connected as {currentUser?.profile.email}.</p>
          <button
            onClick={async () => {
              console.log("logout");
              await logout();
              client.resetStore();
            }}
          >
            Log out
          </button>
        </div>
      ) : (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            console.log({ email, password });
            await login({ variables: { data: { email, password } } });
            client.resetStore();
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
      )}
    </div>
  );
}
