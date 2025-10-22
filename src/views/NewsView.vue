<template>
  <section class="section section--light">
    <div class="container">
      <h1 class="section__title">{{ t('news.intro.title') }}</h1>
      <p class="section__subtitle">{{ t('news.intro.subtitle') }}</p>
      <div class="news-list">
        <article v-for="article in articles" :key="article.title" class="card card--article">
          <div v-if="article.cover" class="card__media card__media--wide">
            <img :src="article.cover" :alt="`${article.title} 主图`" loading="lazy" />
          </div>
          <div class="card__meta">{{ article.datetime }}</div>
          <h2 class="card__title">{{ article.title }}</h2>
          <p class="card__subtitle">{{ article.excerpt }}</p>
          <div class="card__body">
            <p v-for="(paragraph, index) in article.body" :key="`${article.title}-paragraph-${index}`">
              {{ paragraph }}
            </p>
          </div>
          <div v-if="article.gallery.length" class="card__gallery">
            <img
              v-for="(image, index) in article.gallery"
              :key="image"
              :src="image"
              :alt="`${article.title} 现场图片 ${index + 2}`"
              loading="lazy"
            />
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

type LocaleArticle = {
  title: string;
  datetime: string;
  excerpt: string;
  body: string[];
  images?: string[];
};

type Article = {
  title: string;
  datetime: string;
  excerpt: string;
  body: string[];
  cover?: string;
  gallery: string[];
};

const { t, tm } = useI18n();

const imageModules = import.meta.glob('../assets/news/*', {
  eager: true,
  import: 'default'
}) as Record<string, string>;

const resolveImage = (filename: string): string | undefined =>
  imageModules[`../assets/news/${filename}`];

const articles = computed<Article[]>(() => {
  const rawArticles = (tm('news.articles') as LocaleArticle[]) ?? [];

  return rawArticles.map(({ images = [], ...article }) => {
    const resolvedImages = images
      .map((image) => resolveImage(image))
      .filter((src): src is string => typeof src === 'string');

    const [cover, ...gallery] = resolvedImages;

    return {
      ...article,
      cover,
      gallery
    };
  });
});
</script>
