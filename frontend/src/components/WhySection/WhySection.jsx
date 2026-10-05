import { useRef, useEffect } from 'react';
import styles from './WhySection.module.css';
import MockUI from './MockUI';

const differentiators = [
  {
    num: '01',
    title: 'Full-Stack Intelligence',
    desc: 'AI + Privacy + Platforms, integrated by design. One unified technology stack powering three distinct product lines.',
    iconClass: 'iconBlue',
    cardClass: 'card1',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Privacy-First Architecture',
    desc: 'Security built in, not bolted on. Every layer of our systems is designed with data protection as a core primitive.',
    iconClass: 'iconGreen',
    cardClass: 'card2',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Truly Autonomous Systems',
    desc: 'Agents that decide and act, not just assist. Our AI systems operate independently, making real-time decisions at enterprise scale.',
    iconClass: 'iconPurple',
    cardClass: 'card3',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Multi-Product Innovation',
    desc: 'Four products, one platform. Anoryx Sentinel, Delta and Rendly are connected by the Anoryx Orchestration Layer.',
    iconClass: 'iconOrange',
    cardClass: 'card4',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

export default function WhySection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      // Disable blur effect on mobile/tablet — normal flow only
      if (window.innerWidth <= 1024) {
        section.style.filter = '';
        section.style.opacity = '';
        return;
      }

      // Find the PlatformArchitecture section (skip the scroll spacer)
      const spacer = section.nextElementSibling;
      const platformEl = spacer ? spacer.nextElementSibling : null;
      if (!platformEl) return;

      const platformRect = platformEl.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      const sectionHeight = sectionRect.height;

      // ribbonOverlap: how many px of the platform section have entered the viewport from below
      // Ribbons start about 60px above platformEl's top (ribbonContainer top: -60px)
      const ribbonTop = platformRect.top - 60;
      const viewportBottom = window.innerHeight;

      // overlap: 0 = ribbons haven't reached viewport yet, sectionHeight = fully covered
      const overlap = Math.max(0, viewportBottom - ribbonTop);

      // progress: 0 → 1, where 1 = ribbons cover 60% of the section height
      const triggerPoint = sectionHeight * 0.6;
      const progress = Math.max(0, Math.min(1, overlap / triggerPoint));

      if (progress > 0) {
        // Max blur 65% = ~7px blur, applied slowly
        const blur = progress * 7;
        section.style.filter = `blur(${blur}px)`;
        section.style.opacity = 1; // no opacity change, just blur
      } else {
        section.style.filter = 'blur(0px)';
        section.style.opacity = 1;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className={styles.whySection}>
      <div className={styles.container}>

        {/* ── ZONE 1: Bento Grid ──────────────────────────────── */}
        <div className={styles.bentoZone}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>WHY ANORYX</span>
            <h2 className={styles.sectionTitle}>Built Different. By Design.</h2>
            <p className={styles.sectionSubtitle}>
              We don't wrap APIs. We engineer intelligence from the ground up.
            </p>
          </div>

          <div className={styles.bentoGrid}>
            {/* Right rectangle: orange square dots */}
            <div className={styles.dotRect} data-dots="orange" aria-hidden="true" />
            {/* Bottom-left rectangle: blue square dots */}
            <div className={styles.dotRect} data-dots="blue" aria-hidden="true" />

            {differentiators.map((d) => (
              <div key={d.num} className={`${styles.bentoCard} ${styles[d.cardClass]}`}>
                <span className={styles.cardNumber}>{d.num}</span>
                <div className={`${styles.cardIcon} ${styles[d.iconClass]}`}>
                  {d.icon}
                </div>
                <h3 className={styles.cardTitle}>{d.title}</h3>
                <p className={styles.cardDesc}>{d.desc}</p>
                {d.cardClass === 'card2' && <MockUI />}
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}
