const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: [path.join(__dirname, '../vendors.js')]
  },
  output: {
    path: path.join(__dirname, '../public/vendor'),
    filename: 'dll.[name].js',
    library: '[name]_[hash]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../public/vendor', '[name]-manifest.json'),
      name: '[name]_[hash]',
      context: path.resolve(__dirname, '../public/vendor')
    })
  ],
  resolve: {
    modules: ['node_modules']
  }
};

