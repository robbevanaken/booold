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

  vite: {
    optimizeDeps: {
      include: ['gsap', 'gsap/ScrambleTextPlugin', 'gsap/SplitText']
    }
  }
})
