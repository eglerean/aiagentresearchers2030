<script setup lang="ts">
import { computed } from 'vue'
import { handleBackground } from '../layoutHelper'
import AscFooter from '../components/AscFooter.vue'

const props = defineProps({
  background: { type: String, default: '' },
})

const style = computed(() => handleBackground(props.background))
</script>

<template>
  <div class="slidev-layout picture asc-dark" :style="style">
    <div class="picture-caption">
      <slot />
    </div>
    <AscFooter :white="true" />
  </div>
</template>
