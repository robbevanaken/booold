<template>
  <div ref="wrapperRef" class="c-site-footer__wrap" data-footer-parallax data-theme-section="dark">
    <footer class="c-site-footer" data-footer-parallax-inner>
      <div class="c-site-footer__navitation">
        <div class="o-container o-grid gap-y-10">
          <div class="col-span-12 lg:col-span-5">
            <h2 class="c-site-footer__title">Booold thinking <br>brilliant outcomes</h2>
          </div>
          <div class="col-span-12 lg:col-span-2">
            <h3 class="c-site-footer__subtitle">Navigation</h3>
            <ul class="c-site-footer__list">
              <li>
                <a class="c-btn-link" href="/about">About</a>
              </li>
              <li>
                <a class="c-btn-link" href="/#work">Work</a>
              </li>
              <li>
                <a class="c-btn-link" href="/Contact">Contact</a>
              </li>
            </ul>
          </div>
          <div class="col-span-12 lg:col-span-2">
            <h3 class="c-site-footer__subtitle">Socials</h3>
            <ul class="c-site-footer__list">
              <li>
                <a class="c-btn-link" href="https://www.instagram.com/boooldstudio/" target="_blank">Instagram</a>
              </li>
              <li>
                <a class="c-btn-link" href="https://www.linkedin.com/company/booold" target="_blank">Linkedin</a>
              </li>
              <li>
                <a class="c-btn-link" href="tel:+32494487762">Whatsapp</a>
              </li>
              <li>
                <a class="c-btn-link" target="_blank" href="https://open.spotify.com/playlist/1EKZ2Fjg5p9sRzu2Su7CnQ?si=e3329365c9cb478c">Spotify</a>
              </li>
            </ul>
          </div>
          <div class="col-span-12 lg:col-span-3">
            <h3 class="c-site-footer__subtitle">Contact me</h3>
            <ul class="c-site-footer__list">
              <li>
                <a class="c-btn-link" href="mailto:hello@boooldstudio.com" target="_blank">hello@boooldstudio.com</a>
              </li>
              <li>
                <a class="c-btn-link" href="https://www.linkedin.com/company/booold" target="_blank">+32 494 48 77 62</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="c-site-footer__doormat">
        <div class="o-container o-grid">
          <div class="col-span-12">
            <div class="c-site-footer__doormat-logo">
              <IconLogo />
              <IconLogoStudio />
            </div>
            <div class="c-site-footer__doormat-navigation"></div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const wrapperRef = ref(null)
let ctx = null

onMounted(() => {
  const el = wrapperRef.value
  if (!el) return

  const isMobile = window.innerWidth <= 991
  const blurAmount = isMobile ? 2.5 : 2.5

  ctx = gsap.context(() => {
    const inner = el.querySelector('[data-footer-parallax-inner]')

    if (inner) {
      gsap.from(inner, {
        yPercent: -10,
        filter: `blur(${blurAmount}px)`,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'top top',
          scrub: true
        }
      })
    }
  }, el)
})

onUnmounted(() => {
  if (ctx) {
    ctx.revert()
  }
})
</script>
