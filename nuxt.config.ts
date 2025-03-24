import { SCREENS } from './utils/constants'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
    },
  },
  devtools: { enabled: false },
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
  vue: {
    compilerOptions: {
      isCustomElement: tag => tag.startsWith('mux-'),
    },
  },
})
