export type ViewportCallback = (w: number, h: number) => any

type ViewportPlugin = {
  add: (callback: ViewportCallback) => void
  remove: (callback: ViewportCallback) => void
  get width(): number
  get height(): number
}

export default defineNuxtPlugin(() => {
  const callbacks = new Set<ViewportCallback>()
  const width = useState('_width', () => window.innerWidth)
  const height = useState('_height', () => window.innerHeight)

  window.addEventListener('resize', () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
    callbacks.forEach(callback => callback(width.value, height.value))
  })

  const viewport: ViewportPlugin = {
    add(callback) {
      callbacks.add(callback)
      callback(width.value, height.value)
    },
    remove(callback) {
      callbacks.delete(callback)
    },
    get width() {
      return width.value
    },
    get height() {
      return height.value
    },
  }

  return {
    provide: { viewport },
  }
})
