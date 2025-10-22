<template>
  <section class="section section--light">
    <div class="container hero-section">
      <div class="hero">
        <div class="hero__content">
          <span class="hero__eyebrow">{{ t('brand.name') }}</span>
          <h1 class="hero__title">{{ hero.title }}</h1>
          <p class="hero__subtitle">{{ hero.subtitle }}</p>
          <router-link class="button" to="/contact">{{ hero.cta }}</router-link>
        </div>
        <figure v-if="heroImage" class="hero__media">
          <img :src="heroImage" :alt="heroImageAlt" class="hero__image" loading="eager" />
        </figure>
      </div>
      <div class="grid grid--three hero__stats">
        <div v-for="item in stats" :key="item.label" class="card hero__stat-card">
          <div class="hero__stat-value">{{ item.value }}</div>
          <div class="hero__stat-label">{{ item.label }}</div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--muted">
    <div class="container split">
      <div class="split__content">
        <h2 class="section__title">{{ pillarsSection.title }}</h2>
        <p class="section__subtitle">{{ pillarsSection.subtitle }}</p>
        <div class="grid grid--three">
          <div v-for="item in pillarsSection.items" :key="item.title" class="card">
            <div class="card__title">{{ item.title }}</div>
            <p class="card__subtitle">{{ item.description }}</p>
          </div>
        </div>
      </div>
      <figure v-if="pillarsImage" class="split__media">
        <img :src="pillarsImage" :alt="pillarsImageAlt" loading="lazy" />
      </figure>
    </div>
  </section>

  <section class="section section--light">
    <div class="container">
      <h2 class="section__title">{{ featuredProductsSection.title }}</h2>
      <p class="section__subtitle">{{ featuredProductsSection.subtitle }}</p>
      <div class="grid grid--three">
        <article v-for="product in featuredProducts" :key="product.title" class="card card--product">
          <figure v-if="product.imageSrc" class="card__media">
            <img :src="product.imageSrc" :alt="product.imageAlt" loading="lazy" />
          </figure>
          <div class="card__title">{{ product.title }}</div>
          <p class="card__subtitle">{{ product.description }}</p>
          <router-link class="button" to="/services">{{ product.cta }}</router-link>
        </article>
      </div>
    </div>
  </section>

  <section class="section section--muted">
    <div class="container split split--reverse">
      <div class="split__content">
        <h2 class="section__title">{{ technologySection.title }}</h2>
        <p class="section__subtitle">{{ technologySection.subtitle }}</p>
        <div class="grid grid--three">
          <div v-for="feature in technologySection.features" :key="feature.title" class="card">
            <div class="card__title">{{ feature.title }}</div>
            <p class="card__subtitle">{{ feature.description }}</p>
          </div>
        </div>
        <router-link class="button" style="margin-top: 2rem;" to="/services">{{ technologySection.cta }}</router-link>
      </div>
      <figure v-if="technologyImage" class="split__media">
        <img :src="technologyImage" :alt="technologyImageAlt" loading="lazy" />
      </figure>
    </div>
  </section>

  <section class="section section--light">
    <div class="container split">
      <div class="split__content">
        <h2 class="section__title">{{ caseHighlightsSection.title }}</h2>
        <p class="section__subtitle">{{ caseHighlightsSection.subtitle }}</p>
        <div class="grid grid--two">
          <div v-for="item in caseHighlightsSection.items" :key="item.title" class="card">
            <div class="card__title">{{ item.title }}</div>
            <p class="card__subtitle">{{ item.description }}</p>
          </div>
        </div>
      </div>
      <figure v-if="caseHighlightsImage" class="split__media">
        <img :src="caseHighlightsImage" :alt="caseHighlightsImageAlt" loading="lazy" />
      </figure>
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
  image?: string;
  imageAlt?: string;
};

type SupportLink = {
  label: string;
  description: string;
  href: string;
};

