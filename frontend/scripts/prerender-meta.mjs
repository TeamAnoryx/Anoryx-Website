/**
 * Post-build: writes dist/<route>/index.html for every route in src/data/seo.js with that
 * route's <title>, description, canonical, Open Graph and Twitter tags. The app is still a
 * client-rendered SPA; this only gives crawlers and link previews the correct <head>.
 */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SEO_ROUTES, SITE_URL, OG_IMAGE } from '../src/data/seo.js';
import { PRODUCTS } from '../src/data/products.js';
import { INDEX_ITEMS } from '../src/data/platformIndex.js';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const template = readFileSync(join(dist, 'index.html'), 'utf8');

const escapeAttr = (v) =>
  String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function setMeta(html, attr, key, value) {
  const re = new RegExp(`<meta\s+${attr}="${key}"\s+content="[^"]*"\s*/?>`);
  const tag = `<meta ${attr}="${key}" content="${escapeAttr(value)}" />`;
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
}

function render(path, { title, description }) {
  const url = `${SITE_URL}${path === '/' ? '/' : path}`;
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(title)}</title>`);
  html = setMeta(html, 'name', 'description', description);
  html = setMeta(html, 'property', 'og:title', title);
  html = setMeta(html, 'property', 'og:description', description);
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'property', 'og:image', OG_IMAGE);
  html = setMeta(html, 'name', 'twitter:title', title);
  html = setMeta(html, 'name', 'twitter:description', description);
  html = setMeta(html, 'name', 'twitter:image', OG_IMAGE);
  html = html.replace(/<meta name="twitter:card" content="[^"]*" \/>/, '<meta name="twitter:card" content="summary_large_image" />');
  html = html.replace(/\s*<link rel="canonical"[^>]*>/, '');
  const ld = structuredData(path).map(ldScript).join('');
  return html.replace('</head>', `    <link rel="canonical" href="${url}" />\n${ld}  </head>`);
}

/** Breadcrumb label: product name, else the page title before "|" or ":". */
function crumbName(path) {
  const product = PRODUCTS.find((p) => `/products/${p.slug}` === path);
  if (product) return product.name;
  if (path === '/products') return 'Products';
  return SEO_ROUTES[path].title.split(' | ')[0].split(':')[0].trim();
}

function structuredData(path) {
  if (path === '/') {
    return [
      { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Anoryx Tech Solutions', url: `${SITE_URL}/` },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: INDEX_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: [item.primary, item.secondary].filter(Boolean).join(' ') },
        })),
      },
    ];
  }
  const parts = path.split('/').filter(Boolean);
  const items = [{ name: 'Home', url: `${SITE_URL}/` }];
  parts.forEach((_, i) => {
    const sub = `/${parts.slice(0, i + 1).join('/')}`;
    // Section folders without their own page (e.g. /company) are skipped.
    if (SEO_ROUTES[sub]) items.push({ name: crumbName(sub), url: `${SITE_URL}${sub}` });
  });
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
    },
  ];
}

const ldScript = (data) =>
  `    <script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>\n`;

let count = 0;
for (const [path, meta] of Object.entries(SEO_ROUTES)) {
  const file = path === '/' ? join(dist, 'index.html') : join(dist, path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, render(path, meta));
  count += 1;
}
console.log(`prerender-meta: wrote <head> for ${count} routes`);
