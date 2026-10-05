<script setup lang="ts">
import { computed } from 'vue'
import { ascColorClass, isDark, imageStyle } from '../layoutHelper'
import AscFooter from '../components/AscFooter.vue'

const props = defineProps({
  color: { type: String, default: '' },
  image: { type: String, default: '' },
})

const colorClass = computed(() => ascColorClass(props.color))
const dark = computed(() => isDark(props.color))
const imgStyle = computed(() => imageStyle(props.image))
</script>

<template>
  <div class="slidev-layout cover-picture" :class="colorClass">
    <div class="cover-picture-content">
      <slot />
    </div>
    <div class="asc-image" :style="imgStyle" />
    <AscFooter :white="dark" />
  </div>
</template>
