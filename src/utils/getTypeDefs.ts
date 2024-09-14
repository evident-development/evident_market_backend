import { readFileSync } from "fs";
import path from "path";

export function getTypeDefs(...args: string[]) {
  const typeDefs = [];
  for (let filename of args) {
    typeDefs.push(
      readFileSync(path.resolve("src", "graphql", filename), "utf-8")
    );
  }

  return typeDefs;
}
