import { onMounted, onBeforeUnmount, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { initContentRevealScroll, initActiveHeader, initCountUp, initReelScale } from '../../assets/js/animations/contentReveal.js'
import { initCheckSectionThemeScroll, resetThemeToFirstSection } from '../../assets/js/animations/sectionThemes.js'
import { initHighlightText } from '../../assets/js/animations/highlightText.js'
import { initParallaxImages } from '../../assets/js/animations/parallaxImages.js'
import { initLenis, destroyLenis } from '../../assets/js/animations/lenis.js'

gsap.registerPlugin(ScrollTrigger)

export function usePageAnimations(wrapperRef = null) {
  let cleanupFns = []

  onMounted(async () => {
    await nextTick()

    // Init Lenis on the page wrapper (scoped per page)
    const wrapper = wrapperRef?.value
    if (wrapper) {
      initLenis(wrapper)
      // Configure ScrollTrigger to use the wrapper as scroller
      ScrollTrigger.defaults({ scroller: wrapper })
    }

    // Reset theme to first section
    resetThemeToFirstSection()

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
    // Reset ScrollTrigger defaults
    ScrollTrigger.defaults({ scroller: window })
    destroyLenis()
  })

  onUnmounted(() => {
    ScrollTrigger.refresh()
  })
}
