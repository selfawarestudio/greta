import { gsap } from 'gsap'

export function useRaf(fn: gsap.TickerCallback) {
  onMounted(() => gsap.ticker.add(fn))
  onUnmounted(() => gsap.ticker.remove(fn))
}
