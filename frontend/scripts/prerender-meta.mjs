/**
 * Post-build: writes dist/<route>/index.html for every route in src/data/seo.js with that
 * route's <title>, description, canonical, Open Graph and Twitter tags. The app is still a
 * client-rendered SPA; this only gives crawlers and link previews the correct <head>.
 */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SEO_ROUTES, SITE_URL, OG_IMAGE } from '../src/data/seo.js';

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
  return html.replace('</head>', `    <link rel="canonical" href="${url}" />\n  </head>`);
}

let count = 0;
for (const [path, meta] of Object.entries(SEO_ROUTES)) {
  const file = path === '/' ? join(dist, 'index.html') : join(dist, path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, render(path, meta));
  count += 1;
}
console.log(`prerender-meta: wrote <head> for ${count} routes`);
