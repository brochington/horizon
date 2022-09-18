const path = require('path');
const webpack = require('webpack');
const aliases = require('./aliases');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const colorFunction = require('postcss-color-function');
const horizon = require('../src/horizon/postCSSPlugins/horizon');

module.exports = (destination, horizonConfig) => {
  return {
    entry: [
      path.join(__dirname, '../src/site/client/index.tsx'),
      path.join(__dirname, '../src/horizon/styles/generation.css'),
    ],
    output: {
      path: destination,
      filename: 'horizon_site.js',
    },
    mode: 'production',
    resolve: {
      alias: {
        ...aliases,
      },
      extensions: ['.js', '.mjs', '.ts', '.tsx'],
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
              },
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  horizon(horizonConfig.config),
                  postcssPresetEnv({ stage: 0 }),
                  colorFunction({ preserveCustomProps: false }),
                ],
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Horizon Docs',
        template: path.join(__dirname, 'index.html'),
      }),
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
        __HORIZON_CONFIG__: JSON.stringify(horizonConfig),
      }),
    ],
  };
};
