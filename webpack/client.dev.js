const { merge } = require('webpack-merge');
const clientCommonConfig = require('./client.common');

module.exports = merge(clientCommonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  optimization: {
    minimize: false,
    splitChunks: {
      chunks: 'all',
    },
  },
  performance: {
    hints: false,
  },
});
