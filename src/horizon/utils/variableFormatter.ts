import map from 'lodash/fp/map';
import toPairs from 'lodash/fp/toPairs';
import flatten from 'lodash/fp/flatten';
import reduce from 'lodash/fp/reduce';
import flow from 'lodash/fp/flow';

import colorString from 'color-string';

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

export default variableFormatter;
