import postcss from 'postcss';

type CompositionRecord = Record<string, string>;

interface Comp {
  classes: string[];
  className: string;
  styles: any[];
}

export const composer = postcss.plugin('composer', (comps: CompositionRecord) => {
  const _comps = Object.entries(comps).map(([className, classStr]): Comp => {
    return {
      classes: classStr.split(' '),
      className,
      styles: []
    }
  });

  return cssRoot => {
    cssRoot.walkRules(rule => {
      const cn = rule.selector
        .substring(1, rule.selector.length)
        .replace(/(\\.)/g, '.');

      _comps.forEach(c => {
       if (c.classes.includes(cn)) {
        //  console.log(rule.nodes);
         const copiedNodes = [...rule.nodes.map(n => n.clone())];
         console.log(copiedNodes);
         c.styles.push(rule.nodes)
       }
      });
    });

    console.log('_comps', _comps);

    _comps.forEach(c => {
      const { className, styles, classes } = c;
      const newRule = postcss.rule({
        selector: `.${className}`,
      });

      styles.forEach(s => newRule.append(s));

      console.log(newRule, newRule.toString());

      // cssRoot.insertAfter(cssRoot, newRule);
      cssRoot.append(newRule);
    });
  }
});

const compose = (comps: CompositionRecord, rawCSS: string) => {
  return new Promise((resolve) => {
    postcss([composer(comps)])
      .process(rawCSS)
      .then(result => resolve(result));
  });
}

export default compose;
