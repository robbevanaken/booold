<template>
  <div
    class="c-swipe-confirm"
    :class="{ 'is-confirmed': isConfirmed, 'is-dragging': isDragging }"
    :style="{ '--thumb-x': `${currentX}px` }"
  >
    <div class="c-swipe-confirm__track" ref="trackRef">
      <div
        class="c-swipe-confirm__thumb"
        ref="thumbRef"
        role="slider"
        tabindex="0"
        aria-label="Swipe to confirm you are human"
        :aria-valuenow="Math.round((currentX / (trackRef?.offsetWidth - thumbRef?.offsetWidth || 1)) * 100)"
        aria-valuemin="0"
        aria-valuemax="100"
        @mousedown="startDrag"
        @touchstart="startDrag"
        @keydown="handleKeydown"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
        </svg>
      </div>
      <span class="c-swipe-confirm__label">{{ isConfirmed ? 'Confirmed' : 'Swipe to confirm' }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['confirmed'])

const trackRef = ref(null)
const thumbRef = ref(null)
const isConfirmed = ref(false)
const isDragging = ref(false)
const startX = ref(0)
const currentX = ref(0)

const startDrag = (e) => {
  if (isConfirmed.value) return
  isDragging.value = true
  startX.value = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', endDrag)
  document.addEventListener('touchmove', onDrag)
  document.addEventListener('touchend', endDrag)
}

const onDrag = (e) => {
  if (!isDragging.value) return

  const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX
  const trackWidth = trackRef.value.offsetWidth
  const thumbWidth = thumbRef.value.offsetWidth
  const maxX = trackWidth - thumbWidth - 8 // Account for padding

  currentX.value = Math.min(Math.max(0, clientX - startX.value + currentX.value), maxX)
  startX.value = clientX

  // Check if reached the end
  if (currentX.value >= maxX - 5) {
    isConfirmed.value = true
    currentX.value = maxX
    emit('confirmed')
    endDrag()
  }
}

const endDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', endDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', endDrag)

  // Reset if not confirmed
  if (!isConfirmed.value) {
    currentX.value = 0
  }
}

const handleKeydown = (e) => {
  if (isConfirmed.value) return

  const trackWidth = trackRef.value.offsetWidth
  const thumbWidth = thumbRef.value.offsetWidth
  const maxX = trackWidth - thumbWidth - 8
  const step = maxX / 10

  if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
    e.preventDefault()
    currentX.value = Math.min(currentX.value + step, maxX)

    if (currentX.value >= maxX - 5) {
      isConfirmed.value = true
      currentX.value = maxX
      emit('confirmed')
    }
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
    e.preventDefault()
    currentX.value = Math.max(currentX.value - step, 0)
  }
}

const reset = () => {
  isConfirmed.value = false
  currentX.value = 0
}

defineExpose({ reset })
</script>
