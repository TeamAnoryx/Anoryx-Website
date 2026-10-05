/**
 * /products/:slug — shared product detail template driven by src/data/products.js.
 * Layout reuses Products.module.css so detail pages match the products page.
 */

import { useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import StatusPill from '../../components/Ecosystem/StatusPill.jsx';
import ProductIcon from '../../components/Ecosystem/ProductIcon.jsx';
import usePageMeta, { SITE_URL } from '../../hooks/usePageMeta.js';
import useSectionsInView from '../../hooks/useSectionsInView.js';
import { PRODUCTS, STATUS, PLATFORM_NAME, getProduct, contactHref } from '../../data/products.js';
import styles from './Products.module.css';
import eco from '../../components/Ecosystem/Ecosystem.module.css';
import pii1 from '../../assets/pii1.jpg';
import pii2 from '../../assets/pii2.jpg';
import pii4 from '../../assets/pii4.jpg';
import rendly2 from '../../assets/rendly2.jpg';
import rendly3 from '../../assets/rendly3.jpg';

/* Product interface screenshots (presentation assets, keyed by slug). */
const GALLERY = {
  sentinel: [
    { src: pii1, alt: 'Anoryx Sentinel dashboard view', caption: 'Dashboard view' },
    { src: pii2, alt: 'Anoryx Sentinel detection interface', caption: 'Detection interface' },
    { src: pii4, alt: 'Anoryx Sentinel detailed analysis report', caption: 'Analysis report' },
  ],
  rendly: [
    { src: rendly2, alt: 'Anoryx Rendly sign-in screen (early build)', caption: 'Sign-in (early build)' },
    { src: rendly3, alt: 'Anoryx Rendly dashboard (early build)', caption: 'Dashboard (early build)' },
  ],
};

const VALUE_ICON_CLASSES = ['valueIconSecurity', 'valueIconAutomation', 'valueIconScale', 'valueIconBrain'];

const Check = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProduct(slug);
  const [inView, register] = useSectionsInView();

  const jsonLd = useMemo(
    () =>
      product && {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: product.name,
        applicationCategory: 'BusinessApplication',
        description: product.summary,
        url: `${SITE_URL}/products/${product.slug}`,
        isPartOf: { '@type': 'Product', name: PLATFORM_NAME },
        publisher: { '@type': 'Organization', name: 'Anoryx Tech Solutions Pvt. Ltd.', url: SITE_URL },
      },
    [product]
  );

  usePageMeta({
    title: product ? `${product.name}: ${product.category} | Anoryx` : 'Products | Anoryx',
    description: product ? `${product.tagline} ${product.summary.split('. ')[0]}.` : '',
    path: `/products/${slug}`,
    jsonLd,
  });

  if (!product) return <Navigate to="/products" replace />;

  const accent = eco[`accent_${product.accent}`] || '';
  const others = PRODUCTS.filter((p) => p.slug !== product.slug);
  const isEarlyAccess = product.status === STATUS.EARLY_ACCESS;
  const gallery = GALLERY[product.slug] || [];
  const sectionClass = (base, key, extra = '') =>
    `${base} ${styles.sectionStripe} ${extra} ${inView[key] ? styles.inView : ''}`;

  return (
    <div className={`${styles.page} ${accent}`}>
      <div className={styles.pageStrip}>
        {/* Hero */}
        <section className={sectionClass(styles.hero, 'hero')} ref={register('hero')} aria-labelledby="product-title">
          <div className={styles.heroBg} />
          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <div className={eco.cardTop} style={{ justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                <Link to="/products" className={styles.overviewCardLink}>← {PLATFORM_NAME}</Link>
                <StatusPill status={product.status} />
              </div>
              <h1 id="product-title" className={styles.heroTitle}>{product.name}</h1>
              <p className={styles.productTagline} style={{ marginBottom: 'var(--space-3)', color: 'var(--accent-text)' }}>
                {product.category}
              </p>
              <p className={styles.heroSub}>
                <strong>{product.tagline}</strong> {product.summary}
              </p>
              <div className={styles.heroCTAs}>
                <Link to={contactHref(product.slug)} className={styles.btnPrimary}>{product.ctaLabel}</Link>
              </div>
            </div>
            <div className={styles.heroMock} aria-hidden="true">
              <div className={styles.heroMockCard}>
                <div className={styles.heroMockHeader}>
                  <span className={styles.heroMockDots}><i /><i /><i /></span>
                  <span>{product.shortName}</span>
                </div>
                <div className={styles.intelDiagram}>
                  {product.howItWorks.map((step, i) => (
                    <div key={step} style={{ display: 'contents' }}>
                      {i > 0 && (
                        <svg className={styles.intelConnector} viewBox="0 0 40 12" preserveAspectRatio="none"><path d="M20 0v12" stroke="currentColor" strokeWidth="1.2" fill="none" strokeOpacity="0.4" /></svg>
                      )}
                      <div className={styles.intelLayer}>
                        <span className={`${styles.intelNode} ${i === 0 || i === product.howItWorks.length - 1 ? '' : styles.intelNodePrimary}`}>
                          {step}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.heroMockBar}><span style={{ width: isEarlyAccess ? '72%' : '35%' }} /></div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem + how it works */}
        <section className={sectionClass(styles.sectionAlt, 'problem', styles.productSection)} ref={register('problem')}>
          <div className={styles.container}>
            <div className={styles.subsection}>
              <h2 className={styles.subsectionTitle}>The problem</h2>
              <ul className={eco.problemList}>
                {product.problem.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
            <div className={styles.subsection} style={{ marginBottom: 0 }}>
              <h2 className={styles.subsectionTitle}>How it works</h2>
              <div className={styles.sharedArch} style={{ marginBottom: 'var(--space-4)' }}>
                <ol className={styles.archPipeline} style={{ maxWidth: 'none', listStyle: 'none', margin: 0 }} aria-label={`${product.shortName} flow`}>
                  {product.howItWorks.map((step, i) => (
                    <li key={step} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      {i > 0 && (
                        <svg className={styles.archPipelineArrow} viewBox="0 0 24 12" aria-hidden="true"><path d="M0 6h18m-3-3l3 3-3 3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      )}
                      <span className={styles.archPipelineNode}>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <p>{product.howItWorksText}</p>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section
          id="capabilities"
          className={sectionClass(styles.section, 'caps', eco.anchorTarget)}
          ref={register('caps')}
          aria-labelledby="caps-title"
        >
          <div className={styles.container}>
            <h2 id="caps-title" className={styles.sectionHeading}>{isEarlyAccess ? 'Available now' : "What's coming"}</h2>
            {!isEarlyAccess && (
              <p className={styles.sectionLead}>
                {product.shortName} is in development. These are the planned capabilities; we&apos;re building them with
                design partners now.
              </p>
            )}
            <div className={styles.valueGrid}>
              {product.available.map((cap, i) => (
                <div key={cap.title} className={styles.valueCard}>
                  <span className={`${styles.valueIcon} ${styles[VALUE_ICON_CLASSES[i % VALUE_ICON_CLASSES.length]]}`} aria-hidden="true">
                    <Check />
                  </span>
                  <h4>{cap.title}</h4>
                  <p>{cap.desc}</p>
                </div>
              ))}
            </div>
            {product.communityNote && (
              <p className={styles.sectionLead} style={{ marginTop: 'var(--space-5)', marginBottom: 0 }}>{product.communityNote}</p>
            )}
          </div>
        </section>

        {/* Roadmap */}
        {product.roadmap.length > 0 && (
          <section className={sectionClass(styles.sectionAlt, 'roadmap')} ref={register('roadmap')} aria-labelledby="roadmap-title">
            <div className={styles.container}>
              <h2 id="roadmap-title" className={styles.sectionHeading}>On the roadmap</h2>
              <div className={styles.timelineWrap}>
                {product.roadmap.map((item) => (
                  <div key={item.title} className={styles.timelineItem}>
                    <span className={styles.timelineDot} />
                    <div className={styles.timelineContent}>
                      <strong>{item.title}</strong> — {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Product interface */}
        {(gallery.length > 0 || product.demoVideoId) && (
          <section className={sectionClass(styles.section, 'interface', styles.productSection)} ref={register('interface')} aria-labelledby="interface-title">
            <div className={styles.container}>
              <h2 id="interface-title" className={styles.sectionHeading}>Product interface</h2>
              {gallery.length > 0 && (
                <div className={`${styles.imageRow} ${styles.imageRowLarge}`}>
                  {gallery.map((img) => (
                    <div key={img.caption} className={styles.imageContainer}>
                      <img src={img.src} alt={img.alt} className={styles.productImage} loading="lazy" />
                      <span className={styles.imageCaption}>{img.caption}</span>
                    </div>
                  ))}
                </div>
              )}
              {product.demoVideoId && (
                <div className={styles.mvpDemoBlock}>
                  <h3 className={styles.mvpDemoTitle}>MVP demo video</h3>
                  <p className={styles.mvpDemoText}>See detection, redaction and policy enforcement in an early {product.shortName} build.</p>
                  <div className={eco.video}>
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${product.demoVideoId}`}
                      title={`${product.name} demo video`}
                      loading="lazy"
                      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Works with the EcoSystem */}
        <section className={sectionClass(styles.sectionAlt, 'works')} ref={register('works')} aria-labelledby="works-with-title">
          <div className={styles.container}>
            <h2 id="works-with-title" className={styles.sectionHeading}>Works with the {PLATFORM_NAME}</h2>
            <div className={styles.overviewCards}>
              {others.map((p) => (
                <Link key={p.slug} to={`/products/${p.slug}`} className={`${styles.overviewCard} ${eco.card} ${eco[`accent_${p.accent}`] || ''}`}>
                  <span className={`${styles.overviewIcon} ${eco.cardIcon}`} aria-hidden="true">
                    <ProductIcon name={p.icon} size={28} />
                  </span>
                  <h3 className={styles.overviewCardTitle}>{p.shortName}</h3>
                  <p className={styles.overviewCardDesc}>{product.integrations[p.slug]}</p>
                  <span className={styles.overviewCardLink}>View {p.shortName} →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className={sectionClass(styles.section, 'buyers')} ref={register('buyers')} aria-labelledby="buyers-title">
          <div className={styles.container}>
            <h2 id="buyers-title" className={styles.sectionHeading}>Who it&apos;s for</h2>
            <ul className={eco.chipRow}>
              {product.buyers.map((b) => (
                <li key={b} className={eco.chip}>{b}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className={`${styles.ctaSection} ${inView.cta ? styles.inView : ''}`} ref={register('cta')} aria-labelledby="detail-cta-title">
          <div className={styles.container}>
            <h2 id="detail-cta-title" className={styles.ctaHeading}>{product.tagline}</h2>
            <p className={styles.ctaSub}>Tell us about your environment and we&apos;ll show you how {product.shortName} fits.</p>
            <div className={styles.ctaButtons}>
              <Link to={contactHref(product.slug)} className={styles.ctaBtnPrimary}>{product.ctaLabel}</Link>
              <Link to="/solutions" className={styles.ctaBtnSecondary}>See solutions</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
