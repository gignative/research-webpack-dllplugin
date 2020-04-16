const webpack = require('webpack');
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
	mode: 'development',
  entry: {
    vendor: ['lodash'],
  },
  output: {
    filename: 'vendor_lodash2.bundle.js',
    path: path.resolve('dll_dist/'),
    library: 'vendor_lodash2_lib',
		libraryTarget: "window"
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      context: 'node_modules',
      name: 'vendor_lodash2_lib',
      path: 'dll_dist/vendor-lodash2-manifest.json',
    })
  ]
};