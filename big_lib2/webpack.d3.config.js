const webpack = require('webpack');
const path = require('path')
const ManifestPlugin = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
	mode: 'development',
  entry: {
    d3: ['./d3'],
  },
  output: {
    filename: 'd3.dll.js',
    path: path.resolve(__dirname, '../dll/d3/'),
    library: 'd3_dll',
		libraryTarget: "window",
    publicPath: 'dll/d3/'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: 'd3_dll',
      path: path.resolve(__dirname, '../dll/d3/manifest.json'),
    }),
    new ManifestPlugin({
      fileName: 'file_manifest.json'
    })
  ],
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.ttf$/,
      use: ['file-loader']
    }]
  }
};