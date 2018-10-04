const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    vendor: [path.join(__dirname, 'vendors.js')]
  },
  output: {
    path: path.join(__dirname, 'public/vendor'),
    filename: 'dll.[name].js',
    library: '[name]_[hash]'
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
            sequences: true,
            booleans: true,
            loops: true,
            unused: true,
            warnings: false,
            drop_console: true,
            unsafe: true
          },
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'public/vendor', '[name]-manifest.json'),
      name: '[name]_[hash]',
      context: path.resolve(__dirname, 'public/vendor')
    })
  ],
  resolve: {
    modules: ['node_modules']
  }
};

