import styles from './AIInfrastructure.module.css';
import usePageMeta from '../../hooks/usePageMeta.js';
import { pageMeta } from '../../data/seo.js';

export default function AIInfrastructure() {
  usePageMeta(pageMeta('/solutions/ai-infrastructure'));
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>AI Infrastructure</h1>
    </div>
  );
}
