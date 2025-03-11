// This file is used to load TypeScript webpack configurations
require("ts-node").register({
  transpileOnly: true,
  compilerOptions: {
    module: "commonjs",
    target: "es2015",
    esModuleInterop: true,
  },
});

// Export webpack configuration based on the environment
const env = process.env.NODE_ENV || "development";
const isDevServer = process.argv.some(
  (v) => v.includes("webpack-dev-server") || v.includes("webpack serve")
);

// Return the appropriate configuration
if (isDevServer) {
  // For webpack-dev-server, use the client dev config
  const clientConfig = require("./webpack/client.dev.ts").default;
  module.exports = clientConfig;
} else if (env === "production") {
  // For production build
  module.exports = [
    require("./webpack/client.prod.ts").default,
    require("./webpack/server.prod.ts").default,
  ];
} else {
  // For development build without dev server
  module.exports = [
    require("./webpack/client.dev.ts").default,
    require("./webpack/server.dev.ts").default,
  ];
}
