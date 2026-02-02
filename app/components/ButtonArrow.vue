<template>
    <NuxtLink class="c-btn-arrow" :to="link">
      {{ label }}
      <IconArrow />
    </NuxtLink>
</template>

<script>
export default {
  name: 'ButtonArrow',
  props: {
    label: {
      type: String,
      default: "Read more"
    },
    link: {
      type: String,
      default: ""
    },
  }
}
</script>