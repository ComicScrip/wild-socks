import { Arg, Mutation, Query, Resolver } from "type-graphql";
import db from "../db";
import Order, { CreateOrderInput } from "../entity/Order";
import OrderItem from "../entity/OrderItem";
import Product from "../entity/Product";

@Resolver()
export default class OrdersResolver {
  @Mutation(() => Order)
  async createOrder(@Arg("data") data: CreateOrderInput): Promise<Order> {
    const newOrder = new Order();
    newOrder.customerAddr = data.customerAddr;
    newOrder.customerName = data.customerName;

    const createdOrder = await db.getRepository(Order).save(newOrder);

    for (const item of data.items) {
      const product = await db
        .getRepository(Product)
        .findOneByOrFail({ id: item.productId });

      const orderItem = new OrderItem();
      orderItem.productName = product.name;
      orderItem.productPictureUrl = product.pictureUrl;
      orderItem.productPrice = product.price;
      orderItem.quantity = item.quantity;
      orderItem.order = createdOrder;

      await db.getRepository(OrderItem).save(orderItem);
    }

    return createdOrder;
  }
}
