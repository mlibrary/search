var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html'
});

module.exports = {
  entry: './app/index.js',
  devServer: {
    inline: true,
    port: 5000
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: __dirname + '/app',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loaders: [ 'style', 'css', 'sass' ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'url-loader?limit=8192'
        ]
      }
    ]
  },
  output: {
    filename: 'bundled.js',
    path: __dirname + '/build'
  },
  plugins: [HTMLWebpackPluginConfig]
}
