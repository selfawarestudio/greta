export const useSharedRect = (name: string) => {
  const el = ref<HTMLElement>()
  const state = useState<DOMRect>(name)
  const update = () => {
    if (!el.value) return
    state.value = el.value.getBoundingClientRect()
  }

  onMounted(update)
  useResizeObserver(el, update)

  return [el, state]
}
