const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const aliases = require('./aliases');

const cwd = process.cwd();

module.exports = {
  entry: [
    path.resolve(cwd, 'src/site/client/index.tsx'),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(process.cwd(), 'dist'),
    clean: true,
  },
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      ...aliases,
    },
    extensions: ['.js', '.mjs', '.ts', '.tsx', '.wasm'],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        include: path.join(process.cwd(), 'src/site/client'),
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
              },
              transform: {
                react: {
                  development: true,
                  refresh: true,
                },
              },
            },
          },
        },
      },
      {
        test: /\.m?js$/,
        include: path.join(process.cwd(), 'src/site/client'),
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              transform: {
                react: {
                  development: true,
                  refresh: true,
                },
              },
            },
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
    new HtmlWebpackPlugin({
      title: 'Horizon',
      template: path.join(process.cwd(), 'config/indexTemplate.html'),
      filename: 'index.html',
    }),
    new ReactRefreshWebpackPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
    compress: true,
    port: 9010,
    hot: true,
  },
};
