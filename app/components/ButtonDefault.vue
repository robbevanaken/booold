<template>
    <NuxtLink
        :class="glassy ? 'c-btn c-btn--glassy' : 'c-btn'"
        :to="url"
    >
        <span class="c-btn__inner">
            <span class="c-btn__text">{{ label }}</span>
        </span>
    </NuxtLink>
</template>

<script setup>
defineProps({
    url: {
        type: String,
        default: "/"
    },
    label: {
        type: String,
        default: "Read more"
    },
    glassy: {
        type: Boolean,
        default: false
    },
})
</script>
