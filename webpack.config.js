const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const webpack = require('webpack');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
});

const basePath = path.resolve(__dirname, 'dist');

const config = {
  entry: './src/index.jsx',
  output: {
    filename: '[name].bundle.js',
    path: basePath,
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: basePath,
    hot: true
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
      }
    ]
  },
  plugins: [HtmlWebpackPluginConfig, new webpack.HotModuleReplacementPlugin(), new ProgressBarPlugin()]
};

module.exports = config;
