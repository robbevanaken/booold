<template>
  <footer class="c-site-footer">
    <div class="c-site-footer__navitation">
      <div class="o-container o-grid gap-y-10">
        <div class="col-span-12 lg:col-span-5">
          <h2 class="c-site-footer__title">Booold thinking <br>brilliant outcomes</h2>
        </div>
        <div class="col-span-12 lg:col-span-2">
          <h3 class="c-site-footer__subtitle">Navigation</h3>
          <ul class="c-site-footer__list">
            <li>
              <a class="btn-animate-chars" href="/about"><span data-button-animate-chars="">About</span></a>
            </li>
            <li>
              <a class="btn-animate-chars" href="/contact"><span data-button-animate-chars="">Contact</span></a>
            </li>
          </ul>
        </div>
        <div class="col-span-12 lg:col-span-2">
          <h3 class="c-site-footer__subtitle">Socials</h3>
          <ul class="c-site-footer__list">
            <li>
              <a class="btn-animate-chars" href="https://www.instagram.com/boooldstudio/" target="_blank"><span data-button-animate-chars="">Instagram</span></a>
            </li>
            <li>
              <a class="btn-animate-chars" href="https://www.linkedin.com/company/booold" target="_blank"><span data-button-animate-chars="">Linkedin</span></a>
            </li>
            <li>
              <a class="btn-animate-chars" href="tel:+32494487762"><span data-button-animate-chars="">Whatsapp</span></a>
            </li>
          </ul>
        </div>
        <div class="col-span-12 lg:col-span-3">
          <h3 class="c-site-footer__subtitle">Contact me</h3>
          <ul class="c-site-footer__list">
            <li>
              <a class="btn-animate-chars" href="mailto:hello@boooldstudio.com" target="_blank"><span data-button-animate-chars="">hello@boooldstudio.com</span></a>
            </li>
            <li>
              <a class="btn-animate-chars" href="https://www.linkedin.com/company/booold" target="_blank"><span data-button-animate-chars="">+32 494 48 77 62</span></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="c-site-footer__doormat">
      <div class="o-container o-grid">
        <div class="col-span-12">
          <div class="c-site-footer__doormat-logo">
            <IconLogoStudio />
          </div>
          <div class="c-site-footer__doormat-navigation"></div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter'
}
</script>