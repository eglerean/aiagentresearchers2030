// Optional alternative palettes, off by default.
// Try them with: npm run dev:classic  or  npm run dev:scicomp-web
// (these set VITE_PALETTE=aalto-classic or VITE_PALETTE=scicomp-web)
const palette = import.meta.env.VITE_PALETTE

if (palette === 'aalto-classic')
  import('./aalto-classic.css')
else if (palette === 'scicomp-web')
  import('./scicomp-web.css')
