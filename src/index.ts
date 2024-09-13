import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const typeDefs = fs.readFileSync(path.resolve("src", "schema.gql"), "utf-8");

const prisma = new PrismaClient();
interface IGoods {
  id: string;
  description: string;
  price: number;
  count?: number | null;
}

const resolvers = {
  Query: {
    product: async () => await prisma.good.findMany(),
    users: async () => await prisma.users.findMany(),
  },

  Mutation: {
    async add(_, args: IGoods) {
      const newGood = {
        description: args.description,
        price: args.price,
        count: args.count,
      };
      await prisma.good
        .create({ data: newGood })
        .then(() => newGood)
        .catch((err) => console.log("Hello my angel", err));
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀Server ready at: ${url}`);
