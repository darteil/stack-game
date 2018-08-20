const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const common = require('./webpack.common');

const publicPath = path.resolve(__dirname, './public');

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
    port: 4000,
    historyApiFallback: true
  },
  plugins: [
    new Dotenv({ path: './.env' }),
    new ExtractTextPlugin('css/bundle.css'),
    new HtmlReplaceWebpackPlugin([
      {
        pattern: '@@url',
        replacement: ''
      }
    ]),
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, 'public/vendor'),
      manifest: require('./public/vendor/vendor-manifest')
    }),
  ]
});