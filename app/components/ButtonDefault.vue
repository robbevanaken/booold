<template>
    <component
        :is="tag"
        :class="dark ? 'c-btn c-btn--dark' : 'c-btn'"
        :href="tag === 'a' ? url : undefined"
        :type="tag === 'button' ? type : undefined"
        :disabled="tag === 'button' ? disabled : undefined"
    >
        <span class="c-btn__inner">
            <span class="c-btn__text">{{ label }}</span>
        </span>
    </component>
</template>

<script setup>
defineProps({
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
    }
})
</script>
