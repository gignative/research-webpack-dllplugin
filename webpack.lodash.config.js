const webpack = require('webpack');
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
	mode: 'development',
  entry: {
    vendor: ['./vendor_lodash'],
  },
  output: {
    filename: 'lodash.dll.js',
    path: path.resolve('dll/lodash/'),
    library: 'vendor_lodash_lib',
		libraryTarget: "window"
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: 'vendor_lodash_lib',
      path: 'dll/lodash/manifest.json',
    })
  ]
};