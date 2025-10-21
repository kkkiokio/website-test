import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/services', changefreq: 'monthly', priority: '0.85' },
  { path: '/cases', changefreq: 'monthly', priority: '0.75' },
  { path: '/news', changefreq: 'weekly', priority: '0.7' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' }
];

async function main() {
  const mode = process.env.MODE || (process.env.NODE_ENV === 'development' ? 'development' : 'production');
  let env = {};

  try {
    const vite = await import('vite');
    env = vite.loadEnv(mode, projectRoot, '');
  } catch {
    env = {};
  }
  const fallbackSiteUrl = 'https://example.com/';
  const siteUrlRaw = env.VITE_SITE_URL || process.env.VITE_SITE_URL || fallbackSiteUrl;
  const siteUrl = siteUrlRaw.endsWith('/') ? siteUrlRaw : `${siteUrlRaw}/`;

  const publicDir = path.join(projectRoot, 'public');
  await mkdir(publicDir, { recursive: true });

  const sitemapUrl = new URL('sitemap.xml', siteUrl).toString();
  const robotsContent = `User-agent: *\nAllow: /\nSitemap: ${sitemapUrl}\n`;

  const timestamp = new Date().toISOString();
  const sitemapEntries = ROUTES.map(({ path: routePath, changefreq, priority }) => {
    const url = new URL(routePath.replace(/^\//, ''), siteUrl).toString();
    return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${timestamp}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  }).join('\n');

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`;

  await Promise.all([
    writeFile(path.join(publicDir, 'robots.txt'), robotsContent, 'utf-8'),
    writeFile(path.join(publicDir, 'sitemap.xml'), sitemapContent, 'utf-8')
  ]);

  console.log(`Generated robots.txt and sitemap.xml using site URL: ${siteUrl}`);
}

main().catch((error) => {
  console.error('Failed to generate SEO assets:', error);
  process.exitCode = 1;
});
