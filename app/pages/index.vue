<template>
  <div>
    <SiteHeader :inverse="true" />
    <main>
      <HomeHero />
      <HomeAbout />
      <HomeNumbers />
      <HomeReel />
      <HomeQuote />
      <FeaturedCases />
      <CTA />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { initContentRevealScroll, initActiveHeader, initCountUp, initReelScale } from "../../assets/js/animations/contentReveal.js";
import { initCheckSectionThemeScroll } from "../../assets/js/animations/sectionThemes.js";
import { initHighlightText } from "../../assets/js/animations/highlightText.js";
import { initParallaxImages } from "../../assets/js/animations/parallaxImages.js";

// Reset scripts on page land
gsap.registerPlugin(ScrollTrigger)

let cleanupFns = []

onMounted(async () => {
  await nextTick()  // Ensure DOM ready
  cleanupFns = [
    initContentRevealScroll(),
    initActiveHeader(),
    initCountUp(),
    initCheckSectionThemeScroll(),
    initHighlightText(),
    initReelScale(),
    initParallaxImages()
  ]
})

onBeforeUnmount(() => {
  cleanupFns.forEach(fn => fn?.())
  ScrollTrigger.getAll().forEach(t => t.kill())
})

onUnmounted(() => {
  ScrollTrigger.refresh()
})
</script>
