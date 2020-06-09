import postcss from 'postcss';
import entries from 'lodash/entries';

import colorString from 'color-string';

import variableFormatter from '../utils/variableFormatter';
import defaultConfig, { HorizonConfig } from '../defaultConfig';

import sanitizeCSS from '!raw-loader!sanitize.css';
import basicsCSS from '!raw-loader!../styles/basics.css';
import borderCSS from '!raw-loader!../styles/border.css';
import displayCSS from '!raw-loader!../styles/display.css';
import flexboxCSS from '!raw-loader!../styles/flexbox.css';
import overflowCSS from '!raw-loader!../styles/overflow.css';
import typographyCSS from '!raw-loader!../styles/typography.css';
import visibilityCSS from '!raw-loader!../styles/visibility.css';
import widthCSS from '!raw-loader!../styles/width.css';
import heightCSS from '!raw-loader!../styles/height.css';

const createRGBVariables = (coloroptions) => {
  return entries(coloroptions).map(([colorName, hexValue]) => {
    const [red, green, blue] = colorString.get.rgb(hexValue);

    return `--${colorName}-rgb: ${red}, ${green}, ${blue};`;
  })
}

const horizon = postcss.plugin('horizon', (options: HorizonConfig = defaultConfig) => {
  return async cssRoot => {

    // Add Sanitize CSS
    cssRoot.append(sanitizeCSS);

    // Add fonts
    options.fonts.forEach(f => {
      cssRoot.append(`@import url(${f.url});\n`);
      cssRoot.append(`.${f.key} { font-family: var(--${f.key})}`);
    })

    // Create css variables
    const rootContent = `
      :root {
      ${variableFormatter(options.variables).join('\n')}
      ${variableFormatter(options.colors).join('\n')}
      ${createRGBVariables(options.colors).join('\n')}
      ${options.fonts.map(f => `--${f.key}: ${f.name};`).join('\n')}
      ${entries(options.margins).map(([k, v]) => `--margin-${k}: ${v};`).join('\n')}
      ${entries(options.paddings).map(([k, v]) => `--padding-${k}: ${v};`).join('\n')}
      ${options.borders.map(b => `
      --border-${b.key}-style: ${b.style};
      --border-${b.key}-width: ${b.width};
      --border-${b.key}-color: ${b.color};
      --border-${b.key}-radius: ${b.radius};
      `).join('\n')}
      ${entries(options.widths).map(([k, v]) => `--width-${k}: ${v};`).join('\n')}
      ${entries(options.heights).map(([k, v]) => `--height-${k}: ${v};`).join('\n')}
      }
      `;

    cssRoot.append(rootContent);

    // add color classes...
    entries(options.colors).forEach(([colorName, hexValue]) => {
      cssRoot.append(`
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

    // Body
    cssRoot.append(`
    body {
      font-size: 16px; /* Fixed to maintain grid that is rem based */
      color: ${options.body.color};
      background-color: ${options.body.backgroundColor};
      font-family: ${options.body.fontFamily};
      overflow-behavior-y: none;
    }
    `)

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

        .${h.key}.smaller {
          font-size: calc(${h.size} - 20%);
        }

        .${h.key}.larger {
          font-size: calc(${h.size} + 20%);
        }
        `
      )
    });

    // Margin
    entries(options.margins).forEach(([key, value]) => {
      cssRoot.append(
        `
        .m${key}  { margin:        ${value}; }
        .mt${key} { margin-top:    ${value}; }
        .mr${key} { margin-right:  ${value}; }
        .mb${key} { margin-bottom: ${value}; }
        .ml${key} { margin-left:   ${value}; }
        .mx${key} { margin-left:   ${value}; margin-right:  ${value}; }
        .my${key} { margin-top:    ${value}; margin-bottom: ${value}; }
        `
      )
    });

    // Padding
    entries(options.paddings).forEach(([key, value]) => {
      cssRoot.append(
        `
        .p${key}  { padding:        ${value}; }
        .pt${key} { padding-top:    ${value}; }
        .pr${key} { padding-right:  ${value}; }
        .pb${key} { padding-bottom: ${value}; }
        .pl${key} { padding-left:   ${value}; }
        .px${key} { padding-left:   ${value}; padding-right:  ${value}; }
        .py${key} { padding-top:    ${value}; padding-bottom: ${value}; }
        `
      )
    });

    // Widths
    entries(options.widths).forEach(([key, value]) => {
      cssRoot.append(
        `
        .w${key}     { width: ${value}; }
        .max-w${key} { max-width: ${value}; }
        .min-w${key} { min-width: ${value}; }
        `
      )
    });

    // Heights
    entries(options.widths).forEach(([key, value]) => {
      cssRoot.append(
        `
        .h${key}     { height: ${value}; }
        .max-h${key} { max-height: ${value}; }
        .min-h${key} { min-height: ${value}; }
        `
      )
    });

    // Borders
    options.borders.forEach(b => {
      cssRoot.append(
        `
        .b-${b.key} {
          border-style: ${b.style};
          border-width: ${b.width};
          border-color: ${b.color};
          border-radius: ${b.radius};
        }

        .bt-${b.key} {
          border-top-style: ${b.style};
          border-top-width: ${b.width};
          border-top-color: ${b.color};
        }

        .br-1 {
          border-right-style: ${b.style};
          border-right-width: ${b.width};
          border-right-color: ${b.color};
        }

        .bb-1 {
          border-bottom-style: ${b.style};
          border-bottom-width: ${b.width};
          border-bottom-color: ${b.color};
        }

        .bl-1 {
          border-left-style: ${b.style};
          border-left-width: ${b.width};
          border-left-color: ${b.color};
        }
        `
      )
    })

    // Add the rest of the css
    cssRoot.append([
      basicsCSS,
      typographyCSS,
      displayCSS,
      overflowCSS,
      flexboxCSS,
      borderCSS,
      widthCSS,
      heightCSS,
      visibilityCSS
    ].join('\n'));

  }
})

export default horizon;
