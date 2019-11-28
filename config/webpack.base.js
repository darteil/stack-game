const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const indexFilePath = path.resolve(__dirname, '../src/index.jsx');

module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production';

  return {
    entry: indexFilePath,
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true
              }
            }
          ]
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: 'img/[hash].[ext]'
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false,
                importLoaders: 1,
                localIdentName: '[path][name]__[local]__[hash:base64:5]',
                modules: true
              }
            }
          ]
        },
        {
          test: /\.glsl$/,
          use: [
            {
              loader: 'webpack-glsl-loader'
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(__dirname, '../public/index.html'),
        filename: 'index.html'
      })
    ]
  };
};
