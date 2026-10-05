/**
 * /company/business-proposal — for investors, potential co-founders and partners.
 * The first pages of the proposal are open; the rest unlock after the founder approves
 * a request (see components/ProposalViewer and backend /api/proposal/*).
 */

import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta.js';
import useSectionsInView from '../../hooks/useSectionsInView.js';
import { PRODUCTS, PLATFORM_NAME } from '../../data/products.js';
import StatusPill from '../../components/Ecosystem/StatusPill.jsx';
import styles from './BusinessProposal.module.css';

const ProposalViewer = lazy(() => import('../../components/ProposalViewer/ProposalViewer.jsx'));

const svg = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

const STATS = [
  { value: 4, suffix: '', label: 'products in one platform' },
  { value: 4, suffix: '', label: 'patent applications filed' },
  { value: 1, suffix: '', label: 'line to integrate (API base URL)' },
  { value: 13, suffix: '', label: 'page proposal' },
];

const CHAPTERS = [
  { n: '01', title: 'Executive summary & vision', desc: 'The problem enterprises face with AI today, the platform we are building, and why it matters to engineering and security leaders.' },
  { n: '02', title: 'The product suite', desc: 'Anoryx Sentinel, Delta, Rendly and the Orchestration Layer, and how they act as one closed loop.' },
  { n: '03', title: 'Market opportunity & customers', desc: 'Who buys, why now, and the buyer personas we sell to first.' },
  { n: '04', title: 'Go-to-market playbook', desc: 'How we reach enterprise buyers and developers, including the Anoryx Arena launch in Bengaluru.', locked: true },
  { n: '05', title: 'Roadmap & financial plan', desc: 'Milestones, unit economics and the capital plan.', locked: true },
];

const WHY_NOW = [
  {
    title: 'Agents are moving into production',
    desc: 'Autonomous workflows now act on real customer data and call paid model APIs without a human checking each step.',
    icon: <svg {...svg}><rect x="4" y="8" width="16" height="12" rx="2" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /><circle cx="12" cy="14" r="1.5" /></svg>,
  },
  {
    title: 'AI spend is unpredictable',
    desc: 'Token costs are metered per request. One runaway agent loop can burn a month of budget before the invoice shows it.',
    icon: <svg {...svg}><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
  },
  {
    title: 'Legacy controls can’t see LLM traffic',
    desc: 'Data-loss prevention and firewalls were built for files and networks, not for prompts and token streams.',
    icon: <svg {...svg}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 9l6 6M15 9l-6 6" /></svg>,
  },
];

const THESIS = [
  {
    title: 'A closed loop, not a point tool',
    desc: 'Security, cost and people signals act on each other through the Orchestration Layer. Competitors selling one piece can’t replicate the loop.',
  },
  {
    title: 'Adoption in one line',
    desc: 'Sentinel is OpenAI-compatible: teams change one API base URL instead of rewriting code, which shortens pilots.',
  },
  {
    title: 'Built for regulated buyers',
    desc: 'Self-hostable and zero-trust by default, with signed policies, tenant isolation and a tamper-evident audit log.',
  },
  {
    title: 'Protected intellectual property',
    desc: 'Four patent applications have been filed and are pending.',
  },
];

const AUDIENCES = [
  {
    role: 'investor',
    title: 'Investors',
    desc: 'Funds and angels backing enterprise AI infrastructure, security or developer platforms.',
    cta: 'Request as an investor',
    icon: <svg {...svg}><path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 5-6" /></svg>,
  },
  {
    role: 'cofounder',
    title: 'Potential co-founders',
    desc: 'Operators who have built or sold security, infrastructure or developer products to enterprises.',
    cta: 'Request as a co-founder',
    icon: <svg {...svg}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  },
  {
    role: 'partner',
    title: 'Design partners',
    desc: 'CISOs, platform and AI-infrastructure teams who want to shape the products in early access.',
    cta: 'Request as a partner',
    icon: <svg {...svg}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" /></svg>,
  },
];

/** Counts up from 0 when it first scrolls into view. */
function CountUp({ value, start }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(value);
      return undefined;
    }
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / 1100);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value]);
  return n;
}

