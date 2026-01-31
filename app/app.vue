<template>
  <div data-theme-nav="light">
    <NuxtPage />
    <ClientOnly>
      <CursorCase />
    </ClientOnly>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { initLenis } from "../../assets/js/animations/lenis.js";
  import { initContentRevealScroll, initActiveHeader, initCountUp, initReelScale } from "../../assets/js/animations/contentReveal.js";
  import { initCheckSectionThemeScroll } from "../../assets/js/animations/sectionThemes.js";
  import { initHighlightText } from "../../assets/js/animations/highlightText.js";
  import { initParallaxImages } from "../../assets/js/animations/parallaxImages.js";

  const router = useRouter()
  const cleanupFns = ref([])

  const initAnimations = () => {
    // Clean up previous animations
    cleanupFns.value.forEach(fn => fn && fn())
    cleanupFns.value = []

    // Initialize new animations and store cleanup functions
    cleanupFns.value = [
      initContentRevealScroll(),
      initActiveHeader(),
      initCountUp(),
      initCheckSectionThemeScroll(),
      initHighlightText(),
      initReelScale(),
      initParallaxImages()
    ]
  }

  onMounted(() => {
    initLenis()
    initAnimations()
  })

  // Reinitialize animations after page transition completes
  router.afterEach((to, from) => {
    if (to.path !== from.path) {
      // Wait for transition and DOM to update
      setTimeout(() => {
        initAnimations()
      }, 350) // Slightly longer than page transition (300ms)
    }
  })
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.page-enter-from {
  opacity: 0;
}

.page-leave-to {
  opacity: 0;
}
</style>
