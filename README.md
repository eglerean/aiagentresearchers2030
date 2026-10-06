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

This deck uses the **`aalto-classic`** palette (set with `palette: aalto-classic` in the `slides.md` headmatter). Without it, the theme's own look is warm ivory and dark backgrounds with a clay accent. The theme has two optional palettes that change only the colours; fonts, layouts and shapes stay the same:

| Palette | Look |
| --- | --- |
| `aalto-classic` | White and black backgrounds, Aalto blue, red and yellow accents |
| `scicomp-web` | The greys of [scicomp.aalto.fi](https://scicomp.aalto.fi/) (near-white slides, charcoal `#343131` dark slides) with its blue `#277CB4` |

The palettes live in the theme (`slidev-theme-aalto-scicomp/styles/palettes.css`); see the theme's README.

### Try one

```bash
npm run dev:classic                         # dev server, classic Aalto
npm run dev:scicomp-web                     # dev server, scicomp.aalto.fi greys
VITE_PALETTE=scicomp-web npm run export     # PDF with a palette
```

This quick switch comes from `styles/index.ts` in this repo, which applies the palette named in `VITE_PALETTE`.

### Make one the default

Add `palette` to `themeConfig` in the `slides.md` headmatter:

```yaml
themeConfig:
  palette: scicomp-web
  credit:
    ...
```

Then `npm run dev`, `npm run export` and the GitHub Pages deploy all use it, with no environment variable and no change to the workflow. Also regenerate the link preview image (see below) so it shows the new colours. To go back, remove the `palette` line.

## Theme copy

`slidev-theme-aalto-scicomp/` is a copy of `../aaltoslidev/slidev-theme-aalto-scicomp`. Make theme changes in the original, then update the copy:

```bash
rsync -a --exclude node_modules --exclude package-lock.json --exclude dist \
  ../aaltoslidev/slidev-theme-aalto-scicomp ./
```

Deck-specific tweaks live in `style.css` in this repo, so they survive the update.

## Link preview image

The `<head>` of `index.html` holds the title, description and image that social media show when the link is shared. Slidev merges it into the built page. The image, `public/og-image.png`, is a screenshot of slide 1. Regenerate it after changing slide 1:

```bash
npm i --no-save playwright-chromium
npx slidev export --format png --range 1 --scale 1.25 --output og-tmp
mv og-tmp/001.png public/og-image.png && rm -r og-tmp
```

## Publish on GitHub Pages

`.github/workflows/deploy.yml` builds the slides and publishes them on every push to `main`. Turn it on once, in the repo on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
