const path = require('path');

module.exports = {
  entry: [
    './src/horizon/index.ts'
  ],
  output: {
    libraryTarget: 'umd',
    library: 'horizon',
    path: path.join(__dirname, '../', 'dist'),
    filename: 'horizon.js',
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  resolve: {
    extensions: ['.js', '.mjs', '.ts', '.tsx']
  },
  mode: 'production',
  module: {
    rules: [{
      test: /\.ts$/,
        loader: 'babel-loader',
        include: path.join(__dirname, '../', 'src/horizon'),
        options: {
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-optional-chaining'
          ],
          presets: [
            '@babel/preset-typescript'
          ]
        }
    }]
  }
}