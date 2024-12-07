import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeExecutableSchema } from "graphql-tools";
import { getTypeDefs } from "./utils/getTypeDefs";
import { PrismaClient } from "@prisma/client";
import { IContext } from "./types";
import { findUserById, products } from "./resolvers";
import { signup, signin } from "./resolvers";
import { postedBy } from "./resolvers/Product";

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    findUserById,
  },
  Mutation: {
    signup,
    signin,
    postedBy,
    products,
  },
};

const typeDefs = getTypeDefs("schema.graphql", "auth.graphql");

const server = new ApolloServer<IContext>({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req, res }) => ({
    prisma,
  }),
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);
