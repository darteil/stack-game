const merge = require('webpack-merge');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const base = require('./webpack.base');

const distPath = path.resolve(__dirname, '../dist');
const publicPathFolder = path.resolve(__dirname, '../public/');

module.exports = (env, argv) => {
  let publicPath = '/stack';

  return merge(base(env, argv), {
    devtool: 'source-map',
    stats: 'errors-only',
    output: {
      path: distPath,
      filename: 'js/[name].[hash:8].js',
      publicPath: publicPath
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash].css'
      }),
      new ProgressBarPlugin(),
      new CleanWebpackPlugin([distPath], {
        root: path.resolve(__dirname, '../')
      }),
      new HtmlWebpackTagsPlugin({ tags: ['fonts/roboto.css'], append: true }),
      new CopyWebpackPlugin([
        {
          from: publicPathFolder,
          ignore: ['vendor/**/*']
        }
      ])
    ]
  });
};
