const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const common = require('./webpack.common');

const publicPath = path.resolve(__dirname, './public');
const dllDirectory = path.resolve(__dirname, './dll');

module.exports = merge(common, {
  devtool: 'source-map',
  devServer: {
    contentBase: publicPath,
    stats: {
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      colors: true,
      modules: false,
      children: false,
    },
    overlay: true,
    port: 3000,
    historyApiFallback: true
  },
  plugins: [
    new ExtractTextPlugin('css/bundle.css'),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(path.join(dllDirectory, '/vendor.json')),
    })
  ]
});