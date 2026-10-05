<script setup lang="ts">
import { computed } from 'vue'
import { ascColorClass, isDark } from '../layoutHelper'
import AscFooter from '../components/AscFooter.vue'
import Honeycomb from '../components/Honeycomb.vue'

const props = defineProps({
  color: { type: String, default: '' },
  hexText: { type: String, default: '' },
  hexSeed: { type: Number, default: 3 },
})

const colorClass = computed(() => ascColorClass(props.color))
const dark = computed(() => isDark(props.color))
</script>

<template>
  <div class="slidev-layout section" :class="colorClass">
    <div class="section-content">
      <slot />
    </div>
    <div class="section-hex">
      <Honeycomb :width="410" :height="552" :radius="34" :text="hexText" :seed="hexSeed" :density="0.6" fade="left" />
    </div>
    <AscFooter :white="dark" />
  </div>
</template>
