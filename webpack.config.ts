import path from "path";
import webpack from "webpack";

const config: webpack.Configuration = {
  mode: "development",
  entry: { index: path.resolve("src", "index.ts") },
  output: {
    path: path.resolve("dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  target: "node",
};

export default config;
