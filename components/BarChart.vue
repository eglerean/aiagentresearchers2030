<!--
  Horizontal bar chart in the theme's colours (follows palettes and dark slides).
  Usage:
    <BarChart :items="[{ label: 'Coding', value: 56.8 }, ...]" unit="%" :max="100" />
  Bars are sorted largest first; an item labelled "Other" always goes last.
-->
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  items: { label: string, value: number }[]
  unit?: string
  max?: number
  decimals?: number
  sort?: boolean
}>(), {
  unit: '',
  decimals: 0,
  sort: true,
})

const rows = computed(() => {
  const list = [...props.items]
  if (props.sort) {
    list.sort((a, b) => {
      const ao = a.label === 'Other'
      const bo = b.label === 'Other'
      if (ao !== bo)
        return ao ? 1 : -1
      return b.value - a.value
    })
  }
  return list
})

const scaleMax = computed(() => props.max ?? Math.max(...props.items.map(i => i.value)))

function fmt(v: number) {
  return `${v.toFixed(props.decimals)}${props.unit}`
}
</script>

<template>
  <div class="bar-chart" role="table">
    <div v-for="row in rows" :key="row.label" class="bar-row" role="row" :title="`${row.label}: ${fmt(row.value)}`">
      <div class="bar-label" role="rowheader">{{ row.label }}</div>
      <div class="bar-track" role="cell">
        <div class="bar" :style="{ width: `${(row.value / scaleMax) * 100}%` }" />
        <span class="bar-value">{{ fmt(row.value) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bar-chart {
  display: grid;
  grid-template-columns: max-content 1fr;
  row-gap: 0.2rem;
  column-gap: 0.9rem;
  font-family: var(--asc-font-sans);
}

.bar-row {
  display: contents;
}

.bar-label {
  justify-self: end;
  align-self: center;
  font-size: 0.85rem;
  line-height: 1.2;
  color: var(--asc-text);
  text-align: right;
}

/* The baseline: bars grow from one shared left edge */
.bar-track {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 1.6rem;
  border-left: 1px solid var(--asc-border);
}

/* Thin bar, square at the baseline, 4px rounded at the data end */
.bar {
  height: 18px;
  background: var(--asc-clay);
  border-radius: 0 4px 4px 0;
}

/* Values sit outside the bar end, in text colour (never the bar colour) */
.bar-value {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--asc-text);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.bar-row:hover .bar {
  filter: brightness(0.9);
}
</style>
