<template>
  <div>
    <SiteHeader />
    <main>
      <section class="c-contact">
        <div class="o-container o-grid">
          <div class="c-contact__header">
            <h1 data-reveal class="c-contact__title">Have a project in mind? Looking for a <span class="u-decorate">booold</span>, <span class="u-decorate">thoughtful</span> website?</h1>
            <p data-reveal class="c-contact__intro">You’re in the right place. Fill in the form and I’ll get back to you personally — usually within a day.</p>
          </div>

          <form class="c-contact__form" @submit.prevent="handleSubmit">
            <div class="c-contact__row">
              <div class="c-contact__field">
                <label for="firstName" class="c-contact__label c-contact__label--required">First name</label>
                <input
                  id="firstName"
                  v-model="form.firstName"
                  type="text"
                  class="c-contact__input"
                  placeholder="John"
                  required
                />
              </div>

              <div class="c-contact__field">
                <label for="lastName" class="c-contact__label c-contact__label--required">Last name</label>
                <input
                  id="lastName"
                  v-model="form.lastName"
                  type="text"
                  class="c-contact__input"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div class="c-contact__row">
              <div class="c-contact__field">
                <label for="email" class="c-contact__label c-contact__label--required">Email address</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  class="c-contact__input"
                  placeholder="john@company.com"
                  required
                />
              </div>

              <div class="c-contact__field">
                <label for="company" class="c-contact__label">Company</label>
                <input
                  id="company"
                  v-model="form.company"
                  type="text"
                  class="c-contact__input"
                  placeholder="Acme Inc."
                />
              </div>
            </div>

            <div class="c-contact__field">
              <label for="budget" class="c-contact__label c-contact__label--required">Budget</label>
              <select
                id="budget"
                v-model="form.budget"
                class="c-contact__select"
                required
              >
                <option value="" disabled>Select a budget range</option>
                <option value="2k-5k">€2k - €5k</option>
                <option value="5k-10k">€5k - €10k</option>
                <option value="10k-15k">€10k - €15k</option>
                <option value="15k-25k">€15k - €25k</option>
                <option value="25k+">€25k +</option>
              </select>
            </div>

            <div class="c-contact__field">
              <label for="message" class="c-contact__label c-contact__label--required">Message</label>
              <textarea
                id="message"
                v-model="form.message"
                class="c-contact__textarea"
                placeholder="Tell us about your project..."
                rows="6"
                required
              ></textarea>
            </div>

            <button type="submit" class="c-btn c-btn--dark" :disabled="isSubmitting">
              <span class="c-btn__inner" data-magnetic-inner-target>
                {{ isSubmitting ? 'Sending...' : 'Send message' }}
                <IconArrow />
              </span>
            </button>

            <p v-if="submitStatus === 'success'" class="c-contact__status c-contact__status--success">
              Thanks! We'll be in touch soon.
            </p>
            <p v-if="submitStatus === 'error'" class="c-contact__status c-contact__status--error">
              Something went wrong. Please try again.
            </p>
          </form>
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  budget: '',
  message: ''
})

const isSubmitting = ref(false)
const submitStatus = ref(null)

const handleSubmit = async () => {
  isSubmitting.value = true
  submitStatus.value = null

  try {
    // TODO: Replace with your form submission endpoint
    // Option 1: Formspree (easiest)
    // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(form)
    // })

    // Option 2: Nuxt server route
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(form)
    // })

    // Simulated success for now
    await new Promise(resolve => setTimeout(resolve, 1000))
    submitStatus.value = 'success'

    // Reset form
    Object.keys(form).forEach(key => form[key] = '')
  } catch (error) {
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>

