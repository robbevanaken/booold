<template>
    <div class="c-header__mobile">
        <div aria-hidden="true" class="c-hamburger-ghost"></div>
        <button
            class="c-hamburger"
            :aria-label="isOpen ? 'Close menu' : 'Open menu'"
            :aria-expanded="isOpen"
            :data-navigation-status="isOpen ? 'active' : 'not-active'"
            @click="toggle"
        >
            <div class="c-hamburger__inner">
                <span class="c-hamburger__bar"></span>
                <span class="c-hamburger__bar"></span>
            </div>
        </button>
    </div>
</template>

<script setup>
import { useMobileMenu } from '~/composables/useMobileMenu'

const { isOpen, toggle } = useMobileMenu()
</script>
