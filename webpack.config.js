/* eslint-env node */
'use strict'

// const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const ForceCaseSensitivityPlugin = require('force-case-sensitivity-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

const mode = process.env.BUILD_MODE || 'development'

module.exports = {
  mode,
  context: __dirname,
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].min.js',
    publicPath: '/',
  },
  devtool: 'source-map',
  module: {
    rules: [
      { parser: { amd: false } },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [/src\//],
        use: [
          {
            loader: 'eslint-loader',
            options: {
              quiet: false,
              failOnError: mode !== 'development',
              emitError: true,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        include: [/src/],
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    // Writes styles.css to disk.
    // new ExtractTextWebpackPlugin('[name].css'),
    new ForceCaseSensitivityPlugin(),
    new HtmlWebpackPlugin(),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
  ],
  resolve: {
    modules: [
      path.join('./src'),
      // This significantly speeds up build times.
      path.join('./node_modules'),
    ],
  },
  externals: {
  },
  // Webpack hosts the files here. Also serves as a reverse proxy to
  // localProxy/proxy.js.
  devServer: {
    host: '0.0.0.0',
    compress: true,
    disableHostCheck: true,
    port: 8080,
    contentBase: path.join(__dirname, 'dist'),
  },
}
