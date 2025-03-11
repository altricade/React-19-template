require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
    target: "es5",
    esModuleInterop: true,
  },
});

const config = require("./webpack/client.dev").default;

config.mode = "development";

if (config.devServer) {
  config.devServer.historyApiFallback = {
    disableDotRule: true,
    rewrites: [
      { from: /^\/api/, to: (context) => context.parsedUrl.pathname || "" },
      { from: /.*/, to: "/index.html" },
    ],
  };
}

module.exports = config;
