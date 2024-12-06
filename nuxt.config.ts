export default defineNuxtConfig({
  ssr: false,

  app: {
    pageTransition: false,
    layoutTransition: false
  },

  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-12-06',
})
