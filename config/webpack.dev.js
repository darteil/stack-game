const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const base = require('./webpack.base');

const publicPath = path.resolve(__dirname, '../public');

module.exports = merge(base, {
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
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, 'public/vendor'),
      manifest: require('../public/vendor/vendor-manifest')
    })
  ]
});
