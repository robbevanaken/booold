import { nextTick, onMounted } from 'vue'

export function useUnicornStudio() {
  const init = () => {
    if (!window.UnicornStudio) {
      window.UnicornStudio = { isInitialized: false }
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.0/dist/unicornStudio.umd.js'
      script.onload = () => {
        window.UnicornStudio.init()
        window.UnicornStudio.isInitialized = true
      }
      document.head.appendChild(script)
    } else if (window.UnicornStudio.isInitialized) {
      window.UnicornStudio.init()
    } else {
      // Script is loading but not ready yet
      const checkReady = setInterval(() => {
        if (window.UnicornStudio?.init) {
          clearInterval(checkReady)
          window.UnicornStudio.init()
        }
      }, 100)
    }
  }

  onMounted(() => {
    nextTick(init)
  })
}
