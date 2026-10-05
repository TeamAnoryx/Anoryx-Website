/**
 * /products — the Anoryx EcoSystem: product grid, how the products connect,
 * why one platform, deployment options, status and a design-partner CTA.
 * All product copy comes from src/data/products.js; layout reuses Products.module.css.
 */

import { useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../../components/Ecosystem/ProductCard.jsx';
import EcosystemDiagram from '../../components/Ecosystem/EcosystemDiagram.jsx';
import SignatureLoop from '../../components/Ecosystem/SignatureLoop.jsx';
import StatusPill from '../../components/Ecosystem/StatusPill.jsx';
import usePageMeta, { SITE_URL } from '../../hooks/usePageMeta.js';
import useSectionsInView from '../../hooks/useSectionsInView.js';
import { PRODUCTS, ONE_LINER, PLATFORM_NAME, contactHref, getProduct } from '../../data/products.js';
import styles from './Products.module.css';
import eco from '../../components/Ecosystem/Ecosystem.module.css';

/* Old in-page anchors from the previous products page → new detail routes. */
const LEGACY_HASHES = {
  'pii-sentinel': '/products/sentinel',
  rendly: '/products/rendly',
};

const WHY_ONE_PLATFORM = [
  {
    title: 'Your data never leaves.',
    desc: 'Self-hostable and zero-trust by default. Sensitive data is redacted before any request leaves your network.',
    iconClass: 'valueIconSecurity',
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  },
  {
    title: 'Fewer tools.',
    desc: 'Replaces separate DLP, AI cost tracking and meeting/chat tools with one connected stack.',
    iconClass: 'valueIconScale',
    icon: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 17.5h7M17.5 14v7" /></>,
  },
  {
    title: 'Closed-loop control.',
    desc: 'Security, cost and people signals act on each other automatically through the Orchestration Layer.',
    iconClass: 'valueIconAutomation',
    icon: <><path d="M21 12a9 9 0 1 1-3-6.7" /><polyline points="21 3 21 9 15 9" /></>,
  },
];

const DEPLOYMENT = ['Self-host in your VPC', 'Kubernetes / Helm', 'Docker Compose for pilots', 'OpenAI-compatible API'];

const sectionClass = (base, visible, extra = '') =>
  `${base} ${styles.sectionStripe} ${extra} ${visible ? styles.inView : ''}`;

export default function Products() {
  const location = useLocation();
  const navigate = useNavigate();
  const [inView, register] = useSectionsInView();
  const spokes = PRODUCTS.filter((p) => !p.isHub);
  const hub = getProduct('orchestration');

  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: PLATFORM_NAME,
      itemListElement: PRODUCTS.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p.name,
        url: `${SITE_URL}/products/${p.slug}`,
      })),
    }),
    []
  );

  usePageMeta({
    title: `${PLATFORM_NAME}: Products | Anoryx Tech Solutions`,
    description: ONE_LINER,
    path: '/products',
    jsonLd,
  });

  useEffect(() => {
    const hash = location.hash?.slice(1);
    if (!hash) return undefined;
    if (LEGACY_HASHES[hash]) {
      navigate(LEGACY_HASHES[hash], { replace: true });
      return undefined;
    }
    const el = document.getElementById(hash);
    if (!el) return undefined;
    const t = setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    return () => clearTimeout(t);
  }, [location.hash, navigate]);

  return (
    <div className={styles.page}>
      <div className={styles.pageStrip}>
        {/* Section 1 — Hero */}
        <section className={sectionClass(styles.hero, inView.hero)} ref={register('hero')} aria-labelledby="products-title">
          <div className={styles.heroBg} />
          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <h1 id="products-title" className={styles.heroTitle}>The {PLATFORM_NAME}</h1>
              <p className={styles.heroSub}>{ONE_LINER}</p>
              <div className={styles.heroCTAs}>
                <Link to={contactHref('ecosystem')} className={styles.btnPrimary}>Request early access</Link>
                <a href="#ecosystem" className={styles.btnPrimary}>See how it connects</a>
              </div>
            </div>
            <div className={styles.heroMock} aria-hidden="true">
              <div className={styles.heroMockCard}>
                <div className={styles.heroMockHeader}>
                  <span className={styles.heroMockDots}><i /><i /><i /></span>
                  <span>{PLATFORM_NAME}</span>
                </div>
                <div className={styles.intelDiagram}>
                  <div className={styles.intelLayer}>
                    {spokes.map((p) => (
                      <span key={p.slug} className={styles.intelNode}>{p.shortName}</span>
                    ))}
                  </div>
                  <svg className={styles.intelConnector} viewBox="0 0 40 12" preserveAspectRatio="none"><path d="M20 0v4c0 2 4 4 8 4h4M20 0v4c0 2-4 4-8 4H8" stroke="currentColor" strokeWidth="1.2" fill="none" strokeOpacity="0.4" /></svg>
                  <div className={styles.intelLayer}>
                    <span className={`${styles.intelNode} ${styles.intelNodePrimary}`}>{hub.shortName}</span>
                  </div>
                  <svg className={styles.intelConnector} viewBox="0 0 40 12" preserveAspectRatio="none"><path d="M20 0v4c0 2 4 4 8 4h4M20 0v4c0 2-4 4-8 4H8" stroke="currentColor" strokeWidth="1.2" fill="none" strokeOpacity="0.4" /></svg>
                  <div className={styles.intelLayer}>
                    <span className={styles.intelNode}>Events</span>
                    <span className={styles.intelNode}>Signed policies</span>
                    <span className={styles.intelNode}>Alerts</span>
                  </div>
                </div>
                <div className={styles.heroMockBar}><span style={{ width: '72%' }} /></div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 — Product grid */}
        <section className={sectionClass(styles.section, inView.overview)} ref={register('overview')} aria-labelledby="products-grid-title">
          <div className={styles.container}>
            <h2 id="products-grid-title" className={styles.sectionHeading}>Four products. One platform.</h2>
            <p className={styles.sectionLead}>
              Each product solves one problem well. The Orchestration Layer connects them, so a signal in one product
              triggers action in the others.
            </p>
            <div className={eco.grid2}>
              {PRODUCTS.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* Section 3 — How it connects */}
        <section
          id="ecosystem"
          className={sectionClass(styles.sectionAlt, inView.ecosystem, eco.anchorTarget)}
          ref={register('ecosystem')}
          aria-labelledby="ecosystem-title"
        >
          <div className={styles.container}>
            <h2 id="ecosystem-title" className={styles.sectionHeading}>How it connects</h2>
            <p className={styles.sectionLead}>
              The Orchestration Layer is the hub. Events flow in from every product; signed policies and alerts flow
              back out.
            </p>
            <div className={styles.archContainer}>
              <div className={styles.sharedArch}>
                <EcosystemDiagram />
              </div>
            </div>
            <h3 className={eco.loopHeading}>The closed loop, in five steps</h3>
            <SignatureLoop />
          </div>
        </section>

        {/* Section 4 — Why one platform */}
        <section className={sectionClass(styles.section, inView.why)} ref={register('why')} aria-labelledby="why-title">
          <div className={styles.container}>
            <h2 id="why-title" className={styles.sectionHeading}>Why one platform</h2>
            <p className={styles.sectionLead}>
              Anoryx isn&apos;t a set of separate tools. The connections between the products are the advantage.
            </p>
            <div className={`${styles.valueGrid} ${eco.valueThree}`}>
              {WHY_ONE_PLATFORM.map((item) => (
                <div key={item.title} className={styles.valueCard}>
                  <span className={`${styles.valueIcon} ${styles[item.iconClass]}`} aria-hidden="true">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{item.icon}</svg>
                  </span>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5 — Deployment */}
        <section className={sectionClass(styles.sectionAlt, inView.deploy)} ref={register('deploy')} aria-labelledby="deploy-title">
          <div className={styles.container}>
            <h2 id="deploy-title" className={styles.sectionHeading}>Deploy it your way</h2>
            <ul className={eco.deployStrip}>
              {DEPLOYMENT.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 6 — Status (honest roadmap) */}
        <section className={sectionClass(styles.section, inView.status)} ref={register('status')} aria-labelledby="status-title">
          <div className={styles.container}>
            <h2 id="status-title" className={styles.sectionHeading}>Where each product stands</h2>
            <div className={styles.timelineWrap}>
              {PRODUCTS.map((p) => (
                <div key={p.slug} className={styles.timelineItem}>
                  <span className={styles.timelineDot} />
                  <div className={styles.timelineContent}>
                    <strong>{p.name}</strong> <StatusPill status={p.status} /> — {p.tagline}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7 — CTA */}
        <section className={`${styles.ctaSection} ${inView.cta ? styles.inView : ''}`} ref={register('cta')} aria-labelledby="products-cta-title">
          <div className={styles.container}>
            <h2 id="products-cta-title" className={styles.ctaHeading}>Become a design partner.</h2>
            <p className={styles.ctaSub}>
              Work with us on Sentinel in early access and shape Delta, Rendly and the Orchestration Layer before they
              ship.
            </p>
            <div className={styles.ctaButtons}>
              <Link to={contactHref('ecosystem')} className={styles.ctaBtnPrimary}>Request early access</Link>
              <Link to="/solutions" className={styles.ctaBtnSecondary}>Browse solutions</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
