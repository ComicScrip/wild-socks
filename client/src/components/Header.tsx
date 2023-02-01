import { Link } from "react-router-dom";
import { useGetProfileQuery } from "../gql/generated/schema";

export default function Header() {
  const { data: currentUser, client } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  const canShowbackOfficeLink = typeof currentUser?.profile !== "undefined";

  return (
    <header
      style={{
        backgroundColor: "grey",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h1>Wild socks</h1>
        <h2>the best socks in town</h2>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Catalog</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          {canShowbackOfficeLink && (
            <li>
              <Link to="/back-office">Back-office</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
