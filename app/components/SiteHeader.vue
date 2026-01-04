<template>
  <header class="c-site-header">
    <div class="o-container">
      <div class="flex items-center justify-between gap-8">
        <CompanyLogo :inverse="inverse" />
        <PrimaryNavigation :inverse="inverse" />
      </div>
    </div>
  </header>
</template>

<script>
import PrimaryNavigation from '~/components/PrimaryNavigation.vue'

export default {
  name: 'SiteHeader',
  components: {
    PrimaryNavigation
  },
  props: {
    inverse: {
      type: Boolean,
      default: false
    }
  }
}
</script>