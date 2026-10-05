import type { CSSProperties } from 'vue'

/**
 * Resolve urls from frontmatter and append with the base url
 */
export function resolveAssetUrl(url: string) {
  if (url.startsWith('/'))
    return import.meta.env.BASE_URL + url.slice(1)
  return url
}

export function handleBackground(background?: string, dim = false): CSSProperties {
  const isColor = background && ['#', 'rgb', 'hsl'].some(v => background.indexOf(v) === 0)

  const style = {
    background: isColor ? background : undefined,
    color: (background && !isColor) ? 'white' : undefined,
    backgroundImage: isColor
      ? undefined
      : background
        ? dim
          ? `linear-gradient(#1F1E1D99, #1F1E1DCC), url(${CSS.escape(resolveAssetUrl(background))})`
          : `url("${CSS.escape(resolveAssetUrl(background))}")`
        : undefined,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }

  if (!style.background)
    delete style.background

  return style
}

export function imageStyle(image?: string): CSSProperties {
  if (!image) return {}
  return { backgroundImage: `url("${CSS.escape(resolveAssetUrl(image))}")` }
}

/**
 * Map the `color` frontmatter prop to a variant name.
 * Legacy Aalto theme names are aliased so old decks keep working.
 */
const ALIASES: Record<string, string> = {
  ivory: 'ivory',
  beige: 'ivory',
  white: 'white',
  sand: 'sand',
  gray: 'sand',
  dark: 'dark',
  black: 'dark',
  'gray-dark': 'dark',
  clay: 'clay',
  blue: 'clay',
  red: 'clay',
  yellow: 'clay',
}

export function ascVariant(color?: string, fallback = 'ivory'): string {
  if (!color) return fallback
  return ALIASES[color.toLowerCase().trim()] ?? fallback
}

export function ascColorClass(color?: string, fallback = 'ivory'): string {
  return `asc-${ascVariant(color, fallback)}`
}

/**
 * Whether the variant has a dark background (white logo, light text).
 */
export function isDark(color?: string, fallback = 'ivory'): boolean {
  return ascVariant(color, fallback) === 'dark'
}
