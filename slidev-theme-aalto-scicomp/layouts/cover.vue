<script setup lang="ts">
import { computed } from 'vue'
import { ascColorClass, isDark, handleBackground } from '../layoutHelper'
import AscFooter from '../components/AscFooter.vue'
import Honeycomb from '../components/Honeycomb.vue'
import logoBlack from '../assets/aalto-logo-black.png'
import logoWhite from '../assets/aalto-logo-white.png'

const props = defineProps({
  color: { type: String, default: '' },
  background: { type: String, default: '' },
  hexText: { type: String, default: 'SCI\nCOMP' },
  hexSeed: { type: Number, default: 7 },
})

const colorClass = computed(() => ascColorClass(props.color))
const dark = computed(() => isDark(props.color) || !!props.background)
const style = computed(() => handleBackground(props.background, true))
const topLogo = computed(() => dark.value ? logoWhite : logoBlack)
</script>

<template>
  <div
    class="slidev-layout cover"
    :class="[background ? 'asc-dark has-background' : colorClass]"
    :style="style"
  >
    <div class="cover-main">
      <img :src="topLogo" alt="Aalto University" class="cover-logo" />
      <div class="cover-content">
        <slot />
      </div>
      <div class="cover-presenter">
        <slot name="presenter" />
      </div>
    </div>
    <div class="cover-hex">
      <Honeycomb :width="420" :height="500" :radius="38" :text="hexText" :seed="hexSeed" fade="left" />
    </div>
    <AscFooter :white="dark" />
  </div>
</template>
