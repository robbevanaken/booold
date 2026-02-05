<template>
  <div data-theme-nav="light" data-bg-nav="light">
    <ClientOnly><LoadingScreen /></ClientOnly>
    <NuxtPage @page:finish="onPageFinish" />
    <MobilePanel />
    <ClientOnly><CursorCase /></ClientOnly>
  </div>
</template>

<script setup>
import { nextTick, watch } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { initLenis, resetLenisScroll } from "../assets/js/animations/lenis.js"

gsap.registerPlugin(ScrollTrigger)

const route = useRoute()

watch(() => route.path, () => {
  resetLenisScroll()
})

const onPageFinish = async () => {
  await nextTick()
  ScrollTrigger.refresh(true)  // Global refresh post-transition
}

onMounted(() => {
  initLenis()  // Lenis is global, safe here
})
</script>
