import path from "path";
import webpack from "webpack";
import nodeExternals from "webpack-node-externals";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

const config: webpack.Configuration = {
  entry: { index: path.resolve("src", "index.ts") },
  output: {
    path: path.resolve("dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.([cm]?ts)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  target: "node",
  externals: [nodeExternals()],
  plugins: [new CleanWebpackPlugin()],
};

export default config;
