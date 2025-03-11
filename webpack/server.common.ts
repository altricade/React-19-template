import path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import commonConfig from './common';

// Use require for modules without proper type definitions
const nodeExternals = require('webpack-node-externals');

const serverCommonConfig: webpack.Configuration = merge(commonConfig, {
  name: 'server',
  target: 'node',
  entry: './src/server/index.ts',
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: 'index.js',
    publicPath: '/',
    clean: true,
  },
  externals: [nodeExternals()],
  node: {
    __dirname: false,
    __filename: false,
  },
});

export default serverCommonConfig;
