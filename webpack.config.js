const path = require('path');

const SOURCE_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist');

module.exports = {
  mode: 'development',
  entry: SOURCE_DIR,
  output: {
    path: DIST_DIR,
    filename: 'app.js',
  },
  watch: true,
  devtool: 'source-map',
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.(js|jsx)$/,
      exclude: /node_modules|data/,
      loader: 'eslint-loader',
      options: {
        emitWarning: true,
        configFile: './eslintrc.json',
      }
    }, {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
          ]
        }
      }
    }, {
      test: /\.css$/,  
      include: /node_modules/,  
      loaders: ['style-loader', 'css-loader'],
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      use: ['style-loader', 'css-loader'],
    }]
  }
}