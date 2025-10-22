<template>
  <section class="section section--light">
    <div class="container" style="display: grid; gap: 3rem;">
      <div style="display: grid; gap: 1.5rem; max-width: 720px;">
        <span style="font-weight: 600; color: #2563eb;">{{ t('brand.name') }}</span>
        <h1 style="font-size: 3rem; line-height: 1.1; margin: 0;">{{ t('home.hero.title') }}</h1>
        <p style="margin: 0; font-size: 1.15rem; color: #475569;">{{ t('home.hero.subtitle') }}</p>
        <router-link class="button" to="/contact">{{ t('home.hero.cta') }}</router-link>
      </div>
      <div class="grid grid--three">
        <div v-for="item in stats" :key="item.label" class="card" style="text-align: center;">
          <div style="font-size: 2.5rem; font-weight: 700; color: #1d4ed8;">{{ item.value }}</div>
          <div style="color: #64748b;">{{ item.label }}</div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--muted">
    <div class="container">
      <h2 class="section__title">{{ t('home.pillars.title') }}</h2>
      <p class="section__subtitle">{{ t('home.pillars.subtitle') }}</p>
      <div class="grid grid--three">
        <div v-for="item in pillars" :key="item.title" class="card">
          <div class="card__title">{{ item.title }}</div>
          <p class="card__subtitle">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--light">
    <div class="container">
      <h2 class="section__title">{{ t('home.featuredProducts.title') }}</h2>
      <p class="section__subtitle">{{ t('home.featuredProducts.subtitle') }}</p>
      <div class="grid grid--three">
        <div v-for="product in featuredProducts" :key="product.title" class="card" style="display: grid; gap: 1rem;">
          <div class="card__title">{{ product.title }}</div>
          <p class="card__subtitle">{{ product.description }}</p>
          <router-link class="button" to="/services">{{ product.cta }}</router-link>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--muted">
    <div class="container">
      <h2 class="section__title">{{ t('home.technology.title') }}</h2>
      <p class="section__subtitle">{{ t('home.technology.subtitle') }}</p>
      <div class="grid grid--three">
        <div v-for="feature in technologyFeatures" :key="feature.title" class="card">
          <div class="card__title">{{ feature.title }}</div>
          <p class="card__subtitle">{{ feature.description }}</p>
        </div>
      </div>
      <router-link class="button" style="margin-top: 2rem;" to="/services">{{ t('home.technology.cta') }}</router-link>
    </div>
  </section>

  <section class="section section--light">
    <div class="container">
      <h2 class="section__title">{{ t('home.caseHighlights.title') }}</h2>
      <p class="section__subtitle">{{ t('home.caseHighlights.subtitle') }}</p>
      <div class="grid grid--two">
        <div v-for="item in caseHighlights" :key="item.title" class="card">
          <div class="card__title">{{ item.title }}</div>
          <p class="card__subtitle">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--muted">
    <div class="container">
      <div style="display: flex; justify-content: space-between; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
        <div>
          <h2 class="section__title" style="margin-bottom: 0.75rem;">{{ t('home.news.title') }}</h2>
        </div>
        <router-link class="button" to="/news">{{ t('home.news.cta') }}</router-link>
      </div>
      <div class="grid grid--three" style="margin-top: 2rem;">
        <div v-for="article in newsHighlights" :key="article.title" class="card">
          <div class="card__title">{{ article.title }}</div>
          <p class="card__subtitle">{{ article.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--light">
    <div class="container">
      <h2 class="section__title">{{ t('home.support.title') }}</h2>
      <div class="grid grid--three">
        <a
          v-for="link in supportLinks"
          :key="link.label"
          class="card"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          style="display: grid; gap: 0.75rem; color: inherit;"
        >
          <div class="card__title">{{ link.label }}</div>
          <p class="card__subtitle">{{ link.description }}</p>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

type Stat = {
  value: string;
  label: string;
};

type Pillar = {
  title: string;
  description: string;
};

type Highlight = {
  title: string;
  description: string;
  cta?: string;
};

type SupportLink = {
  label: string;
  description: string;
  href: string;
};

const { t, tm } = useI18n();

const stats = computed<Stat[]>(() => (tm('home.stats') as Stat[]) ?? []);
const pillars = computed<Pillar[]>(() => (tm('home.pillars.items') as Pillar[]) ?? []);
const featuredProducts = computed<Highlight[]>(() => (tm('home.featuredProducts.items') as Highlight[]) ?? []);
const technologyFeatures = computed<Pillar[]>(() => (tm('home.technology.features') as Pillar[]) ?? []);
const caseHighlights = computed<Pillar[]>(() => (tm('home.caseHighlights.items') as Pillar[]) ?? []);
const newsHighlights = computed<Pillar[]>(() => (tm('home.news.items') as Pillar[]) ?? []);
const supportLinks = computed<SupportLink[]>(() => (tm('home.support.links') as SupportLink[]) ?? []);
</script>
