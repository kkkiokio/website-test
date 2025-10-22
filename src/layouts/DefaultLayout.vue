<template>
  <div>
    <header class="section section--light" style="padding: 1.5rem 0; border-bottom: 1px solid rgba(148, 163, 184, 0.2);">
      <div class="container" style="display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap;">
        <router-link to="/" style="font-size: 1.5rem; font-weight: 700; color: #1f2937;">
          {{ t('brand.name') }}
        </router-link>
        <nav style="display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
          <router-link
            v-for="item in navigation"
            :key="item.path"
            :to="item.path"
            class="nav-link"
            :class="{ 'nav-link--active': item.path === route.path }"
          >
            {{ item.label }}
          </router-link>
          <div class="language-switcher" role="group" aria-label="Language switcher">
            <button
              v-for="option in locales"
              :key="option"
              class="language-switcher__button"
              :class="{ 'language-switcher__button--active': option === currentLocale }"
              type="button"
              @click="switchLanguage(option)"
            >
              {{ t(`languages.${option}`) }}
            </button>
          </div>
        </nav>
      </div>
    </header>

    <main>
      <slot />
    </main>

    <footer class="footer">
      <div class="container">
        <div class="footer__top">
          <div>
            <h3 style="margin: 0 0 0.75rem; font-size: 1.5rem;">{{ t('brand.name') }}</h3>
            <p style="margin: 0; max-width: 420px;">{{ t('brand.tagline') }}</p>
          </div>
          <div style="display: grid; gap: 1rem;">
            <strong>{{ t('footer.contact.title') }}</strong>
            <p style="margin: 0;">{{ t('footer.contact.address') }}</p>
            <p style="margin: 0;">{{ t('footer.contact.phone') }}</p>
            <p style="margin: 0;">{{ t('footer.contact.email') }}</p>
          </div>
          <div class="footer__social">
            <strong>{{ t('footer.social.title') }}</strong>
            <div class="footer__social-links">
              <a
                v-for="item in socialLinks"
                :key="item.key"
                class="footer__social-link"
                :href="item.href"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="t(`footer.social.${item.ariaKey}`)"
              >
                {{ t(`footer.social.${item.key}`) }}
              </a>
            </div>
          </div>
          <div style="display: grid; gap: 1rem;">
            <strong>{{ t('footer.quickLinks.title') }}</strong>
            <router-link
              v-for="item in navigation"
              :key="`footer-${item.path}`"
              :to="item.path"
              style="color: #e2e8f0;"
            >
              {{ item.label }}
            </router-link>
          </div>
        </div>
        <div class="footer__bottom">
          {{ t('footer.copyright', { year: new Date().getFullYear() }) }}
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { getSupportedLocales, setLocale } from '@/plugins/i18n';
import { useSeo } from '@/composables/useSeo';

const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();
const locales = getSupportedLocales();

useSeo();

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

const navigation = computed(() => [
  { label: t('navigation.home'), path: '/' },
  { label: t('navigation.about'), path: '/about' },
  { label: t('navigation.services'), path: '/services' },
  { label: t('navigation.cases'), path: '/cases' },
  { label: t('navigation.news'), path: '/news' },
  { label: t('navigation.contact'), path: '/contact' }
]);

const currentLocale = computed(() => locale.value);

function switchLanguage(next: string) {
  setLocale(next as 'en' | 'zh');
}

watch(
  () => locale.value,
  (nextLocale) => {
    if (route.query.lang === nextLocale) {
      return;
    }

    router.replace({
      query: {
        ...route.query,
        lang: nextLocale
      }
    });
  },
  { immediate: true }
);

watch(
  () => route.query.lang,
  (queryLang) => {
    if (typeof queryLang === 'string' && queryLang !== locale.value && locales.includes(queryLang)) {
      setLocale(queryLang as 'en' | 'zh');
    }
  }
);
</script>

<style scoped>
.nav-link {
  padding: 0.5rem 0.75rem;
  border-radius: 999px;
  color: #334155;
  font-weight: 500;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.nav-link:hover {
  background-color: rgba(37, 99, 235, 0.12);
  color: #1d4ed8;
}

.nav-link--active {
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  color: #ffffff;
  box-shadow: 0 10px 20px rgba(37, 99, 235, 0.25);
}

.language-switcher {
  display: inline-flex;
  background-color: #e2e8f0;
  border-radius: 999px;
  padding: 0.25rem;
  gap: 0.25rem;
}

.language-switcher__button {
  border: none;
  background: transparent;
  color: #334155;
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.language-switcher__button:hover {
  background-color: rgba(15, 23, 42, 0.12);
}

.language-switcher__button--active {
  background: #0f172a;
  color: #f8fafc;
}

.footer__social {
  display: grid;
  gap: 1rem;
}

.footer__social-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer__social-link {
  color: #e2e8f0;
  font-weight: 500;
  text-decoration: none;
}

.footer__social-link:hover,
.footer__social-link:focus {
  color: #bfdbfe;
  text-decoration: underline;
}
</style>
