<template>
    <component
        :is="tag"
        ref="magnetRef"
        :class="dark ? 'c-btn c-btn--dark' : 'c-btn'"
        :href="tag === 'a' ? url : undefined"
        :type="tag === 'button' ? type : undefined"
        :disabled="tag === 'button' ? disabled : undefined"
        :data-magnetic-strength="strength"
        :data-magnetic-strength-inner="strengthInner"
    >
        <span class="c-btn__inner" data-magnetic-inner-target>
            {{ label }}
            <IconArrow />
        </span>
    </component>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const props = defineProps({
    tag: {
        type: String,
        default: 'a'
    },
    url: {
        type: String,
        default: "/"
    },
    label: {
        type: String,
        default: "Read more"
    },
    type: {
        type: String,
        default: 'button'
    },
    dark: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    strength: {
        type: Number,
        default: 25
    },
    strengthInner: {
        type: Number,
        default: 50
    }
})

const magnetRef = ref(null)

const resetEl = (el, immediate) => {
    if (!el) return
    gsap.killTweensOf(el)
    if (immediate) {
        gsap.set(el, { x: "0em", y: "0em", rotate: "0.001deg" })
    } else {
        gsap.to(el, {
            x: "0em",
            y: "0em",
            rotate: "0deg",
            ease: "elastic.out(1, 0.3)",
            duration: 1.6,
            clearProps: "all"
        })
    }
}

const onMouseEnter = (e) => {
    if (window.innerWidth <= 991) return
    const m = magnetRef.value
    resetEl(m, true)
    resetEl(m.querySelector('[data-magnetic-inner-target]'), true)
}

const onMouseMove = (e) => {
    if (window.innerWidth <= 991) return
    const m = magnetRef.value
    const b = m.getBoundingClientRect()
    const strength = props.strength
    const inner = m.querySelector('[data-magnetic-inner-target]')
    const innerStrength = props.strengthInner

    const offsetX = ((e.clientX - b.left) / m.offsetWidth - 0.5) * (strength / 16)
    const offsetY = ((e.clientY - b.top) / m.offsetHeight - 0.5) * (strength / 16)

    gsap.to(m, {
        x: offsetX + "em",
        y: offsetY + "em",
        rotate: "0.001deg",
        ease: "power4.out",
        duration: 1.6
    })

    if (inner) {
        const innerOffsetX = ((e.clientX - b.left) / m.offsetWidth - 0.5) * (innerStrength / 16)
        const innerOffsetY = ((e.clientY - b.top) / m.offsetHeight - 0.5) * (innerStrength / 16)
        gsap.to(inner, {
            x: innerOffsetX + "em",
            y: innerOffsetY + "em",
            rotate: "0.001deg",
            ease: "power4.out",
            duration: 2
        })
    }
}

const onMouseLeave = (e) => {
    if (window.innerWidth <= 991) return
    const m = magnetRef.value
    const inner = m.querySelector('[data-magnetic-inner-target]')

    gsap.to(m, {
        x: "0em",
        y: "0em",
        ease: "elastic.out(1, 0.3)",
        duration: 1.6,
        clearProps: "all"
    })

    if (inner) {
        gsap.to(inner, {
            x: "0em",
            y: "0em",
            ease: "elastic.out(1, 0.3)",
            duration: 2,
            clearProps: "all"
        })
    }
}

onMounted(() => {
    const el = magnetRef.value
    if (el) {
        el.addEventListener('mouseenter', onMouseEnter)
        el.addEventListener('mousemove', onMouseMove)
        el.addEventListener('mouseleave', onMouseLeave)
    }
})

onUnmounted(() => {
    const el = magnetRef.value
    if (el) {
        el.removeEventListener('mouseenter', onMouseEnter)
        el.removeEventListener('mousemove', onMouseMove)
        el.removeEventListener('mouseleave', onMouseLeave)
    }
})
</script>