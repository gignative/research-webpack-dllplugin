var webpack = require('webpack');
var path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    main: ['./main'],
  },
  output: {
    filename: 'main.bundle.js',
    path: path.resolve('build/'),
  },
  plugins: [
    new webpack.DllReferencePlugin({
      // context: '.',
      scope: 'xxx',
      manifest: require('./build/vendor-manifest.json'),
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
};