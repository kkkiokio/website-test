<template>
  <section class="section section--light">
    <div class="container" style="display: grid; gap: 3rem; align-items: start;">
      <div>
        <h1 class="section__title">{{ t('contact.intro.title') }}</h1>
        <p class="section__subtitle">{{ t('contact.intro.subtitle') }}</p>
      </div>
      <div class="grid grid--two">
        <form class="card" style="display: grid; gap: 1rem;">
          <label>
            <span style="display: block; font-weight: 600; margin-bottom: 0.35rem;">{{ t('contact.form.name') }}</span>
            <input type="text" name="name" :placeholder="t('contact.form.name')" class="input" />
          </label>
          <label>
            <span style="display: block; font-weight: 600; margin-bottom: 0.35rem;">{{ t('contact.form.email') }}</span>
            <input type="email" name="email" :placeholder="t('contact.form.email')" class="input" />
          </label>
          <label>
            <span style="display: block; font-weight: 600; margin-bottom: 0.35rem;">{{ t('contact.form.company') }}</span>
            <input type="text" name="company" :placeholder="t('contact.form.company')" class="input" />
          </label>
          <label>
            <span style="display: block; font-weight: 600; margin-bottom: 0.35rem;">{{ t('contact.form.message') }}</span>
            <textarea name="message" rows="4" :placeholder="t('contact.form.message')" class="input"></textarea>
          </label>
          <button type="submit" class="button" style="width: fit-content;">{{ t('contact.form.submit') }}</button>
        </form>
        <div class="card" style="display: grid; gap: 1rem;">
          <h2 style="margin: 0;">{{ t('contact.details.title') }}</h2>
          <p style="margin: 0; color: #475569;">{{ t('contact.details.description') }}</p>
          <p style="margin: 0;">{{ t('contact.details.phone') }}</p>
          <p style="margin: 0;">{{ t('contact.details.email') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped>
.input {
  width: 100%;
  border: 1px solid rgba(148, 163, 184, 0.6);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.2);
}
</style>
