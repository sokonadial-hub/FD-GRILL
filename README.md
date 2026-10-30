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
npm start        # run the built site as a Node.js app (after npm run build)
```

### Running it as a Node.js app

`server.mjs` serves the built site with Node's built-in `http` module: no extra packages, compressed text, long-term caching for fingerprinted assets, and the branded 404 page. It listens on the `PORT` environment variable (default 3000), so it works on Node.js hosting such as Hostinger: set the build command to `npm run build` and the start command to `npm start` (entry file `server.mjs`). The standard Hostinger setup (below) doesn't need it; it serves the built files directly.

## Files

- `index.html`: page shell with the meta tags, structured data, preloads and the small script that starts the hero animation
- `src/App.tsx`: the page, section by section
- `src/components/`: one file per section (`Ticker`, `Header`, `Hero`, `StartHere`, `Story`, `Signatures`, `Catering`, `QuoteForm`, `Menu`, `Restaurant`, `Footer`, `Dock`)
- `src/components/ui/`: shadcn/ui components (`button`, `input`, `textarea`, `native-select`, `label`, `toggle-group`, `accordion`), adapted to the FD Grill palette. `components.json` holds the shadcn settings
- `src/data/`: the content that changes most: `menu.ts` (the full menu), `matches.ts` (the "You already know this food" pairings) and `site.ts` (phone, email, address, dishes on the quote form)
- `src/index.css`: Tailwind setup, brand colors and fonts as theme tokens, breakpoints, and the few animations that need plain CSS (ticker, cloth stripe, photo reveals)
- `public/`: copied to the site as is: photos in `img/` (WebP in several sizes plus a JPEG fallback), self-hosted fonts in `fonts/`, `404.html`, `.htaccess` (Hostinger server settings), `CNAME`, `robots.txt`, `sitemap.xml`
- `scripts/prerender.mjs`: writes the server-rendered page into `dist/index.html` at build time
- `server.mjs`: the Node.js server for `npm start`
- `src/components/OpeningList.tsx`: the "Save me a seat" sign-up for the 2027 opening (emails the same FormSubmit inbox as the quote form)

## Writing for FD Grill

New copy (site, menus, social, email) should follow [BRAND-VOICE.md](BRAND-VOICE.md): joyful and inviting, warm, fire-forward, authentic, plain-spoken.

## Common edits

- **Change a dish:** edit `src/data/menu.ts`; each dish is one line.
- **Change a pairing in "You already know this food":** edit `src/data/matches.ts`. A pairing shows a photo if it has one, or a bold typographic card if not.
- **Catering requests:** the quote form posts to FormSubmit (formsubmit.co), which emails each request to the address in `src/data/site.ts` (fdgrillllc@gmail.com). The first request ever sent triggers a one-time activation email from FormSubmit; click its link or requests won't be delivered. If sending fails, the visitor gets their request back with email and text links to (610) 256-9268.
- **Menu:** prices are intentionally not shown; catering is quoted per event.
- **Add a photo:** export it at 640, 960 and full width as WebP plus one JPEG, put them in `public/img/`, and use the `Photo` component (`src/components/Photo.tsx`).

## Motion and accessibility

Animations use only transforms, opacity and clip-path, so they stay smooth on phones. Everything is switched off for visitors whose device is set to reduce motion. The ticker has a pause button and stops on hover and keyboard focus.

## Publishing (Hostinger)

The site is hosted on Hostinger. A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds the site on every pull request, and on every push to `main` it publishes the finished files to the **`hostinger`** branch. That branch holds only built files (never edit it by hand). Hostinger pulls it into `public_html`.

One-time setup in Hostinger's hPanel:

1. **Websites → fdgrill.com → Advanced → Git.** Repository `https://github.com/sokonadial-hub/FD-GRILL.git`, branch `hostinger`, install path left empty (so it deploys into `public_html`). `public_html` must be empty first: delete or back up anything in it with the File Manager. If the repository is private, add the SSH key Hostinger shows there to GitHub (repository **Settings → Deploy keys**) and use the `git@github.com:` address instead.
2. Click **Deploy** once, then turn on **Auto deployment** and add the webhook URL it gives you to GitHub (repository **Settings → Webhooks → Add webhook**, content type `application/json`, "Just the push event"). After that every merge to `main` goes live within a minute or two.
3. **Security → SSL:** install the free SSL certificate and turn on **Force HTTPS**.
4. The domain's DNS must point at Hostinger (Hostinger's own nameservers, or its A record), not at GitHub Pages.

`public/.htaccess` sets the 404 page, compression and caching on Hostinger's server.

Never point Hostinger at `main`: it holds the source code, which a browser shows as a blank page until it's built.

On Hostinger plans that run Node.js apps you can instead deploy `main` as a Node.js app (build command `npm run build`, start command `npm start`), but the `hostinger` branch works on every plan.

## Photo credits

All photos were supplied by FD Grill. The two grill photos in the catering section (`grill-basting-*`, `grill-overhead-*`) are the outdoor barbecue shots from the first version of the site; if they came from elsewhere online, confirm they're cleared for use or replace them. The licensed Adobe Stock images (#454202736, #1223311706) that stood in for them are in the repository history (commit `acf87cf`) if needed again.
