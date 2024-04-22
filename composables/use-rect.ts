export function useRect() {
  const el = ref<HTMLElement>()
  const state = ref<DOMRect>()
  const update = () => {
    if (!el.value) return
    state.value = el.value.getBoundingClientRect()
  }

  onMounted(update)
  useResizeObserver(el, update)

  return [el, state]
}
