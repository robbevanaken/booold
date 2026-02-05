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

useSeoMeta({
  description: 'Booold Studio creates design-driven websites that combine clarity, performance, and character. Custom web development with Craft CMS, Nuxt, and Vue.'
})

usePageAnimations()
</script>
