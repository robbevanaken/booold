<template>
  <div class="c-hero-home">
    <div 
      class="c-hero-home__canvas"
      ref="unicordContainer"
      data-us-project="8vJHuObLYlYmAivRgROK" 
    ></div>
    <div class="c-hero-home__body">
      <div class="o-container">
        <div class="c-hero-home__logo">
          <div class="c-hero-home__logo-text">
            <h1>Booold Thinking <br>Brilliant Outcomes</h1>
            <p>I create thoughtful websites <br>and digital products crafted for <br>clarity, character, and results.</p>
          </div>
          <IconLogo />
        </div>

        <div class="c-hero-home__doormat">
          <span>Creative Developer</span>
          <div class="c-hero-home__doormat-status">
            <div class="c-hero-home__doormat-pulse"></div>
            <span>Available for projects worldwide</span>
          </div>
          <div class="c-hero-home__doormat-clock">
            <IconGlobe />
            <p>
              <span>GHENT&nbsp;&nbsp;—&nbsp;&nbsp;</span>
              <span>{{ currentTime }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconGlobe from '~/components/IconGlobe.vue';

export default {
  name: 'HomeHero',
  data() {
    return {
      currentTime: '',
      timeInterval: null
    }
  },
  mounted() {
    this.loadUnicordStudio()
    this.updateTime()
    this.timeInterval = setInterval(this.updateTime, 1000)
  },
  beforeUnmount() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval)
    }
  },
  methods: {
    updateTime() {
      this.currentTime = new Date().toLocaleTimeString('en-GB', {
        timeZone: 'Europe/Brussels',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
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