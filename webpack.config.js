const webpack = require('webpack');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    main: ['./main']
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
  },
  output: {
    filename: '[name]_[contenthash].bundle.js',
    path: path.resolve('dist/')
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new webpack.DllReferencePlugin({
      scope: 'xxx',
      manifest: require('./dll_dist/vendor-manifest.json'),
    }),
    new webpack.DllReferencePlugin({
      scope: 'yyy',
      manifest: require('./dll_dist/vendor-lodash-manifest.json'),
    }),
    new webpack.DllReferencePlugin({
      scope: 'zzz',
      manifest: require('./dll_dist/vendor-lodash2-manifest.json'),
    }),
    new webpack.DllReferencePlugin({
      scope: 'monaco',
      manifest: require('./dist/vendor-monaco-manifest.json'),
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
};