import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { getSupportedLocales } from '@/plugins/i18n';

const OG_LOCALE_MAP: Record<string, string> = {
  en: 'en_US',
  zh: 'zh_CN'
};

function resolveSiteUrl() {
  if (typeof window !== 'undefined') {
    return (import.meta.env.VITE_SITE_URL as string | undefined) || window.location.origin;
  }

  return (import.meta.env.VITE_SITE_URL as string | undefined) || '';
}

function resolveUrl(value: string, baseUrl: string) {
  try {
    return new URL(value, baseUrl).toString();
  } catch (error) {
    return value;
  }
}

function buildLocalizedUrl(baseUrl: string, fullPath: string, locale: string, includeLocale = true) {
  const url = new URL(fullPath || '/', baseUrl);
  url.searchParams.delete('lang');
  if (includeLocale && locale) {
    url.searchParams.set('lang', locale);
  }

  return url.toString();
}

function setMetaTag(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  if (typeof document === 'undefined') {
    return;
  }

  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
  if (!content) {
    if (element?.dataset.managed === 'seo') {
      element.remove();
    }
    return;
  }

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    element.dataset.managed = 'seo';
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function setLinkTag(rel: string, href: string) {
  if (typeof document === 'undefined') {
    return;
  }

  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!href) {
    if (element?.dataset.managed === 'seo') {
      element.remove();
    }
    return;
  }

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    element.dataset.managed = 'seo';
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

function updateAlternateLinks(baseUrl: string, fullPath: string, activeLocale: string) {
  if (typeof document === 'undefined') {
    return;
  }

  const supportedLocales = getSupportedLocales();
  const managedLinks = document.head.querySelectorAll('link[rel="alternate"][data-managed="seo"]');
  managedLinks.forEach((node) => node.remove());

  const head = document.head;

  supportedLocales.forEach((locale) => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', locale);
    link.setAttribute('href', buildLocalizedUrl(baseUrl, fullPath, locale));
    link.dataset.managed = 'seo';
    head.appendChild(link);
  });

  const defaultLink = document.createElement('link');
  defaultLink.setAttribute('rel', 'alternate');
  defaultLink.setAttribute('hreflang', 'x-default');
  defaultLink.setAttribute('href', buildLocalizedUrl(baseUrl, fullPath, activeLocale, false));
  defaultLink.dataset.managed = 'seo';
  head.appendChild(defaultLink);
}

export function useSeo() {
  const route = useRoute();
  const { t, locale } = useI18n();

  const translate = (key: string, fallback = '') => {
    const result = t(key);
    return result !== key ? result : fallback;
  };

  const updateSeo = () => {
    if (typeof document === 'undefined') {
      return;
    }

    const baseUrl = resolveSiteUrl();
    const routeKey =
      (route.meta?.seoKey as string | undefined) || (typeof route.name === 'string' ? route.name : 'default');

    const defaultTitle = translate('seo.default.title', translate('brand.name'));
    const defaultDescription = translate('seo.default.description', translate('brand.tagline'));
    const defaultKeywords = translate('seo.default.keywords');
    const siteName = translate('seo.siteName', translate('brand.name'));

    const title = translate(`seo.${routeKey}.title`, defaultTitle);
    const description = translate(`seo.${routeKey}.description`, defaultDescription);
    const keywords = translate(`seo.${routeKey}.keywords`, defaultKeywords);

    const socialImageFallback =
      translate(`seo.${routeKey}.image`, '') ||
      translate('seo.default.image', (import.meta.env.VITE_SOCIAL_IMAGE as string | undefined) || '');

    if (title) {
      document.title = title;
    }

    setMetaTag('description', description);
    setMetaTag('keywords', keywords);
    setMetaTag('og:title', title, 'property');
    setMetaTag('og:description', description, 'property');
    setMetaTag('og:type', 'website', 'property');
    setMetaTag('og:site_name', siteName, 'property');

    const canonicalUrl = buildLocalizedUrl(baseUrl, route.fullPath, locale.value);
    setLinkTag('canonical', canonicalUrl);
    setMetaTag('og:url', canonicalUrl, 'property');

    const ogLocale = OG_LOCALE_MAP[locale.value] || locale.value.replace('-', '_');
    setMetaTag('og:locale', ogLocale, 'property');

    if (socialImageFallback) {
      const socialImage = resolveUrl(socialImageFallback, baseUrl);
      setMetaTag('og:image', socialImage, 'property');
      setMetaTag('twitter:image', socialImage);
    }

    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);

    document.documentElement.setAttribute('lang', locale.value);
    updateAlternateLinks(baseUrl, route.fullPath, locale.value);
  };

  watch(
    () => [route.fullPath, locale.value],
    () => updateSeo(),
    { immediate: true }
  );

  return {
    updateSeo
  };
}
