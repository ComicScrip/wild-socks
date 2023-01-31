import { Query, Resolver } from "type-graphql";
import db from "../db";
import Product from "../entity/Product";

@Resolver()
export default class ProductResolver {
  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return await db.getRepository(Product).find();
  }
}
