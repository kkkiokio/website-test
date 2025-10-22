<template>
  <section class="section section--light">
    <div class="container split-grid">
      <div>
        <h1 class="section__title">{{ t('services.intro.title') }}</h1>
        <p class="section__subtitle">{{ t('services.intro.subtitle') }}</p>
      </div>
      <div v-if="introMedia" class="split-grid__media">
        <img :src="introMedia.src" :alt="introMedia.alt" class="split-grid__image" loading="lazy" />
      </div>
    </div>
  </section>

  <section class="section section--muted">
    <div class="container" style="display: grid; gap: 3rem;">
      <div
        v-for="segment in segments"
        :key="segment.title"
        style="display: grid; gap: 1.5rem;"
      >
        <div>
          <h2 class="section__title" style="font-size: 1.75rem;">{{ segment.title }}</h2>
        </div>
        <div class="grid grid--three">
          <div v-for="item in segment.items" :key="item.title" class="card">
            <div class="card__title">{{ item.title }}</div>
            <p class="card__subtitle">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--light">
    <div class="container">
      <h2 class="section__title">{{ t('services.technology.title') }}</h2>
      <div class="grid grid--three">
        <div v-for="item in technology" :key="item.title" class="card">
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

type Segment = {
  title: string;
  items: Service[];
};

type Media = {
  src: string;
  alt: string;
};

const { t, tm } = useI18n();

const introMedia = computed<Media | undefined>(() => {
  const media = tm('services.intro.media');
  return media && typeof media === 'object' ? (media as Media) : undefined;
});
const segments = computed<Segment[]>(() => {
  const consumer = tm('services.segments.consumer') as Segment | undefined;
  const enterprise = tm('services.segments.enterprise') as Segment | undefined;
  const list: Segment[] = [];
  if (consumer) {
    list.push(consumer);
  }
  if (enterprise) {
    list.push(enterprise);
  }
  return list;
});

const technology = computed<Service[]>(() => (tm('services.technology.items') as Service[]) ?? []);
</script>
