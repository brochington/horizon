const postcssLib = require('postcss');
const curry = require('lodash/fp/curry');

const pseudoSelectorPlugin = () => {
  return {
    postcssPlugin: "pseudoSelector",
    Once(root) {
      root.walkRules(rule => {
        const newRule = rule.clone({
          selector: `${rule.selector}${postfix}:${pseudoSelector}`
        });
  
        rule.replaceWith(newRule);
      });
    }
  }
}
module.exports.pseudoSelectorPlugin = pseudoSelectorPlugin;

const addPostfixAndPseudoClass = curry((postfix, pseudoSelector, rawCSS) => {
  return new Promise((resolve) => {
    postcssLib([pseudoSelectorPlugin(postfix, pseudoSelector)])
      .process(rawCSS, { from: undefined })
      .then(r => resolve(r))
  });
});

module.exports = addPostfixAndPseudoClass;
module.exports.postcss = true;