"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetDB = exports.disconnectFromDb = exports.connectToDb = void 0;
const db_1 = require("../server/src/db");
async function connectToDb() {
    await db_1.default.initialize();
}
exports.connectToDb = connectToDb;
async function disconnectFromDb() {
    await db_1.default.destroy();
}
exports.disconnectFromDb = disconnectFromDb;
async function resetDB() {
    const entities = db_1.default.entityMetadatas;
    return Promise.all(entities.map((entity) => db_1.default.getRepository(entity.name).delete({})));
}
exports.resetDB = resetDB;
//# sourceMappingURL=dbHelpers.js.map