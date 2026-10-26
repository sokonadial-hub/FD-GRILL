# FD Grill website

One-page site for FD Grill, a family-run West African grill and catering business in Philadelphia with over 20 years of experience. The restaurant is under renovation for a 2027 opening.

No build step and no frameworks. To preview locally, run `python3 -m http.server` in this folder and open http://localhost:8000. Opening `index.html` straight from disk works too, but browsers block the self-hosted fonts there, so headings fall back to a system font.

## Files

- `index.html`: all page content, including the full menu
- `css/style.css`: design tokens at the top (colors, fonts), then each section in page order
- `js/main.js`: load and scroll animations, folding menu on phones, the catering quote form, and the ember effect over the top photo
- `img/`: photos in three or four sizes as WebP, plus a JPEG fallback; favicons
- `fonts/`: self-hosted Bricolage Grotesque and Figtree, trimmed to Latin characters and the widths and weights the site uses
- `404.html`: shown by GitHub Pages for any broken link
- `sitemap.xml` and `robots.txt`: submit https://fdgrill.com/sitemap.xml in Google Search Console

## Writing for FD Grill

New copy (site, menus, social, email) should follow [BRAND-VOICE.md](BRAND-VOICE.md): warm, rooted, plain-spoken, quietly confident.

## Common edits

- **Change a price or dish:** find the item in the menu section of `index.html`; each dish is one `<li>`.
- **Catering requests:** the quote form posts to FormSubmit (formsubmit.co), which emails each request to the address in `INBOX` in `js/main.js` (fdgrillllc@gmail.com). The first request ever sent triggers a one-time activation email from FormSubmit; click its link or requests won't be delivered. If sending fails, the visitor gets their request back with email and text links to (610) 256-9268.
- **Menu:** prices are intentionally not shown; catering is quoted per event.
- **Add a photo:** export it at 640, 960 and full width as WebP, and copy the `<picture>` markup used by the dishes in "Start with these".

## Motion and accessibility

Animations use only transforms, opacity and clip-path, so they stay smooth on phones. Everything is switched off for visitors whose device is set to reduce motion, and the embers pause when the photo is off screen or the tab is hidden.

## Publishing

The site is served by GitHub Pages from the `main` branch, root folder, at https://fdgrill.com/. `CNAME` holds the custom domain; `.nojekyll` tells Pages to serve the files as they are. DNS for fdgrill.com points at GitHub Pages (A records for the apex, a CNAME for `www`).

## Photo credits

`img/catering-serving-*` (Adobe Stock #454202736) and `img/catering-grill-*` (Adobe Stock #1223311706) are licensed from Adobe Stock under FD Grill's Adobe account (standard license). All other food photos are FD Grill's own.
