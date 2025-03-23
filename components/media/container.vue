<script setup lang="ts">
import type { MediaObject } from './types'

interface Props {
  media: MediaObject
  aspect?: boolean
}

const { media, aspect = true } = defineProps<Props>()

provide('mediaContext', media)
</script>

<template>
  <div
    class="relative overflow-clip"
    :style="{
      aspectRatio: aspect ? `${media.width} / ${media.height}` : undefined,
    }"
  >
    <slot />
  </div>
</template>
