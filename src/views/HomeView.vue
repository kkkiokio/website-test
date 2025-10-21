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

const { t, tm } = useI18n();

const stats = computed<Stat[]>(() => (tm('home.stats') as Stat[]) ?? []);
const pillars = computed<Pillar[]>(() => (tm('home.pillars.items') as Pillar[]) ?? []);
</script>
