const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const indexFilePath = path.resolve(__dirname, './src/index.js');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, './public/index.html'),
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  entry: indexFilePath,
  resolve: {
    alias: {
      'App': path.resolve(__dirname, './src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use:[
          {
            loader:'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'img/[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              localIdentName: '[path][name]__[local]__[hash:base64:5]',
              modules: true, // Note. This prop enables CSS modules.
            },
          },
          publicPath: '/'
        })
      }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig
  ],

};