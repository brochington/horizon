const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require(path.join(process.cwd(), 'config/webpack.config.docgen.dev.js'));

const PORT = 3123;

const html = fs.readFileSync(path.join(__dirname, 'index.html'), {
  encoding: 'utf8'
});

const compiler = webpack(webpackConfig)

const app = express();

app.use(
  devMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  })
)

app.use(hotMiddleware(compiler));

app.get('*', (req, res) => {
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Horizon dev docs are running on port ${PORT}`);
})