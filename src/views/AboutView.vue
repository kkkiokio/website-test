<template>
  <section class="section section--light">
    <div class="container" style="display: grid; gap: 3rem;">
      <div class="split-grid">
        <div>
          <h1 class="section__title">{{ t('about.intro.title') }}</h1>
          <p class="section__subtitle">{{ t('about.intro.subtitle') }}</p>
        </div>
        <div v-if="introMedia" class="split-grid__media">
          <img :src="introMedia.src" :alt="introMedia.alt" class="split-grid__image" loading="lazy" />
        </div>
      </div>

      <div>
        <h2 class="section__title" style="font-size: 1.75rem;">{{ t('about.values.title') }}</h2>
        <div class="grid grid--three">
          <div v-for="item in values" :key="item.title" class="card">
            <div class="card__title">{{ item.title }}</div>
            <p class="card__subtitle">{{ item.description }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <h2 style="margin-top: 0;">{{ t('about.timeline.title') }}</h2>
        <div class="timeline">
          <div v-for="item in timeline" :key="item.year" class="timeline__item">
            <strong>{{ item.year }}</strong>
            <p style="margin: 0.5rem 0 0; color: #475569;">{{ item.description }}</p>
          </div>
        </div>
      </div>

      <div class="grid grid--two">
        <div class="card">
          <h2 class="card__title" style="font-size: 1.5rem;">{{ t('about.team.title') }}</h2>
          <p class="card__subtitle">{{ t('about.team.description') }}</p>
        </div>
        <div class="card">
          <h2 class="card__title" style="font-size: 1.5rem;">{{ t('about.experience.title') }}</h2>
          <p class="card__subtitle">{{ t('about.experience.description') }}</p>
        </div>
      </div>

      <div class="card">
        <h2 class="card__title" style="font-size: 1.5rem;">{{ t('about.recognition.title') }}</h2>
        <ul style="margin: 0; padding-left: 1.25rem; color: #475569; display: grid; gap: 0.5rem;">
          <li v-for="item in recognition" :key="item">{{ item }}</li>
        </ul>
      </div>

      <div class="card">
        <h2 class="card__title" style="font-size: 1.5rem;">{{ t('about.careers.title') }}</h2>
        <p class="card__subtitle">{{ t('about.careers.description') }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

type TimelineItem = {
  year: string;
  description: string;
};

type ValueItem = {
  title: string;
  description: string;
};

type Media = {
  src: string;
  alt: string;
};

const { t, tm } = useI18n();

const introMedia = computed<Media | undefined>(() => {
  const media = tm('about.intro.media');
  return media && typeof media === 'object' ? (media as Media) : undefined;
});
const timeline = computed<TimelineItem[]>(() => (tm('about.timeline.items') as TimelineItem[]) ?? []);
const values = computed<ValueItem[]>(() => (tm('about.values.items') as ValueItem[]) ?? []);
const recognition = computed<string[]>(() => (tm('about.recognition.items') as string[]) ?? []);
</script>
