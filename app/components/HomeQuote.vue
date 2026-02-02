<template>
    <div class="c-quote" data-theme-section="dark" data-bg-section="dark">
        <div class="o-container o-grid">
            <div class="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 xl:col-span-6 xl:col-start-4">
                <div ref="iconRef" class="c-quote__icon">
                    <IconStar />
                </div>
                <div class="c-quote__text" data-highlight-text>
                    <p>The best websites are built where <span class="u-decorate">strategy</span> meets <span class="u-decorate">feeling</span>. Thoughtful design and just enough uniqueness to make your brand stand out</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const iconRef = ref(null)
let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.to(iconRef.value, {
      rotation: 360,
      ease: 'none',
      scrollTrigger: {
        trigger: iconRef.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    })
  })
})

onUnmounted(() => {
  ctx?.revert()
})
</script>
