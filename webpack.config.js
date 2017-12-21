const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const APP_PATH = path.resolve(__dirname, 'src');

const config = {
  entry: path.join(APP_PATH, 'Table.jsx'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    library: 'aw-table',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              data: '@import "src/variables";',
              includePaths: [path.join(__dirname, 'src')]
            }
          }
        ]
      }
    ]
  },
  plugins: [new ProgressBarPlugin()]
};

module.exports = config;
