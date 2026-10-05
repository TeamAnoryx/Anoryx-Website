import { STATUS } from '../../data/products.js';
import styles from './Ecosystem.module.css';

/** Honest product status — value comes from products.js so it changes in one place. */
export default function StatusPill({ status, className = '' }) {
  const variant = status === STATUS.EARLY_ACCESS ? styles.pillEarly : styles.pillDev;
  return <span className={`${styles.pill} ${variant} ${className}`}>{status}</span>;
}
