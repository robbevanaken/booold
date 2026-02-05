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
import { initLenis, resetLenisScroll, getLenis } from "../assets/js/animations/lenis.js"

gsap.registerPlugin(ScrollTrigger)

const route = useRoute()

watch(() => route.path, () => {
  // Kill all ScrollTriggers immediately
  ScrollTrigger.getAll().forEach(st => st.kill())

  // Wait for leave transition to complete (matches CSS transition duration)
  // then reset scroll when old page is faded out
  setTimeout(() => {
    window.scrollTo(0, 0)
    resetLenisScroll()

    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true })
    }
  }, 500) // Match the 0.5s transition duration in _page-transition.css
})

const onPageFinish = async () => {
  await nextTick()

  // Small delay to ensure DOM is fully painted
  await new Promise(resolve => setTimeout(resolve, 50))

  // Refresh ScrollTrigger after everything is settled
  ScrollTrigger.refresh()
}

onMounted(() => {
  initLenis()
})
</script>
