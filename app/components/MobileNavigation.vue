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
        <aside class="c-mobile-panel" :aria-hidden="!isOpen">
            <ul class="c-mobile-panel__list">
                <li class="c-mobile-panel__item">
                    <a class="c-mobile-panel__link" href="/about">About</a>
                </li>
                <li class="c-mobile-panel__item">
                    <a class="c-mobile-panel__link" href="/#work">Work</a>
                </li>
                <li class="c-mobile-panel__item">
                    <a class="c-mobile-panel__link" href="/contact">Contact</a>
                </li>
            </ul>
        </aside>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const toggleMenu = () => {
    isOpen.value = !isOpen.value
}
</script>
