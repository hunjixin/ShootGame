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
      './src/engine.js'
    ],
    output: {
      path: publishPath,
      filename: 'engine.js',
      libraryTarget: "var",
      library: "Engine"
    },
      externals: {
 
      },

    module: requireModule,
    resolve: { },
    devServer: { contentBase: './js'}
  }
]