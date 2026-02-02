<template>
  <div>
    <SiteHeader />
    <main>
      <!-- Hero section -->
      <div class="c-about-hero" data-theme-section="light">
        <div class="o-container o-grid">
          <div class="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-2">
            <div class="c-about-hero__title">
              <h1 data-reveal>Booold Studio is a <span class="u-decorate">big name</span> for a one-man army. Built that way to give ideas, projects, and brands <span class="u-decorate">room to grow.</span></h1>
            </div>
          </div>
        </div>
        <div class="o-container o-grid">
          <div class="col-span-12 md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-8">
            <div class="c-about-hero__intro">
              <p data-reveal>
                Led by one core designer–developer, the studio combines focused ownership with the flexibility of a trusted freelance network when projects require additional expertise.
                Every project is guided from start to finish by one clear point of contact. That means direct communication, consistent quality, and the ability to scale intelligently without unnecessary overhead.
              </p>            
            </div>
          </div>
        </div>
      </div>

      <!-- Canvas -->
      <div 
        class="c-about__canvas"
        ref="unicordContainer"
        data-us-project="8vJHuObLYlYmAivRgROK" 
        data-theme-section="dark"
        >
      </div>

      <!-- Article -->
      <div class="c-about-article" data-theme-section="light">
        <div class="o-container o-grid">
          <div class="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-2">
            <div class="c-about-article__title">
              <h2 data-reveal>Who’s actually behind this?</h2>
            </div>
          </div>
        </div>
        <div class="o-container o-grid">
          <div class="col-span-12 md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-8">
            <div>
              <p data-reveal>
                My name is Robbe. I focus on design-driven websites and digital products that balance clarity, performance, and character. The goal is always the same: creating digital experiences that support brands, communicate clearly, and deliver measurable results.
                <br><br>
                The technical stack is chosen with longevity and maintainability in mind. Craft CMS is my CMS of choice, paired with modern front-end tools like Nuxt and Vue. This setup allows for flexible content management, strong performance, and custom solutions tailored to each project.
              </p>
              <ButtonArrow link="contact" label="Get in contact" /> 
            </div>
          </div>
        </div>
      </div>
      <CTA />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup>
import { useUnicornStudio } from '~/composables/useUnicornStudio'

import { onMounted, onUnmounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { initContentRevealScroll, initActiveHeader, initCountUp, initReelScale } from "../../assets/js/animations/contentReveal.js";
import { initCheckSectionThemeScroll } from "../../assets/js/animations/sectionThemes.js";
import { initHighlightText } from "../../assets/js/animations/highlightText.js";
import { initParallaxImages } from "../../assets/js/animations/parallaxImages.js";

const unicordContainer = ref(null)
useUnicornStudio(unicordContainer)

// Reset scripts on page land
gsap.registerPlugin(ScrollTrigger)

let cleanupFns = []

onMounted(async () => {
  await nextTick()  // Ensure DOM ready
  cleanupFns = [
    initContentRevealScroll(),
    initActiveHeader(),
    initCountUp(),
    initCheckSectionThemeScroll(),
    initHighlightText(),
    initReelScale(),
    initParallaxImages(),
  ]
})

onBeforeUnmount(() => {
  cleanupFns.forEach(fn => fn?.())
  ScrollTrigger.getAll().forEach(t => t.kill())
})

onUnmounted(() => {
  ScrollTrigger.refresh()
})
</script>
