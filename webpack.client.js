const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const commonConfig = require("./webpack.common");

module.exports = merge(commonConfig, {
  name: "client",
  target: "web",
  entry: "./src/client/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist/client"),
    filename: "js/[name].[contenthash].js",
    publicPath: "/",
    clean: true,
  },
  optimization: {
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: "all",
      name: false,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/client/index.html",
      filename: "index.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
});
