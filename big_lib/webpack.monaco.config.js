const webpack = require('webpack');
const path = require('path')
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// For more info see this: https://github.com/microsoft/monaco-editor-webpack-plugin
module.exports = {
	mode: 'development',
  entry: {
    vendor: ['./monaco'],
  },
  // optimization: {
  //   minimize: true,
  //   minimizer: [new TerserPlugin()]
  // },
  output: {
    // TODO make wiring for 'monaco_[hash].dll.js'
    filename: 'monaco.dll.js',
    path: path.resolve(__dirname, '../dll/monaco/'),
    library: '[name]_[hash]_dll',
		libraryTarget: "window",
    publicPath: 'dll/monaco/'
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: '[name]_[hash]_dll',
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