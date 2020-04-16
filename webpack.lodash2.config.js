var webpack = require('webpack');
var path = require('path')

module.exports = {
	mode: 'development',
  entry: {
    vendor: ['lodash'],
  },
  output: {
    filename: 'vendor_lodash2.bundle.js',
    path: path.resolve('dist/'),
    library: 'vendor_lodash2_lib',
		libraryTarget: "window"
  },
  plugins: [new webpack.DllPlugin({
    context: 'node_modules',
    name: 'vendor_lodash2_lib',
    path: 'dist/vendor-lodash2-manifest.json',
  })]
};