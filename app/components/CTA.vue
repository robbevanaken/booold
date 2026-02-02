<template>
    <div class="c-cta">
        <div 
            class="c-cta__canvas"
            ref="unicordContainer"
            data-us-project="8vJHuObLYlYmAivRgROK" 
            data-theme-section="dark" 
            data-bg-section="dark"
        ></div>
        <div class="o-container o-grid">
            <div class="col-span-12 md:col-span">
                <div class="c-cta__content">
                    <h2 data-reveal class="c-cta__title">Convinced already? Or still curious? Let’s see what we can <span class="u-decorate">build</span> together.</h2>
                    <div class="c-cta__btn">
                        <ButtonDefault url="mailto:hello@boooldstudio.com" label="Get in contact" :glassy="true" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUnicornStudio } from '~/composables/useUnicornStudio'

const unicordContainer = ref(null)
useUnicornStudio(unicordContainer)
</script>