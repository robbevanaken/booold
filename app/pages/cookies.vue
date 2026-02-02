<template>
  <div>
    <SiteHeader />
    <main>
      <!-- Hero section -->
      <div class="c-legal-hero" data-theme-section="light" data-bg-section="light">
        <div class="o-container o-grid">
          <div class="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-2">
            <div class="c-legal-hero__title">
              <h1 data-reveal class="c-contact__title">This website does not use cookies.</h1>
            </div>
          </div>
        </div>
        <div class="o-container o-grid">
          <div class="col-span-12 md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-8">
            <div class="c-legal-hero__intro">
              <p data-reveal>
                We do not place any tracking, functional, or third-party cookies on your device.
                No personal data is collected, stored, or shared through cookies or similar technologies.

                You can browse this website freely without accepting cookies or adjusting any settings.

                If you have any questions about privacy or data usage, feel free to get in touch.              </p>
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

usePageAnimations()
</script>
