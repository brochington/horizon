export interface FontConfig { 
  url: string; // link to google font, probably
  name: string; // 'pt-sans'
  key: string; // 'PT Sans'
}

export interface HeadingConfig {
  key: string; // like .h1
  size: string;
  style: string;
  color: string;
  weight: string;
}

export interface HorizonConfig {
  colors: { [key: string]: string; };
  fonts: FontConfig[];
  mediaQueries: { [key: string]: string };
  headings: HeadingConfig[]
}

const defaultConfig: HorizonConfig = {
  colors: {
    'dark-blue': '#001426',
    'dark-teal': '#014059',
    'teal': '#02738C',
    'slate-gray': '#788C8C',
    'white': '#F7F7F7',
    'black': '#0C0C0C',
  },
  fonts: [{
    url: 'https://fonts.googleapis.com/css?family=PT+Sans:400,700',
    name: 'PT Sans',
    key: 'pt-sans'
  }],
  mediaQueries: {
    su: 'screen and (min-width: 1rem)',
    so: 'screen and (max-width: 39.9375rem)',
    mu: 'screen and (min-width: 40rem)',
    mo: 'screen and (min-width: 40rem) and (max-width: 63.9375rem)',
    lu: 'screen and (min-width: 64rem)',
    lo: 'screen and (min-width: 64rem) and (max-width: 74.9375rem)'
  },
  headings: [{
    key: 'main-heading',
    size: '20px',
    style: 'var(--pt-sans)',
    color: 'var(--teal)',
    weight: 'bold'
  }]
}

export default defaultConfig;