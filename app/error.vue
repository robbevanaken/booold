<template>
  <div>
    <SiteHeader />
    <main>
      <!-- Hero section -->
      <div class="c-legal-hero--low" data-theme-section="light" data-bg-section="light">
        <div class="o-container o-grid">
          <div class="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-2">
            <div class="c-legal-hero__title">
              <h1 data-reveal>{{ error?.statusCode || '404' }}</h1>
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
                <h2 data-reveal>Page not found</h2>
                <p data-reveal>The page you're looking for doesn't exist or has been moved.</p>
                <div class="mt-8">
                  <NuxtLink to="/" class="c-btn" @click.prevent="handleError">
                    <span class="c-btn__inner">
                      <span class="c-btn__text">Go home</span>
                    </span>
                  </NuxtLink>
                </div>
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

defineProps({
  error: Object
})

useHead({
  title: 'Page not found | Booold Studio'
})

usePageAnimations()

const handleError = () => clearError({ redirect: '/' })
</script>
