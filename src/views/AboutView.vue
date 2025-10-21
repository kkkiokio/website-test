<template>
  <section class="section section--light">
    <div class="container" style="display: grid; gap: 3rem;">
      <div>
        <h1 class="section__title">{{ t('about.intro.title') }}</h1>
        <p class="section__subtitle">{{ t('about.intro.subtitle') }}</p>
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

const { t, tm } = useI18n();

const timeline = computed<TimelineItem[]>(() => (tm('about.timeline.items') as TimelineItem[]) ?? []);
</script>
