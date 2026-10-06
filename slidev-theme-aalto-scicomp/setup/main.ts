import { defineAppSetup } from '@slidev/types'
// @ts-expect-error virtual module provided by Slidev (the deck headmatter config)
import configs from '/@slidev/configs'

// Optional colour palette from the deck headmatter (`themeConfig: { palette: 'scicomp-web' }`).
// The palette rules in styles/palettes.css apply under this <html> class.
export default defineAppSetup(() => {
  const palette = configs.themeConfig?.palette
  if (palette && typeof document !== 'undefined')
    document.documentElement.classList.add(`asc-palette-${palette}`)
})
