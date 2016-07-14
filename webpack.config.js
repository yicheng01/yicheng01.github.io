var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    './script/index',
  ],
  output: {
      publicPath: '/',
      filename: 'main.js'
  },
  exclude: [
  path.resolve(__dirname, "node_modules"),
  ],

  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      { 
        test: /\.js$/,
        include: path.join(__dirname, 'script'),
        loader: 'babel-loader',
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015','stage-0']
        }
      },
    ]
  },
};