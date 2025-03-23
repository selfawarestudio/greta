<script setup lang="ts">
import type { MediaObject, ObjectFit } from './types'

interface Props {
  media: MediaObject
  aspect?: boolean
  fit?: ObjectFit
  placeholder?: boolean
  sizes?: string
}

const {
  aspect = true,
  fit = 'cover',
  placeholder = false,
  sizes = '100vw',
} = defineProps<Props>()
</script>

<template>
  <MediaContainer :media="media" :aspect="aspect">
    <MediaElement :fit="fit" :placeholder="placeholder" :sizes="sizes" />
  </MediaContainer>
</template>
