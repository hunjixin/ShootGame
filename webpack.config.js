const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const babel=require('babel-polyfill')

let publishPath = path.join(__dirname, 'lib')
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
      loader: 'url-loader?limit=8192&name=/image/[name].[ext]'
    }
  ]
}

module.exports = [
  {
    name: 'lib',
    devtool: devtool,
    entry: [
      './src/shotGame/ShotGame.js'
    ],
    output: {
      path: publishPath,
      filename: 'shotGame.js',
      libraryTarget: "commonjs2",
      library: "ShotGame"
    },
    module: requireModule,
    devServer: { contentBase: './src'},
    node: {
      __dirname: false
    }
  }
]

