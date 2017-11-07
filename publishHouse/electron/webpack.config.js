const htmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const webpack=require('webpack')
const autoprefixer = require('autoprefixer')

// const ExtractCss = new ExtractTextPlugin('style/[name]_[hash:8].css')
// const ExtractLess = new ExtractTextPlugin('style/[name]_[hash:8].css')

module.exports = {
  devtool: 'source-map',
  entry: {
    main: './dev/main.js',
    index: './dev/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'pub'),
    publicPath: '/pub/',
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {loader: 'html-loader'}
        ]

      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [
                    autoprefixer({
                      broswers: ['last 5 versions']
                    })
                  ]
                }
              }
            }
          ]
        })
      },
      {
        test: /\.js|jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery'
    }),
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: 'body',
      title: 'Ilasm',
      chunks: ['index']
    }),
       new ExtractTextPlugin('style/[name]_[hash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE.ENV': 'development'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: __dirname + '/pub'
  },
  target: 'electron'
}