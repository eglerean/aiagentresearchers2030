# slidev-theme-aalto-scicomp

[Slidev](https://sli.dev) theme for [Aalto Scientific Computing](https://scicomp.aalto.fi/). It is a sibling of `slidev-theme-aalto`: same layouts, same slots and the Aalto A! logo, but with a warmer, softer look:

- Pale ivory and very dark warm-gray slides with strong contrast
- Rounded cards for columns, images, tables, quotes and code
- **Besley** (serif) headings with **Inter** (sans) body text, both loaded from Google Fonts
- A single warm clay accent color
- Decorative hexagon honeycomb, generated in SVG and based on the scripts in `../graphics/make_banner_*.py`
- "Aalto Scientific Computing" wordmark in the footer, and covers that spell words in honeycomb cells

## Usage

Same as the Aalto theme, so see `../slidev-theme-aalto/README.md` for installing Node and Slidev. Then in your `slides.md`:

```md
---
theme: ./slidev-theme-aalto-scicomp
---

###### Aalto Scientific Computing

# Presentation title

Subtitle

::presenter::
Name · Date · Place
```

To preview the theme itself:

```bash
cd slidev-theme-aalto-scicomp
npm install
npx slidev example.md
```

A deck written for `slidev-theme-aalto` should work after you change only the `theme:` line.

For a full walkthrough from an empty folder to slides online, see the next section.

## New presentation on GitHub Pages, step by step

Two things the steps rely on:

- **Copy the theme into the repo.** It isn't published anywhere yet, and GitHub can only build what's in your repo.
- **Pin Slidev to 0.47.** `npm init slidev@latest` would install a much newer Slidev, and this theme was built and tested on 0.47.

### 1. Create the presentation folder

```bash
mkdir my-talk && cd my-talk
git init
rsync -a --exclude node_modules --exclude package-lock.json --exclude dist \
  /path/to/aaltoslidev/slidev-theme-aalto-scicomp ./
```

Create `package.json`:

```json
{
  "name": "my-talk",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "slidev --open",
    "build": "slidev build",
    "export": "slidev export"
  },
  "dependencies": {
    "@slidev/cli": "~0.47.5"
  }
}
```

Create `.gitignore`:

```
node_modules
dist
```

Create `slides.md`:

```md
---
theme: ./slidev-theme-aalto-scicomp
title: My Talk
---

###### Aalto Scientific Computing

# My Talk

Subtitle

::presenter::
Your Name · Date · Place

---
layout: end
---

# Kiitos!
```

### 2. Work on it locally

```bash
npm install
npm run dev        # opens http://localhost:3030 and reloads as you edit slides.md
```

### 3. Add the GitHub Pages workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy slides
on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - run: npx slidev build --base /${{ github.event.repository.name }}/
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

The `--base /<repo-name>/` part makes the links work under `username.github.io/<repo-name>/`. Slidev 0.47 also creates a `404.html`, so a direct link to a slide like `/my-talk/5` works too.

### 4. Commit and push

With the GitHub CLI (run `gh auth login` once first):

```bash
git add .
git commit -m "First version of my talk"
git branch -M main
gh repo create my-talk --public --source . --push
```

If you don't use `gh`, create an empty repo called `my-talk` on github.com, then:

```bash
git remote add origin git@github.com:USERNAME/my-talk.git
git push -u origin main
```

### 5. Turn on Pages (once per repo)

On GitHub, open the repo, then **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Then either push again or go to **Actions → Deploy slides → Run workflow**.

### 6. Open it from anywhere

Your slides will be at `https://USERNAME.github.io/my-talk/`. The **Actions** tab shows whether the build passed. Every later `git push` to `main` updates the site in about a minute.

### Notes

- **Public repo:** Pages on a private repo needs a paid GitHub plan. Also, anyone with the link can see the slides.
- **Images:** put them in a `public/` folder and refer to them as `/image.png`. The theme adds the base path for you.
- **Offline:** the fonts load from Google Fonts. For a talk with no internet, export a PDF beforehand (`npm i -D playwright-chromium && npm run export`).
- **Theme updates:** the theme copy in your repo doesn't change when you edit the original. To update it, run the `rsync` line again and commit.

## Layouts

`cover`, `cover-picture`, `default`, `section`, `two-cols`, `three-cols`, `bullets-content`, `image-right`, `image-left`, `picture`, `blank`, `end`. The slot names are the same as in the Aalto theme (`::presenter::`, `::header::`, `::left::`, `::center::`, `::right::`, `::bullets::`, `::content::`).

What is specific to this theme:

| Layout | Look | Extra frontmatter |
| --- | --- | --- |
| `cover` | Title on the left, a honeycomb panel with letters on the right | `hexText` (default `"SCI\nCOMP"`; use `""` for no letters), `hexSeed`, `background` |
| `section` | Large serif title at the bottom left, a honeycomb band on the right | `hexText` (default empty), `hexSeed` |
| `default`, `blank` | Plain slide | `hexes: true` adds a faded honeycomb in the top-right corner, `hexSeed` |
| `two-cols`, `three-cols` | Each column is a rounded card | |
| `bullets-content` | Bullets on the slide, content in a card | |
| `image-*`, `cover-picture` | Image in a rounded box with a margin (not edge to edge) | `image` |
| `picture` | Full-bleed image with the caption in a rounded dark card | `background` |
| `end` | Dark by default, honeycomb background | `hexText` (shown above the title), `hexSeed` |

`hexSeed` changes the random pattern. The pattern is deterministic, so a slide looks the same every time it is rendered.

## Color variants

Use `color:` on any layout:

| Value | Background |
| --- | --- |
| `ivory` (default) | Pale beige `#F0EEE6` |
| `white` | White |
| `sand` | Darker beige `#E3DACC` |
| `dark` | Very dark warm gray `#1F1E1D` |
| `clay` | Clay accent `#CC785C` |

Color names from the old theme are mapped: `black` and `gray-dark` become `dark`, `gray` becomes `sand`, and `blue`, `red` and `yellow` become `clay`.

## Markdown helpers

- `###### Label` is an eyebrow: a small uppercase clay label to put above a title.
- `<div class="card">…</div>` is a rounded box. Add `dark` or `clay` for the other variants (`class="card dark"`). Wrap several cards in `<div class="card-grid">` to place them side by side. Leave blank lines around markdown inside the divs.
- Blockquotes, tables and code blocks are styled as rounded cards automatically.

## `<Honeycomb>` component

You can use it in any slide:

```html
<div class="card" style="height: 300px; padding: 0; overflow: hidden">
  <Honeycomb :width="860" :height="300" :radius="32" text="TRITON" fade="right" />
</div>
```

| Prop | Default | Meaning |
| --- | --- | --- |
| `width`, `height` | 800, 450 | Coordinate size of the SVG. It scales to fill its container. |
| `radius` | 40 | Hexagon radius. It shrinks automatically if the text does not fit. |
| `density` | 0.5 | Fraction of background cells that are drawn |
| `accent` | 0.08 | Fraction of drawn cells in the clay color |
| `seed` | 42 | Seed for the random pattern |
| `text` | `""` | Letters to place in cells. Use `\n` for a new row. |
| `fade` | `none` | `left`, `right`, `top`, `bottom` or `radial`: the direction the honeycomb fades toward |
| `strokeWidth` | 1.5 | Outline width |

## Export

```bash
npm install -D playwright-chromium
npx slidev export example.md            # PDF
npx slidev export example.md --format png
```
