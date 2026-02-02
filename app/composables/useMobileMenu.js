import { ref } from 'vue'
import { lenis } from '../../assets/js/animations/lenis.js'

const isOpen = ref(false)

export function useMobileMenu() {
  const toggle = () => {
    isOpen.value = !isOpen.value
    if (lenis) {
      isOpen.value ? lenis.stop() : lenis.start()
    }
  }

  const close = () => {
    isOpen.value = false
    if (lenis) {
      lenis.start()
    }
  }

  return {
    isOpen,
    toggle,
    close
  }
}
