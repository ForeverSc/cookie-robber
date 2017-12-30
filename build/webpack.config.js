const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    background: './src/background/background.js',
    settings: './src/settings/main.js'
  },
  output: {
    path: path.join(__dirname, '../dev'),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          preserveWhitespace: false,
        }
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules|vue\/dist|vuex\/dist/
    }]
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'settings',
    filename: 'settings.html',
    chunks: ['settings']
  }), new CopyWebpackPlugin([{
    from: 'build/logo.png'
  }, {
    from: 'build/manifest.json'
  }])]
}