<template>
  <section class="section section--light">
    <div class="container">
      <h1 class="section__title">{{ t('cases.intro.title') }}</h1>
      <p class="section__subtitle">{{ t('cases.intro.subtitle') }}</p>
      <div class="grid grid--three">
        <div v-for="item in cases" :key="item.title" class="card">
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

type CaseStudy = {
  title: string;
  description: string;
};

const { t, tm } = useI18n();

const cases = computed<CaseStudy[]>(() => (tm('cases.items') as CaseStudy[]) ?? []);
</script>
