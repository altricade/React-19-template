require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es5',
    esModuleInterop: true
  }
});

module.exports = require('./webpack/server.prod').default;
