const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const colorFunction = require('postcss-color-function');
const { horizon, defaultConfig } = require(path.join(__dirname, '../dist/horizon'));

module.exports = {
  entry: [
    path.join(process.cwd(), 'src/horizon/styles/generation.css')
  ],
  output: {
    filename: 'delete-me.js',
    path: path.join(process.cwd(), 'dist')
  },
  mode: 'development',
  module: {
    rules: [{
      test: /\.css$/,
      use: [{
        loader: MiniCssExtractPlugin.loader
      }, {
        loader: 'css-loader',
        options: {
          importLoaders: 1
        }
      }, {
        loader: 'postcss-loader',
        options: {
          plugins: loader => [
            horizon,
            postcssPresetEnv({ stage: 0 }),
            colorFunction({ preserveCustomProps: false })
          ]
        }
      }]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'horizon-default-styles.css'
    })
  ]
}