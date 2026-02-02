<template>
    <div class="c-header__mobile">
        <button
            class="c-hamburger"
            :aria-pressed="isOpen"
            @click="toggleMenu"
        >
            <div class="c-hamburger__inner">
                <span></span>
                <span></span>
            </div>
        </button>
        <aside class="c-mobile-panel" :aria-hidden="!isOpen"></aside>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const toggleMenu = () => {
    isOpen.value = !isOpen.value
}
</script>
