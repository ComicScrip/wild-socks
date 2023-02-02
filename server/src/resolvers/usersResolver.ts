import { ApolloError } from "apollo-server-errors";
import jwt from "jsonwebtoken";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { ContextType } from "..";
import db from "../db";
import User, {
  getSafeAttributes,
  LoginInput,
  verifyPassword,
} from "../entity/User";
import { env } from "../env";

@Resolver(User)
export class UsersResolver {
  @Mutation(() => String)
  async login(
    @Ctx() ctx: ContextType,
    @Arg("data") { email, password }: LoginInput
  ): Promise<string> {
    const user = await db.getRepository(User).findOneBy({ email });

    if (
      user !== null &&
      typeof user.password === "string" &&
      (await verifyPassword(password, user.password))
    ) {
      const token = jwt.sign({ userId: user.id }, env.JWT_PRIVATE_KEY);

      ctx.res.cookie("token", token, {
        secure: env.NODE_ENV === "production",
        httpOnly: true,
      });

      return token;
    }
    throw new ApolloError("invalid credentials", "INVALID_CREDENTIALS");
  }

  @Authorized()
  @Query(() => User)
  async profile(@Ctx() ctx: ContextType): Promise<User> {
    return getSafeAttributes(ctx.currentUser as User);
  }

  @Mutation(() => String) async logout(
    @Ctx() ctx: ContextType
  ): Promise<string> {
    ctx.res.clearCookie("token");
    return "ok";
  }
}
