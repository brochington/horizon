const fs = require('fs');
const path = require('path');
const entries = require('lodash/entries');
const isString = require('lodash/isString');
const postcssLib = require('postcss');

const { runPostCSS } = require('../utils/postcss');
const colorString = require('color-string');
const prefixer = require('./prefixer');
const composer = require('./composer');
const postcssColorMod = require('postcss-color-mod-function');

const variableFormatter = require('../utils/variableFormatter');
const defaultConfig = require('../defaultConfig');
const { isArray } = require('lodash');
const { props } = require('lodash/fp');

const sanitizeCSS = fs.readFileSync(
  path.resolve(__dirname, '../styles/sanitize.css'),
  'utf8'
);
const basicsCSS = fs.readFileSync(
  path.resolve(__dirname, '../styles/basics.css'),
  'utf8'
);
const borderCSS = fs.readFileSync(
  path.resolve(__dirname, '../styles/border.css'),
  'utf8'
);
const backgroundCSS = fs.readFileSync(
  path.resolve(__dirname, '../styles/background.css'),
  'utf8'
);
const displayCSS = fs.readFileSync(
  path.resolve(__dirname, '../styles/display.css'),
  'utf8'
);
const flexboxCSS = fs.readFileSync(
  path.resolve(__dirname, '../styles/flexbox.css'),
  'utf8'
);
const overflowCSS = fs.readFileSync(
  path.resolve(__dirname, '../styles/overflow.css'),
  'utf8'
);
const typographyCSS = fs.readFileSync(
  path.resolve(__dirname, '../styles/typography.css'),
  'utf8'
);
const visibilityCSS = fs.readFileSync(
  path.resolve(__dirname, '../styles/visibility.css'),
  'utf8'
);
const widthCSS = fs.readFileSync(
  path.resolve(__dirname, '../styles/width.css'),
  'utf8'
);
const heightCSS = fs.readFileSync(
  path.resolve(__dirname, '../styles/height.css'),
  'utf8'
);
const cursorCSS = fs.readFileSync(
  path.resolve(__dirname, '../styles/cursor.css'),
  'utf8'
);

async function prefix(mediaQueries, css) {
  const result = await runPostCSS(prefixer(mediaQueries), css);
  return result;
}

async function compose(comps, css) {
  const result = await runPostCSS(composer(comps), css);
  return result;
}

async function colorMod(css) {
  const result = await runPostCSS(
    postcssColorMod({ transformVars: true }),
    css
  );
  // const result = postcssColorMod.process(css /*, processOptions, pluginOptions */);
  // const result = postcssLib([
  //   postcssColorMod({ transformVars: true })
  // ]).process(css /*, processOptions */);

  return result;
}

const createRGBVariables = (coloroptions) => {
  return entries(coloroptions).map(([colorName, hexValue]) => {
    const [red, green, blue] = colorString.get.rgb(hexValue);

    return `--${colorName}-rgb: ${red}, ${green}, ${blue};`;
  });
};

const appendCSSWithMQ = async (cssArr, mediaQueries, cssRoot) => {
  try {
    const cssArrWithMQs = await Promise.all(
      cssArr.map(async (css) => {
        const cssMQ = await prefix(mediaQueries, css);
        return '' + cssMQ;
      })
    );

    cssArrWithMQs.forEach((a) => cssRoot.append(a));
  } catch (e) {
    console.error(e);
  }
};

const getMediaQueriesStringRec = (mqs = {}) => {
  let rec = {};

  for (const [k, v] of Object.entries(mqs)) {
    rec[k] = isString(v) ? v : v.media;
  }

  return rec;
};

const getMediaQueryConfigs = (mqs) => {
  let rec = {};

  for (const [k, v] of Object.entries(mqs)) {
    if (!isString(v)) {
      rec[k] = v;
    }
  }

  return rec;
};

