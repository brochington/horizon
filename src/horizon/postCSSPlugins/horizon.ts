import postcss from 'postcss';
import has from 'lodash/has';
import entries from 'lodash/entries';

import colorString from 'color-string';

import variableFormatter from '../utils/variableFormatter';
import defaultConfig, { HorizonConfig } from '../defaultConfig';

import sanitizeCSS from '!raw-loader!sanitize.css';

const createRGBVariables = (coloroptions) => {
  return entries(coloroptions).map(([colorName, hexValue]) => {
    const [red, green, blue] = colorString.get.rgb(hexValue);

    return `--${colorName}-rgb: ${red}, ${green}, ${blue};`;
  })
}

const horizon = postcss.plugin('horizon', (options: HorizonConfig = defaultConfig) => {
  console.log('options!!', options);
  return async cssRoot => {

    // Add Sanitize CSS
    cssRoot.append(sanitizeCSS);

    // Add fonts
    options.fonts.forEach(f => {
      cssRoot.append(`@import url(${f.url});\n`);
      cssRoot.append(`.${f.key} { font-family: var(--${f.key})}`);
    })

    // Create css variables
    const rootContent = 
    `
:root {
${variableFormatter(options.colors).join('\n')}
${createRGBVariables(options.colors).join('\n')}
${options.fonts.map(f => `--${f.key}: ${f.name};`).join('\n')}
}
    `;

    cssRoot.append(rootContent);

    // add color classes...
    entries(options.colors).forEach(([colorName, hexValue]) => {
      cssRoot.append(
`

/* ${colorName} */

.${colorName} { color: var(--${colorName}); }

/* ${colorName} borders */

.b-${colorName}  { border-color: var(--${colorName}); }
.bt-${colorName} { border-top-color: var(--${colorName}); }
.br-${colorName} { border-right-color: var(--${colorName}); }
.bb-${colorName} { border-bottom-color: var(--${colorName}); }
.bl-${colorName} { border-left-color: var(--${colorName}); }

/* ${colorName} backgrounds */

.bgd-${colorName}             { background-color: var(--${colorName}); }
.bgd-${colorName}-tint-10     { background-color: color(var(--${colorName}) tint(10%)); }
.bgd-${colorName}-tint-20     { background-color: color(var(--${colorName}) tint(20%)); }
.bgd-${colorName}-tint-30     { background-color: color(var(--${colorName}) tint(30%)); }
.bgd-${colorName}-tint-40     { background-color: color(var(--${colorName}) tint(40%)); }
.bgd-${colorName}-tint-50     { background-color: color(var(--${colorName}) tint(50%)); }
.bgd-${colorName}-tint-60     { background-color: color(var(--${colorName}) tint(60%)); }
.bgd-${colorName}-tint-70     { background-color: color(var(--${colorName}) tint(70%)); }
.bgd-${colorName}-tint-80     { background-color: color(var(--${colorName}) tint(80%)); }
.bgd-${colorName}-tint-90     { background-color: color(var(--${colorName}) tint(90%)); }
.bgd-${colorName}-shade-10    { background-color: color(var(--${colorName}) shade(10%)); }
.bgd-${colorName}-shade-20    { background-color: color(var(--${colorName}) shade(20%)); }
.bgd-${colorName}-shade-30    { background-color: color(var(--${colorName}) shade(30%)); }
.bgd-${colorName}-shade-40    { background-color: color(var(--${colorName}) shade(40%)); }
.bgd-${colorName}-shade-50    { background-color: color(var(--${colorName}) shade(50%)); }
.bgd-${colorName}-shade-60    { background-color: color(var(--${colorName}) shade(60%)); }
.bgd-${colorName}-shade-70    { background-color: color(var(--${colorName}) shade(70%)); }
.bgd-${colorName}-shade-80    { background-color: color(var(--${colorName}) shade(80%)); }
.bgd-${colorName}-shade-90    { background-color: color(var(--${colorName}) shade(90%)); }
.bgd-${colorName}-opacity-10  { background-color: rgba(var(--${colorName}-rgb), 0.1); }
.bgd-${colorName}-opacity-20  { background-color: rgba(var(--${colorName}-rgb), 0.2); }
.bgd-${colorName}-opacity-30  { background-color: rgba(var(--${colorName}-rgb), 0.3); }
.bgd-${colorName}-opacity-40  { background-color: rgba(var(--${colorName}-rgb), 0.4); }
.bgd-${colorName}-opacity-50  { background-color: rgba(var(--${colorName}-rgb), 0.5); }
.bgd-${colorName}-opacity-60  { background-color: rgba(var(--${colorName}-rgb), 0.6); }
.bgd-${colorName}-opacity-70  { background-color: rgba(var(--${colorName}-rgb), 0.7); }
.bgd-${colorName}-opacity-80  { background-color: rgba(var(--${colorName}-rgb), 0.8); }
.bgd-${colorName}-opacity-90  { background-color: rgba(var(--${colorName}-rgb), 0.9); }


/* ${colorName} svg */
body .fill-${colorName},
body .fill-${colorName} svg,
body .fill-${colorName}-h:hover,
body .fill-${colorName}-h:hover svg {
  fill: var(--${colorName});
}

body .stroke-${colorName},
body .stroke-${colorName} svg,
body .stroke-${colorName}-h:hover,
body .stroke-${colorName}-h:hover svg {
  stroke: var(--${colorName});
}

`
      );
    });

    // headings
    options.headings.forEach(h => {
      cssRoot.append(
        `
.${h.key} {
  color: ${h.color};
  font-size: ${h.size};
  font-family: ${h.style};
  font-weight: ${h.weight};
}
        `
      )
    })
  }
})

export default horizon;
