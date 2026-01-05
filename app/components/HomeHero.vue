<template>
  <div class="c-hero-home">
    <div 
      class="c-hero-home__canvas"
      ref="unicordContainer"
      data-us-project="8vJHuObLYlYmAivRgROK" 
    ></div>
  </div>
</template>

<script>
export default {
  name: 'HomeHero',
  mounted() {
    this.loadUnicordStudio()
  },
  methods: {
    loadUnicordStudio() {
      if (!window.UnicornStudio) {
        window.UnicornStudio = { isInitialized: false }
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.0/dist/unicornStudio.umd.js'
        script.onload = () => {
          if (!window.UnicornStudio.isInitialized) {
            window.UnicornStudio.init()
            window.UnicornStudio.isInitialized = true
          }
        }
        document.head.appendChild(script)
      } else if (window.UnicornStudio.isInitialized) {
        window.UnicornStudio.init()
      }
    }
  }
}
</script>