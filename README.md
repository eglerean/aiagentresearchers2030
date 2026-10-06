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
npm i -D playwright-chromium
npm run export
```

This writes `slides-export.pdf`.

## Link preview image

The `<head>` of `index.html` holds the title, description and image that social media show when the link is shared. Slidev merges it into the built page. The image, `public/og-image.png`, is a screenshot of slide 1. Regenerate it after changing slide 1:

```bash
npm i --no-save playwright-chromium
npx slidev export --format png --range 1 --scale 1.25 --output og-tmp
mv og-tmp/001.png public/og-image.png && rm -r og-tmp
```

## Publish on GitHub Pages

`.github/workflows/deploy.yml` builds the slides and publishes them on every push to `main`. Turn it on once, in the repo on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
