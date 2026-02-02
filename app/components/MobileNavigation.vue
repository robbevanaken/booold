<template>
    <div class="c-header__mobile">
        <button
            class="c-hamburger"
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
