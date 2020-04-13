import postcss from 'postcss';
import curry from 'lodash/fp/curry';

const pseudoSelectorPlugin = postcss.plugin('pseudoSelectorPlugin', (postfix: string, pseudoSelector: string) => {
  return (cssRoot) => {
    cssRoot.walkRules(rule => {
      const newRule = rule.clone({
        selector: `${rule.selector}${postfix}:${pseudoSelector}`
      });

      rule.replaceWith(newRule);
    });
  };
});

const addPostfixAndPseudoClass = curry((postfix, pseudoSelector, rawCSS) => {
  return new Promise((resolve) => {
    postcss([pseudoSelectorPlugin(postfix, pseudoSelector)])
      .process(rawCSS)
      .then(r => resolve(r))
  });
});

export { pseudoSelectorPlugin };
export default addPostfixAndPseudoClass;