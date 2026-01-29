<template>
    <a class="c-btn" href="{{ url }}">
        {{ label }}
        <IconArrow />
    </a>
</template>

<script>
export default {
  name: 'ButtonDefault',
  props: {
    url: {
      type: String,
      default: "/"
    },
    label: {
        type: String,
        default: "Read more"
    }
  }
}
</script>