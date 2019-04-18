const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const { commonMainConfig } = require('./webpack.common');

module.exports = merge.smart(commonMainConfig, {
  watch: true,
  entry: './src/index.tsx',
  target: 'web',
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0',
    hot: true,
    port: 3000,
    publicPath: '/',
    historyApiFallback: true,
    disableHostCheck: true,
    overlay: true,
  },
});
