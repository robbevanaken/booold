<template>
  <div data-theme-nav="light" data-bg-nav="light">
    <ClientOnly><LoadingScreen /></ClientOnly>
    <NuxtPage />
    <MobilePanel />
    <ClientOnly><CursorCase /></ClientOnly>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
</script>
