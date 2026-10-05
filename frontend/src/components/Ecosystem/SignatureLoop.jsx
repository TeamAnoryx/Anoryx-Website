import { Link } from 'react-router-dom';
import { SIGNATURE_LOOP, getProduct } from '../../data/products.js';
import styles from './Ecosystem.module.css';

/** The 5-step closed loop: horizontal stepper on desktop, vertical on mobile. */
export default function SignatureLoop() {
  return (
    <ol className={styles.loop} aria-label="Example: how the products act together when an agent overspends">
      {SIGNATURE_LOOP.map((step, i) => {
        const p = step.product ? getProduct(step.product) : null;
        return (
          <li key={step.text} className={`${styles.loopStep} ${p ? styles[`accent_${p.accent}`] || '' : ''}`}>
            <span className={styles.loopNum} aria-hidden="true">{i + 1}</span>
            {p ? (
              <Link to={`/products/${p.slug}`} className={styles.loopProduct}>
                {p.shortName}
              </Link>
            ) : (
              <span className={styles.loopProduct}>Trigger</span>
            )}
            <p className={styles.loopText}>{step.text}</p>
          </li>
        );
      })}
    </ol>
  );
}
