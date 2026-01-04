<template>
    <nav class="c-navigation-primary" :class="{'c-navigation-primary--inverse': inverse}">
        <ul class="c-navigation-primary__list">
            <li><NuxtLink to="/about">About</NuxtLink></li>
            <li><NuxtLink to="/contact">Contact</NuxtLink></li>
        </ul>
    </nav>
</template>

<script>
export default {
  name: 'PrimaryNavigation',
  props: {
    inverse: {
      type: Boolean,
      default: false
    }
  }
}
</script>