import { onMounted, onBeforeUnmount, ref, type Ref } from 'vue'

export function useUnicornStudio(containerRef: Ref<any>) {
  const renderer = ref<any>(null)
  const canvas = ref<any>(null)

  const init = async () => {
    // Only run on client
    if (typeof window === 'undefined') return

    const container = containerRef.value
    if (!container) {
      console.warn('No container element found for gradient renderer')
      return
    }

    // Dynamic import to avoid SSR issues
    const { GradientRenderer } = await import('~/utils/GradientRenderer')

    // Create a canvas inside the container
    const canvasEl = document.createElement('canvas')
    canvasEl.style.width = '100%'
    canvasEl.style.height = '100%'
    canvasEl.style.display = 'block'
    container.appendChild(canvasEl)
    canvas.value = canvasEl

    renderer.value = new GradientRenderer(canvasEl)
    renderer.value.init()
  }

  const destroy = () => {
    if (renderer.value) {
      renderer.value.destroy()
      renderer.value = null
    }
    if (canvas.value) {
      canvas.value.remove()
      canvas.value = null
    }
  }

  onMounted(() => {
    // Small delay to ensure DOM is ready
    requestAnimationFrame(() => init())
  })

  onBeforeUnmount(() => {
    destroy()
  })

  return {
    renderer,
    destroy
  }
}
