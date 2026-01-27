import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

function initContentRevealScroll() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const elements = document.querySelectorAll('[data-reveal]')

  if (!elements.length) return

  const ctx = gsap.context(() => {
    elements.forEach(element => {
      const duration = parseFloat(element.getAttribute('data-duration') || '0.6')
      const stagger = parseFloat(element.getAttribute('data-stagger') || '100') / 1000
      const delay = parseFloat(element.getAttribute('data-delay') || '0') / 1000
      const start = element.getAttribute('data-start') || 'top 85%'

      gsap.set(element, { opacity: 1 })

      SplitText.create(element, {
        type: "words,lines",
        linesClass: "line",
        autoSplit: true,
        mask: "lines",
        onSplit: (self) => {
          if (prefersReduced) return

          return gsap.from(self.lines, {
            yPercent: 100,
            duration: duration,
            delay: delay,
            stagger: stagger,
            ease: "expo.out",
            scrollTrigger: {
              trigger: element,
              start: start,
              once: true
            }
          })
        }
      })
    })
  })

  return () => ctx.revert()
}

function initActiveHeader() {
  const trigger = document.querySelector('[data-active-header]')
  const header = document.querySelector('.c-site-header')

  if (!trigger || !header) return

  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: trigger,
      start: 'top top',
      onEnter: () => header.classList.add('active'),
      onLeaveBack: () => header.classList.remove('active')
    })
  })

  return () => ctx.revert()
}

function initCountUp() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const elements = document.querySelectorAll('[data-count-up]')

  if (!elements.length) return

  const ctx = gsap.context(() => {
    elements.forEach(element => {
      // Find the first text node (the number)
      let numberNode = null
      for (const node of element.childNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          numberNode = node
          break
        }
      }

      if (!numberNode) return

      const text = numberNode.textContent.trim()

      // Parse number (e.g., "50", "5k", "100")
      const match = text.match(/^([\d.]+)(k)?$/)
      if (!match) return

      const targetNum = parseFloat(match[1])
      const suffix = match[2] || ''

      // Config from attributes
      const duration = parseFloat(element.getAttribute('data-duration') || '2')
      const delay = parseFloat(element.getAttribute('data-delay') || '0') / 1000
      const start = element.getAttribute('data-start') || 'top 100%'

      // Object to animate
      const counter = { value: 0 }

      // Reduced motion: show final value immediately
      if (prefersReduced) return

      // Set initial state
      numberNode.textContent = '0' + suffix

      // Animate on scroll
      ScrollTrigger.create({
        trigger: element,
        start: start,
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            value: targetNum,
            duration: duration,
            delay: delay,
            ease: 'power2.out',
            onUpdate: () => {
              const current = Math.round(counter.value)
              numberNode.textContent = current + suffix
            }
          })
        }
      })
    })
  })

  return () => ctx.revert()
}

function initReelScale() {
  const reel = document.querySelector('.c-reel')
  const swiper = document.querySelector('.c-reel__swiper')

  if (!reel || !swiper) return

  const ctx = gsap.context(() => {
    // Scale the reel container
    gsap.fromTo(reel,
      { scale: 0.8 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: reel,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    )

    // Scale the swiper inside
    gsap.fromTo(swiper,
      { scale: 1 },
      {
        scale: 1.3,
        ease: 'none',
        scrollTrigger: {
          trigger: reel,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    )
  })

  return () => ctx.revert()
}

export { initContentRevealScroll, initActiveHeader, initCountUp, initReelScale }