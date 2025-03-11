import webpack from "webpack";
import { merge } from "webpack-merge";
import TerserPlugin from "terser-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import path from "path";
import clientCommon from "./client.common";

// Use require for modules without proper type definitions
const DotenvWebpack = require("dotenv-webpack");

const clientProdConfig: webpack.Configuration = merge(clientCommon, {
  mode: "production",
  devtool: "source-map",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: "all",
      name: false,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
    runtimeChunk: "single",
  },
  performance: {
    hints: "warning",
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    new DotenvWebpack({
      path: path.resolve(__dirname, "../.env.production"),
      defaults: path.resolve(__dirname, "../.env"),
      systemvars: true,
    }),
  ],
});

export default clientProdConfig;
