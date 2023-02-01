import { ApolloError } from "apollo-server-errors";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import db from "../db";
import Order, { CreateOrderInput } from "../entity/Order";
import OrderItem from "../entity/OrderItem";
import Product from "../entity/Product";

@Resolver()
export default class OrdersResolver {
  @Mutation(() => Order)
  async createOrder(@Arg("data") data: CreateOrderInput): Promise<Order> {
    const { customerAddr, customerName } = data;

    if (data.items.length === 0)
      throw new ApolloError("no cart items !", "NO_CART_ITEMS");

    return await db.getRepository(Order).save({
      customerAddr,
      customerName,
      items: await Promise.all(
        data.items.map(async (item): Promise<Partial<OrderItem>> => {
          const product = await db
            .getRepository(Product)
            .findOneByOrFail({ id: item.productId });
          return {
            productName: product.name,
            productPictureUrl: product.pictureUrl,
            productPrice: product.price,
            quantity: item.quantity,
          };
        })
      ),
    });
  }

  @Authorized()
  @Query(() => [Order])
  async orders(): Promise<Order[]> {
    return await db.getRepository(Order).find({ relations: { items: true } });
  }
}