/** Proposal "cover" that tilts toward the pointer. */
function CoverCard() {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${(-y * 12).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(x * 14).toFixed(2)}deg`);
    el.style.setProperty('--gx', `${((x + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty('--gy', `${((y + 0.5) * 100).toFixed(1)}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };
  return (
    <div className={styles.coverStage} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div ref={ref} className={styles.cover} aria-hidden="true">
        <div className={styles.coverShine} />
        <span className={styles.coverKicker}>Anoryx Tech Solutions</span>
        <span className={styles.coverTitle}>Business<br />Proposal</span>
        <span className={styles.coverRule} />
        <span className={styles.coverSub}>The Unified AI Development &amp; Governance Ecosystem</span>
        <span className={styles.coverBy}>Prepared by Afnan Pasha · Founder &amp; CEO</span>
        <span className={styles.coverBadge}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
          Confidential · Full copy on request
        </span>
      </div>
      <div className={styles.coverShadow} aria-hidden="true" />
    </div>
  );
}

export default function BusinessProposal() {
  const [inView, register] = useSectionsInView();
  const [requestRole, setRequestRole] = useState('');
  const [requestSignal, setRequestSignal] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const handleAccess = useCallback(() => setUnlocked(true), []);

  usePageMeta({
    title: 'Business Proposal | Anoryx Tech Solutions',
    description:
      'The Anoryx business proposal for investors, potential co-founders and partners: the Anoryx EcoSystem, the market, and why now. Preview the first pages and request the full proposal.',
    path: '/company/business-proposal',
  });

  const openRequest = useCallback((role) => {
    setRequestRole(role);
    setRequestSignal((n) => n + 1);
  }, []);

  const scrollToProposal = (e) => {
    e.preventDefault();
    document.getElementById('proposal')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const reveal = (key) => `${styles.reveal} ${inView[key] ? styles.revealIn : ''}`;

  return (
    <div className={styles.page}>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="bp-title">
        <div className={styles.heroBg} aria-hidden="true">
          <span className={`${styles.blob} ${styles.blobA}`} />
          <span className={`${styles.blob} ${styles.blobB}`} />
          <span className={`${styles.blob} ${styles.blobC}`} />
          <span className={styles.grid} />
        </div>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>For investors, co-founders &amp; partners</span>
            <h1 id="bp-title" className={styles.heroTitle}>
              The <span className={styles.gradientText}>Anoryx</span> Business Proposal
            </h1>
            <p className={styles.heroSub}>
              How we plan to build the secure operating layer for enterprise AI: the {PLATFORM_NAME}, the market we
              are entering, and why the timing is right. Read the opening pages now and request the full proposal.
            </p>
            <div className={styles.heroCtas}>
              <a href="#proposal" onClick={scrollToProposal} className={styles.ctaPrimary}>
                Read the proposal
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
              </a>
              <button type="button" className={styles.ctaGhost} onClick={() => openRequest('')}>
                Request full access
              </button>
            </div>
          </div>
          <CoverCard />
        </div>

        <div ref={register('stats')} className={`${styles.stats} ${inView.stats ? styles.revealIn : ''}`}>
          {STATS.map((s, i) => (
            <div key={s.label} className={styles.stat} style={{ '--i': i }}>
              <span className={styles.statValue}>
                <CountUp value={s.value} start={inView.stats} />
                {s.suffix}
              </span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Viewer ─────────────────────────────────────────── */}
      <section id="proposal" className={styles.viewerSection} aria-labelledby="viewer-title">
        <div className={styles.container}>
          <div ref={register('viewerHead')} className={`${styles.sectionHead} ${reveal('viewerHead')}`}>
            <span className={styles.kicker}>The proposal</span>
            <h2 id="viewer-title" className={styles.sectionTitle}>{unlocked ? 'Read the full proposal' : 'Read the first pages'}</h2>
            <p className={styles.sectionLead}>
              {unlocked
                ? 'Your access has been approved. Thank you for your interest in Anoryx.'
                : 'The executive summary is open to everyone. The go-to-market plan, unit economics and capital plan unlock once the founder approves your request.'}
            </p>
          </div>
          <div ref={register('viewer')} className={reveal('viewer')}>
            <Suspense fallback={<div className={styles.viewerFallback}>Loading the proposal…</div>}>
              <ProposalViewer presetRole={requestRole} requestSignal={requestSignal} onAccess={handleAccess} />
            </Suspense>
          </div>
        </div>
      </section>

      {/* ── What's inside ──────────────────────────────────── */}
      <section className={styles.section} aria-labelledby="inside-title">
        <div className={styles.container}>
          <div ref={register('insideHead')} className={`${styles.sectionHead} ${reveal('insideHead')}`}>
            <span className={styles.kicker}>Inside the proposal</span>
            <h2 id="inside-title" className={styles.sectionTitle}>Five chapters, one plan</h2>
          </div>
          <ol ref={register('inside')} className={`${styles.chapters} ${inView.inside ? styles.staggerIn : ''}`}>
            {CHAPTERS.map((c, i) => (
              <li key={c.n} className={styles.chapter} style={{ '--i': i }}>
                <span className={styles.chapterNum}>{c.n}</span>
                <div>
                  <h3 className={styles.chapterTitle}>
                    {c.title}
                    {c.locked && (
                      <span className={styles.chapterLock}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
                        On request
                      </span>
                    )}
                  </h3>
                  <p className={styles.chapterDesc}>{c.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Why now ────────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionDark}`} aria-labelledby="why-now-title">
        <div className={styles.container}>
          <div ref={register('whyHead')} className={`${styles.sectionHead} ${reveal('whyHead')}`}>
            <span className={styles.kicker}>Why now</span>
            <h2 id="why-now-title" className={styles.sectionTitle}>Three shifts are colliding</h2>
            <p className={styles.sectionLead}>Enterprises want AI at full speed, but the controls they rely on were built for a different era.</p>
          </div>
          <div ref={register('why')} className={`${styles.forces} ${inView.why ? styles.staggerIn : ''}`}>
            {WHY_NOW.map((f, i) => (
              <article key={f.title} className={styles.force} style={{ '--i': i }}>
                <span className={styles.forceIcon}>{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Anoryx can win ─────────────────────────────── */}
      <section className={styles.section} aria-labelledby="thesis-title">
        <div className={styles.container}>
          <div ref={register('thesisHead')} className={`${styles.sectionHead} ${reveal('thesisHead')}`}>
            <span className={styles.kicker}>Investment thesis</span>
            <h2 id="thesis-title" className={styles.sectionTitle}>Why Anoryx can win</h2>
          </div>
          <div ref={register('thesis')} className={`${styles.thesis} ${inView.thesis ? styles.staggerIn : ''}`}>
            {THESIS.map((t, i) => (
              <article key={t.title} className={styles.thesisItem} style={{ '--i': i }}>
                <span className={styles.thesisIndex}>{String(i + 1).padStart(2, '0')}</span>
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Where we stand ─────────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionTint}`} aria-labelledby="stand-title">
        <div className={styles.container}>
          <div ref={register('standHead')} className={`${styles.sectionHead} ${reveal('standHead')}`}>
            <span className={styles.kicker}>Traction &amp; milestones</span>
            <h2 id="stand-title" className={styles.sectionTitle}>Where we stand today</h2>
            <p className={styles.sectionLead}>Honest status, product by product.</p>
          </div>
          <ol ref={register('stand')} className={`${styles.timeline} ${inView.stand ? styles.timelineIn : ''}`}>
            {PRODUCTS.map((p, i) => (
              <li key={p.slug} className={styles.milestone} style={{ '--i': i }}>
                <span className={styles.milestoneDot} />
                <div className={styles.milestoneBody}>
                  <div className={styles.milestoneTop}>
                    <h3>{p.name}</h3>
                    <StatusPill status={p.status} />
                  </div>
                  <p>{p.category}. {p.tagline}</p>
                </div>
              </li>
            ))}
            <li className={styles.milestone} style={{ '--i': PRODUCTS.length }}>
              <span className={`${styles.milestoneDot} ${styles.milestoneNext}`} />
              <div className={styles.milestoneBody}>
                <div className={styles.milestoneTop}>
                  <h3>Next: design-partner pilots and the Anoryx Arena</h3>
                  <span className={styles.plannedPill}>Planned</span>
                </div>
                <p>Pilots with early enterprise partners, followed by a live developer launch event in Bengaluru.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* ── Who we'd like to hear from ─────────────────────── */}
      <section className={styles.section} aria-labelledby="audience-title">
        <div className={styles.container}>
          <div ref={register('audHead')} className={`${styles.sectionHead} ${reveal('audHead')}`}>
            <span className={styles.kicker}>Get involved</span>
            <h2 id="audience-title" className={styles.sectionTitle}>Who we&apos;d like to hear from</h2>
          </div>
          <div ref={register('aud')} className={`${styles.audiences} ${inView.aud ? styles.staggerIn : ''}`}>
            {AUDIENCES.map((a, i) => (
              <article key={a.role} className={styles.audience} style={{ '--i': i }}>
                <span className={styles.audienceIcon}>{a.icon}</span>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
                <button type="button" className={styles.audienceBtn} onClick={() => openRequest(a.role)}>
                  {a.cta}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing quote ──────────────────────────────────── */}
      <section className={styles.quoteBand} aria-label="Founder quote">
        <div ref={register('quote')} className={`${styles.container} ${reveal('quote')}`}>
          <blockquote className={styles.quote}>
            <p>&ldquo;There is only one Number One. We are here to build it.&rdquo;</p>
            <footer>Afnan Pasha, Founder &amp; CEO</footer>
          </blockquote>
        </div>
      </section>
    </div>
  );
}
