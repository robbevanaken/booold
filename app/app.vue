<template>
  <div data-theme-nav="light">
    <NuxtPage @page:finish="onPageFinish" />
    <ClientOnly><CursorCase /></ClientOnly>
  </div>
</template>

<script setup>
import { nextTick } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
  import { initLenis } from "../../assets/js/animations/lenis.js";

gsap.registerPlugin(ScrollTrigger)

const onPageFinish = async () => {
  await nextTick()
  ScrollTrigger.refresh(true)  // Global refresh post-transition
}

onMounted(() => {
  initLenis()  // Lenis is global, safe here
})
</script>
