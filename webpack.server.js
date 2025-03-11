const path = require("path");
const { merge } = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");
const commonConfig = require("./webpack.common");

module.exports = merge(commonConfig, {
  name: "server",
  target: "node",
  entry: "./src/server/index.ts",
  output: {
    path: path.resolve(__dirname, "dist/server"),
    filename: "index.js",
    publicPath: "/",
    clean: true,
  },
  externals: [nodeExternals()],
  optimization: {
    minimize: false,
  },
});
