const merge = require('webpack-merge');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common');

const distPath = path.resolve(__dirname, './dist');
const publicPathFolder = path.resolve(__dirname, './public');

module.exports = () => {
  return merge(common, {
    devtool: 'source-map',
    output: {
      path: distPath,
      filename: 'js/[name].[hash:8].js'
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          uglifyOptions: {
            beautify: false,
            comments: false,
            compress: {
              sequences     : true,
              booleans      : true,
              loops         : true,
              unused      : true,
              warnings    : false,
              drop_console: true,
              unsafe      : true
            },
            ecma: 6,
            mangle: true
          },
          sourceMap: true
        })
      ]
    },
    plugins: [
      new ExtractTextPlugin('css/bundle.[hash:8].css'),
      new CleanWebpackPlugin(
        [publicPathFolder]
      ),
      new CopyWebpackPlugin([
        { from: publicPathFolder }
      ])
    ]
  });
};