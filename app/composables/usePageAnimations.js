import { onMounted, onBeforeUnmount, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { initContentRevealScroll, initActiveHeader, initCountUp, initReelScale } from '../../assets/js/animations/contentReveal.js'
import { initCheckSectionThemeScroll } from '../../assets/js/animations/sectionThemes.js'
import { initHighlightText } from '../../assets/js/animations/highlightText.js'
import { initParallaxImages } from '../../assets/js/animations/parallaxImages.js'

gsap.registerPlugin(ScrollTrigger)

export function usePageAnimations() {
  let cleanupFns = []

  onMounted(async () => {
    await nextTick()
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
}
