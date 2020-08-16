const merge = require('webpack-merge');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const base = require('./webpack.base');

const distPath = path.resolve(__dirname, '../dist');
const publicPathFolder = path.resolve(__dirname, '../public');

module.exports = (env, argv) => {
  let publicPath = '/stack';

  return merge(base(env, argv), {
    stats: 'errors-only',
    output: {
      path: distPath,
      filename: 'js/[name].[hash:8].js',
      publicPath: publicPath
    },
    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
    },
    plugins: [
      new ProgressBarPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash].css'
      }),
      new CleanWebpackPlugin([distPath], {
        root: path.resolve(__dirname, '../')
      }),
      new HtmlWebpackTagsPlugin({ tags: ['fonts/roboto.css'], append: true }),
      new CopyWebpackPlugin({
        patterns: [
          {
            globOptions: {
              ignore: ['vendor/**/*']
            },
            from: publicPathFolder,
            to: distPath
          }
        ]
      })
    ]
  });
};
