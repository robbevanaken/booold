<template>
    <div class="c-about-home" data-active-header>
        <div class="o-container o-grid">
            <div class="col-span-12 md:col-span-8 lg:col-span-6 md:col-start-2 lg:col-start-2">
                <div class="c-about-home__intro">
                    <p data-reveal>
                        I'm Robbe. A <span class="u-decorate">web designer</span> and pixel-precise <span class="u-decorate">developer</span>. I tailor the web to your needs, using both my head and my heart.
                    </p>
                </div>
            </div>
        </div>
        <div class="c-about-home__content">
           <div class="o-container o-grid">
                <div class="col-span-12 md:col-span-4 lg:col-span-3 md:col-start-2 lg:col-start-3">
                    <div class="c-about-home__content-canvas-wrapper hidden md:block">
                        <div 
                            class="c-about-home__content-canvas"
                            ref="unicordContainer"
                            data-us-project="8vJHuObLYlYmAivRgROK" 
                        ></div>
                    </div>
                </div>
                <div class="col-span-12 md:col-span-5 lg:col-span-3 md:col-start-7 lg:col-start-9">
                    <div class="c-about-home__content-text">
                        <p data-reveal>
                            I combine strategic thinking with creative passion to craft digital experiences that truly connect. Together with my clients, I aim for a web presence that drives the brand forward and achieves real results. Whether that’s converting leads, selling products, or simply showing off your work
                        </p>
                        <ButtonArrow link="about" label="Get to know me" />
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