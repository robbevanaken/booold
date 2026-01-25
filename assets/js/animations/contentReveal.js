import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function splitTextIntoLines(element) {
  const text = element.textContent
  const words = text.split(/\s+/)

  // Temporarily fill with spans to measure lines
  element.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ')

  const wordSpans = element.querySelectorAll('.word')
  const lines = []
  let currentLine = []
  let currentTop = null

  wordSpans.forEach(span => {
    const top = span.offsetTop
    if (currentTop === null) currentTop = top

    if (top !== currentTop) {
      lines.push(currentLine)
      currentLine = [span.textContent]
      currentTop = top
    } else {
      currentLine.push(span.textContent)
    }
  })

  if (currentLine.length) lines.push(currentLine)

  // Rebuild with line wrappers
  element.innerHTML = lines.map(line =>
    `<span class="line" style="display:block;overflow:hidden;"><span class="line-inner" style="display:block;">${line.join(' ')}</span></span>`
  ).join('')

  return element.querySelectorAll('.line-inner')
}

function initContentRevealScroll() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const elements = document.querySelectorAll('[data-reveal]')

  if (!elements.length) return

  const ctx = gsap.context(() => {
    elements.forEach(element => {
      // Config from attributes or defaults
      const duration = parseFloat(element.getAttribute('data-duration') || '0.6')
      const stagger = parseFloat(element.getAttribute('data-stagger') || '100') / 1000
      const delay = parseFloat(element.getAttribute('data-delay') || '0') / 1000
      const start = element.getAttribute('data-start') || 'top 85%'

      // Split text into lines
      const lines = splitTextIntoLines(element)

      // Reduced motion: show immediately
      if (prefersReduced) {
        gsap.set(lines, { clearProps: 'all' })
        return
      }

      // Initial hidden state - lines start below (100%)
      gsap.set(lines, { yPercent: 100 })

      // Reveal on scroll
      ScrollTrigger.create({
        trigger: element,
        start: start,
        once: true,
        onEnter: () => {
          gsap.to(lines, {
            yPercent: 0,
            duration: duration,
            delay: delay,
            stagger: stagger,
            ease: 'power4.out'
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

export { initContentRevealScroll, initActiveHeader }