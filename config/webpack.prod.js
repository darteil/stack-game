const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const common = require('./webpack.base');

const distPath = path.resolve(__dirname, '../dist');
const publicPathFolder = path.resolve(__dirname, '../public');

module.exports = () => {
  let publicPath = '';

  return merge(common, {
    devtool: 'source-map',
    output: {
      path: distPath,
      filename: 'js/[name].[hash:8].js',
      publicPath: publicPath
    },
    plugins: [
      new CleanWebpackPlugin(
        [distPath],
        {
          root: path.resolve(__dirname, '../'),
        }
      ),
      new webpack.DllReferencePlugin({
        context: path.join(__dirname, '../public/vendor'),
        manifest: require('../public/vendor/vendor-manifest')
      }),
      new CopyWebpackPlugin([
        { from: publicPathFolder }
      ])
    ]
  });
};
