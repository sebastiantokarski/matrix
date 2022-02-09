const path = require('path')
const fs = require('fs')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const SOURCE_DIR = path.resolve(__dirname, 'src')
const DIST_DIR = path.resolve(__dirname, 'dist')

const appDirectory = fs.realpathSync(process.cwd())
const resolveAppPath = (relativePath) =>
  path.resolve(appDirectory, relativePath)

module.exports = {
  mode: 'development',
  entry: SOURCE_DIR,
  output: {
    filename: 'static/js/bundle.js',
  },
  devServer: {
    static: {
      directory: resolveAppPath('public'),
    },
    compress: true,
    port: 3000,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      exclude: ['node_modules', 'src/data/*.js'],
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: resolveAppPath('public/index.html'),
    }),
  ],
}
