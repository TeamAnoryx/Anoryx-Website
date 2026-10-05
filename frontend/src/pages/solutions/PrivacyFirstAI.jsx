import styles from './PrivacyFirstAI.module.css';
import usePageMeta from '../../hooks/usePageMeta.js';
import { pageMeta } from '../../data/seo.js';

export default function PrivacyFirstAI() {
  usePageMeta(pageMeta('/solutions/privacy-first-ai'));
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Privacy-First AI Systems</h1>
    </div>
  );
}
