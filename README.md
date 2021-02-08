# horizon
CSS generator done right.


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
