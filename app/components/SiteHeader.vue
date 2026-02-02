<template>
  <header :class="'c-site-header' + (inverse ? ' c-site-header--inverse' : '')">
    <div class="o-container">
      <div class="flex items-center justify-between gap-8">
        <CompanyLogo :inverse="inverse" />
        <div class="c-navigation-primary__wrapper">
          <PrimaryNavigation :inverse="inverse" />
          <ButtonDefault url="/contact" label="Get in contact" />
        </div>
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