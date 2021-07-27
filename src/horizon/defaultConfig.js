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
  variables: {},
  colors: {
  'black': '#000000',
  'white': '#ffffff',
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
  },
  autoSpectrumColors: {
    // something: "#123456",
  },
  themes: { // Not implemented yet.
    light: {
      primary: 'var(--gray-0)'
    },
    dark: {
      primary: 'var(--gray-11)'
    }
  },
  fonts: [
    {
      url: "https://fonts.googleapis.com/css?family=PT+Sans:400,700",
      name: "PT Sans",
      key: "pt-sans",
    },
  ],
  mediaQueries: {
    su: "screen and (min-width: 1rem)",
    so: "screen and (max-width: 39.9375rem)",
    mu: "screen and (min-width: 40rem)",
    mo: "screen and (min-width: 40rem) and (max-width: 63.9375rem)",
    lu: "screen and (min-width: 64rem)",
    lo: "screen and (min-width: 64rem) and (max-width: 74.9375rem)",
    faab: {
      media: "screen and (max-width: 88rem)",
      css: `
      .hello {
        height: 27px;
        width: 33px;
        color: orange;
      }
      `
    }
    // light: 'screen and (prefers-color-scheme: light)',
    // dark: 'screen and (prefers-color-scheme: dark)'
  },
  body: {
    color: "var(--black)",
    backgroundColor: "var(--white)",
    fontFamily: "var(--pt-sans)",
  },
  headings: [
    {
      key: "main-heading",
      size: "20px",
      style: "var(--pt-sans)",
      color: "var(--teal)",
      weight: "bold",
    },
  ],
  margins: {
    "0": "0px",
    "1": ".25rem",
    "2": ".5rem",
    "3": "1rem",
    "4": "1.5rem",
    "5": "2rem",
    "6": "2.5rem",
    "7": "3rem",
    "8": "4rem",
    "9": "5rem",
  },
  paddings: {
    "0": "0px",
    "1": ".25rem",
    "2": ".5rem",
    "3": "1rem",
    "4": "1.5rem",
    "5": "2rem",
    "6": "2.5rem",
    "7": "3rem",
    "8": "4rem",
    "9": "5rem",
  },
  borders: [
    {
      key: "1",
      style: "solid",
      color: "var(--teal)",
      width: "1px",
      radius: "3px",
    },
  ],
  widths: {
    s1: "1rem",
    
  },
  heights: {
    s1: "1rem",
  },
  compose: {
    something: "m1 wrem-3.5 bgd-dark-teal",
    foo: 'bar hrem-3.5 lo:ws1'
  },
};

module.exports = defaultConfig;