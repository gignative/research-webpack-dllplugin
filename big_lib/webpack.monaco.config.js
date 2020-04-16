const webpack = require('webpack');
const path = require('path')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// const cwd = process.cwd()

// For more info see this: https://github.com/microsoft/monaco-editor-webpack-plugin
module.exports = {
  // context: cwd,
	mode: 'development',
  entry: {
    // vendor: [path.resolve(__dirname, 'vendor_monaco')],
    vendor: ['./vendor_monaco'],
  },
  // optimization: {
  //   minimize: true,
  //   minimizer: [new TerserPlugin()]
  // },
  output: {
    filename: 'vendor_monaco.bundle.js',
    // path: path.resolve(cwd, 'dist/'),
    path: path.resolve(__dirname, '../dist/'),
    library: 'vendor_monaco_lib',
		libraryTarget: "window",
    publicPath: 'dist/'
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: 'vendor_monaco_lib',
      // path: path.resolve(cwd, 'dist/vendor-monaco-manifest.json'),
      path: path.resolve(__dirname, '../dist/vendor-monaco-manifest.json'),
    }),
    new MonacoWebpackPlugin({
      filename: '[name].worker.[contenthash].js',
			languages: ["typescript", "javascript", "css"],
		})
  ],
  module: {
    // monaco specific
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.ttf$/,
      use: ['file-loader']
    }]
  }
};