import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeExecutableSchema } from "graphql-tools";
import { getTypeDefs } from "./utils/getTypeDefs";
import { PrismaClient } from "@prisma/client";
import { IUser } from "./types";

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    findUserById: async (_, args: { userId: string }) => {
      return await prisma.user.findUnique({
        where: {
          id: args.userId,
        },
      });
    },
  },
  Mutation: {
    saveUser: async (_, args: IUser) => {
      try {
        const { name, email, password } = args;
        const newUser = { name, email, password };
        return await prisma.user.create({ data: newUser });
      } catch (err) {
        return err.message;
      }
    },
  },
};

const typeDefs = getTypeDefs("schema.graphql", "auth.graphql");
const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);
