const webpack = require('webpack');
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
	mode: 'development',
  entry: {
    vendor: ['./vendor_lodash'],
  },
  output: {
    filename: 'vendor_lodash.bundle.js',
    path: path.resolve('dll_dist/'),
    library: 'vendor_lodash_lib',
		libraryTarget: "window"
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: 'vendor_lodash_lib',
      path: 'dll_dist/vendor-lodash-manifest.json',
    })
  ]
};