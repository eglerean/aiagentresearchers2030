<script setup lang="ts">
import { computed } from 'vue'
import { ascColorClass, isDark } from '../layoutHelper'
import AscFooter from '../components/AscFooter.vue'
import Honeycomb from '../components/Honeycomb.vue'

const props = defineProps({
  color: { type: String, default: '' },
  hexText: { type: String, default: '' },
  hexSeed: { type: Number, default: 5 },
})

const colorClass = computed(() => ascColorClass(props.color, 'dark'))
const dark = computed(() => isDark(props.color, 'dark'))
</script>

<template>
  <div class="slidev-layout end" :class="colorClass">
    <div class="end-hex asc-deco">
      <Honeycomb :width="980" :height="552" :radius="36" :seed="hexSeed" :density="0.55" fade="radial" />
    </div>
    <div class="end-content">
      <div v-if="hexText" class="end-letters">
        <Honeycomb :width="360" :height="120" :radius="30" :text="hexText" :density="0" />
      </div>
      <slot />
    </div>
    <AscFooter :white="dark" />
  </div>
</template>
