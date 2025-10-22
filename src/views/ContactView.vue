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
        <div class="card contact-card">
          <h2 class="contact-card__title">{{ t('contact.details.title') }}</h2>
          <p class="contact-card__description">{{ t('contact.details.description') }}</p>
          <a
            class="contact-card__link"
            :href="contactLinks.phone"
            :aria-label="t('contact.details.phone')"
          >
            {{ t('contact.details.phone') }}
          </a>
          <a
            class="contact-card__link"
            :href="contactLinks.email"
            :aria-label="t('contact.details.email')"
          >
            {{ t('contact.details.email') }}
          </a>
          <p class="contact-card__text">{{ t('contact.details.address') }}</p>
          <a
            class="contact-card__map"
            :href="contactLinks.map"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`${t('contact.details.mapCta')} - ${t('contact.details.address')}`"
          >
            {{ t('contact.details.mapCta') }}
          </a>
          <div class="contact-card__social">
            <strong class="contact-card__social-title">{{ t('contact.details.social.title') }}</strong>
            <div class="contact-card__social-links">
              <a
                v-for="item in socialLinks"
                :key="item.key"
                class="contact-card__social-link"
                :href="item.href"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="t(`contact.details.social.${item.ariaKey}`)"
              >
                {{ t(`contact.details.social.${item.key}`) }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const contactLinks = {
  phone: 'tel:+8618782072944',
  email: 'mailto:18782072944@163.com',
  map: 'https://www.amap.com/search?query=%E5%A4%A9%E5%BA%9C%E8%BD%AF%E4%BB%B6%E5%9B%ADA%E5%8C%BA'
};

const socialLinks = [
  {
    key: 'weibo',
    ariaKey: 'weiboAria',
    href: 'https://weibo.com/timekettle'
  },
  {
    key: 'x',
    ariaKey: 'xAria',
    href: 'https://x.com/TimekettleTech'
  }
];
</script>

<style scoped>
.contact-card {
  display: grid;
  gap: 1rem;
}

.contact-card__title {
  margin: 0;
}

.contact-card__description {
  margin: 0;
  color: #475569;
}

.contact-card__link {
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
}

.contact-card__link:hover,
.contact-card__link:focus {
  text-decoration: underline;
}

.contact-card__text {
  margin: 0;
  color: #1f2937;
}

.contact-card__map {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  border: 1px solid rgba(37, 99, 235, 0.4);
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.contact-card__map:hover,
.contact-card__map:focus {
  background-color: rgba(37, 99, 235, 0.08);
}

.contact-card__social {
  display: grid;
  gap: 0.75rem;
}

.contact-card__social-title {
  font-size: 1rem;
}

.contact-card__social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.contact-card__social-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  background-color: rgba(15, 23, 42, 0.08);
  color: #0f172a;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.contact-card__social-link:hover,
.contact-card__social-link:focus {
  background-color: rgba(37, 99, 235, 0.15);
  color: #1d4ed8;
}

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
