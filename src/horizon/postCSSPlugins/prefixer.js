const map = require('lodash/fp/map');
const toPairs = require('lodash/fp/toPairs');
const postcssLib = require('postcss');

/**
 * Creates classes that are prefixed and scoped to media queries
 */

const prefixer = (mediaQueries) => {
  return {
    postcssPlugin: 'prefixer',
    Once(root) {
      const newAtRules = map(([prefixKey, mediaQuery]) => {
        const atRule = postcssLib.parse(`@media ${mediaQuery} {}`);

        root.walkRules((rule) => {
          const currentSelector = rule.selector.substring(
            1,
            rule.selector.length
          );

          if (currentSelector) {
            const newRule = rule.clone({
              selector: `.${prefixKey}\\:${currentSelector}`,
            });

            atRule.first.append(newRule);
          }
        });

        return atRule;
      }, toPairs(mediaQueries));

      root.insertAfter(root, newAtRules);
    }
  }
}

module.exports = prefixer;
module.exports.postcss = true;
