const webpack = require('webpack');
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
	mode: 'development',
  entry: {
    vendor: ['./vendor'],
  },
  output: {
    filename: 'vendor.dll.js',
    path: path.resolve('dll/vendor/'),
    library: 'vendor_lib',
		libraryTarget: "window"
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: 'vendor_lib',
      path: 'dll/vendor/manifest.json',
    })
  ]
};