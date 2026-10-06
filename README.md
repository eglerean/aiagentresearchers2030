# Rethinking research computing and data infrastructures for non-human users

Slides for a flash talk at the workshop on updating Finland's reference architectures for scientific computing (TiLa) and research data management (DAHA), 7 October 2026. Made with [Slidev](https://sli.dev) and the Aalto Scientific Computing theme (`slidev-theme-aalto-scicomp/`).

The slides are in `slides.md`, and the images are in `public/`.

## Preview locally

Install the dependencies once:

```bash
npm install
```

Then start the dev server:

```bash
npm run dev
```

This opens http://localhost:3030 in your browser. The page reloads whenever you save `slides.md`.

- **Presenter view:** open http://localhost:3030/presenter to see your speaker notes, the next slide and a timer.
- **Jump to a slide:** add the slide number to the URL, e.g. http://localhost:3030/5.
- **Overview:** press `o` to see all slides at once. Use the arrow keys or space to move between slides.
- **Stop the server:** press `Ctrl+C` in the terminal.

## Export a PDF

The fonts load from Google Fonts, so for a talk without internet, export a PDF beforehand:

```bash
npm i --no-save playwright-chromium
npm run export
```

This writes `slides-export.pdf`.

## Colour palettes

The default look is the Aalto Scientific Computing theme (warm ivory and dark backgrounds, clay accent), plus the tweaks in `style.css`.

There are also two optional palettes. They only change colours; fonts, layouts and shapes stay the same.

| Palette | `VITE_PALETTE` | Dev script | File | Look |
| --- | --- | --- | --- | --- |
| Classic Aalto | `aalto-classic` | `npm run dev:classic` | `styles/aalto-classic.css` | White and black backgrounds, Aalto blue, red and yellow accents |
| scicomp.aalto.fi | `scicomp-web` | `npm run dev:scicomp-web` | `styles/scicomp-web.css` | The greys of [scicomp.aalto.fi](https://scicomp.aalto.fi/) (near-white pages, charcoal `#343131` dark slides) with its blue `#277CB4` |

`styles/index.ts` loads a palette only when the environment variable `VITE_PALETTE` names it. Slidev loads `styles/index.ts` automatically.

### Try one

```bash
npm run dev:classic                         # dev server, classic Aalto
npm run dev:scicomp-web                     # dev server, scicomp.aalto.fi greys
VITE_PALETTE=scicomp-web npm run export     # PDF with a palette
VITE_PALETTE=scicomp-web npm run build      # static site with a palette
```

### Make one the default

Replace the contents of `styles/index.ts` with a plain import of the palette you want, for example:

```ts
import './scicomp-web.css'
```

Then `npm run dev`, `npm run export` and the GitHub Pages deploy all use that palette, with no environment variable and no change to the workflow. The `dev:classic` and `dev:scicomp-web` scripts in `package.json` are then no longer needed. Also regenerate the link preview image (see below) so it shows the new colours.

To go back, restore the conditional version of `styles/index.ts`:

```ts
const palette = import.meta.env.VITE_PALETTE

if (palette === 'aalto-classic')
  import('./aalto-classic.css')
else if (palette === 'scicomp-web')
  import('./scicomp-web.css')
```

To remove the optional palettes completely, delete the `styles/` folder and the `dev:classic` and `dev:scicomp-web` scripts.

## Link preview image

The `<head>` of `index.html` holds the title, description and image that social media show when the link is shared. Slidev merges it into the built page. The image, `public/og-image.png`, is a screenshot of slide 1. Regenerate it after changing slide 1:

```bash
npm i --no-save playwright-chromium
npx slidev export --format png --range 1 --scale 1.25 --output og-tmp
mv og-tmp/001.png public/og-image.png && rm -r og-tmp
```

## Publish on GitHub Pages

`.github/workflows/deploy.yml` builds the slides and publishes them on every push to `main`. Turn it on once, in the repo on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
