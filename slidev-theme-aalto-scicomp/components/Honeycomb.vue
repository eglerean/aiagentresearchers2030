<script setup lang="ts">
import { computed } from 'vue'

/**
 * Decorative pointy-top hexagon honeycomb, ported from
 * ../graphics/make_banner_text_hexagons.py (same grid geometry and
 * letter placement). Colors come from CSS variables so the comb adapts
 * to light and dark slide variants.
 */
const props = defineProps({
  width: { type: Number, default: 800 },
  height: { type: Number, default: 450 },
  radius: { type: Number, default: 40 },
  // Fraction of background cells that get an outline
  density: { type: Number, default: 0.5 },
  // Fraction of outlined cells drawn in the clay accent
  accent: { type: Number, default: 0.08 },
  seed: { type: Number, default: 42 },
  // Letters to place in cells, `\n` separates rows
  text: { type: String, default: '' },
  // Direction the comb dissolves towards: left | right | top | bottom | radial | none
  fade: { type: String, default: 'none' },
  strokeWidth: { type: Number, default: 1.5 },
})

const uid = `asc-hex-${Math.random().toString(36).slice(2, 10)}`

// mulberry32: small deterministic PRNG so slides render identically every time
function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6D2B79F5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hexPoints(cx: number, cy: number, r: number) {
  const pts: string[] = []
  for (let i = 0; i < 6; i++) {
    const a = Math.PI / 2 - i * Math.PI / 3
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy - r * Math.sin(a)).toFixed(2)}`)
  }
  return pts.join(' ')
}

interface Cell { x: number, y: number, points: string, kind: 'plain' | 'accent' | 'accent-fill' | 'letter', char?: string }

const lines = computed(() =>
  props.text ? props.text.replace(/\\n/g, '\n').toUpperCase().split('\n') : [])

// Shrink the cells when the longest text row would not fit in the width
const R = computed(() => {
  const longest = Math.max(0, ...lines.value.map(l => l.length))
  if (!longest) return props.radius
  const fit = (props.width * 0.9) / ((longest + 0.5) * Math.sqrt(3))
  return Math.min(props.radius, fit)
})

const cells = computed(() => {
  const r = R.value
  const W = props.width
  const H = props.height
  const dx = r * Math.sqrt(3)
  const dy = r * 1.5
  const rows = lines.value
  const letters = new Map<string, string>()
  if (rows.length) {
    const firstRow = Math.round((H / 2 - (rows.length - 1) * dy / 2) / dy)
    rows.forEach((line, li) => {
      const row = firstRow + li
      const xOff = (row % 2) ? dx / 2 : 0
      const startCol = Math.round((W / 2 - xOff - (line.length - 1) * dx / 2) / dx)
      ;[...line].forEach((ch, ci) => letters.set(`${row},${startCol + ci}`, ch))
    })
  }

  const rand = rng(props.seed)
  const out: Cell[] = []
  const maxRow = Math.ceil(H / dy) + 1
  const maxCol = Math.ceil(W / dx) + 1
  for (let row = -1; row <= maxRow; row++) {
    const xOff = (Math.abs(row) % 2) ? dx / 2 : 0
    for (let col = -1; col <= maxCol; col++) {
      const x = col * dx + xOff
      const y = row * dy
      const ch = letters.get(`${row},${col}`)
      const roll = rand()
      const pick = rand()
      if (ch && ch !== ' ') {
        out.push({ x, y, points: hexPoints(x, y, r), kind: 'letter', char: ch })
        continue
      }
      if (roll >= props.density) continue
      let kind: Cell['kind'] = 'plain'
      if (pick < props.accent * 0.4) kind = 'accent-fill'
      else if (pick < props.accent) kind = 'accent'
      out.push({ x, y, points: hexPoints(x, y, r), kind })
    }
  }
  return out
})

const background = computed(() => cells.value.filter(c => c.kind !== 'letter'))
const letterCells = computed(() => cells.value.filter(c => c.kind === 'letter'))

const gradient = computed(() => {
  switch (props.fade) {
    case 'left': return { x1: 0, y1: 0, x2: 1, y2: 0 }
    case 'right': return { x1: 1, y1: 0, x2: 0, y2: 0 }
    case 'top': return { x1: 0, y1: 0, x2: 0, y2: 1 }
    case 'bottom': return { x1: 0, y1: 1, x2: 0, y2: 0 }
    default: return null
  }
})
const masked = computed(() => props.fade !== 'none')
</script>

<template>
  <svg
    class="asc-honeycomb"
    :viewBox="`0 0 ${width} ${height}`"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs v-if="masked">
      <linearGradient
        v-if="gradient"
        :id="`${uid}-g`"
        :x1="gradient.x1" :y1="gradient.y1" :x2="gradient.x2" :y2="gradient.y2"
      >
        <stop offset="0" stop-color="#fff" stop-opacity="0" />
        <stop offset="0.65" stop-color="#fff" stop-opacity="1" />
      </linearGradient>
      <radialGradient v-else :id="`${uid}-g`" cx="0.5" cy="0.5" r="0.7">
        <stop offset="0.15" stop-color="#fff" stop-opacity="0" />
        <stop offset="0.9" stop-color="#fff" stop-opacity="1" />
      </radialGradient>
      <mask :id="`${uid}-m`" maskContentUnits="objectBoundingBox">
        <rect width="1" height="1" :fill="`url(#${uid}-g)`" />
      </mask>
    </defs>

    <!-- Pass 1+2: background cells (fills, then outlines) -->
    <g :mask="masked ? `url(#${uid}-m)` : undefined">
      <rect :width="width" :height="height" fill="transparent" />
      <polygon
        v-for="(c, i) in background.filter(c => c.kind === 'accent-fill')"
        :key="`f${i}`"
        :points="c.points"
        class="hex-accent-fill"
      />
      <polygon
        v-for="(c, i) in background"
        :key="`o${i}`"
        :points="c.points"
        :class="c.kind === 'plain' ? 'hex-plain' : 'hex-accent'"
        :stroke-width="strokeWidth"
        fill="none"
      />
    </g>

    <!-- Pass 3: letter cells and text, never faded -->
    <g v-if="letterCells.length">
      <polygon
        v-for="(c, i) in letterCells"
        :key="`l${i}`"
        :points="c.points"
        class="hex-letter"
        :stroke-width="strokeWidth * 1.4"
      />
      <text
        v-for="(c, i) in letterCells"
        :key="`t${i}`"
        :x="c.x"
        :y="c.y"
        class="hex-letter-text"
        :font-size="R * 0.8"
        text-anchor="middle"
        dominant-baseline="central"
      >{{ c.char }}</text>
    </g>
  </svg>
</template>

<style scoped>
.asc-honeycomb {
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.hex-plain {
  stroke: var(--asc-hex-stroke);
}
.hex-accent {
  stroke: var(--asc-clay);
}
.hex-accent-fill {
  fill: var(--asc-clay);
  opacity: 0.85;
}
.hex-letter {
  fill: var(--asc-surface);
  stroke: var(--asc-text);
}
.hex-letter-text {
  fill: var(--asc-text);
  font-family: var(--asc-font-sans);
  font-weight: 700;
}
</style>
