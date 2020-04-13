import map from 'lodash/fp/map';
import toPairs from 'lodash/fp/toPairs';
import postcss from 'postcss';
import curry from 'lodash/fp/curry';

/**
 * Creates classes that are prefixed and scoped to a media queries
 */
const prefixer = postcss.plugin('prefixer', (mediaQueries: any) => {
  return cssRoot => {
    const newAtRules = map(([prefixKey, mediaQuery]) => {
      const atRule = postcss.parse(`@media ${mediaQuery} {}`);

      cssRoot.walkRules(rule => {
        const currentSelector = rule.selector.split('.')[1];

        if (currentSelector) {
          const newRule = rule.clone({
            selector: `.${prefixKey}-${currentSelector}`
          });

          atRule.first.append(newRule);
        }
      })

      return atRule;
    }, toPairs(mediaQueries));

    cssRoot.insertAfter(cssRoot, newAtRules);
  }
});

const prefix = curry((mediaQueries, rawCSS) => {
  return new Promise((resolve) => {
    postcss([prefixer(mediaQueries)])
      .process(rawCSS)
      .then(result => resolve(result));
  });
});

export default prefix;