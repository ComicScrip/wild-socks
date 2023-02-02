"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const ts_dotenv_1 = require("ts-dotenv");
// https://github.com/LeoBakerHytch/ts-dotenv
exports.env = (0, ts_dotenv_1.load)({
    JWT_PRIVATE_KEY: String,
    CORS_ALLOWED_ORIGINS: String,
    NODE_ENV: ["production", "development", "test"],
    SERVER_HOST: String,
    SERVER_PORT: Number,
    DB_HOST: { type: String, optional: true },
});
//# sourceMappingURL=env.js.map