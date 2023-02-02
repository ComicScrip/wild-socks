import { useEffect } from "react";
import { useGetProfileQuery, useOrdersQuery } from "../gql/generated/schema";
import { useNavigate } from "react-router-dom";

export default function BackOfficeScreen() {
  const { data } = useOrdersQuery();

  const { data: currentUser, loading } = useGetProfileQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && typeof currentUser === "undefined") navigate("/login");
  }, [currentUser, loading, navigate]);

  const orders = data?.orders ?? [];

  console.log({ data });

  return (
    <div>
      Last Orders
      <table>
        <thead>
          <tr>
            <th>Customer name</th>
            <th>Customer address</th>
            <th>Products</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(({ customerAddr, customerName, items, id }) => {
            return (
              <tr key={id}>
                <td>{customerName}</td>
                <td>{customerAddr}</td>
                <td style={{ display: "flex" }}>
                  {items.map((item) => {
                    return (
                      <div key={item.id}>
                        <img
                          style={{ height: 50, width: 50 }}
                          src={item.productPictureUrl}
                          alt={item.productName}
                        />
                        {item.quantity > 1 && "X" + item.quantity}
                      </div>
                    );
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
