import { DataSource } from "typeorm";
import Product from "./entity/Product";
import { env } from "./env";

export default new DataSource({
  type: "postgres",
  host: typeof env.DB_HOST !== "undefined" ? env.DB_HOST : "db",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: true,
  entities: [Product],
  logging: ["error"],
});
