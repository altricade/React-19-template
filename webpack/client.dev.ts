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
      publicPath: "/",
    },
    optimization: {
      minimize: false,
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 20000,
        maxSize: 200000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            name(module: { context: string }) {
              // Get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName =
                module.context.match(
                  /[\\/]node_modules[\\/]([^\\/]+)([\\/]|$)/
                )?.[1] || "vendor";

              // Create separate chunks for larger packages
              return `npm.${packageName.replace("@", "")}`;
            },
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: "npm.react",
            priority: 10,
            reuseExistingChunk: false,
          },
          redux: {
            test: /[\\/]node_modules[\\/](@?redux|@reduxjs)[\\/]/,
            name: "npm.redux",
            priority: 5,
            reuseExistingChunk: false,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
    performance: {
      hints: process.env.NODE_ENV === "production" ? "warning" : false,
      maxEntrypointSize: 1024000, // 1MB
      maxAssetSize: 1024000,
      assetFilter: (assetFilename: string) => {
        // Don't check size of map files or images
        return (
          !/\.map$/.test(assetFilename) &&
          !/\.(png|jpg|jpeg|gif|svg)$/.test(assetFilename)
        );
      },
    },
    devServer: {
      // Configure historyApiFallback for proper SPA routing
      historyApiFallback: {
        // Don't rewrite dotfiles
        disableDotRule: true,
        // Explicitly rewrite all frontend routes to index.html
        rewrites: [
          // Don't rewrite API calls
          { from: /^\/api/, to: (context: any) => context.parsedUrl.pathname || '' },
          // Route everything else to index.html for React Router
          { from: /.*/, to: '/index.html' },
        ],
      },
      hot: true,
      port: 8080,
      compress: true,
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
        progress: true,
      },
      devMiddleware: {
        publicPath: "/",
        writeToDisk: true, // Write output to disk for SSR
        index: "index.html", // Serve index.html for directory requests
      },

      static: {
        directory: path.resolve(__dirname, "../src/client"), // Serve static files from src
        publicPath: "/",
        watch: true,
      },
      proxy: [
        {
          context: ["/api"],
          target: "http://localhost:3001",
          secure: false,
          changeOrigin: true,
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("development"),
        global: JSON.stringify({}),
        // Force React to use development mode
        "process.env": JSON.stringify({
          NODE_ENV: "development",
        }),
        __DEV__: true,
      }),
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin({
        overlay: false, // Disable error overlay to use our custom one
        exclude: [/node_modules/],
      }),
      new DotenvWebpack({
        path: path.resolve(__dirname, "../.env.development"),
        defaults: path.resolve(__dirname, "../.env"),
        systemvars: true,
      }),
    ],
  }
);

export default clientDevConfig;
