import webpack from "webpack";
import { merge } from "webpack-merge";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from "path";
import "webpack-dev-server";
import clientCommon from "./client.common";

// Use require for modules without proper type definitions
const DotenvWebpack = require("dotenv-webpack");

const clientDevConfig: webpack.Configuration & { devServer?: any } = merge(
  clientCommon,
  {
    mode: "development",
    devtool: "inline-source-map",
    output: {
      filename: "js/[name].js",
    },
    optimization: {
      minimize: false,
      runtimeChunk: "single",
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
      port: 3000,
      compress: true,
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("development"),
      }),
      new ReactRefreshWebpackPlugin(),
      new DotenvWebpack({
        path: path.resolve(__dirname, "../.env.development"),
        defaults: path.resolve(__dirname, "../.env"),
        systemvars: true,
      }),
    ],
  }
);

export default clientDevConfig;
