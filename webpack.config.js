const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const APP_PATH = path.join(__dirname, 'src');

const config = {
  entry: {
    'react-expandable-table': path.join(APP_PATH, 'index.js')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    library: 'react-expandable-table',
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
              includePaths: [APP_PATH]
            }
          }
        ]
      }
    ]
  },
  plugins: [new ProgressBarPlugin()]
};

module.exports = config;
