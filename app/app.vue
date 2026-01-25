<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { initLenis } from "../../assets/js/animations/lenis.js";
  import { initContentRevealScroll, initActiveHeader, initCountUp } from "../../assets/js/animations/contentReveal.js";
  import { initButtonCharacterStagger } from "../../assets/js/animations/textHover.js";

  onMounted(() => {
    initLenis();
    initContentRevealScroll();
    initActiveHeader();
    initCountUp();
    initButtonCharacterStagger();
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
