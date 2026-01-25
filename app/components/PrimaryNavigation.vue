<template>
    <nav class="c-navigation-primary" :class="{'c-navigation-primary--inverse': inverse}">
        <ul class="c-navigation-primary__list">
            <li><a class="btn-animate-chars" href="/about"><span data-button-animate-chars="">About</span></a></li>
            <li><a class="btn-animate-chars" href="/contact"><span data-button-animate-chars="">Contact</span></a></li>
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