import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SlidingStackCards from './SlidingStackCards';
import styles from './IndustryApplications.module.css';

const matrixIconProps = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };

const INDUSTRIES = [
  { id: 'saas', name: 'SaaS Platforms', desc: 'Scalable intelligence infrastructure for software-as-a-service platforms. Real-time signal processing, adaptive automation, and enterprise-grade reliability.', glow: 'blue', icon: <svg {...matrixIconProps}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /></svg> },
  { id: 'finance', name: 'Financial Systems', desc: 'Secure, audit-ready intelligence for financial infrastructure. Decision verification, audit trails, and regulatory-grade execution.', glow: 'cyan', icon: <svg {...matrixIconProps}><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg> },
  { id: 'healthcare', name: 'Healthcare Infrastructure', desc: 'Privacy-first intelligence for healthcare systems. HIPAA-aligned data handling, clinical workflow automation, and secure orchestration.', glow: 'teal', icon: <svg {...matrixIconProps}><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg> },
  { id: 'enterprise', name: 'Enterprise IT & Cloud', desc: 'Enterprise-grade intelligence across hybrid and multi-cloud environments. Orchestration, observability, and autonomous operations.', glow: 'indigo', icon: <svg {...matrixIconProps}><ellipse cx="12" cy="16" rx="6" ry="4" /><path d="M12 8v4M8 14l4-4 4 4" /><path d="M4 10a8 8 0 0 1 16 0" /></svg> },
  { id: 'privacy', name: 'Privacy & Compliance Systems', desc: 'Intelligence infrastructure built for privacy and compliance. PII protection, consent management, and regulatory automation.', glow: 'white', icon: <svg {...matrixIconProps}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> },
  { id: 'ai', name: 'AI-Native Companies', desc: 'AI-first intelligence for model orchestration, agent systems, and continuous learning at scale.', glow: 'purple', icon: <svg {...matrixIconProps}><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" /><path d="M5 21l2-6 2 2 2-2 2 6" /><path d="M19 21l-2-4-1 2 2 2" /></svg> },
];

const USE_CASES = [
  { tag: 'Privacy & Data', title: 'Detecting privacy risks in enterprise data systems', body: 'Anoryx intelligence infrastructure continuously analyzes data flows and access patterns to identify potential PII exposure and compliance drift, enabling proactive remediation before regulatory or reputational impact.' },
  { tag: 'Automation', title: 'Automating operational workflows using agent systems', body: 'Autonomous agents orchestrated by the Anoryx platform execute complex operational workflows—provisioning, monitoring, incident response—with human oversight and full auditability.' },
  { tag: 'Infrastructure', title: 'Monitoring enterprise infrastructure autonomously', body: 'Real-time signal ingestion and cognitive analysis drive autonomous monitoring and optimization of enterprise infrastructure, reducing mean time to detection and resolution.' },
  { tag: 'Orchestration', title: 'Coordinating multi-system enterprise operations', body: 'Intelligence layers coordinate across CRM, ERP, and custom systems to maintain consistency, enforce policies, and optimize cross-system workflows.' },
  { tag: 'Security', title: 'Protecting sensitive data using autonomous analysis', body: 'Continuous autonomous analysis of data classification, access patterns, and policy enforcement ensures sensitive data remains protected and auditable across the enterprise.' },
];

const iconProps = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

const CAPABILITY_LAYERS = [
  { name: 'Signal Ingestion Layer', icon: <svg {...iconProps}><path d="M2 12h4M6 8v8M10 6v12M14 4v16M18 8v8M22 12h-4" /></svg> },
  { name: 'Cognitive Intelligence Layer', icon: <svg {...iconProps}><path d="M12 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" /><path d="M12 13c-2.5 0-4.5 1.5-5.5 4 1 2.5 3 4 5.5 4s4.5-1.5 5.5-4c-1-2.5-3-4-5.5-4z" /><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" /></svg> },
  { name: 'Agent Orchestration Layer', icon: <svg {...iconProps}><circle cx="12" cy="6" r="2" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /><path d="M12 8v2M8.5 16.5L12 13M15.5 16.5L12 13" /></svg> },
  { name: 'Execution Infrastructure Layer', icon: <svg {...iconProps}><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><path d="M6 6v.01M6 18v.01M18 6v.01M18 18v.01" /></svg> },
  { name: 'Learning and Optimization Layer', icon: <svg {...iconProps}><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg> },
];

const METRICS = [
  { value: 99.99, suffix: '%', label: 'Execution reliability' },
  { value: 'Real-time', suffix: '', label: 'Decision execution' },
  { value: 'Autonomous', suffix: '', label: 'Infrastructure orchestration' },
  { value: 'Continuous', suffix: '', label: 'System optimization' },
];

const TRUST_BADGES = ['SaaS', 'Finance', 'Healthcare', 'Cloud Infrastructure', 'AI Companies', 'Enterprise Systems'];

function MetricCard({ value, suffix, label, trigger }) {
  const isNum = typeof value === 'number';
  const [display, setDisplay] = useState(isNum ? 0 : value);
  useEffect(() => {
    if (!trigger) return;
    if (!isNum) {
      setDisplay(String(value));
      return;
    }
    const duration = 1800;
    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const v = value * progress;
      setDisplay(progress >= 1 ? value : Number(v.toFixed(2)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, value, isNum]);
  const text = isNum ? `${display}${suffix || ''}` : `${value}${suffix || ''}`;
  return (
    <div className={styles.metricCard}>
      <span className={styles.metricValue}>{text}</span>
      <span className={styles.metricLabel}>{label}</span>
    </div>
  );
}

export default function IndustryApplications() {
  const heroRef = useRef(null);
  const matrixRef = useRef(null);
  const workflowRef = useRef(null);
  const stackRef = useRef(null);
  const metricsRef = useRef(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [matrixVisible, setMatrixVisible] = useState(false);
  const [workflowVisible, setWorkflowVisible] = useState(false);
  const [stackVisible, setStackVisible] = useState(false);
  const [metricsVisible, setMetricsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => setHeroVisible(e.isIntersecting),
      { threshold: 0.2 }
    );
    const el = heroRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.target === matrixRef.current) setMatrixVisible(e.isIntersecting);
          if (e.target === workflowRef.current) setWorkflowVisible(e.isIntersecting);
          if (e.target === stackRef.current) setStackVisible(e.isIntersecting);
          if (e.target === metricsRef.current) setMetricsVisible(e.isIntersecting);
        });
      },
      { threshold: 0.12 }
    );
    [matrixRef, workflowRef, stackRef, metricsRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.pageStrip}>
        {/* ── Hero: left (heading + subtitle + indicator) | right (sliding stack cards) ── */}
        <section className={styles.hero} ref={heroRef}>
          <div className={styles.heroBg} />
          <div className={styles.heroGrid} />
          <div className={styles.heroStripes} aria-hidden>
            <span className={styles.heroStripeLeft} />
            <span className={styles.heroStripeRight} />
          </div>
          <div className={styles.heroLayout}>
            <div className={styles.heroContent}>
              <h1 className={`${styles.heroTitle} ${heroVisible ? styles.heroTitleVisible : ''}`}>
                Intelligence Infrastructure Across Every Industry
              </h1>
              <p className={`${styles.heroSubtext} ${heroVisible ? styles.heroSubtextVisible : ''}`}>
                Anoryx provides intelligence infrastructure adaptable to SaaS, finance, healthcare, enterprise IT, and AI-native companies—enabling secure, scalable, and autonomous operations across industries.
              </p>
              <span className={styles.heroIndicator} aria-hidden />
              <div className={styles.heroCTAs}>
                <Link to="/platform/overview" className={styles.ctaPrimary}>Explore Platform</Link>
                <Link to="/products" className={styles.ctaSecondary}>View Products</Link>
              </div>
            </div>
            <div className={styles.heroViz}>
              <SlidingStackCards />
            </div>
          </div>
        </section>

        {/* ── Section 1: Industry Intelligence Matrix ───────────────────── */}
        <section className={styles.sectionMatrix} ref={matrixRef}>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>Industries We Power</h2>
            <p className={styles.sectionSubtitle}>Intelligence infrastructure built for the demands of modern enterprise across sectors.</p>
            <div className={styles.matrixGrid}>
              {INDUSTRIES.map((ind, i) => (
                <div
                  key={ind.id}
                  className={`${styles.matrixCard} ${styles[`glow${ind.glow.charAt(0).toUpperCase() + ind.glow.slice(1)}`]} ${matrixVisible ? styles.matrixCardVisible : ''}`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <span className={styles.matrixCardIcon} aria-hidden>{ind.icon}</span>
                  <h3 className={styles.matrixCardTitle}>{ind.name}</h3>
                  <p className={styles.matrixCardDesc}>{ind.desc}</p>
                  <span className={styles.matrixCardIndicator} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 2: Industry Workflow Visualization ─────────────────── */}
        <section className={styles.sectionWorkflow} ref={workflowRef}>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>How Intelligence Flows Through Industry Systems</h2>
            <p className={styles.sectionSubtitle}>
              From signal sources through cognitive processing to autonomous execution—Anoryx infrastructure orchestrates intelligence across your industry stack.
            </p>
            <div className={`${styles.workflowViz} ${workflowVisible ? styles.workflowVizVisible : ''}`}>
              <div className={styles.workflowNode}>
                <span className={styles.workflowNodeLabel}>Signal Sources</span>
                <span className={styles.workflowNodeIcon} aria-hidden>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4M6 8v8M10 6v12M14 4v16M18 8v8M22 12h-4" /></svg>
                </span>
              </div>
              <div className={styles.workflowLine}>
                <span className={styles.workflowParticle} />
                <span className={styles.workflowParticle} />
              </div>
              <div className={styles.workflowNode}>
                <span className={styles.workflowNodeLabel}>Intelligence Core</span>
                <span className={styles.workflowNodeIcon} aria-hidden>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" /><path d="M12 13c-2.5 0-4.5 1.5-5.5 4 1 2.5 3 4 5.5 4s4.5-1.5 5.5-4c-1-2.5-3-4-5.5-4z" /><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" /></svg>
                </span>
              </div>
              <div className={styles.workflowLine}>
                <span className={styles.workflowParticle} />
                <span className={styles.workflowParticle} />
              </div>
              <div className={styles.workflowNode}>
                <span className={styles.workflowNodeLabel}>Autonomous Execution</span>
                <span className={styles.workflowNodeIcon} aria-hidden>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M10 8l6 4-6 4V8z" /></svg>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 3: Real World Use Case Panels ──────────────────────── */}
        <section className={styles.sectionUseCases}>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>Real-World Applications</h2>
            <p className={styles.sectionSubtitle}>How Anoryx intelligence infrastructure is applied in production environments.</p>
            <div className={styles.useCasesScroll}>
              {USE_CASES.map((uc) => (
                <article key={uc.title} className={styles.useCaseCard}>
                  <span className={styles.useCaseTag}>{uc.tag}</span>
                  <h3 className={styles.useCaseTitle}>{uc.title}</h3>
                  <p className={styles.useCaseBody}>{uc.body}</p>
                  <span className={styles.useCaseIndicator} />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 4: Capability Stack ────────────────────────────────── */}
        <section className={styles.sectionStack} ref={stackRef}>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>Industry Capability Stack</h2>
            <p className={styles.sectionSubtitle}>Layered intelligence capabilities used across industries.</p>
            <div className={styles.stackViz}>
              {CAPABILITY_LAYERS.map((layer, i) => (
                <div
                  key={layer.name}
                  className={`${styles.stackLayer} ${stackVisible ? styles.stackLayerVisible : ''}`}
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  <span className={styles.stackLayerIcon} aria-hidden>
                    {layer.icon}
                  </span>
                  <span className={styles.stackLayerName}>{layer.name}</span>
                  <span className={styles.stackLayerBar} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 5: Impact Metrics ──────────────────────────────────── */}
        <section className={styles.sectionMetrics} ref={metricsRef}>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>Enterprise Impact</h2>
            <div className={styles.metricsGrid}>
              {METRICS.map((m) => (
                <MetricCard key={m.label} value={m.value} suffix={m.suffix} label={m.label} trigger={metricsVisible} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 6: Trust Strip ────────────────────────────────────── */}
        <section className={styles.sectionTrustStrip}>
          <div className={styles.trustStripBg} />
          <div className={styles.trustStripScroll}>
            {TRUST_BADGES.map((badge) => (
              <span key={badge} className={styles.trustBadge}>{badge}</span>
            ))}
          </div>
        </section>

        {/* ── Section 7: CTA ────────────────────────────────────────────── */}
        <section className={styles.sectionCTA}>
          <div className={styles.ctaBg} />
          <div className={styles.sectionInner}>
            <h2 className={styles.ctaTitle}>Deploy Intelligence Infrastructure Across Your Industry</h2>
            <p className={styles.ctaSubtext}>
              Anoryx enables industry transformation through foundational intelligence infrastructure—scalable, secure, and built for autonomous operations at enterprise scale.
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/platform/overview" className={styles.ctaPrimary}>Explore Platform</Link>
              <Link to="/products" className={styles.ctaSecondary}>View Products</Link>
              <Link to="/company/about" className={styles.ctaTertiary}>Contact Enterprise Team</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
