/**
 * /solutions — organised by problem and buyer, not by product.
 * Each use case links to the products that solve it. Deep links: /solutions#<solution-id>.
 * Layout reuses Solutions.module.css; product names/statuses come from src/data/products.js.
 */

import { useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import usePageMeta from '../../hooks/usePageMeta.js';
import useSectionsInView from '../../hooks/useSectionsInView.js';
import ProductIcon from '../../components/Ecosystem/ProductIcon.jsx';
import { PLATFORM_NAME, getProduct, contactHref, PRODUCTS } from '../../data/products.js';
import { SOLUTIONS, ROLES, INDUSTRIES } from '../../data/solutions.js';
import styles from './Solutions.module.css';
import eco from '../../components/Ecosystem/Ecosystem.module.css';

const svgProps = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

const ROLE_ICONS = {
  'CISO / Security': <svg {...svgProps}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  'CTO / VP Engineering': <svg {...svgProps}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  'CFO / FinOps': <svg {...svgProps}><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
  'Platform & AI Infra': <svg {...svgProps}><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>,
};

const CHECK = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
);

function ProductChips({ slugs }) {
  return (
    <ul className={eco.chipRow} aria-label="Products used">
      {slugs.map((slug) => {
        const p = getProduct(slug);
        return (
          <li key={slug}>
            <Link to={`/products/${slug}`} className={`${eco.chip} ${eco[`accent_${p.accent}`] || ''}`}>
              {p.shortName}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function Solutions() {
  const location = useLocation();
  const navigate = useNavigate();
  const [inView, register] = useSectionsInView();

  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Anoryx Solutions',
      about: SOLUTIONS.map((s) => s.title),
    }),
    []
  );

  usePageMeta({
    title: 'Solutions: secure, govern and orchestrate enterprise AI | Anoryx',
    description:
      'Secure GenAI adoption, AI cost control, agentic AI guardrails, audit readiness and shadow AI visibility, built on the Anoryx EcoSystem.',
    path: '/solutions',
    jsonLd,
  });

  useEffect(() => {
    const hash = location.hash?.slice(1);
    if (!hash) return undefined;
    // Legacy demo-video anchor from the previous solutions page now lives on the Sentinel product page.
    if (hash === 'pii-sentinel-video') {
      navigate('/products/sentinel', { replace: true });
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
        <section ref={register('s1')} className={`${styles.hero} ${styles.sectionStripe} ${inView.s1 ? styles.inView : ''}`} aria-labelledby="solutions-title">
          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <h1 id="solutions-title" className={styles.heroTitle}>Start from the AI risk you have today.</h1>
              <p className={styles.heroSub}>
                Each solution maps a concrete problem to the {PLATFORM_NAME} products that solve it: secure GenAI
                adoption, AI cost control, agent guardrails, audit readiness and secure collaboration.
              </p>
              <div className={styles.heroCTAs}>
                <Link to={contactHref()} className={styles.btnPrimary}>Request early access</Link>
                <Link to="/products" className={styles.btnSecondary}>Explore the platform</Link>
              </div>
            </div>
            <div className={styles.heroMock} aria-hidden="true">
              <div className={styles.dashboardMockSecond}>
                <div className={styles.mockHeader}>
                  <span className={styles.mockDots}><i /><i /><i /></span>
                  <span className={styles.mockTitle}>Closed loop</span>
                </div>
                <div className={styles.mockTabs}>
                  <span className={styles.mockTabActive}>Events</span>
                  <span>Policies</span>
                  <span>Alerts</span>
                </div>
                <div className={styles.mockBody}>
                  <div className={styles.mockList}>
                    <div className={styles.mockListItem}><span className={styles.mockBadge}>Delta</span> Budget breach detected</div>
                    <div className={styles.mockListItem}><span className={styles.mockBadge}>Sentinel</span> Next request blocked</div>
                    <div className={styles.mockListItem}><span className={styles.mockBadge}>Rendly</span> Lead asked to approve</div>
                  </div>
                </div>
              </div>
              <div className={styles.dashboardMock}>
                <div className={styles.mockBlurEdge} />
                <div className={styles.mockHeader}>
                  <span className={styles.mockDots}><i /><i /><i /></span>
                  <span className={styles.mockTitle}>AI risk map</span>
                </div>
                <div className={styles.mockTabs}>
                  <span className={styles.mockTabActive}>Use cases</span>
                  <span>Roles</span>
                  <span>Industries</span>
                </div>
                <div className={styles.mockBody}>
                  <div className={styles.mockStatRow}>
                    <div className={styles.mockStat}><strong>{SOLUTIONS.length}</strong> Use cases</div>
                    <div className={styles.mockStat}><strong>{PRODUCTS.length}</strong> Products</div>
                  </div>
                  <div className={styles.mockPipeline}>
                    <div className={styles.mockPipelineLabel}>Requests inspected</div>
                    <div className={styles.mockPipelineBar}><span style={{ width: '72%' }} /></div>
                  </div>
                  <div className={styles.mockList}>
                    <div className={styles.mockListItem}><span className={styles.mockBadge}>Redacted</span> Customer email in prompt</div>
                    <div className={styles.mockListItem}><span className={styles.mockBadge}>Blocked</span> Unapproved model endpoint</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 — By use case */}
        <section ref={register('s2')} className={`${styles.section} ${styles.sectionStripe} ${inView.s2 ? styles.inView : ''}`} aria-labelledby="use-case-title">
          <div className={styles.container}>
            <h2 id="use-case-title" className={styles.sectionTitle}>By use case</h2>
            <p className={styles.sectionLead}>The problem, how Anoryx solves it, and the products involved.</p>
            <div className={styles.capGrid}>
              {SOLUTIONS.map((s) => {
                const lead = getProduct(s.products[0]);
                return (
                  <article
                    key={s.id}
                    id={s.id}
                    className={`${styles.capCard} ${eco.anchorTarget} ${eco[`accent_${lead.accent}`] || ''}`}
                    aria-labelledby={`${s.id}-title`}
                    style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}
                  >
                    <span className={styles.capIcon}><ProductIcon name={lead.icon} /></span>
                    <h3 id={`${s.id}-title`} className={styles.capTitle}>{s.title}</h3>
                    <p className={styles.capBody} style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      &ldquo;{s.problem}&rdquo;
                    </p>
                    <p className={styles.capBody}>{s.solution}</p>
                    <div style={{ marginTop: 'auto', display: 'grid', gap: 'var(--space-3)' }}>
                      <ProductChips slugs={s.products} />
                      <Link to={contactHref(s.products.length > 1 ? 'ecosystem' : s.products[0])} className={styles.productLink}>
                        Talk to us about this
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 3 — By role */}
        <section ref={register('s3')} className={`${styles.sectionAlt} ${styles.sectionStripe} ${inView.s3 ? styles.inView : ''}`} aria-labelledby="role-title">
          <div className={styles.container}>
            <h2 id="role-title" className={styles.sectionTitle}>By role</h2>
            <p className={styles.sectionLead}>Where each team should start.</p>
            <div className={styles.productGrid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
              {ROLES.map((r) => (
                <div key={r.role} className={styles.productCard}>
                  <span className={styles.productIcon}>{ROLE_ICONS[r.role]}</span>
                  <h3 className={styles.productName}>{r.role}</h3>
                  <ProductChips slugs={r.products} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4 — By industry */}
        <section ref={register('s4')} className={`${styles.section} ${styles.sectionStripe} ${styles.premiumSection} ${inView.s4 ? styles.inView : ''}`} aria-labelledby="industry-title">
          <div className={styles.container}>
            <div className={styles.premiumLayout}>
              <div className={styles.premiumContent}>
                <div className={styles.premiumTitleRow}>
                  <span className={styles.premiumIcon} aria-hidden="true">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 21h18" /><path d="M5 21V7l8-4v18" /><path d="M19 21V11l-6-4" /></svg>
                  </span>
                  <h2 id="industry-title" className={styles.premiumTitle}>By industry</h2>
                </div>
                <p className={styles.premiumLead}>
                  Built for sectors where data can&apos;t leave the perimeter and every model call needs an audit trail.
                </p>
                <ul className={styles.premiumList}>
                  {INDUSTRIES.map((ind) => (
                    <li key={ind.name}>
                      <span className={styles.premiumListIcon}>{CHECK}</span>
                      <span><strong>{ind.name}.</strong> {ind.line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.premiumMock} aria-hidden="true">
                <div className={styles.miniMock}>
                  <div className={styles.miniMockTitle}>Deployment</div>
                  <div className={styles.miniMockRow}>
                    <span className={styles.miniMockPill}>Your VPC</span>
                    <span className={styles.miniMockPill}>Kubernetes</span>
                  </div>
                  <div className={styles.miniMockBar}><span style={{ width: '75%' }} /></div>
                  <div className={styles.miniMockLabel}>Self-hosted by default</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 — Legacy offerings. AFFU: keep / remove? Older solution pages and engineering services from the previous site. */}
        <section ref={register('s5')} className={`${styles.sectionAlt} ${styles.sectionStripe} ${styles.premiumSection} ${inView.s5 ? styles.inView : ''}`} aria-labelledby="more-title">
          <div className={styles.container}>
            <div className={styles.premiumTitleRow}>
              <span className={styles.premiumIcon} aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><path d="M10 6h4M6 14v-4M18 10h-4" /></svg>
              </span>
              <h2 id="more-title" className={styles.premiumTitle}>More from Anoryx</h2>
            </div>
            <ul className={styles.premiumList}>
              <li><span className={styles.premiumListIcon}>{CHECK}</span><span><Link to="/solutions/enterprise-automation">Enterprise Automation</Link>: agentic workflow systems and autonomous execution.</span></li>
              <li><span className={styles.premiumListIcon}>{CHECK}</span><span><Link to="/solutions/industry-applications">Industry Applications</Link>: intelligence systems by sector.</span></li>
              <li><span className={styles.premiumListIcon}>{CHECK}</span><span>Custom intelligence backend and enterprise system engineering.</span></li>
              <li><span className={styles.premiumListIcon}>{CHECK}</span><span>Domain-specific intelligence and small language model (SLM) systems.</span></li>
            </ul>
          </div>
        </section>
      </div>

      {/* Section 6 — CTA (no stripe lines) */}
      <section ref={register('cta')} className={`${styles.ctaSection} ${inView.cta ? styles.inView : ''}`} aria-labelledby="solutions-cta-title">
        <div className={styles.container}>
          <h2 id="solutions-cta-title" className={styles.ctaTitle}>Tell us your AI risk. We&apos;ll show you the fix.</h2>
          <div className={styles.ctaButtons}>
            <Link to={contactHref()} className={styles.btnPrimary}>Contact Anoryx</Link>
            <Link to="/products" className={styles.btnSecondary}>Explore the platform</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
