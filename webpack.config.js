var webpack = require('webpack');

module.exports = {
  entry: './index',
  devServer: {
    inline: true,
    port: 5000
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loaders: [ 'style', 'css?sourceMap', 'sass' ]
      }
    ]
  },
  output: {
    path: './',
    filename: 'bundled.js'
  }
}
