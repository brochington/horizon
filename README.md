# horizon
CSS generator done right.

Horizon is a Functional CSS generator. It's kinda like Tailwind, but isn't part of the build step. This makes it very easy to use in non-compiled projects.

No default colors are given. You must declare them in a config.



## Setup

```bash
# Simply run the horizon cli in your project
$ horizon
```

## Configuration

You may add a `horizon.config.js` in the root of you project. example:

```javascript
const config = { /* your config */};

module.exports = {
  path: 'src/client/styles',
  filename: 'horizon-styles.css',
  docPath: 'docs/styles/site',
  config,
};
```

Check out the `defaultConfig.js` file to see an example of what the config looks like. Also know that this is the config that is extended when declaring your own config.

### Media Queries

```javascript
const config = {
  mediaQueries: {
    // The key will be used as a prefix to classes, e.g. su:wrem-3
    su: 'screen and (min-width: 1rem)',
    so: 'screen and (max-width: 39.9375rem)',
    mu: 'screen and (min-width: 40rem)',
    mo: 'screen and (min-width: 40rem) and (max-width: 63.9375rem)',
    lu: 'screen and (min-width: 64rem)',
    lo: 'screen and (min-width: 64rem) and (max-width: 74.9375rem)',
    // You may define your own media queries
    foo: {
      media: 'screen and (max-width: 80rem)',
      // Any additional css that you want scoped to the same media query
      // may be added with the `css` property.
      css: `
      .hello {
        color: orange;
      }
      `
    }
  },
}
```


### Compose

It can be a pain to write a bunch of functional css classes, so an option in the config is given called `compose`.

```javascript
const config = {
  compose: {
    // a class called "something" with all the css properties specified in the value string.
    something: "m1 wrem-3.5 bgd-dark-teal",
    foo: 'bar hrem-3.5 lo:ws1'
  },
};
```


#### Something cool to maybe integrate in the future
CSS-media-vars: https://github.com/propjockey/css-media-vars


#### Things to add
Lot's more modifiers
  - dark mode
  - transforms?
    - like `scale-150 translate-y-11`
  - Grid?

prefixes: 
  - `h:` hover
  - `f:` focus`
  - `a:` active
  - `d:` dark mode
  - `so:` media query, dynamic, whatever is added to the config.
  -  


#### Using with PurgeCSS

Need to add a custom extractor. Check out the one that [tailwind uses](https://github.com/tailwindlabs/tailwindcss/blob/952fa15e6ed7b6eaf449947979a9a8f7de4aebb8/src/lib/purgeUnusedStyles.js#L25)

```javascript
const _ = require('lodash');

function tailwindExtractor(content) {
  // Capture as liberally as possible, including things like `h-(screen-1.5)`
  const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []
  const broadMatchesWithoutTrailingSlash = broadMatches.map((match) => _.trimEnd(match, '\\'))

  // Capture classes within other delimiters like .block(class="w-1/2") in Pug
  const innerMatches = content.match(/[^<>"'`\s.(){}[\]#=%]*[^<>"'`\s.(){}[\]#=%:]/g) || []

  return broadMatches.concat(broadMatchesWithoutTrailingSlash).concat(innerMatches)
}

```
