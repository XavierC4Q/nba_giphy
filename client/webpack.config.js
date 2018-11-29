const webpack = require('webpack');
const env = require('dotenv').config().parsed
require('@babel/polyfill')

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      }]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(envKeys)
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true,
    proxy: [{
      context: ['/user/**', '/favorite/**', '/v1/gifs/**'],
      target: 'http://[::1]:4000',
      secure: false
    }]
  }
}