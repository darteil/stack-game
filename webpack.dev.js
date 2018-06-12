const merge = require('webpack-merge');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');
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
    port: 3000,
    historyApiFallback: true
  },
  plugins: [
    new ExtractTextPlugin('css/bundle.css'),
    new HtmlReplaceWebpackPlugin([
      {
        pattern: '@@public_url',
        replacement: ''
      }
    ]),
  ]
});