import heroPrimaryImage from '@/assets/banner/ABUIABACGAAg2aCdlwYo-efnYTCADzisCQ.jpg.webp';
import pillarsIllustrationImage from '@/assets/banner/ABUIABAEGAAgh4j-kgYolYrd6QYwgA84hAc.png.webp';
import caseShowcaseImage from '@/assets/banner/ABUIABACGAAgr9j0rAYogJrV0QMwgA84uAg.jpg.webp';
import technologyShowcaseImage from '@/assets/ABUIABACGAAgjOTfgwYo4K6sugQw7go4mAc!700x700.jpg.webp';
import w4ProProductImage from '@/assets/w4 pro/ABUIABAEGAAg4KfXngYoyqGgpwcwqwI4qwI.png.webp';
import t1ProductImage from '@/assets/ABUIABACGAAgwt-fgwYolrGT8AMw6wg48gU!600x600.jpg.webp';
import x1ProductImage from '@/assets/ABUIABAEGAAgn4STqgYoy9PUsgYwpho4wxE!700x700.png.webp';
import zeroTranslatorImage from '@/assets/zero/ABUIABAEGAAg-6jXngYosIqsWzDmAjiJAg.png.webp';

const { t, tm } = useI18n();

type HeroContent = {
  title: string;
  subtitle: string;
  cta: string;
  image?: string;
  imageAlt?: string;
};

type PillarSection = {
  title: string;
  subtitle: string;
  items: Pillar[];
  image?: string;
  imageAlt?: string;
};

type FeaturedProductsSection = {
  title: string;
  subtitle: string;
  items: Highlight[];
};

type TechnologySection = {
  title: string;
  subtitle: string;
  features: Pillar[];
  cta: string;
  image?: string;
  imageAlt?: string;
};

type CaseHighlightsSection = {
  title: string;
  subtitle: string;
  items: Pillar[];
  image?: string;
  imageAlt?: string;
};

type HighlightWithMedia = Highlight & {
  imageSrc?: string;
  imageAlt?: string;
};

const imageMap: Record<string, string> = {
  'hero-banner': heroPrimaryImage,
  'collaboration-banner': pillarsIllustrationImage,
  'technology-lab': technologyShowcaseImage,
  'case-meeting': caseShowcaseImage,
  'w4-pro': w4ProProductImage,
  t1: t1ProductImage,
  x1: x1ProductImage,
  'zero-translator': zeroTranslatorImage
};

const hero = computed<HeroContent>(() => (tm('home.hero') as HeroContent) ?? { title: '', subtitle: '', cta: '' });
const stats = computed<Stat[]>(() => (tm('home.stats') as Stat[]) ?? []);
const pillarsSection = computed<PillarSection>(() => (tm('home.pillars') as PillarSection) ?? { title: '', subtitle: '', items: [] });
const featuredProductsSection = computed<FeaturedProductsSection>(() =>
  (tm('home.featuredProducts') as FeaturedProductsSection) ?? { title: '', subtitle: '', items: [] }
);
const technologySection = computed<TechnologySection>(() =>
  (tm('home.technology') as TechnologySection) ?? { title: '', subtitle: '', features: [], cta: '' }
);
const caseHighlightsSection = computed<CaseHighlightsSection>(() =>
  (tm('home.caseHighlights') as CaseHighlightsSection) ?? { title: '', subtitle: '', items: [] }
);
const newsHighlights = computed<Pillar[]>(() => (tm('home.news.items') as Pillar[]) ?? []);
const supportLinks = computed<SupportLink[]>(() => (tm('home.support.links') as SupportLink[]) ?? []);

const heroImage = computed(() => (hero.value.image && imageMap[hero.value.image]) || imageMap['hero-banner']);
const heroImageAlt = computed(() => hero.value.imageAlt ?? hero.value.title);

const pillarsImage = computed(() => pillarsSection.value.image && imageMap[pillarsSection.value.image]);
const pillarsImageAlt = computed(() => pillarsSection.value.imageAlt ?? pillarsSection.value.title);

const technologyImage = computed(() => technologySection.value.image && imageMap[technologySection.value.image]);
const technologyImageAlt = computed(() => technologySection.value.imageAlt ?? technologySection.value.title);

const caseHighlightsImage = computed(
  () => caseHighlightsSection.value.image && imageMap[caseHighlightsSection.value.image]
);
const caseHighlightsImageAlt = computed(() => caseHighlightsSection.value.imageAlt ?? caseHighlightsSection.value.title);

const featuredProducts = computed<HighlightWithMedia[]>(() =>
  featuredProductsSection.value.items.map((product) => ({
    ...product,
    imageSrc: product.image ? imageMap[product.image] : undefined,
    imageAlt: product.imageAlt ?? product.title
  }))
);
</script>
