import { SCREENS } from './utils/constants'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      // link: [
      //   {
      //     rel: 'apple-touch-icon',
      //     sizes: '180x180',
      //     href: '/apple-touch-icon.png',
      //   },
      //   {
      //     rel: 'icon',
      //     type: 'image/png',
      //     sizes: '32x32',
      //     href: '/favicon-32x32.png',
      //   },
      //   {
      //     rel: 'icon',
      //     type: 'image/png',
      //     sizes: '16x16',
      //     href: '/favicon-16x16.png',
      //   },
      //   { rel: 'manifest', href: '/site.webmanifest' },
      //   { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#000000' },
      // ],
      // meta: [
      //   { name: 'msapplication-TileColor', content: '#000000' },
      //   { name: 'theme-color', content: '#ffffff' },
      // ],
    },
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs/sanity',
    '@nuxt/image',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
  ],
  telemetry: false,
  tailwindcss: {
    viewer: false,
  },
  sanity: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
    apiVersion: process.env.SANITY_STUDIO_API_VERSION,
    useCdn: true,
    minimal: false,
    additionalClients: {
      preview: {
        useCdn: false,
        token: process.env.SANITY_STUDIO_PREVIEW_TOKEN,
      },
    },
  },
  image: {
    screens: SCREENS,
  },
  site: {
    url: process.env.SITE_URL,
  },
  robots: {
    // disallow: ['/something'],
  },
  sitemap: {
    sources: ['/api/__sitemap__/urls'],
    excludeAppSources: true,
  },
  routeRules: {
    '/**': { prerender: true },
  },
})
