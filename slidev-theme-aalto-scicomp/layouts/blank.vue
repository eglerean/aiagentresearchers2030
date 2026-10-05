<script setup lang="ts">
import { computed } from 'vue'
import { ascColorClass, isDark, handleBackground } from '../layoutHelper'
import AscFooter from '../components/AscFooter.vue'
import Honeycomb from '../components/Honeycomb.vue'

const props = defineProps({
  color: { type: String, default: '' },
  background: { type: String, default: '' },
  hexes: { type: Boolean, default: false },
  hexSeed: { type: Number, default: 11 },
})

const colorClass = computed(() => ascColorClass(props.color))
const dark = computed(() => isDark(props.color) || !!props.background)
const style = computed(() => handleBackground(props.background))
</script>

<template>
  <div class="slidev-layout blank" :class="colorClass" :style="style">
    <div v-if="hexes" class="asc-hex-corner asc-deco">
      <Honeycomb :width="340" :height="250" :radius="26" :seed="hexSeed" :density="0.55" fade="left" />
    </div>
    <slot />
    <AscFooter :white="dark" />
  </div>
</template>
