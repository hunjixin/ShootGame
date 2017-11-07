const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

let publishPath = path.join(__dirname, '../lib')
let devtool = 'source-map'

let requireModule = {
  rules: [
    {
      test: /\.js/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.(png|jpg|jpeg|gif)$/,
      loader: 'url-loader?limit=8192&name=images/[name].[ext]'
    }
  ]
}

module.exports = [
  {
    name: 'demo',
    devtool: devtool,
    entry: [
      './js/engne.js'
    ],
    output: {
      path: publishPath,
      filename: 'engne.js'
    },
    module: requireModule,
    resolve: { },
    devServer: { contentBase: './js'}
  }
]