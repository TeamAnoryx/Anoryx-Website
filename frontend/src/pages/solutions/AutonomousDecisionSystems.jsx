import styles from './AutonomousDecisionSystems.module.css';
import usePageMeta from '../../hooks/usePageMeta.js';
import { pageMeta } from '../../data/seo.js';

export default function AutonomousDecisionSystems() {
  usePageMeta(pageMeta('/solutions/autonomous-decision-systems'));
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Autonomous Decision Systems</h1>
    </div>
  );
}
