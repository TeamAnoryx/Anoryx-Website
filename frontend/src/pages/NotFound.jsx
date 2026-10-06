/** 404 page. Marked noindex so search engines don't index unknown URLs (the SPA returns 200). */

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta.js';
import styles from './NotFound.module.css';

export default function NotFound() {
  usePageMeta({
    title: 'Page not found | Anoryx Tech Solutions',
    description: 'The page you are looking for does not exist or has moved.',
    path: typeof window !== 'undefined' ? window.location.pathname : '',
  });

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  return (
    <main className={styles.page}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>This page doesn&apos;t exist</h1>
      <p className={styles.text}>It may have moved, or the link may be mistyped.</p>
      <div className={styles.links}>
        <Link to="/" className={styles.primary}>Go to the homepage</Link>
        <Link to="/products" className={styles.secondary}>Explore products</Link>
        <Link to="/contact" className={styles.secondary}>Contact us</Link>
      </div>
    </main>
  );
}
