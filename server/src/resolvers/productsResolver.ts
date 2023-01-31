import { Query, Resolver } from "type-graphql";

@Resolver()
export default class ProductResolver {
  @Query(() => Boolean)
  async products(): Promise<boolean> {
    return true;
  }
}
