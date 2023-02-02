import { test, expect } from "@playwright/test";
import db from "../../server/src/db";
import Order from "../../server/src/entity/Order";
import Product from "../../server/src/entity/Product";
import { connectToDb, disconnectFromDb, resetDB } from "../dbHelpers";

test.beforeAll(connectToDb);
test.beforeEach(resetDB);
test.afterAll(disconnectFromDb);

test("can create an order", async ({ page }) => {
  const products = await db.getRepository(Product).save([
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

  await page.goto("http://localhost:3000");
  await page.getByTestId(`productCard-${products[0].id}`).click();
  await expect(page.getByTestId(`cartContainer`)).toContainText(
    products[0].name
  );
  await expect(page.getByTestId(`cartItem-${products[0].id}`)).toContainText(
    "1"
  );
  await expect(page.getByTestId(`cartTotal`)).toContainText("$20");
  await page
    .getByTestId(`cartItem-${products[0].id}-incrementQuantityButton`)
    .click();
  await expect(page.getByTestId(`cartItem-${products[0].id}`)).toContainText(
    "2"
  );
  await expect(page.getByTestId(`cartTotal`)).toContainText("$40");

  await page
    .getByTestId(`cartItem-${products[0].id}-decrementQuantityButton`)
    .click();
  await expect(page.getByTestId(`cartItem-${products[0].id}`)).toContainText(
    "1"
  );
  await expect(page.getByTestId(`cartTotal`)).toContainText("$20");

  await page.getByTestId(`productCard-${products[1].id}`).click();
  await expect(page.getByTestId(`cartContainer`)).toContainText(
    products[1].name
  );
  await expect(page.getByTestId(`cartTotal`)).toContainText("$35");

  await page
    .getByTestId(`cartItem-${products[1].id}-decrementQuantityButton`)
    .click();
  await expect(page.getByTestId(`cartContainer`)).not.toContainText(
    products[1].name
  );
  await expect(page.getByTestId(`cartTotal`)).toContainText("$20");

  await page.getByTestId(`productCard-${products[2].id}`).click();
  await expect(page.getByTestId(`cartContainer`)).toContainText(
    products[2].name
  );
  await expect(page.getByTestId(`cartTotal`)).toContainText("$30");
  await page
    .getByTestId(`cartItem-${products[2].id}-incrementQuantityButton`)
    .click();
  await page
    .getByTestId(`cartItem-${products[2].id}-incrementQuantityButton`)
    .click();

  await expect(page.getByTestId(`cartTotal`)).toContainText("$50");

  await page.getByTestId(`createOrderNameInput`).type("Pedro");
  await page.getByTestId(`createOrderAddrInput`).type("30 rue du test");
  await page.getByTestId(`createOrderBtn`).click();

  await expect(page.getByTestId(`cartContainer`)).toContainText(
    "Your cart is empty for now"
  );

  const createdOrder = await db
    .getRepository(Order)
    .findOne({ where: {}, relations: { items: true } });

  expect(createdOrder.customerName).toBe("Pedro");
  expect(createdOrder.customerAddr).toBe("30 rue du test");
  expect(
    createdOrder.items.some(
      (item) => item.productName === products[0].name && item.quantity === 1
    )
  ).toBe(true);
  expect(
    createdOrder.items.some(
      (item) => item.productName === products[2].name && item.quantity === 3
    )
  ).toBe(true);

  await page.pause();
});
