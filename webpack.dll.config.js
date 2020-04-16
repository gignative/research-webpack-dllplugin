var webpack = require('webpack');
var path = require('path')

module.exports = {
	mode: 'development',
  entry: {
    vendor: ['./vendor'],
  },
  output: {
    filename: 'vendor.bundle.js',
    path: path.resolve('build/'),
    library: 'vendor_lib',
		libraryTarget: "window"
  },
  plugins: [new webpack.DllPlugin({
    name: 'vendor_lib',
    path: 'build/vendor-manifest.json',
  })]
};