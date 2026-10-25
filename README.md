# FD Grill website

One-page site for FD Grill, a West African grill and catering business in Philadelphia. The restaurant opens in 2027.

No build step and no frameworks: open `index.html` in a browser, or put the folder on any static host (GitHub Pages, Netlify, etc.).

## Files

- `index.html`: all page content, including the full menu
- `css/style.css`: design tokens at the top (colors, fonts), then each section in page order
- `js/main.js`: load and scroll animations, folding menu on phones, the catering quote form, and the ember effect over the top photo
- `img/`: photos in three sizes (640, 960 and full width) as WebP, plus a JPEG fallback

## Common edits

- **Change a price or dish:** find the item in the menu section of `index.html`; each dish is one `<li>`.
- **Catering requests:** the quote form doesn't need a server. On phones it opens Messages with the request filled in, addressed to the number in `PHONE` in `js/main.js`. On computers it shows the request with a Copy button.
- **Add a photo:** export it at 640, 960 and full width as WebP, and copy the `<picture>` markup used by the dishes in "Start with these".

## Motion and accessibility

Animations use only transforms, opacity and clip-path, so they stay smooth on phones. Everything is switched off for visitors whose device is set to reduce motion, and the embers pause when the photo is off screen or the tab is hidden.

## Publishing

The site is served by GitHub Pages from the `main` branch, root folder, at https://sokonadial-hub.github.io/FD-GRILL/. `.nojekyll` tells Pages to serve the files as they are.
