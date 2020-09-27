/* eslint-env node */
const ForceCaseSensitivityPlugin = require('force-case-sensitivity-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

const mode = process.env.BUILD_MODE || 'development'

module.exports = {
  mode,
  context: __dirname,
  entry: {
    main: './src/index.tsx',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].min.js',
    publicPath: '/',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'ts-loader' },
        ],
      },
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
        test: /(?<!\.m)\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.m\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'dts-css-modules-loader',
            options: {
              namedExport: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]_[local]_[hash:base64]',
              },
              importLoaders: 2,
              sourceMap: true,
            },
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
      // This significantly speeds up build times.
      path.join('./src'),
      path.join('./node_modules'),
    ],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.tsx', '.js'],
  },
  externals: {
  },
  devServer: {
    host: '0.0.0.0',
    compress: true,
    disableHostCheck: true,
    port: 8080,
    contentBase: path.join(__dirname, 'dist'),
  },
}
