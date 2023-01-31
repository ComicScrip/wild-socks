import db from "./src/db";
import Product from "./src/entity/Product";

async function seed(): Promise<void> {
  await db.initialize();
  await db.getRepository(Product).delete({});
  await db.getRepository(Product).insert([
    {
      name: "Socks1",
      pictureUrl:
        "https://imgs.search.brave.com/u8GvP8GLEZj2BUqf1kUAKZWHfH2LoM1uslrltB3EY3g/rs:fit:177:168:1/g:ce/aHR0cDovL3A1LnN0/b3JhZ2UuY2FuYWxi/bG9nLmNvbS81OS8w/NC8xNDg1MzMvNzU0/ODk3MC5qcGc",
      price: 20.0,
    },
    {
      name: "Socks2",
      pictureUrl:
        "https://assets.ullapopken.de/images/products/805446802_model_g_30.jpg",
      price: 15.0,
    },
    {
      name: "Socks3",
      pictureUrl:
        "https://imgs.search.brave.com/RPEr8b5L0Epw6luYJUWqBjP-aGT03XEuAR5sU5o705g/rs:fit:325:417:1/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzkyLzEx/L2RjLzkyMTFkYzAy/ODdmNmQwMzgxNGNj/NzFhOTVhZGYxZTAx/LmpwZw",
      price: 10.0,
    },
  ]);
}

seed().catch(console.error);
