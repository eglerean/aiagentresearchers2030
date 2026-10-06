// Quick palette switch for testing, without editing the headmatter:
//   npm run dev:classic       (VITE_PALETTE=aalto-classic)
//   npm run dev:scicomp-web   (VITE_PALETTE=scicomp-web)
// The palettes themselves live in the theme (styles/palettes.css). To make one
// the default, set `themeConfig: palette: <name>` in the slides.md headmatter.
const palette = import.meta.env.VITE_PALETTE

if (palette && typeof document !== 'undefined')
  document.documentElement.classList.add(`asc-palette-${palette}`)
