import { SCREENS } from './lib/config'

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
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
      },
      transitionDuration: {
        DEFAULT: '0.5s',
      },
    },
  },
}
