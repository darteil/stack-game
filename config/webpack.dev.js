const merge = require('webpack-merge');
const path = require('path');
const base = require('./webpack.base');

const publicPath = path.resolve(__dirname, '../public');

module.exports = (env, argv) => merge(base(env, argv), {
  devtool: 'source-map',
  devServer: {
    contentBase: publicPath,
    stats: 'errors-only',
    overlay: true,
    port: 4000,
    historyApiFallback: true
  }
});
