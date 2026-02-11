<template>
  <div class="c-valentine" data-theme-nav="dark">
    <SiteHeader />

    <main class="c-valentine__main">
      <!-- Heart -->
      <div class="c-valentine__heart" :class="{ 'c-valentine__heart--yes': accepted }">
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
            fill="currentColor"
          />
        </svg>
      </div>

      <!-- Question -->
      <h1 class="c-valentine__title">
        <span class="text-fancy">Will you be my</span><br />
        <span class="c-valentine__valentine">Valentine?</span>
      </h1>

      <!-- Buttons -->
      <div class="c-valentine__buttons" v-if="!accepted">
        <button class="c-btn c-valentine__yes" @click="sayYes">
          <span class="c-btn__inner">
            <span class="c-btn__text">Yes!</span>
          </span>
        </button>

        <button
          class="c-btn c-btn--no c-valentine__no"
          :style="noStyle"
          @mouseenter="dodgeNo"
          @click="dodgeNo"
          @touchstart.prevent="dodgeNo"
        >
          <span class="c-btn__inner">
            <span class="c-btn__text">No</span>
          </span>
        </button>
      </div>

      <!-- Accepted state -->
      <div v-else class="c-valentine__accepted">
        <p class="c-valentine__yay">I knew it!</p>
      </div>

      <!-- Confetti canvas -->
      <canvas ref="confettiCanvas" class="c-valentine__confetti" />
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, nextTick } from 'vue'

useHead({
  title: 'A Secret Question...',
})

useSeoMeta({
  robots: 'noindex, nofollow',
})

const accepted = ref(false)
const confettiCanvas = ref(null)
const noStyle = reactive({ position: 'relative', top: '0px', left: '0px', transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.5)' })

function dodgeNo() {
  const maxX = window.innerWidth * 0.3
  const maxY = window.innerHeight * 0.25
  const randomX = (Math.random() - 0.5) * 2 * maxX
  const randomY = (Math.random() - 0.5) * 2 * maxY
  noStyle.top = `${randomY}px`
  noStyle.left = `${randomX}px`
}

function sayYes() {
  accepted.value = true
  nextTick(() => {
    launchConfetti()
  })
}

// ---- Confetti ----
let animationId = null

function launchConfetti() {
  const canvas = confettiCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const colors = ['#FF4D00', '#CCFF33', '#F4F4F4', '#ff6b6b', '#ffd93d', '#ff85a1', '#ff4d6d']
  const particles = []
  const count = 200

  for (let i = 0; i < count; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 20,
      vy: (Math.random() - 1) * 18 - 4,
      w: Math.random() * 10 + 5,
      h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      gravity: 0.25 + Math.random() * 0.15,
      opacity: 1,
    })
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let alive = false

    for (const p of particles) {
      p.x += p.vx
      p.vy += p.gravity
      p.y += p.vy
      p.rotation += p.rotationSpeed
      p.vx *= 0.99
      p.opacity -= 0.003

      if (p.opacity <= 0) continue
      alive = true

      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate((p.rotation * Math.PI) / 180)
      ctx.globalAlpha = Math.max(0, p.opacity)
      ctx.fillStyle = p.color
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
      ctx.restore()
    }

    if (alive) {
      animationId = requestAnimationFrame(animate)
    }
  }

  animate()
}

onBeforeUnmount(() => {
  if (animationId) cancelAnimationFrame(animationId)
})
</script>

<style scoped>
.c-valentine {
  @apply bg-black text-white min-h-screen overflow-hidden relative;
}

.c-valentine__main {
  @apply flex flex-col items-center justify-center min-h-screen px-6 text-center;
}

/* Heart */
.c-valentine__heart {
  @apply w-32 h-32 md:w-48 md:h-48 text-orange mb-8;
  animation: heartbeat 1.2s ease-in-out infinite;
}

.c-valentine__heart--yes {
  animation: heartExplode 0.6s ease-out forwards;
}

.c-valentine__heart svg {
  @apply w-full h-full;
  filter: drop-shadow(0 0 40px rgba(255, 77, 0, 0.4));
}

/* Title */
.c-valentine__title {
  @apply text-xxl md:text-xxxl tracking-tight mb-12;
}

.c-valentine__valentine {
  @apply font-inter font-medium tracking-tight;
}

/* Buttons */
.c-valentine__buttons {
  @apply flex items-center gap-6;
  min-height: 80px;
}

.c-valentine__yes {
  @apply bg-orange text-white text-md px-10 py-5 cursor-pointer;
}

.c-valentine__yes:hover {
  @apply bg-orange/80 text-white scale-105;
}

.c-btn--no {
  @apply bg-white/10 text-white/60 cursor-pointer;
}

.c-btn--no:hover {
  @apply bg-white/10 text-white/60;
}

/* Accepted state */
.c-valentine__accepted {
  animation: fadeInUp 0.6s ease-out;
}

.c-valentine__yay {
  @apply text-xxl md:text-xxxl text-orange tracking-tight;
  @apply font-dark-paradise italic;
}

/* Confetti canvas */
.c-valentine__confetti {
  @apply fixed inset-0 pointer-events-none;
  z-index: 100;
}

/* Animations */
@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  15% { transform: scale(1.15); }
  30% { transform: scale(1); }
  45% { transform: scale(1.1); }
}

@keyframes heartExplode {
  0% { transform: scale(1); }
  50% { transform: scale(1.4); opacity: 1; }
  100% { transform: scale(1.6); opacity: 0.8; }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
