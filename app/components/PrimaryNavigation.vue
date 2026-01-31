<template>
    <nav class="c-navigation-primary" :class="{'c-navigation-primary--inverse': inverse}">
        <ul class="c-navigation-primary__list">
            <li><a :class="inverse ? 'c-btn-link c-btn-link--light' : 'c-btn-link c-btn-link--dark'" href="/about">About</a></li>
            <li><a :class="inverse ? 'c-btn-link c-btn-link--light' : 'c-btn-link c-btn-link--dark'" href="/contact">Contact</a></li>
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