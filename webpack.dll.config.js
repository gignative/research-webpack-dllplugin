const webpack = require('webpack');
const path = require('path')
// const URLImportPlugin = require("webpack-external-import/webpack")

module.exports = {
	mode: 'development',
  entry: {
    vendor: ['./vendor'],
  },
  output: {
    filename: 'vendor.bundle.js',
    path: path.resolve('dist/'),
    library: 'vendor_lib',
		libraryTarget: "window"
  },
  plugins: [new webpack.DllPlugin({
    name: 'vendor_lib',
    path: 'dist/vendor-manifest.json',
  })]
};