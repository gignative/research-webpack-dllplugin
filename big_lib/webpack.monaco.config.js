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
    vendor: ['./monaco'],
  },
  // optimization: {
  //   minimize: true,
  //   minimizer: [new TerserPlugin()]
  // },
  output: {
    filename: 'monaco.dll.js',
    // path: path.resolve(cwd, 'dll/monaco/'),
    path: path.resolve(__dirname, '../dll/monaco/'),
    library: 'vendor_monaco_lib',
		libraryTarget: "window",
    publicPath: 'dll/monaco/'
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: 'vendor_monaco_lib',
      path: path.resolve(__dirname, '../dll/monaco/manifest.json'),
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