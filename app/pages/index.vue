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

usePageAnimations()
</script>
