<template>
  <div ref="pageWrapper" class="page-wrapper">
    <SiteHeader />
    <main>
      <!-- Hero section -->
      <div class="c-legal-hero" data-theme-section="light" data-bg-section="light">
        <div class="o-container o-grid">
          <div class="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-2">
            <div class="c-legal-hero__title">
              <h1 data-reveal>Privacy policy</h1>
            </div>
          </div>
        </div>
      </div>

      <!-- Content section -->
      <div class="c-legal-content" data-theme-section="light">
        <div class="o-container o-grid">
          <div class="col-span-12 lg:col-span-8 lg:col-start-2">
            <div class="c-legal-content__body">
              <section class="c-legal-content__section" data-reveal>
                <h2>1. Personal data we collect</h2>
                <p>When you use the contact form on this website, we collect the following information:</p>
                <ul>
                  <li>First name</li>
                  <li>Last name</li>
                  <li>Email address</li>
                  <li>Company (if provided)</li>
                </ul>
                <br>
                <br>
                <p>This information is only collected when you voluntarily submit the contact form.</p>
              </section>

              <section class="c-legal-content__section" data-reveal>
                <h2>2. How we use your data</h2>
                <p>The data you submit via the contact form is used solely to respond to your inquiry. It is not used for marketing purposes and not added to any mailing lists.</p>
              </section>

              <section class="c-legal-content__section" data-reveal>
                <h2>3. How your data is processed</h2>
                <p>The contact form is powered by Brevo (formerly Sendinblue). When you submit the form, your details are securely transmitted via Brevo and sent directly to our email inbox.</p>
                <p>Brevo acts as a data processor and processes your data only for the purpose of delivering your message. Brevo complies with the General Data Protection Regulation (GDPR).</p>
              </section>

              <section class="c-legal-content__section" data-reveal>
                <h2>4. Data retention</h2>
                <p>Your data is kept only for as long as necessary to handle your request and for normal email correspondence. We do not store contact form submissions in a database on this website.</p>
              </section>

              <section class="c-legal-content__section" data-reveal>
                <h2>5. Data sharing</h2>
                <p>Your personal data is not shared with third parties, except for Brevo, which is used solely to transmit the contact form message.</p>
              </section>

              <section class="c-legal-content__section" data-reveal>
                <h2>6. Your rights</h2>
                <p>Under the GDPR, you have the right to:</p>
                <ul>
                  <li>Access your personal data</li>
                  <li>Request correction or deletion of your data</li>
                  <li>Object to the processing of your data</li>
                </ul>
                <p>You can exercise these rights by contacting us directly.</p>
              </section>

              <section class="c-legal-content__section" data-reveal>
                <h2>7. Contact</h2>
                <p>If you have any questions about this privacy policy or how your data is handled, you can contact us via the contact form on this website.</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
    <SiteFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePageAnimations } from '~/composables/usePageAnimations'

const pageWrapper = ref(null)

useHead({
  title: 'Privacy Policy | Booold Studio'
})

usePageAnimations(pageWrapper)
</script>
