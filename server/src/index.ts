import "reflect-metadata";
import http from "http";
import cors from "cors";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { buildSchema } from "type-graphql";
import db from "./db";
import { env } from "./env";
import ProductResolver from "./resolvers/productsResolver";
import OrdersResolver from "./resolvers/ordersResolver";
import { UsersResolver } from "./resolvers/usersResolver";
import jwt from "jsonwebtoken";
import User from "./entity/User";
import cookieParser from "cookie-parser";

export interface ContextType {
  req: express.Request;
  res: express.Response;
  currentUser?: User;
  jwtPayload?: jwt.JwtPayload;
}

const start = async (): Promise<void> => {
  await db.initialize();

  const app = express();
  const httpServer = http.createServer(app);
  const allowedOrigins = env.CORS_ALLOWED_ORIGINS.split(",");

  app.use(
    cors({
      credentials: true,
      origin: (origin, callback) => {
        if (typeof origin === "undefined" || allowedOrigins.includes(origin))
          return callback(null, true);
        callback(new Error("Not allowed by CORS"));
      },
    })
  );

  app.use(cookieParser());

  const schema = await buildSchema({
    resolvers: [ProductResolver, OrdersResolver, UsersResolver],
    // https://typegraphql.com/docs/authorization.html
    authChecker: async ({ context }: { context: ContextType }) => {
      const tokenInHeaders = context.req.headers.authorization?.split(" ")[1];
      const tokenInCookie = context.req.cookies?.token;
      const token = tokenInHeaders ?? tokenInCookie;

      console.log({ tokenInCookie, tokenInHeaders });

      try {
        let decoded;
        // https://www.npmjs.com/package/jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
        if (typeof token !== "undefined")
          decoded = jwt.verify(token, env.JWT_PRIVATE_KEY);
        if (typeof decoded === "object") context.jwtPayload = decoded;
      } catch (err) {}

      let user = null;
      if (
        context.jwtPayload !== null &&
        typeof context.jwtPayload !== "undefined"
      )
        user = await db
          .getRepository(User)
          .findOne({ where: { id: context.jwtPayload.userId } });

      if (user === null) return false;

      context.currentUser = user;
      return true;
    },
  });

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    context: ({ req, res }) => {
      return { req, res };
    },
  });

  await server.start();
  server.applyMiddleware({ app, cors: false, path: "/" });
  httpServer.listen({ port: env.SERVER_PORT }, () =>
    console.log(
      `🚀 Server ready at ${env.SERVER_HOST}:${env.SERVER_PORT}${server.graphqlPath}`
    )
  );
};

start().catch(console.error);
