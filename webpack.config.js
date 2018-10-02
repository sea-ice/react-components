let path = require('path')
let webpack = require('webpack')
// let CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  // entry: {
  //   examples: resolve('./examples/index.js'),
  // },
  // output: {
  //   publicPath: '/',
  //   path: resolve('./dist'),
  //   filename: '[name].bundle.js'
  // },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }, {
      test: /\.css$/,
      exclude: /md-preview-default\.css/,
      use: [
        'style-loader', 
        'css-loader?modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
      ]
    }, {
      test: /\.css$/,
      include: /md-preview-default\.css/, // important
      // 这部分样式不经过css-module处理
      use: [
        'style-loader', 
        'css-loader'
      ]
    }, {
      test: /\.(jpe?g|png|svg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }]
    }]
  },
  resolve: {
    alias: {
      '@components': resolve('src/components')
    }
  },
  devServer: {
    inline: true,
    open: true,
    hot: true,
    publicPath: '/',
    contentBase: resolve('./dist')
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new CopyWebpackPlugin([{
    //   from: './examples/index.html',
    //   to: resolve('./dist/')
    // }])
  ]
}

function resolve(p) {
  return path.resolve(__dirname, p)
}
