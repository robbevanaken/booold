<template>
    <nav
        class="c-mobile-panel"
        :data-navigation-status="isOpen ? 'active' : 'not-active'"
        :aria-hidden="!isOpen"
        :inert="!isOpen"
        aria-label="Mobile navigation"
    >
        <div class="c-mobile-panel__bg" @click="close"></div>
        <div class="c-mobile-panel__content">
            <div class="c-mobile-panel__inner">
                <ul class="c-mobile-panel__list">
                    <li class="c-mobile-panel__item" data-navigation-item style="transition-delay: 0s">
                        <NuxtLink class="c-mobile-panel__link" to="/about" @click="close">
                            <span class="c-mobile-panel__link-text">About</span>
                        </NuxtLink>
                    </li>
                    <li class="c-mobile-panel__item" data-navigation-item style="transition-delay: 0.05s">
                        <NuxtLink class="c-mobile-panel__link" to="/#work" @click="close">
                            <span class="c-mobile-panel__link-text">Work</span>
                        </NuxtLink>
                    </li>
                    <li class="c-mobile-panel__item" data-navigation-item style="transition-delay: 0.1s">
                        <NuxtLink class="c-mobile-panel__link" to="/contact" @click="close">
                            <span class="c-mobile-panel__link-text">Contact</span>
                        </NuxtLink>
                    </li>
                </ul>
                <div class="c-mobile-panel__doormat" style="transition-delay: 0.15s">
                    <div class="c-mobile-panel__doormat-status">
                        <div class="c-mobile-panel__doormat-pulse"></div>
                        <span>Available for projects worldwide</span>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useMobileMenu } from '~/composables/useMobileMenu'

const { isOpen, close } = useMobileMenu()

const handleEscape = (e) => {
    if (e.key === 'Escape' && isOpen.value) {
        close()
    }
}

onMounted(() => {
    document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
})
</script>
