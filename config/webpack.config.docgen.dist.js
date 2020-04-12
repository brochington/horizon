const path = require('path');
const webpack = require('webpack');
const aliases = require('./aliases');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (destination /*, cssVars */) => {
  return {
    entry: [
      path.join(__dirname, '../src/site/client/index.ts')
    ],
    output: {
      path: destination,
      filename: 'horizon_site.js'
    },
    mode: 'development', // is this right?
    resolve: {
      alias: {
        ...aliases
      }
    },
    module: {
      rules: [{
        test: /\.ts(x?)$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src/site/client'),
        options: {
          plugins: [
            ['@babel/plugin-transform-runtime', {
              'helpers': false,
              'regenerator': true
            }],
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-optional-chaining'
          ],
          presets: [
            '@babel/preset-react',
            '@babel/preset-typescript'
          ]
        }
        // use: [babelLoaderConfig]
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
      new HtmlWebpackPlugin({
        title: 'Horizon Docs',
        template: path.join(__dirname, 'index.html')
      })
    ]
  }
}