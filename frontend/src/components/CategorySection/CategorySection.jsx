import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CategorySection.module.css';
import ProductIcon from '../Ecosystem/ProductIcon.jsx';
import StatusPill from '../Ecosystem/StatusPill.jsx';
import { PRODUCTS, PLATFORM_NAME, ONE_LINER } from '../../data/products.js';

/* Card colour themes per product accent (classes in CategorySection.module.css). */
const THEME = {
  blue: { nameClass: 'productNameBlue', iconClass: 'iconBlue', cardClass: 'cardBlue', accentClass: 'accentBarBlue', btnClass: 'btnBlue' },
  purple: { nameClass: 'productNamePurple', iconClass: 'iconPurple', cardClass: 'cardPurple', accentClass: 'accentBarPurple', btnClass: 'btnPurple' },
  orange: { nameClass: 'productNameOrange', iconClass: 'iconOrange', cardClass: 'cardOrange', accentClass: 'accentBarOrange', btnClass: 'btnOrange' },
  teal: { nameClass: 'productNameTeal', iconClass: 'iconTeal', cardClass: 'cardTeal', accentClass: 'accentBarTeal', btnClass: 'btnTeal' },
};

export default function CategorySection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [floatReady, setFloatReady] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
          setTimeout(() => setFloatReady(true), 1000);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.categorySection} ref={sectionRef}>
      <div className={styles.dotGrid} />
      <div className={styles.container}>
        <span className={`${styles.label} ${isVisible ? styles.visible : ''}`}>
          THE {PLATFORM_NAME.toUpperCase()}
        </span>

        <h2 className={`${styles.tagline} ${isVisible ? styles.visible : ''}`}>
          One platform to secure, govern and orchestrate enterprise AI
        </h2>

        <p className={`${styles.subcopy} ${isVisible ? styles.visible : ''}`}>{ONE_LINER}</p>

        <div className={styles.cardsGrid}>
          {PRODUCTS.map((p) => {
            const t = THEME[p.accent] || THEME.blue;
            return (
              <div
                key={p.slug}
                className={`${styles.card} ${styles[t.cardClass]} ${isVisible ? styles.visible : ''} ${floatReady ? styles.floatReady : ''}`}
              >
                {/* Gradient accent bar */}
                <div className={`${styles.accentBar} ${styles[t.accentClass]}`} />

                {/* Card body */}
                <div className={styles.cardBody}>
                  <div className={`${styles.iconWrapper} ${styles[t.iconClass]}`}>
                    <ProductIcon name={p.icon} />
                  </div>

                  <p className={`${styles.productName} ${styles[t.nameClass]}`}>
                    {p.name}
                  </p>

                  <h3 className={styles.cardSubtitle}>{p.category}</h3>

                  <StatusPill status={p.status} className={styles.statusPill} />

                  <p className={styles.cardDescription}>{p.tagline}</p>

                  <Link to={`/products/${p.slug}`} className={`${styles.cardButton} ${styles[t.btnClass]}`}>
                    {p.buttonLabel}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* One-line ecosystem summary */}
        <p className={`${styles.ecosystemLine} ${isVisible ? styles.visible : ''}`}>
          Sentinel, Delta and Rendly are connected by the Orchestration Layer: events flow in, signed policies and
          alerts flow out.{' '}
          <Link to="/products#ecosystem">See how it connects</Link>
          {' · '}
          <Link to="/solutions">Browse solutions by use case</Link>
        </p>
      </div>
    </section>
  );
}
