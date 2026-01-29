<template>
    <div ref="cursorRef" class="c-cursor-case" :class="{ 'is-active': isActive }">
        <div class="c-cursor-case__inner">
            <svg class="c-cursor-case__text" viewBox="0 0 100 100">
                <defs>
                    <path id="circlePath" d="M 50, 50 m -32, 0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0" />
                </defs>
                <text>
                    <textPath href="#circlePath" startOffset="0%">
                        View this case • View this case •
                    </textPath>
                </text>
            </svg>
            <IconStar class="c-cursor-case__icon" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const cursorRef = ref(null)
const isActive = ref(false)
let xTo, yTo, rotation = 0, lastX = 0

const onMouseMove = (e) => {
    if (!xTo || !yTo) return

    xTo(e.clientX)
    yTo(e.clientY)

    const deltaX = e.clientX - lastX
    rotation += deltaX * 0.5
    gsap.to(cursorRef.value.querySelector('.c-cursor-case__inner'), {
        rotation,
        duration: 0.6,
        ease: 'power2.out'
    })
    lastX = e.clientX
}

const onMouseOver = (e) => {
    if (e.target.closest('[data-cursor-case]')) {
        isActive.value = true
    }
}

const onMouseOut = (e) => {
    if (e.target.closest('[data-cursor-case]') && !e.relatedTarget?.closest('[data-cursor-case]')) {
        isActive.value = false
    }
}

onMounted(() => {
    gsap.set(cursorRef.value, { xPercent: -50, yPercent: -50 })

    xTo = gsap.quickTo(cursorRef.value, 'x', { duration: 0.4, ease: 'power3.out' })
    yTo = gsap.quickTo(cursorRef.value, 'y', { duration: 0.4, ease: 'power3.out' })

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
})

onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseover', onMouseOver)
    document.removeEventListener('mouseout', onMouseOut)
})
</script>