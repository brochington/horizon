const path = require('path');
const webpack = require('webpack');
const aliases = require('./aliases');
const cwd = process.cwd();

const babelLoaderConfig = {
  loader: 'babel-loader',
  options: {
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-optional-chaining',
      // '@babel/plugin-proposal-object-rest-spread',
      'react-hot-loader/babel'
    ],
    presets: [
      '@babel/preset-react',
      '@babel/preset-typescript'
    ]
  }
};

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(cwd, 'src/site/client/index.tsx')
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/static/'
  },
  mode: 'development',
  devtool: 'eval-source-map',
  resolve: {
    alias: {
      ...aliases,
      'react-dom': '@hot-loader/react-dom'
    },
    extensions: ['.js', '.mjs', '.ts', '.tsx'],
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
    new webpack.HotModuleReplacementPlugin()
  ]
}