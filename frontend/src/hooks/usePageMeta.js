/**
 * usePageMeta — sets <title>, meta description, OG/Twitter tags and optional JSON-LD
 * for a route in this client-rendered SPA. Restores the previous values on unmount.
 */

import { useEffect } from 'react';

import { SITE_URL, OG_IMAGE } from '../data/seo.js';

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  const previous = el ? el.getAttribute('content') : null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
  return () => {
    if (previous === null) el.remove();
    else el.setAttribute('content', previous);
  };
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  const previous = el ? el.getAttribute('href') : null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
  return () => {
    if (previous === null) el.remove();
    else el.setAttribute('href', previous);
  };
}

export default function usePageMeta({ title, description, path, jsonLd }) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;
    const url = `${SITE_URL}${path || ''}`;
    const restores = [
      upsertMeta('name', 'description', description),
      upsertMeta('property', 'og:title', title),
      upsertMeta('property', 'og:description', description),
      upsertMeta('property', 'og:url', url),
      upsertMeta('name', 'twitter:title', title),
      upsertMeta('name', 'twitter:description', description),
      upsertMeta('property', 'og:image', OG_IMAGE),
      upsertMeta('name', 'twitter:image', OG_IMAGE),
      upsertCanonical(url),
    ];

    let script = null;
    if (jsonLd) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.pageMeta = 'true';
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      document.title = previousTitle;
      restores.forEach((restore) => restore());
      if (script) script.remove();
    };
  }, [title, description, path, jsonLd]);
}

export { SITE_URL };
