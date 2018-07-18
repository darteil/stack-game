const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const dllDirectory = path.resolve(__dirname, './dll');

module.exports = {
  performance: {
    hints: false
  },
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'three',
      'three-addons',
      'three-orbit-controls',
      'three-projector-renderer',
      'three.js-projector'
    ]
  },
  output: {
    filename: '[name].js',
    path: dllDirectory,
    library: '[name]_[hash]'
  },
  plugins: [
    new CleanWebpackPlugin([dllDirectory]),
    new webpack.DllPlugin({
      context: dllDirectory,
      name: '[name]_[hash]',
      path: path.join(dllDirectory, '[name].json')
    })
  ],
  resolve: {
    modules: ['node_modules']
  }
};
