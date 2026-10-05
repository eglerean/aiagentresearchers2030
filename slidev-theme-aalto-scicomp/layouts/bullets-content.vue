<script setup lang="ts">
import { computed } from 'vue'
import { ascColorClass, isDark } from '../layoutHelper'
import AscFooter from '../components/AscFooter.vue'

const props = defineProps({
  color: { type: String, default: '' },
})

const colorClass = computed(() => ascColorClass(props.color))
const dark = computed(() => isDark(props.color))
</script>

<template>
  <div class="slidev-layout bullets-content" :class="colorClass">
    <div class="cols-header">
      <slot name="header" />
    </div>
    <div class="col col-bullets">
      <slot name="bullets" />
    </div>
    <div class="col col-content">
      <slot name="content" />
    </div>
    <AscFooter :white="dark" />
  </div>
</template>
