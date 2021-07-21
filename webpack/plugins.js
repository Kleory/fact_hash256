const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotEnv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = function ({ isProduction }) {
  const plugins = [
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: 'style.[id].[contenthash].css',
      chunkFilename: isProduction ? '[id].css' : '[id].[contenthash].css',
    }),

    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      jsExtension: '.br',
      template: path.resolve(__dirname, '../src/index_template.html'),
      filename: 'index.html',
    }),

    new DotEnv({
      path: path.resolve(__dirname, '../.env'),
      safe: true,
      systemvars: true,
      silent: true,
      defaults: false,
    }),
  ];

  if (isProduction) {
    plugins.push(
      new BrotliPlugin({
        asset: '[path].br[query]',
        test: /\.(js|css|html|svg|json)$/,
        threshold: 10240,
        minRatio: 0.8,
      })
    );
  }

  return {
    plugins,
  };
};
