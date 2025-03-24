import { gsap, ScrollTrigger } from 'gsap/all'
import { GSAP_DEFAULTS } from '~/lib/config'

export default defineNuxtPlugin({
  name: 'gsap',
  dependsOn: ['viewport'],
  setup() {
    const viewport = useViewport()

    gsap.registerPlugin(ScrollTrigger)
    gsap.defaults(GSAP_DEFAULTS)

    viewport.add(() => {
      ScrollTrigger.refresh()
    })
  },
})
