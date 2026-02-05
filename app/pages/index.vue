<template>
  <div>
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
import { usePageAnimations } from '~/composables/usePageAnimations'

useHead({
  title: 'Booold Studio | Design-driven websites'
})

usePageAnimations()
</script>
