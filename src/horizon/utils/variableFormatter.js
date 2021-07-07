const map = require('lodash/fp/map');
const toPairs = require('lodash/fp/toPairs');
const flatten = require('lodash/fp/flatten');
const reduce = require('lodash/fp/reduce');
const flow = require('lodash/fp/flow');

// import colorString from 'color-string';

const format = acc => flow(
  toPairs,
  map(([key, value]) => {
    return key === 'value' || typeof value === 'string'
      ? `${acc}${key === 'value' ? '' : `-${key}`}: ${value};`
      : format(`${acc}-${key}`)(value);
  }),
  flatten
);

// export const addRGBVariables = reduce((acc2, fv) => {
//   console.log('yo', acc2, fv);
//   if (fv.includes('#')) {
//     console.log('in includes');
//     const [key, value] = fv.split(': ');
//     console.log('a', key, value);
//     const [red, green, blue] = colorString.get.rgb(value.split(':')[0]);

//     acc2.push(`${key}-rgb: ${red}, ${green}, ${blue};`);
//   }

//   acc2.push(fv);

//   return acc2;
// }, [])

const variableFormatter = format('-');

module.exports = variableFormatter;
