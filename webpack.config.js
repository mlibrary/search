var webpack = require('webpack');

module.exports = {
  entry: './index',
  output: {
    path: './',
    filename: 'bundled.js'
  },
  devServer: {
    inline: true,
    port: 5000
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
