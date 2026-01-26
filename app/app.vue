<template>
  <div data-theme-nav="light">
    <NuxtPage />
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { initLenis } from "../../assets/js/animations/lenis.js";
  import { initContentRevealScroll, initActiveHeader, initCountUp } from "../../assets/js/animations/contentReveal.js";
  import { initCheckSectionThemeScroll } from "../../assets/js/animations/sectionThemes.js";
  import { initHighlightText } from "../../assets/js/animations/highlightText.js";

  onMounted(() => {
    initLenis();
    initContentRevealScroll();
    initActiveHeader();
    initCountUp();
    initCheckSectionThemeScroll();
    initHighlightText();
  });
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
