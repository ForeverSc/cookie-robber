import entry from '../config/entry'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export function genHtmlWebpackPlugins () {
  const htmlPlugins = []

  Object.keys(entry).forEach(key => {
    htmlPlugins.push(
      new HtmlWebpackPlugin({
        title: key,
        filename: `${key}.html`,
        template: 'template/index.html',
        chunks: [key]
      })
    )
  })

  return htmlPlugins
}
