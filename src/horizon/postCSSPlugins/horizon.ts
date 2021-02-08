import postcss from "postcss";
import entries from "lodash/entries";
import isString from "lodash/isString";

import colorString from "color-string";
import prefix from "./prefixer";
import compose from "./composer";

import variableFormatter from "../utils/variableFormatter";
import defaultConfig, {
  HorizonConfig,
  MediaQueryConfig,
  MediaQueriesConfig,
} from "../defaultConfig";

//@ts-ignore
import sanitizeCSS from "!raw-loader!sanitize.css";
//@ts-ignore
import basicsCSS from "!raw-loader!../styles/basics.css";
//@ts-ignore
import borderCSS from "!raw-loader!../styles/border.css";
//@ts-ignore
import displayCSS from "!raw-loader!../styles/display.css";
//@ts-ignore
import flexboxCSS from "!raw-loader!../styles/flexbox.css";
//@ts-ignore
import overflowCSS from "!raw-loader!../styles/overflow.css";
//@ts-ignore
import typographyCSS from "!raw-loader!../styles/typography.css";
//@ts-ignore
import visibilityCSS from "!raw-loader!../styles/visibility.css";
//@ts-ignore
import widthCSS from "!raw-loader!../styles/width.css";
//@ts-ignore
import heightCSS from "!raw-loader!../styles/height.css";
//@ts-ignore
import cursorCSS from "!raw-loader!../styles/cursor.css";

const createRGBVariables = (coloroptions) => {
  return entries(coloroptions).map(([colorName, hexValue]) => {
    const [red, green, blue] = colorString.get.rgb(hexValue);

    return `--${colorName}-rgb: ${red}, ${green}, ${blue};`;
  });
};

const appendCSSWithMQ = async (
  cssArr: string[],
  mediaQueries: Record<string, string>,
  cssRoot: postcss.Root
): Promise<void> => {
  const cssArrWithMQs = await Promise.all(
    cssArr.map(async (css) => {
      const cssMQ = await prefix(mediaQueries, css);
      return "" + cssMQ;
    })
  );

  cssArrWithMQs.forEach((a) => cssRoot.append(a));
};

const getMediaQueriesStringRec = (mqs: MediaQueriesConfig = {}) => {
  let rec = {};

  for (const [k, v] of Object.entries(mqs)) {
    rec[k] = isString(v) ? v : v.media;
  }

  return rec;
};

const getMediaQueryConfigs = (mqs: MediaQueriesConfig) => {
  let rec: Record<string, MediaQueryConfig> = {};

  for (const [k, v] of Object.entries(mqs)) {
    if (!isString(v)) {
      rec[k] = v;
    }
  }

  return rec;
};

const horizon = postcss.plugin(
  "horizon",
  (options: HorizonConfig = defaultConfig) => {
    return async (cssRoot) => {
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
      ${variableFormatter(options.variables).join("\n")}
      ${variableFormatter(options.colors).join("\n")}
      ${createRGBVariables(options.colors).join("\n")}
      ${options.fonts.map((f) => `--${f.key}: ${f.name};`).join("\n")}
      ${entries(options.margins)
        .map(([k, v]) => `--margin-${k}: ${v};`)
        .join("\n")}
      ${entries(options.paddings)
        .map(([k, v]) => `--padding-${k}: ${v};`)
        .join("\n")}
      ${options.borders
        .map(
          (b) => `
      --border-${b.key}-style: ${b.style};
      --border-${b.key}-width: ${b.width};
      --border-${b.key}-color: ${b.color};
      --border-${b.key}-radius: ${b.radius};
      `
        )
        .join("\n")}
      ${entries(options.widths)
        .map(([k, v]) => `--width-${k}: ${v};`)
        .join("\n")}
      ${entries(options.heights)
        .map(([k, v]) => `--height-${k}: ${v};`)
        .join("\n")}
      }
      `;

      cssRoot.append(rootContent);

      // add color classes...
      const bgdCSS = entries(options.colors).map(
        ([colorName, hexValue]): string => {
          return `
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
        `;
        }
      );

      await appendCSSWithMQ(bgdCSS, mqStringsRec, cssRoot);

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
        );
      });

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

      // Borders
      const customborderCSS = options.borders.map((b) => {
        return `
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

        .br-${b.key} {
          border-right-style: ${b.style};
          border-right-width: ${b.width};
          border-right-color: ${b.color};
        }

        .bb-${b.key} {
          border-bottom-style: ${b.style};
          border-bottom-width: ${b.width};
          border-bottom-color: ${b.color};
        }

        .bl-${b.key} {
          border-left-style: ${b.style};
          border-left-width: ${b.width};
          border-left-color: ${b.color};
        }
        `;
      });

      await appendCSSWithMQ(customborderCSS, mqStringsRec, cssRoot);

      // Add any extra css from media query config.
      entries(getMediaQueryConfigs(options.mediaQueries)).forEach(
        ([key, mq]) => {
          if (mq.css) {
            cssRoot.append(
              `
          /* for "${key}" media query */
          @media ${mq.media} {
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
        widthCSS,
        heightCSS,
        cursorCSS,
        visibilityCSS,
      ];

      const allCSSWithMQ = await Promise.all(
        allCSS.map(
          async (css): Promise<string> => {
            const cssWithMQ = (await prefix(mqStringsRec, css)) as string;
            return cssWithMQ;
          }
        )
      );

      const allCSSString = allCSSWithMQ.join("\n");
      cssRoot.append(allCSSString);

      if (options.compose) {
        await compose(options.compose, cssRoot);
      }
    };
  }
);

export default horizon;
