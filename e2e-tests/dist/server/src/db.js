"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Order_1 = require("./entity/Order");
const OrderItem_1 = require("./entity/OrderItem");
const Product_1 = require("./entity/Product");
const User_1 = require("./entity/User");
const env_1 = require("./env");
exports.default = new typeorm_1.DataSource({
    type: "postgres",
    host: typeof env_1.env.DB_HOST !== "undefined" ? env_1.env.DB_HOST : "db",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    entities: [Product_1.default, Order_1.default, OrderItem_1.default, User_1.default],
    logging: ["error"],
});
//# sourceMappingURL=db.js.map