const horizon = (options = defaultConfig) => {
  return {
    postcssPlugin: 'horizon',
    async Once(cssRoot) {
      const mqStringsRec = getMediaQueriesStringRec(options.mediaQueries);

      // Add Sanitize CSS
      cssRoot.append(sanitizeCSS);

      // Add fonts
      options.fonts.forEach((f) => {
        cssRoot.append(`@import url(${f.url});\n`);
        cssRoot.append(`.${f.key} { font-family: var(--${f.key})}`);
      });

      // Create css variables
      const rootContent = `
      :root {
      ${variableFormatter(options.variables).join('\n')}
      ${variableFormatter(options.colors).join('\n')}
      ${variableFormatter(options.autoSpectrumColors).join('\n')}
      ${createRGBVariables(options.colors).join('\n')}
      ${options.fonts.map((f) => `--${f.key}: ${f.name};`).join('\n')}
      ${entries(options.margins)
        .map(([k, v]) => `--margin-${k}: ${v};`)
        .join('\n')}
      ${entries(options.paddings)
        .map(([k, v]) => `--padding-${k}: ${v};`)
        .join('\n')}
      ${options.borders
        .map(
          (b) => `
      --border-${b.key}-style: ${b.style};
      --border-${b.key}-width: ${b.width};
      --border-${b.key}-color: ${b.color};
      --border-${b.key}-radius: ${b.radius};
      `
        )
        .join('\n')}
      ${entries(options.widths)
        .map(([k, v]) => `--width-${k}: ${v};`)
        .join('\n')}
      ${entries(options.heights)
        .map(([k, v]) => `--height-${k}: ${v};`)
        .join('\n')}
      }
      `;

      cssRoot.append(rootContent);

      // Regular colors
      const colorCSS = entries(options.colors).map(([colorName, hexValue]) => {
        return `
        .${colorName} { color: var(--${colorName}); }
        .bgd-${colorName}             { background-color: var(--${colorName}); }
        .bgd-${colorName}-h:hover     { background-color: var(--${colorName}); }
        `;
      });

      cssRoot.append(colorCSS.join(''));

      // add "auto spectrum" color classes. The colors have gradient (tint/color)
      // classes programatically determined.
      const bgdCSS = entries(options.autoSpectrumColors).map(
        ([colorName, hexValue]) => {
          return `
        /* ${colorName} spectrum color */

        .${colorName} { color: var(--${colorName}); }

        /* ${colorName} borders */

        .b-${colorName}  { border-color: var(--${colorName}); }
        .bt-${colorName} { border-top-color: var(--${colorName}); }
        .br-${colorName} { border-right-color: var(--${colorName}); }
        .bb-${colorName} { border-bottom-color: var(--${colorName}); }
        .bl-${colorName} { border-left-color: var(--${colorName}); }

        /* ${colorName} backgrounds */

        .bgd-${colorName}             { background-color: var(--${colorName}); }
        .bgd-${colorName}-tint-10     { background-color: color-mod(${hexValue} tint(10%)); }
        .bgd-${colorName}-tint-20     { background-color: color-mod(${hexValue} tint(20%)); }
        .bgd-${colorName}-tint-30     { background-color: color-mod(${hexValue} tint(30%)); }
        .bgd-${colorName}-tint-40     { background-color: color-mod(${hexValue} tint(40%)); }
        .bgd-${colorName}-tint-50     { background-color: color-mod(${hexValue} tint(50%)); }
        .bgd-${colorName}-tint-60     { background-color: color-mod(${hexValue} tint(60%)); }
        .bgd-${colorName}-tint-70     { background-color: color-mod(${hexValue} tint(70%)); }
        .bgd-${colorName}-tint-80     { background-color: color-mod(${hexValue} tint(80%)); }
        .bgd-${colorName}-tint-90     { background-color: color-mod(${hexValue} tint(90%)); }
        .bgd-${colorName}-shade-10    { background-color: color-mod(${hexValue} shade(10%)); }
        .bgd-${colorName}-shade-20    { background-color: color-mod(${hexValue} shade(20%)); }
        .bgd-${colorName}-shade-30    { background-color: color-mod(${hexValue} shade(30%)); }
        .bgd-${colorName}-shade-40    { background-color: color-mod(${hexValue} shade(40%)); }
        .bgd-${colorName}-shade-50    { background-color: color-mod(${hexValue} shade(50%)); }
        .bgd-${colorName}-shade-60    { background-color: color-mod(${hexValue} shade(60%)); }
        .bgd-${colorName}-shade-70    { background-color: color-mod(${hexValue} shade(70%)); }
        .bgd-${colorName}-shade-80    { background-color: color-mod(${hexValue} shade(80%)); }
        .bgd-${colorName}-shade-90    { background-color: color-mod(${hexValue} shade(90%)); }
        .bgd-${colorName}-opacity-10  { background-color: rgba(var(--${colorName}-rgb), 0.1); }
        .bgd-${colorName}-opacity-20  { background-color: rgba(var(--${colorName}-rgb), 0.2); }
        .bgd-${colorName}-opacity-30  { background-color: rgba(var(--${colorName}-rgb), 0.3); }
        .bgd-${colorName}-opacity-40  { background-color: rgba(var(--${colorName}-rgb), 0.4); }
        .bgd-${colorName}-opacity-50  { background-color: rgba(var(--${colorName}-rgb), 0.5); }
        .bgd-${colorName}-opacity-60  { background-color: rgba(var(--${colorName}-rgb), 0.6); }
        .bgd-${colorName}-opacity-70  { background-color: rgba(var(--${colorName}-rgb), 0.7); }
        .bgd-${colorName}-opacity-80  { background-color: rgba(var(--${colorName}-rgb), 0.8); }
        .bgd-${colorName}-opacity-90  { background-color: rgba(var(--${colorName}-rgb), 0.9); }

        /* ${colorName} hover backgrounds */

        .bgd-${colorName}-h:hover             { background-color: var(--${colorName}); }
        .bgd-${colorName}-tint-10-h:hover     { background-color: color-mod(${hexValue} tint(10%)); }
        .bgd-${colorName}-tint-20-h:hover     { background-color: color-mod(${hexValue} tint(20%)); }
        .bgd-${colorName}-tint-30-h:hover     { background-color: color-mod(${hexValue} tint(30%)); }
        .bgd-${colorName}-tint-40-h:hover     { background-color: color-mod(${hexValue} tint(40%)); }
        .bgd-${colorName}-tint-50-h:hover     { background-color: color-mod(${hexValue} tint(50%)); }
        .bgd-${colorName}-tint-60-h:hover     { background-color: color-mod(${hexValue} tint(60%)); }
        .bgd-${colorName}-tint-70-h:hover     { background-color: color-mod(${hexValue} tint(70%)); }
        .bgd-${colorName}-tint-80-h:hover     { background-color: color-mod(${hexValue} tint(80%)); }
        .bgd-${colorName}-tint-90-h:hover     { background-color: color-mod(${hexValue} tint(90%)); }
        .bgd-${colorName}-shade-10-h:hover    { background-color: color-mod(${hexValue} shade(10%)); }
        .bgd-${colorName}-shade-20-h:hover    { background-color: color-mod(${hexValue} shade(20%)); }
        .bgd-${colorName}-shade-30-h:hover    { background-color: color-mod(${hexValue} shade(30%)); }
        .bgd-${colorName}-shade-40-h:hover    { background-color: color-mod(${hexValue} shade(40%)); }
        .bgd-${colorName}-shade-50-h:hover    { background-color: color-mod(${hexValue} shade(50%)); }
        .bgd-${colorName}-shade-60-h:hover    { background-color: color-mod(${hexValue} shade(60%)); }
        .bgd-${colorName}-shade-70-h:hover    { background-color: color-mod(${hexValue} shade(70%)); }
        .bgd-${colorName}-shade-80-h:hover    { background-color: color-mod(${hexValue} shade(80%)); }
        .bgd-${colorName}-shade-90-h:hover    { background-color: color-mod(${hexValue} shade(90%)); }
        .bgd-${colorName}-opacity-10-h:hover  { background-color: rgba(var(--${colorName}-rgb), 0.1); }
        .bgd-${colorName}-opacity-20-h:hover  { background-color: rgba(var(--${colorName}-rgb), 0.2); }
        .bgd-${colorName}-opacity-30-h:hover  { background-color: rgba(var(--${colorName}-rgb), 0.3); }
        .bgd-${colorName}-opacity-40-h:hover  { background-color: rgba(var(--${colorName}-rgb), 0.4); }
        .bgd-${colorName}-opacity-50-h:hover  { background-color: rgba(var(--${colorName}-rgb), 0.5); }
        .bgd-${colorName}-opacity-60-h:hover  { background-color: rgba(var(--${colorName}-rgb), 0.6); }
        .bgd-${colorName}-opacity-70-h:hover  { background-color: rgba(var(--${colorName}-rgb), 0.7); }
        .bgd-${colorName}-opacity-80-h:hover  { background-color: rgba(var(--${colorName}-rgb), 0.8); }
        .bgd-${colorName}-opacity-90-h:hover  { background-color: rgba(var(--${colorName}-rgb), 0.9); }
        `;
        }
      );

      const colorModdedBgdCSS = await Promise.all(
        bgdCSS.map(async (css) => {
          const newCSS = await colorMod(css);
          return newCSS;
        })
      );

      await appendCSSWithMQ(colorModdedBgdCSS, mqStringsRec, cssRoot);
      // await appendCSSWithMQ(bgdCSS, mqStringsRec, cssRoot);

      // Themes
      // NOTE: This needs to be built out a lot more.
      entries(options.themes).forEach(([themeName, props]) => {
        if (['light', 'dark'].includes(themeName)) {
          cssRoot.append(
            `
              @media (prefers-color-scheme: ${themeName}) {
                :root {
                  ${entries(props).map(([key, val]) => {
                    return `--${key}: ${val}`;
                  })}
                }
              }
              `
          );
        }

        cssRoot.append(
          `
          [data-theme="${themeName}"] {
            ${entries(props).map(([key, val]) => {
              return `--${key}: ${val}`;
            })}
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
    `);

      // headings
      options.headings.forEach((h) => {
        const { key, color, size, style, weight, ...rest } = h;

        const cssProps = Object.entries(rest)
          .map(([property, value]) => {
            return `${property}: ${value};`;
          })
          .join('\n');

        cssRoot.append(
          `
        .${key} {
          color: ${color};
          font-size: ${size};
          font-family: ${style};
          font-weight: ${weight};
          ${cssProps}
        }

        .${h.key}.smaller {
          font-size: calc(${h.size} - 20%);
        }

        .${h.key}.larger {
          font-size: calc(${h.size} + 20%);
        }
        `
        );
      });

      // CSS Classes
      if (options.classes && isArray(options.classes)) {
        options.classes.forEach((props) => {
          const { key, ...rest } = props;

          const cssProps = Object.entries(rest)
            .map(([property, value]) => {
              return `${property}: ${value};`;
            })
            .join('\n');
  
          cssRoot.append(
            `
          .${key} {
            ${cssProps}
          }
          `
          );
        });
      }

      // Margin
      const marginCSS = entries(options.margins).map(([key, value]) => {
        return `
        .m${key}  { margin:        ${value}; }
        .mt${key} { margin-top:    ${value}; }
        .mr${key} { margin-right:  ${value}; }
        .mb${key} { margin-bottom: ${value}; }
        .ml${key} { margin-left:   ${value}; }
        .mx${key} { margin-left:   ${value}; margin-right:  ${value}; }
        .my${key} { margin-top:    ${value}; margin-bottom: ${value}; }
        `;
      });

      await appendCSSWithMQ(marginCSS, mqStringsRec, cssRoot);

      const marginAutoCSS = `
      .m-auto  { margin: auto; }
      .ml-auto { margin-left: auto; }
      .mr-auto { margin-right: auto; }
      .mx-auto { margin-left: auto; margin-right: auto; }
      .my-auto { margin-top: auto; margin-bottom: auto; }
      `;

      await appendCSSWithMQ([marginAutoCSS], mqStringsRec, cssRoot);

      // Padding
      const paddingCSS = entries(options.paddings).map(([key, value]) => {
        return `
        .p${key}  { padding:        ${value}; }
        .pt${key} { padding-top:    ${value}; }
        .pr${key} { padding-right:  ${value}; }
        .pb${key} { padding-bottom: ${value}; }
        .pl${key} { padding-left:   ${value}; }
        .px${key} { padding-left:   ${value}; padding-right:  ${value}; }
        .py${key} { padding-top:    ${value}; padding-bottom: ${value}; }
        `;
      });

      await appendCSSWithMQ(paddingCSS, mqStringsRec, cssRoot);

      // Widths
      const customWidthCSS = entries(options.widths).map(([key, value]) => {
        return `
        .w${key}     { width: ${value}; }
        .max-w${key} { max-width: ${value}; }
        .min-w${key} { min-width: ${value}; }
        `;
      });

      await appendCSSWithMQ(customWidthCSS, mqStringsRec, cssRoot);

      // Heights
      const customHeightCSS = entries(options.widths).map(([key, value]) => {
        return `
        .h${key}     { height: ${value}; }
        .max-h${key} { max-height: ${value}; }
        .min-h${key} { min-height: ${value}; }
        `;
      });

      await appendCSSWithMQ(customHeightCSS, mqStringsRec, cssRoot);

      // Gaps
      const customGapCSS = entries(options.gaps).map(([key, value]) => {
        return `
        .gap${key} { gap: ${value}; }
        `;
      });

      await appendCSSWithMQ(customGapCSS, mqStringsRec, cssRoot);

      // Borders
      const customborderCSS = options.borders.map((b) => {
        return `
        .b-${b.key} {
          border-style: ${b.style};
          border-width: ${b.width};
          border-color: ${b.color};
          border-radius: ${b.radius};
        }

        .b-${b.key}-no-radius {
          border-style: ${b.style};
          border-width: ${b.width};
          border-color: ${b.color};
        }

        .bt-${b.key} {
          border-top-style: ${b.style};
          border-top-width: ${b.width};
          border-top-color: ${b.color};
          border-top-left-radius: 0px;
          border-top-right-radius: 0px;
        }

        .bt-${b.key}-w-radius {
          border-top-style: ${b.style};
          border-top-width: ${b.width};
          border-top-color: ${b.color};
          border-top-left-radius: ${b.radius};
          border-top-right-radius: ${b.radius};
        }

        .br-${b.key} {
          border-right-style: ${b.style};
          border-right-width: ${b.width};
          border-right-color: ${b.color};
          border-top-right-radius: 0px;
          border-bottom-right-radius: 0px;
        }
        
        .br-${b.key}-w-radius {
          border-right-style: ${b.style};
          border-right-width: ${b.width};
          border-right-color: ${b.color};
          border-top-right-radius: ${b.radius};
          border-bottom-right-radius: ${b.radius};
        }

        .bb-${b.key} {
          border-bottom-style: ${b.style};
          border-bottom-width: ${b.width};
          border-bottom-color: ${b.color};
          border-bottom-left-radius: 0px;
          border-bottom-right-radius: 0px;
        }

        .bb-${b.key}-w-radius {
          border-bottom-style: ${b.style};
          border-bottom-width: ${b.width};
          border-bottom-color: ${b.color};
          border-bottom-left-radius: ${b.radius};
          border-bottom-right-radius: ${b.radius};
        }

        .bl-${b.key} {
          border-left-style: ${b.style};
          border-left-width: ${b.width};
          border-left-color: ${b.color};
          border-top-left-radius: 0px;
          border-bottom-left-radius: 0px;
        }

        .bl-${b.key}-w-radius {
          border-left-style: ${b.style};
          border-left-width: ${b.width};
          border-left-color: ${b.color};
          border-top-left-radius: ${b.radius};
          border-bottom-left-radius: ${b.radius};
        }

        .bx-${b.key} {
          border-left-style: ${b.style};
          border-left-width: ${b.width};
          border-left-color: ${b.color};
          border-top-left-radius: 0px;
          border-bottom-left-radius: 0px;
          border-right-style: ${b.style};
          border-right-width: ${b.width};
          border-right-color: ${b.color};
          border-top-right-radius: 0px;
          border-bottom-right-radius: 0px;
        }

        .by-${b.key} {
          border-top-style: ${b.style};
          border-top-width: ${b.width};
          border-top-color: ${b.color};
          border-top-left-radius: 0px;
          border-top-right-radius: 0px;
          border-bottom-style: ${b.style};
          border-bottom-width: ${b.width};
          border-bottom-color: ${b.color};
          border-bottom-left-radius: 0px;
          border-bottom-right-radius: 0px;
        }
        `;
      });

      await appendCSSWithMQ(customborderCSS, mqStringsRec, cssRoot);

      // Add any extra css from media query config.
      // would be cool to add some container types here....
      entries(getMediaQueryConfigs(options.mediaQueries)).forEach(
        ([key, mq]) => {
          if (mq.css) {
            cssRoot.append(
              `
          /* for "${key}" media query */
          @media ${mq.media} {
            ${key}:container {

            }

            ${mq.css}
          }
          `
            );
          }
        }
      );

      const allCSS = [
        basicsCSS,
        typographyCSS,
        displayCSS,
        overflowCSS,
        flexboxCSS,
        borderCSS,
        backgroundCSS,
        widthCSS,
        heightCSS,
        cursorCSS,
        visibilityCSS,
      ];

      const allCSSWithMQ = await Promise.all(
        allCSS.map(async (css) => {
          const cssWithMQ = await prefix(mqStringsRec, css);
          return cssWithMQ;
        })
      );

      const allCSSString = allCSSWithMQ.join('\n');
      cssRoot.append(allCSSString);

      if (options.compose) {
        await compose(options.compose, cssRoot);
      }
    },
  };
};

module.exports = horizon;
module.exports.postcss = true;
