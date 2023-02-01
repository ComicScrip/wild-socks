import { Arg, Mutation, Resolver } from "type-graphql";
import db from "../db";
import Order, { CreateOrderInput } from "../entity/Order";
import OrderItem from "../entity/OrderItem";
import Product from "../entity/Product";

@Resolver()
export default class OrdersResolver {
  @Mutation(() => Order)
  async createOrder(
    @Arg("data", { validate: { always: true } }) data: CreateOrderInput
  ): Promise<Order> {
    const { customerAddr, customerName } = data;

    const items = await Promise.all(
      data.items.map(async (item): Promise<Partial<OrderItem>> => {
        const p = await db
          .getRepository(Product)
          .findOneByOrFail({ id: item.productId });
        return {
          productName: p.name,
          productPictureUrl: p.pictureUrl,
          productPrice: p.price,
          quantity: item.quantity,
        };
      })
    );

    return await db
      .getRepository(Order)
      .save({ customerName, customerAddr, items });
  }
}
