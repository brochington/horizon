const postcssLib = require('postcss');

const composer = (comps) => {
  const _comps = Object.entries(comps).map(([className, classStr]) => {
    return {
      classes: classStr.split(' '),
      className,
      styles: [],
    };
  });

  return {
    postcssPlugin: 'composer',
    Once(root) {
      root.walkRules((rule) => {
        const cn = rule.selector
          .substring(1, rule.selector.length)
          .replace(/(\\)/g, '');

        _comps.forEach((c) => {
          if (c.classes.includes(cn)) {
            const copiedNodes = [...rule.nodes.map((n) => n.clone())];
            c.styles.push(copiedNodes);
          }
        });
      });

      _comps.forEach((c) => {
        const { className, styles, classes } = c;
        const newRule = postcssLib.rule({
          selector: `.${className}`,
        });

        styles.forEach((s) => newRule.append(s));

        root.append(newRule);
      });
    },
  };
};

module.exports = composer;
composer.postcss = true;