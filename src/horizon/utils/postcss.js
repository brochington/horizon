const postcssLib = require('postcss');

module.exports.runPostCSS = async function runPostCSS(plugins, css) {
  const result = postcssLib(plugins)
    .process(css, { from: undefined });

  return result;
}