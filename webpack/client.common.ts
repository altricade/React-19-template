import path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import commonConfig from './common';

const clientCommonConfig: webpack.Configuration = merge(commonConfig, {
  name: 'client',
  target: 'web',
  entry: './src/client/index.tsx',
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: 'js/[name].[contenthash].js',
    publicPath: '/',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
      filename: 'index.html',
      inject: true,
    }),
  ],
});

export default clientCommonConfig;
