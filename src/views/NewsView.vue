<template>
  <section class="section section--light">
    <div class="container">
      <h1 class="section__title">{{ t('news.intro.title') }}</h1>
      <p class="section__subtitle">{{ t('news.intro.subtitle') }}</p>
      <div class="grid grid--three">
        <div v-for="article in articles" :key="article.title" class="card">
          <div class="card__title">{{ article.title }}</div>
          <p class="card__subtitle">{{ article.description }}</p>
          <a href="#" style="color: #2563eb; font-weight: 600;">{{ t('news.readMore') }}</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

type Article = {
  title: string;
  description: string;
};

const { t, tm } = useI18n();

const articles = computed<Article[]>(() => (tm('news.articles') as Article[]) ?? []);
</script>
