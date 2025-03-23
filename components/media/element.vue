<script setup lang="ts">
import type { MediaObject, ObjectFit } from './types'
import '@mux/mux-player'

interface Props {
  fit?: ObjectFit
  placeholder?: boolean
  sizes?: string
}

const {
  fit = 'cover',
  placeholder = false,
  sizes = '100vw',
} = defineProps<Props>()

const media = inject<MediaObject>('mediaContext')
if (!media) {
  throw new Error('MediaElement must be used within MediaContainer')
}

const isLoading = ref(true)
const isDone = ref(false)
const video = useTemplateRef<HTMLVideoElement>('video')
const baseClasses = 'absolute inset-0 size-full'

const { stop } = useIntersectionObserver(
  video,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      video.value?.play().then(() => {
        if (isLoading.value) {
          isLoading.value = false
        }
      })
    } else {
      video.value?.pause()
    }
  },
  { threshold: 0 },
)

onUnmounted(() => {
  stop()
})
</script>

<template>
  <template v-if="media._type === 'image'">
    <img
      v-if="placeholder && !isDone"
      :class="[
        baseClasses,
        'scale-105 blur-md',
        {
          'object-cover': fit === 'cover',
          'object-contain': fit === 'contain',
        },
      ]"
      :src="media.lqip"
      alt=""
    />
    <NuxtImg
      @load="isLoading = false"
      @transitionend="isDone = true"
      :class="[
        baseClasses,
        'transition-opacity',
        {
          'object-cover': fit === 'cover',
          'object-contain': fit === 'contain',
          'opacity-0': isLoading,
        },
      ]"
      :srcset="$sanitySrcset(media._id)"
      :alt="media.alt ?? ''"
      :sizes="sizes"
      v-bind="$attrs"
    />
  </template>

  <mux-video
    v-else-if="media._type === 'mux.video'"
    ref="video"
    :playback-id="media.playbackId"
    autoplay
    loop
    muted
    playsinline
    preload="auto"
    :class="[
      baseClasses,
      'transition-opacity',
      {
        '[--media-object-fit:cover]': fit === 'cover',
        '[--media-object-fit:contain]': fit === 'contain',
        'opacity-0': isLoading,
      },
    ]"
    v-bind="$attrs"
  />
</template>
