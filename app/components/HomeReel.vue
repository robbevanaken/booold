<template>
  <div data-theme-section="dark" class="o-container o-grid">
    <div class="col-span-12 lg:col-span-10 lg:col-start-2">
      <div class="c-reel">
        <Swiper
          :modules="[Autoplay]"
          :slides-per-view="1"
          :loop="true"
          :autoplay="{
            delay: 1000,
            disableOnInteraction: false
          }"
          :speed="1"
          class="c-reel__swiper"
        >
          <SwiperSlide v-for="(image, index) in images" :key="index">
            <img :src="image.src" :alt="image.alt" class="c-reel__image" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const images = [
  { src: '/images/reel/mockup-dwb.webp', alt: 'Website for De Wilde - Braems' },
  { src: '/images/reel/mockup-ngis.webp', alt: 'Website for NGIS Wireless' },
  { src: '/images/reel/mockup-booold.webp', alt: 'Website for Booold Studio' },
]
</script>