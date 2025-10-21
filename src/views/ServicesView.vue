<template>
  <section class="section section--light">
    <div class="container">
      <h1 class="section__title">{{ t('services.intro.title') }}</h1>
      <p class="section__subtitle">{{ t('services.intro.subtitle') }}</p>
      <div class="grid grid--two">
        <div v-for="item in services" :key="item.title" class="card">
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

type Service = {
  title: string;
  description: string;
};

const { t, tm } = useI18n();

const services = computed<Service[]>(() => (tm('services.items') as Service[]) ?? []);
</script>
