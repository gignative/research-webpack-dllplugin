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
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      MONACO_DLL_PATH: JSON.stringify(require('./dll/monaco/file_manifest.json')['monaco.js'])
    }),
    new webpack.DllReferencePlugin({
      scope: 'xxx',
      manifest: require('./dll/vendor/manifest.json'),
    }),
    new webpack.DllReferencePlugin({
      scope: 'yyy',
      manifest: require('./dll/lodash/manifest.json'),
    }),
    new webpack.DllReferencePlugin({
      scope: 'zzz',
      manifest: require('./dll/lodash2/manifest.json'),
    }),
    new webpack.DllReferencePlugin({
      scope: 'monaco',
      manifest: require('./dll/monaco/manifest.json'),
    }),
    new webpack.DllReferencePlugin({
      scope: 'd3',
      manifest: require('./dll/d3/manifest.json'),
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
};