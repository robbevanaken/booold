<template>
    <a class="c-btn-arrow" :href="link">
        {{ label }}
        <IconArrow />
    </a>
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