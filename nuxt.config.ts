// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['@@/assets/css/main.css'],

  devServer: {
    port: 3000,
  },

  modules: [
    '@nuxtjs/tailwindcss'
  ],

  app: {
    pageTransition: { 
      name: 'page', 
      mode: 'out-in',
      duration: 400
    }
  }
})
