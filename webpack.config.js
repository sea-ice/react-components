let path = require('path')
let webpack = require('webpack')
let CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    examples: resolve('./examples/index.js'),
  },
  output: {
    publicPath: '/',
    path: resolve('./dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }, {
      test: /\.css$/,
      exclude: /examples\/assets/,
      use: [
        'style-loader', 
        'css-loader?modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
      ]
    }, {
      test: /\.css$/,
      include: /examples\/assets/, // important
      use: [
        'style-loader', 
        'css-loader'
      ]
    }]
  },
  devServer: {
    inline: true,
    open: true,
    hot: true,
    publicPath: '/',
    contentBase: resolve('./dist')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([{
      from: './examples/index.html',
      to: resolve('./dist/')
    }])
  ]
}

function resolve(p) {
  return path.resolve(__dirname, p)
}
