// const map = require('lodash/fp/map');
// const toPairs = require('lodash/fp/toPairs');
const flatten = require('lodash/flatten');
// const reduce = require('lodash/fp/reduce');
// const flow = require('lodash/fp/flow');
const isObject = require('lodash/isObject');
// const { format } = require('path');

// import colorString from 'color-string';

// const format = acc => flow(
//   toPairs,
//   map(([key, value]) => {
//     console.log('key', key);
//     console.log('value', value);
//     // return typeof value === 'string'
//     //   ? `${acc}${key}: ${value};`
//     //   : format(`${acc}${key}-`)(value);
//   }),
//   // flatten
// );

const colorFormatter = (acc) => ([key, value]) => {
  if (isObject(value)) {
    Object.entries(value).forEach(([k, v]) => {
      colorFormatter(acc)([`${key}-${k}`, v]);
    });
  } else {
    acc.push([`${key}`, value]);
  }

  return acc;
};

const formatColors = ([key, value]) => {
  return colorFormatter([])([key, value]);
};

module.exports = {
  colorFormatter,
  formatColors
}
