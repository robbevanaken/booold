<template>
    <nav class="c-navigation-primary" :class="{'c-navigation-primary--inverse': inverse}">
        <ul class="c-navigation-primary__list">
            <li><NuxtLink :class="inverse ? 'c-btn-link c-btn-link--light' : 'c-btn-link c-btn-link--dark'" to="/about">About</NuxtLink></li>
            <li><NuxtLink :class="inverse ? 'c-btn-link c-btn-link--light' : 'c-btn-link c-btn-link--dark'" to="/#work">Work</NuxtLink></li>
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