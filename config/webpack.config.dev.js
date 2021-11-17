const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const aliases = require('./aliases');

const cwd = process.cwd();

const babelLoaderConfig = {
  loader: 'babel-loader',
  options: {
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-nullish-coalescing-operator',
      'react-refresh/babel'
    ],
    presets: [
      '@babel/preset-typescript',
      '@babel/preset-react',
    ]
  }
};

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(cwd, 'src/site/client/index.tsx')
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
    rules: [{
      test: /\.ts(x?)$/,
      include: path.join(cwd, 'src/site/client'),
      use: [babelLoaderConfig]
    }, {
      test: /\.m?js$/,
      include: path.join(cwd, 'src/site/client'),
      use: [babelLoaderConfig]
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Primordial',
      template: path.join(process.cwd(), 'config/indexTemplate.html'),
      filename: 'index.html',
    }),
  ],
  devServer: {
    historyApiFallback: true,
    compress: true,
    port: 9010,
    hot: true
  },
}