<template>
  <div data-theme-nav="light" data-bg-nav="light">
    <ClientOnly><LoadingScreen /></ClientOnly>
    <NuxtPage :transition="pageTransition" />
    <MobilePanel />
    <ClientOnly><CursorCase /></ClientOnly>
  </div>
</template>

<script setup>
import { nextTick } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { initLenis, lenis } from "../assets/js/animations/lenis.js"

gsap.registerPlugin(ScrollTrigger)

const pageTransition = {
  name: 'page',
  mode: 'out-in',
  onLeave(el, done) {
    // Fade out current page
    gsap.to(el, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        // Scroll to top after fade out, before new page enters
        if (lenis) {
          lenis.scrollTo(0, { immediate: true })
        } else {
          window.scrollTo(0, 0)
        }
        done()
      }
    })
  },
  onEnter(el, done) {
    gsap.set(el, { opacity: 0 })
    nextTick(() => {
      // Delay or simplify refresh
      setTimeout(() => {
        ScrollTrigger.refresh()  // Drop 'true'
      }, 50)
      gsap.to(el, {
        opacity: 1,
        duration: 0.5,
        onComplete: done
      })
    })
  }
}

onMounted(() => {
  initLenis()
})
</script>
