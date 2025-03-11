import webpack from 'webpack';
import { merge } from 'webpack-merge';
import path from 'path';
import serverCommon from './server.common';

// Use require for modules without proper type definitions
const DotenvWebpack = require('dotenv-webpack');

const serverProdConfig: webpack.Configuration = merge(serverCommon, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimize: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new DotenvWebpack({
      path: path.resolve(__dirname, '../.env.production'),
      defaults: path.resolve(__dirname, '../.env'),
      systemvars: true,
    }),
  ],
});

export default serverProdConfig;
