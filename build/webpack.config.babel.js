import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

export default {
  entry: {
    background: './src/background/background.js',
    settings: './src/settings/main.js'
  },
  output: {
    path: path.join(__dirname, '../dist'),
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