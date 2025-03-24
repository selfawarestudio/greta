import { SCREENS } from '../lib/config'

export default {
  theme: {
    screens: Object.fromEntries(
      Object.entries(SCREENS).map(([key, value]) => [key, `${value}px`]),
    ),
  },
}
