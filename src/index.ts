import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import fs from "fs";
import path from "path";

const typeDefs = fs.readFileSync(path.resolve("src", "schema.gql"), "utf-8");

interface IGoods {
  id: string;
  description: string;
  price: number;
  count?: number | null;
}
const goods = [
  {
    id: "test-1",
    description: "Some description - 1",
    price: 500,
    count: 10,
  },
];

const resolvers = {
  Query: {
    product: () => goods,
  },
  Mutation: {
    add(_, args: IGoods) {
      const newGood = {
        id: Math.random().toString(),
        description: args.description,
        price: 400,
        count: 39,
      };
      goods.push(newGood);

      return newGood;
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

console.log(`🚀  Server ready at: ${url}`);
