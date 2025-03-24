import type { ViewportCallback } from '~/plugins/viewport.client'

export function useResize(fn: ViewportCallback) {
  const { $viewport } = useNuxtApp()
  onMounted(() => $viewport.add(fn))
  onUnmounted(() => $viewport.remove(fn))
}
