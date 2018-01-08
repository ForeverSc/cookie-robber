import path from 'path'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import UglifyjsPlugin from 'uglifyjs-webpack-plugin'
import { genHtmlWebpackPlugins } from './plugins'

export default function (env = {}, arg) {
  const isProduction = env.production
  const plugins = [
    new ExtractTextPlugin({
      filename: '[name].css'
    }),
    ...genHtmlWebpackPlugins(),
    new CopyWebpackPlugin([{
      from: 'config/logo.png'
    }, {
      from: 'config/manifest.json'
    }])
  ]

  if (isProduction) {
    plugins.push(new UglifyjsPlugin({}))
  }

  return {
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
          preserveWhitespace: false
        }
      }, {
        test: /\.css$/,
        loaders: ExtractTextPlugin.extract({
          use: ['css-loader']
        })
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules|vue\/dist|vuex\/dist/
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader'
      }]
    },
    plugins
  }
}
