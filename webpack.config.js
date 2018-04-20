let path = require('path'),
    webpack = require('webpack'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin')

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
      use: [
        'style-loader', 
        'css-loader?modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
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
    new ExtractTextPlugin({
      filename: '[name].style.css'
    }),
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
