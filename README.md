# FD Grill website

One-page site for FD Grill, a family-run West African grill and catering business in Philadelphia with over 20 years of experience. Sit-down dining opens at its Philadelphia location in 2027, once the new kitchen is built.

Built with React, TypeScript and Vite, styled with Tailwind CSS v4 and shadcn/ui components (Radix UI underneath). The build pre-renders the page to HTML, so content and the hero photo appear before any JavaScript runs.

## Working on it

Needs Node 22.

```bash
npm install
npm run dev      # local preview at http://localhost:5173 with live reload
npm run build    # type-check, build and pre-render into dist/
npm run preview  # serve the built site from dist/
```

## Files

- `index.html`: page shell with the meta tags, structured data, preloads and the small script that starts the hero animation
- `src/App.tsx`: the page, section by section
- `src/components/`: one file per section (`Ticker`, `Header`, `Hero`, `StartHere`, `Story`, `Signatures`, `Catering`, `QuoteForm`, `Menu`, `Restaurant`, `Footer`, `Dock`)
- `src/components/ui/`: shadcn/ui components (`button`, `input`, `textarea`, `native-select`, `label`, `toggle-group`, `accordion`), adapted to the FD Grill palette. `components.json` holds the shadcn settings
- `src/data/`: the content that changes most: `menu.ts` (the full menu), `matches.ts` (the "You already know this food" pairings) and `site.ts` (phone, email, address, dishes on the quote form)
- `src/index.css`: Tailwind setup, brand colors and fonts as theme tokens, breakpoints, and the few animations that need plain CSS (ticker, cloth stripe, photo reveals)
- `public/`: copied to the site as is: photos in `img/` (WebP in several sizes plus a JPEG fallback), self-hosted fonts in `fonts/`, `404.html`, `CNAME`, `robots.txt`, `sitemap.xml`
- `scripts/prerender.mjs`: writes the server-rendered page into `dist/index.html` at build time

## Writing for FD Grill

New copy (site, menus, social, email) should follow [BRAND-VOICE.md](BRAND-VOICE.md): warm, rooted, plain-spoken, quietly confident.

## Common edits

- **Change a dish:** edit `src/data/menu.ts`; each dish is one line.
- **Change a pairing in "You already know this food":** edit `src/data/matches.ts`. A pairing shows a photo if it has one, or a bold typographic card if not.
- **Catering requests:** the quote form posts to FormSubmit (formsubmit.co), which emails each request to the address in `src/data/site.ts` (fdgrillllc@gmail.com). The first request ever sent triggers a one-time activation email from FormSubmit; click its link or requests won't be delivered. If sending fails, the visitor gets their request back with email and text links to (610) 256-9268.
- **Menu:** prices are intentionally not shown; catering is quoted per event.
- **Add a photo:** export it at 640, 960 and full width as WebP plus one JPEG, put them in `public/img/`, and use the `Photo` component (`src/components/Photo.tsx`).

## Motion and accessibility

Animations use only transforms, opacity and clip-path, so they stay smooth on phones. Everything is switched off for visitors whose device is set to reduce motion. The ticker has a pause button and stops on hover and keyboard focus.

## Publishing

A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds the site on every pull request and publishes it to GitHub Pages on every push to `main`. In the repository's **Settings → Pages**, **Source** must be set to **GitHub Actions**. The custom domain is https://fdgrill.com/ (`public/CNAME`); DNS for fdgrill.com points at GitHub Pages (A records for the apex, a CNAME for `www`).

## Photo credits

`catering-serving-*` (Adobe Stock #454202736) and `catering-grill-*` (Adobe Stock #1223311706) are licensed from Adobe Stock under FD Grill's Adobe account (standard license). All other food photos are FD Grill's own.
