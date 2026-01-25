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

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import IconGlobe from '~/components/IconGlobe.vue'
import { useUnicornStudio } from '~/composables/useUnicornStudio'

useUnicornStudio()

const currentTime = ref('')
let timeInterval = null

const updateTime = () => {
  currentTime.value = new Date().toLocaleTimeString('en-GB', {
    timeZone: 'Europe/Brussels',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
})

onBeforeUnmount(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})
</script>