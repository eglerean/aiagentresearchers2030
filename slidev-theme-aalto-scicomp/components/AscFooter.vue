<script setup lang="ts">
import { computed } from 'vue'
import logoBlack from '../assets/aalto-logo-black.png'
import logoWhite from '../assets/aalto-logo-white.png'

const props = defineProps<{
  white?: boolean
}>()

const logoSrc = computed(() => props.white ? logoWhite : logoBlack)

const today = new Date()
const dateStr = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`
</script>

<template>
  <div class="asc-footer">
    <div class="asc-footer-left">
      <img :src="logoSrc" alt="Aalto University" class="asc-footer-logo" />
      <span class="asc-footer-divider" />
      <span class="asc-footer-wordmark">Aalto Scientific Computing</span>
    </div>
    <div class="asc-footer-right">
      <!-- Optional credit line, set in the deck headmatter:
           themeConfig: { credit: { text: 'Name · CC BY 4.0', url: 'https://…' } } -->
      <span v-if="$slidev.themeConfigs?.credit" class="asc-footer-credit">
        {{ $slidev.themeConfigs.credit.text }}<template v-if="$slidev.themeConfigs.credit.url"> · <a :href="$slidev.themeConfigs.credit.url" target="_blank">{{ $slidev.themeConfigs.credit.url.replace(/^https?:\/\//, '').replace(/\/$/, '') }}</a></template>
      </span>
      <span>{{ dateStr }}</span>
      <span class="asc-footer-page">{{ $page }}</span>
    </div>
  </div>
</template>
