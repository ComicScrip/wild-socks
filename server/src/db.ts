import { DataSource } from "typeorm";
import Order from "./entity/Order";
import OrderItem from "./entity/OrderItem";
import Product from "./entity/Product";
import User from "./entity/User";
import { env } from "./env";

export default new DataSource({
  type: "postgres",
  host: typeof env.DB_HOST !== "undefined" ? env.DB_HOST : "db",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: true,
  entities: [Product, Order, OrderItem, User],
  logging: ["error"],
});
