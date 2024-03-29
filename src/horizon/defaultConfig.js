// export interface FontConfig {
//   url: string; // link to google font, probably
//   name: string; // 'pt-sans'
//   key: string; // 'PT Sans'
// }

// export interface HeadingConfig {
//   key: string; // like .h1
//   size: string;
//   style: string;
//   color: string;
//   weight: string;
// }

// export interface BorderConfig {
//   key: string;
//   style: string;
//   color: string;
//   width: string;
//   radius: string;
// }

// export interface MediaQueryConfig {
//   media: string;
//   css?: string;
// }

// export interface MediaQueriesConfig {
//   [key: string]: string | MediaQueryConfig;
// }

// export interface HorizonConfig {
//   variables: { [key: string]: string };
//   colors: { [key: string]: string };
//   fonts: FontConfig[];
//   mediaQueries?: MediaQueriesConfig;
//   body: { color: string; fontFamily: string; backgroundColor: string };
//   headings: HeadingConfig[];
//   margins: { [key: string]: string };
//   paddings: { [key: string]: string };
//   borders: BorderConfig[];
//   widths: { [key: string]: string };
//   heights: { [key: string]: string };
//   compose?: { [key: string]: string };
// }

const defaultConfig = {
  variables: {
    'brand-hue': '200',
    'brand-saturation': '100%',
    'brand-lightness': '50%',
  },
  colors: {
    black: '#000000',
    white: '#ffffff',
    'gray-0': '#000000',
    'gray-1': '#1c1c1c',
    'gray-2': '#303030',
    'gray-3': '#474747',
    'gray-4': '#5d5d5d',
    'gray-5': '#757575',
    'gray-6': '#8c8c8c',
    'gray-7': '#a3a3a3',
    'gray-8': '#bababa',
    'gray-9': '#d1d1d1',
    'gray-10': '#e8e8e8',
    'gray-11': '#ffffff',
    'blue-gray-0': '#0e0e11',
    'blue-gray-1': '#21222a',
    'blue-gray-2': '#343544',
    'blue-gray-3': '#484a5e',
    'blue-gray-4': '#5c5f78',
    'blue-gray-5': '#717490',
    'blue-gray-6': '#8789a6',
    'blue-gray-7': '#9c9eba',
    'blue-gray-8': '#b1b3cb',
    'blue-gray-9': '#c6c8db',
    'blue-gray-10': '#dcdce9',
    'blue-gray-11': '#f1f1f6',
    'blue-0': '#0d0e1a',
    'blue-1': '#182142',
    'blue-2': '#1e336d',
    'blue-3': '#254797',
    'blue-4': '#325bbd',
    'blue-5': '#476fde',
    'blue-6': '#6284f6',
    'blue-7': '#809aff',
    'blue-8': '#9fb0ff',
    'blue-9': '#bcc6ff',
    'blue-10': '#d9deff',
    'blue-11': '#f4f5ff',
    'indigo-0': '#120c1d',
    'indigo-1': '#211b4d',
    'indigo-2': '#2f297f',
    'indigo-3': '#3e38b0',
    'indigo-4': '#5049dd',
    'indigo-5': '#675bff',
    'indigo-6': '#8170ff',
    'indigo-7': '#9d87ff',
    'indigo-8': '#b7a0ff',
    'indigo-9': '#d0baff',
    'indigo-10': '#e5d6ff',
    'indigo-11': '#f7f1ff',
    'violet-0': '#170a1b',
    'violet-1': '#321545',
    'violet-2': '#501b71',
    'violet-3': '#6d239d',
    'violet-4': '#8a2fc5',
    'violet-5': '#a641e7',
    'violet-6': '#be58ff',
    'violet-7': '#d374ff',
    'violet-8': '#e392ff',
    'violet-9': '#f0b1ff',
    'violet-10': '#f9d0ff',
    'violet-11': '#fef0ff',
    'magenta-0': '#170915',
    'magenta-1': '#381436',
    'magenta-2': '#5b1859',
    'magenta-3': '#7f1e7c',
    'magenta-4': '#a0289d',
    'magenta-5': '#bf3abb',
    'magenta-6': '#d853d2',
    'magenta-7': '#ea70e4',
    'magenta-8': '#f78ff0',
    'magenta-9': '#ffaef8',
    'magenta-10': '#ffcefc',
    'magenta-11': '#ffeefe',
    'red-0': '#19090a',
    'red-1': '#3e131a',
    'red-2': '#651829',
    'red-3': '#8d1d38',
    'red-4': '#b22749',
    'red-5': '#d23a5b',
    'red-6': '#ec5370',
    'red-7': '#ff7086',
    'red-8': '#ff909e',
    'red-9': '#ffb0b9',
    'red-10': '#ffd0d4',
    'red-11': '#fff0f1',
    'orange-0': '#200d02',
    'orange-1': '#431706',
    'orange-2': '#691e0a',
    'orange-3': '#8e280d',
    'orange-4': '#b13514',
    'orange-5': '#d14721',
    'orange-6': '#ea5e36',
    'orange-7': '#fd7950',
    'orange-8': '#ff9670',
    'orange-9': '#ffb495',
    'orange-10': '#ffd2be',
    'orange-11': '#fff0e9',
    'gold-0': '#160f05',
    'gold-1': '#402e11',
    'gold-2': '#6e4d14',
    'gold-3': '#9c6c18',
    'gold-4': '#c68a20',
    'gold-5': '#eba62e',
    'gold-6': '#ffbe44',
    'gold-7': '#ffd15e',
    'gold-8': '#ffe07c',
    'gold-9': '#ffeb9b',
    'gold-10': '#fff3bc',
    'gold-11': '#fffade',
    'yellow-0': '#0d0c04',
    'yellow-1': '#332f11',
    'yellow-2': '#585315',
    'yellow-3': '#7f7719',
    'yellow-4': '#a49a20',
    'yellow-5': '#c5ba2c',
    'yellow-6': '#e1d43f',
    'yellow-7': '#f6e857',
    'yellow-8': '#fff673',
    'yellow-9': '#fffe90',
    'yellow-10': '#ffffae',
    'yellow-11': '#ffffcc',
    'lime-0': '#161708',
    'lime-1': '#323711',
    'lime-2': '#505a15',
    'lime-3': '#6e7c19',
    'lime-4': '#8b9c22',
    'lime-5': '#a6b932',
    'lime-6': '#bed049',
    'lime-7': '#d1e264',
    'lime-8': '#e1ee83',
    'lime-9': '#edf6a3',
    'lime-10': '#f6fbc4',
    'lime-11': '#fcfee6',
    'green-0': '#071209',
    'green-1': '#102816',
    'green-2': '#133f21',
    'green-3': '#18572d',
    'green-4': '#216f3b',
    'green-5': '#32864b',
    'green-6': '#499c60',
    'green-7': '#66b178',
    'green-8': '#85c492',
    'green-9': '#a7d6af',
    'green-10': '#cae7cf',
    'green-11': '#eef7ef',
    'teal-0': '#07110f',
    'teal-1': '#102722',
    'teal-2': '#133d35',
    'teal-3': '#18544a',
    'teal-4': '#216b5e',
    'teal-5': '#328173',
    'teal-6': '#499789',
    'teal-7': '#65ac9e',
    'teal-8': '#85c0b3',
    'teal-9': '#a7d3c9',
    'teal-10': '#cae5de',
    'teal-11': '#eef7f4',
    'cyan-0': '#081111',
    'cyan-1': '#112627',
    'cyan-2': '#143c3e',
    'cyan-3': '#185356',
    'cyan-4': '#226a6d',
    'cyan-5': '#338084',
    'cyan-6': '#4b969a',
    'cyan-7': '#67abae',
    'cyan-8': '#87bfc1',
    'cyan-9': '#a8d2d4',
    'cyan-10': '#cbe4e5',
    'cyan-11': '#eef6f7',
    'test-color-var': 'var(--something)',
    // 'surface-1-light': 'hsl(208 25% 90%)',
    // 'surface-2-light': 'hsl(208 20% 99%)',
    // 'surface-3-light': 'hsl(208 20% 92%)',
    // 'surface-4-light': 'hsl(208 20% 85%)',
    // 'surface-1-dark': 'hsl(208 10% 10%)',
    // 'surface-2-dark': 'hsl(208 10% 15%)',
    // 'surface-3-dark': 'hsl(208 5% 20%)',
    // 'surface-4-dark': 'hsl(208 5% 25%)',
  },
  surfaces: {
    light: {
      1: 'hsl(208 45% 100%)',
      2: 'hsl(208 34% 98%)',
      3: 'hsl(208 40% 95%)',
      4: 'hsl(208 25% 90%)',
      5: 'hsl(208 20% 85%)',
    },
    dark: {
      1: 'hsl(208 10% 10%)',
      2: 'hsl(208 10% 10%)',
      3: 'hsl(208 10% 15%)',
      4: 'hsl(208 5% 20%)',
      5: 'hsl(208 5% 25%)',
    }
  },
  autoSpectrumColors: {
    // something: "#123456",
  },
  themes: {
    light: {
      colorScheme: 'light',
      'brand': 'var(--brand-light)',
      'text1': 'var(--text1-light)',
      'text2': 'var(--text2-light)',
      'surface-shadow': 'var(--surface-shadow-light)',
      'shadow-strength': 'var(--shadow-strength-light)',
    },
    dark: {
      colorScheme: 'dark',
      'brand': 'var(--brand-dark)',
      'text1': 'var(--text1-dark)',
      'text2': 'var(--text2-dark)',
      'surface-shadow': 'var(--surface-shadow-dark)',
      'shadow-strength': 'var(--shadow-strength-dark)',
    },
  },
  fonts: [
    {
      url: 'https://fonts.googleapis.com/css?family=PT+Sans:400,700',
      name: 'PT Sans',
      key: 'pt-sans',
    },
  ],
  mediaQueries: {
    su: 'screen and (min-width: 1rem)',
    so: 'screen and (max-width: 39.9375rem)',
    mu: 'screen and (min-width: 40rem)',
    mo: 'screen and (min-width: 40rem) and (max-width: 63.9375rem)',
    lu: 'screen and (min-width: 64rem)',
    lo: 'screen and (min-width: 64rem) and (max-width: 74.9375rem)',
    faab: {
      media: 'screen and (max-width: 88rem)',
      css: `
      .hello {
        height: 27px;
        width: 33px;
        color: orange;
      }
      `,
    },
  },
  headings: [
    {
      key: 'main-heading',
      size: '20px',
      style: 'var(--pt-sans)',
      color: 'var(--teal)',
      weight: 'bold',
      'letter-spacing': '1px',
    },
  ],
  classes: [
    {
      key: 'viola',
      color: 'violet',
      display: 'grid',
    },
  ],
  margins: {
    0: '0px',
    1: '.25rem',
    2: '.5rem',
    3: '1rem',
    4: '1.5rem',
    5: '2rem',
    6: '2.5rem',
    7: '3rem',
    8: '4rem',
    9: '5rem',
  },
  paddings: {
    0: '0px',
    1: '.25rem',
    2: '.5rem',
    3: '1rem',
    4: '1.5rem',
    5: '2rem',
    6: '2.5rem',
    7: '3rem',
    8: '4rem',
    9: '5rem',
  },
  borders: [
    {
      key: '1',
      style: 'solid',
      color: 'var(--teal)',
      width: '1px',
      radius: '3px',
    },
  ],
  widths: {
    s1: '1rem',
  },
  heights: {
    s1: '1rem',
  },
  gaps: {
    1: '1rem',
    2: '2rem',
    3: '3rem',
  },
  shadows: {
    1: `0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.31), 0.8px 1.6px 2px -2.5px hsl(var(--shadow-color) / 0.31)`,
    2: `0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.41), 0.5px 1px 1.4px -1px hsl(var(--shadow-color) / 0.48), 1.3px 2.5px 3.4px -1.9px hsl(var(--shadow-color) / 0.56);`,
    3: `0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.29), 1.1px 2.2px 2.8px -1.2px hsl(var(--shadow-color) / 0.29), 4px 8.1px 10.2px -2.5px hsl(var(--shadow-color) / 0.29)`,
    // 3: `0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.4), 2.1px 4.1px 5.2px -0.8px hsl(var(--shadow-color) / 0.4), 5.9px 11.9px 14.9px -1.7px hsl(var(--shadow-color) / 0.4), 15.3px 30.5px 38.4px -2.5px hsl(var(--shadow-color) / 0.4)`,
    4: `0.3px 0.5px 0.4px hsl(var(--shadow-color) / 0.53), 0.3px 0.6px 0.5px -0.7px hsl(var(--shadow-color) / 0.47), 0.7px 1.4px 1.2px -1.4px hsl(var(--shadow-color) / 0.4), 1.8px 3.6px 3px -2.1px hsl(var(--shadow-color) / 0.33), 3.9px 7.9px 6.6px -2.9px hsl(var(--shadow-color) / 0.27), 7.4px 14.9px 12.5px -3.6px hsl(var(--shadow-color) / 0.2), 12.7px 25.4px 21.3px -4.3px hsl(var(--shadow-color) / 0.13), 20px 40px 33.5px -5px hsl(var(--shadow-color) / 0.07);`,
    // 4: `0.3px 0.5px 0.5px hsl(var(--shadow-color) / 0.49), 0.5px 1px 0.9px -0.6px hsl(var(--shadow-color) / 0.43), 1px 2px 1.8px -1.3px hsl(var(--shadow-color) / 0.38), 2.2px 4.4px 4.1px -1.9px hsl(var(--shadow-color) / 0.32), 4.3px 8.7px 8px -2.6px hsl(var(--shadow-color) / 0.27), 7.8px 15.7px 14.5px -3.2px hsl(var(--shadow-color) / 0.22), 13px 26.1px 24.1px -3.9px hsl(var(--shadow-color) / 0.16), 20.3px 40.5px 37.4px -4.5px hsl(var(--shadow-color) / 0.11)`,
    5: `0.3px 0.5px 0.4px hsl(var(--shadow-color) / 0.75), 0.3px 0.7px 0.6px -0.7px hsl(var(--shadow-color) / 0.65), 0.9px 1.8px 1.5px -1.4px hsl(var(--shadow-color) / 0.56), 2.4px 4.8px 4px -2.1px hsl(var(--shadow-color) / 0.47), 5.4px 10.8px 9.1px -2.9px hsl(var(--shadow-color) / 0.37), 10.3px 20.5px 17.2px -3.6px hsl(var(--shadow-color) / 0.28), 17.6px 35.1px 29.4px -4.3px hsl(var(--shadow-color) / 0.19), 27.8px 55.5px 46.6px -5px hsl(var(--shadow-color) / 0.09);`,
  },
  compose: {
    something: 'm1 wrem-3.5 bgd-dark-teal',
    foo: 'bar hrem-3.5 lo:ws1',
  },
};

module.exports = defaultConfig;
