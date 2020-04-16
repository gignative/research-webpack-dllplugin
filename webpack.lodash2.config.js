const webpack = require('webpack');
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
	mode: 'development',
  entry: {
    vendor: ['lodash'],
  },
  output: {
    filename: 'lodash2.dll.js',
    path: path.resolve('dll/lodash2/'),
    library: 'vendor_lodash2_lib',
		libraryTarget: "window"
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      context: 'node_modules',
      name: 'vendor_lodash2_lib',
      path: 'dll/lodash2/manifest.json',
    })
  ]
};