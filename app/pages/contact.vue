<template>
  <div ref="pageWrapper" class="page-wrapper">
    <SiteHeader />
    <main>

      <!-- Hero section -->
      <div class="c-contact-hero" data-theme-section="light" data-bg-section="light">
        <div class="o-container o-grid">
          <div class="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-2">
            <div class="c-about-hero__title">
              <h1 data-reveal class="c-contact__title">Have a project in mind? Looking for a <span class="u-decorate">booold,</span> <span class="u-decorate">thoughtful</span> website?</h1>
            </div>
          </div>
        </div>
        <div class="o-container o-grid">
          <div class="col-span-12 md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-8">
            <div class="c-contact-hero__intro">
              <p data-reveal>
                You’re in the right place. Fill in the form and I’ll get back to you personally. Usually within a day.
              </p>            
            </div>
          </div>
        </div>
      </div>

      <!-- Form section -->
      <section class="c-contact" data-theme-section="light">
        <div class="o-container o-grid">
          <div v-if="submitStatus === 'success'" ref="successRef" class="c-contact__success">
            <h2 class="c-contact__success-title">Thank you for reaching out!</h2>
            <p class="c-contact__success-text">Your message has been sent. I'll get back to you soon.</p>
          </div>

          <div v-else class="c-contact__form-wrapper">
            <div v-if="isSubmitting" class="c-contact__loader">
              <span class="c-contact__spinner"></span>
            </div>

            <form class="c-contact__form" novalidate @submit.prevent="handleSubmit">
              <div class="c-contact__row">
                <div class="c-contact__field">
                  <label for="firstName" class="c-contact__label c-contact__label--required">First name</label>
                  <input
                    id="firstName"
                    v-model="form.firstName"
                    type="text"
                    :class="['c-contact__input', { 'c-contact__input--error': errors.firstName }]"
                    placeholder="John"
                  />
                  <span v-if="errors.firstName" class="c-contact__error">{{ errors.firstName }}</span>
                </div>

                <div class="c-contact__field">
                  <label for="lastName" class="c-contact__label c-contact__label--required">Last name</label>
                  <input
                    id="lastName"
                    v-model="form.lastName"
                    type="text"
                    :class="['c-contact__input', { 'c-contact__input--error': errors.lastName }]"
                    placeholder="Doe"
                  />
                  <span v-if="errors.lastName" class="c-contact__error">{{ errors.lastName }}</span>
                </div>
              </div>

              <div class="c-contact__row">
                <div class="c-contact__field">
                  <label for="email" class="c-contact__label c-contact__label--required">Email address</label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    :class="['c-contact__input', { 'c-contact__input--error': errors.email }]"
                    placeholder="john@company.com"
                  />
                  <span v-if="errors.email" class="c-contact__error">{{ errors.email }}</span>
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
                  :class="['c-contact__select', { 'c-contact__select--error': errors.budget }]"
                >
                  <option value="" disabled>Select a budget range</option>
                  <option value="2k-5k">€2k - €5k</option>
                  <option value="5k-10k">€5k - €10k</option>
                  <option value="10k-15k">€10k - €15k</option>
                  <option value="15k-25k">€15k - €25k</option>
                  <option value="25k+">€25k +</option>
                </select>
                <span v-if="errors.budget" class="c-contact__error">{{ errors.budget }}</span>
              </div>

              <div class="c-contact__field">
                <label for="message" class="c-contact__label c-contact__label--required">Message</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  :class="['c-contact__textarea', { 'c-contact__textarea--error': errors.message }]"
                  placeholder="Tell me about your project..."
                  rows="6"
                ></textarea>
                <span v-if="errors.message" class="c-contact__error">{{ errors.message }}</span>
              </div>
              <SwipeConfirm ref="swipeRef" @confirmed="isHumanConfirmed = true" />
              <ButtonDefaultBtn
                tag="button"
                type="submit"
                label="Send message"
                :disabled="isSubmitting || !isHumanConfirmed"
              />

              <p v-if="submitStatus === 'error'" class="c-contact__status c-contact__status--error">
                Something went wrong. Please try again.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'
import { usePageAnimations } from '~/composables/usePageAnimations'

const pageWrapper = ref(null)

useHead({
  title: 'Contact | Booold Studio'
})

usePageAnimations(pageWrapper)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  budget: '',
  message: ''
})

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  budget: '',
  message: ''
})

const isSubmitting = ref(false)
const submitStatus = ref(null)
const successRef = ref(null)
const swipeRef = ref(null)
const isHumanConfirmed = ref(false)

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const validateForm = () => {
  let isValid = true

  // Reset errors
  Object.keys(errors).forEach(key => errors[key] = '')

  if (!form.firstName.trim()) {
    errors.firstName = 'Please enter your first name'
    isValid = false
  }

  if (!form.lastName.trim()) {
    errors.lastName = 'Please enter your last name'
    isValid = false
  }

  if (!form.email.trim()) {
    errors.email = 'Please enter your email address'
    isValid = false
  } else if (!validateEmail(form.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }

  if (!form.budget) {
    errors.budget = 'Please select a budget range'
    isValid = false
  }

  if (!form.message.trim()) {
    errors.message = 'Please enter a message'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  submitStatus.value = null

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: form
    })

    submitStatus.value = 'success'
    // Reset form
    Object.keys(form).forEach(key => form[key] = '')
    // Reset swipe confirm
    isHumanConfirmed.value = false
    swipeRef.value?.reset()
    // Scroll to success message
    await nextTick()
    successRef.value?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  } catch (error) {
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}

</script>

