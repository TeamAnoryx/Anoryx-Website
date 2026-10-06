import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './PlatformIntelligenceIndex.module.css';
import { INDEX_ITEMS } from '../../data/platformIndex.js';


export default function PlatformIntelligenceIndex() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      className={styles.section}
      aria-labelledby="platform-intelligence-heading"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.label}>Platform Intelligence Index</span>
          <h2 id="platform-intelligence-heading" className={styles.title}>
            Understanding the Anoryx Intelligence Platform
          </h2>
          <p className={styles.subtitle}>
            Explore how autonomous intelligence operates, executes, and
            integrates across enterprise environments.
          </p>
        </header>

        <div className={styles.list} role="list">
          {INDEX_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <article
                key={item.id}
                className={styles.module}
                data-open={isOpen}
                role="listitem"
              >
                <button
                  type="button"
                  className={styles.trigger}
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`answer-${item.id}`}
                  id={`trigger-${item.id}`}
                >
                  <span className={styles.questionText}>{item.question}</span>
                  <span className={styles.icon} aria-hidden="true">
                    <span className={styles.plus} />
                    <span className={styles.minus} />
                  </span>
                </button>
                <div
                  id={`answer-${item.id}`}
                  className={styles.answerWrapper}
                  role="region"
                  aria-labelledby={`trigger-${item.id}`}
                >
                  <div className={styles.answerInner} inert={isOpen ? undefined : ''}>
                    <div className={styles.answerBody}>
                    <p className={styles.answerPrimary}>{item.primary}</p>
                    {item.secondary && (
                      <p className={styles.answerSecondary}>{item.secondary}</p>
                    )}
                    {item.knowMoreLink && (
                      <Link
                        to={item.knowMoreLink}
                        className={styles.knowMore}
                      >
                        Know More
                      </Link>
                    )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
