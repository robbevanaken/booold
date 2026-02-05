<template>
  <div ref="pageWrapper" class="page-wrapper">
    <SiteHeader :inverse="true" />
    <main>
      <HomeHero />
      <HomeAbout />
      <HomeNumbers />
      <HomeReel />
      <HomeQuote />
      <FeaturedCases />
      <CTA />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePageAnimations } from '~/composables/usePageAnimations'

const pageWrapper = ref(null)

useHead({
  title: 'Booold Studio | Design-driven websites'
})

usePageAnimations(pageWrapper)
</script>
