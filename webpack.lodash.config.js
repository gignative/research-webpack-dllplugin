var webpack = require('webpack');
var path = require('path')

module.exports = {
	mode: 'development',
  entry: {
    vendor: ['./vendor_lodash'],
  },
  output: {
    filename: 'vendor_lodash.bundle.js',
    path: path.resolve('dist/'),
    library: 'vendor_lodash_lib',
		libraryTarget: "window"
  },
  plugins: [new webpack.DllPlugin({
    name: 'vendor_lodash_lib',
    path: 'dist/vendor-lodash-manifest.json',
  })]
};