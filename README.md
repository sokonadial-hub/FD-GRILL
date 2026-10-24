# FD Grill website

One-page site for FD Grill, a West African grill at 6732 Elmwood Ave, Philadelphia.

No build step and no frameworks: open `index.html` in a browser, or put the folder on any static host (GitHub Pages, Netlify, etc.).

## Files

- `index.html`: all page content, including the full menu
- `css/style.css`: design tokens at the top (colors, fonts), then each section in page order
- `js/main.js`: open/closed status in Philadelphia time, load and scroll animations, folding menu on phones, the click-to-load map, and the ember effect over the top photo
- `img/`: photos in three sizes (640, 960 and full width) as WebP, plus a JPEG fallback

## Common edits

- **Change a price or dish:** find the item in the menu section of `index.html`; each dish is one `<li>`.
- **Change hours:** update the hours table in `index.html`, the `OPEN`/`CLOSE` values at the top of `js/main.js`, and `openingHoursSpecification` in the `<head>`.
- **Add a photo:** export it at 640, 960 and full width as WebP, and copy the `<picture>` markup used by the dishes in "Start with these".

## Motion and accessibility

Animations use only transforms, opacity and clip-path, so they stay smooth on phones. Everything is switched off for visitors whose device is set to reduce motion, and the embers pause when the photo is off screen or the tab is hidden.
