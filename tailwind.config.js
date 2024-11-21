import { SCREENS } from './utils/constants'

export default {
  presets: [require('groundspeed')],
  theme: {
    screens: Object.fromEntries(
      Object.entries(SCREENS).map(([key, value]) => [key, `${value}px`]),
    ),
    extend: {
      fontFamily: {
        sans: ['Arial', 'sans-serif'],
      },
      colors: {
        black: '#000000',
        white: '#ffffff',
        red: '#ff0000',
      },
    },
  },
}
