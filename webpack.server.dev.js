require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es5',
    esModuleInterop: true
  }
});

const config = require('./webpack/server.dev').default;

// Explicitly set mode to avoid webpack warning
config.mode = 'development';

module.exports = config;
