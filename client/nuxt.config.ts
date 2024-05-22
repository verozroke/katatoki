// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css', '~/assets/fonts.css', '~/assets/main.css'],
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  pinia: {
    autoImports: [
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  modules: ['@pinia/nuxt'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  devServer: {
    port: 5173,
  },
})