import emblaCarouselVue from 'embla-carousel-vue'
import type { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'

export function useEmbla(options: EmblaOptionsType) {
  const [emblaRef, emblaApi] = emblaCarouselVue(options)

  const selectedScrollSnap = ref(0)

  const api = ref<EmblaCarouselType | null>(null)

  watch(emblaApi, current => {
    if (current) {
      api.value = current
    }
  })

  const handleSelect = () => {
    if (!api.value) return
    selectedScrollSnap.value = api.value.selectedScrollSnap()
  }

  watchEffect(() => {
    if (!api.value) return
    api.value.on('select', handleSelect)
  })

  return {
    emblaRef,
    emblaApi,
    selectedScrollSnap,
    nextScrollSnap() {
      if (!api.value) return
      api.value.scrollNext()
    },
    prevScrollSnap() {
      if (!api.value) return
      api.value.scrollPrev()
    },
    scrollTo(index: number, jump = false) {
      if (!api.value) return
      api.value.scrollTo(index, jump)
    },
  }
}
