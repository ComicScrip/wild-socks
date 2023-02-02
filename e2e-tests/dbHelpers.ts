import db from "../server/src/db";

export async function connectToDb() {
  await db.initialize();
}

export async function disconnectFromDb() {
  await db.destroy();
}

export async function resetDB() {
  const entities = db.entityMetadatas;
  return Promise.all(
    entities.map((entity) => db.getRepository(entity.name).delete({}))
  );
}
