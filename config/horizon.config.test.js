const path = require('path');
const config = require('../src/horizon/defaultConfig');

module.exports = {
  path: path.resolve(__dirname, '../dist'),
  filename: 'horizon-test-styles.css',
  config,
}