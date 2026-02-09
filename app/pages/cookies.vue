<template>
  <div>
    <SiteHeader />
    <main>
      <!-- Hero section -->
      <div class="c-legal-hero" data-theme-section="light" data-bg-section="light">
        <div class="o-container o-grid">
          <div class="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-2">
            <div class="c-legal-hero__title">
              <h1 data-reveal>Cookies</h1>
            </div>
          </div>
        </div>
      </div>

      <!-- Content section -->
      <div class="c-legal-content" data-theme-section="light">
        <div class="o-container o-grid">
          <div class="col-span-12 lg:col-span-8 lg:col-start-2">
            <div class="c-legal-content__body">
              <section class="c-legal-content__section" data-reveal>
                <h2>This website does not use cookies</h2>
                <p>We do not place any tracking, functional, or third-party cookies on your device. No personal data is collected, stored, or shared through cookies or similar technologies.</p>
                <p>You can browse this website freely without accepting cookies or adjusting any settings.</p>
              </section>

              <section class="c-legal-content__section" data-reveal>
                <h2>Questions?</h2>
                <p>If you have any questions about privacy or data usage, feel free to get in touch via the contact form on this website.</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
    <SiteFooter />
  </div>
</template>

<script setup>
import { usePageAnimations } from '~/composables/usePageAnimations'

useCanonical()

useHead({
  title: 'Cookies | Booold Studio'
})

useSeoMeta({
  description: 'Booold Studio does not use cookies. No tracking, no third-party cookies, no personal data collected through cookies.'
})

usePageAnimations()
</script>
