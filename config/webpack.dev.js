const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base.js');

const publicPath = path.resolve(__dirname, '../public');

module.exports = (env, argv) =>
  merge(base(env, argv), {
    devtool: 'source-map',
    devServer: {
      contentBase: publicPath,
      stats: 'errors-only',
      overlay: true,
      port: 4000,
      historyApiFallback: true
    }
  });
