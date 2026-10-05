import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Overview.module.css';
import HeroIntelligenceViz from './HeroIntelligenceViz';
import usePageMeta from '../../hooks/usePageMeta.js';
import { pageMeta } from '../../data/seo.js';

const purposeIconProps = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

const PURPOSE_CARDS = [
  { title: 'Enterprise Signal Intelligence', description: 'Continuously captures, processes, and contextualizes signals across enterprise systems, data environments, and operational workflows in real time.', icon: <svg {...purposeIconProps}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg> },
  { title: 'Autonomous Decision Execution', description: 'Transforms intelligence into action through coordinated autonomous agents capable of executing operational decisions without manual intervention.', icon: <svg {...purposeIconProps}><rect x="4" y="8" width="16" height="12" rx="2" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /><circle cx="12" cy="14" r="1.5" /></svg> },
  { title: 'Cross-System Orchestration', description: 'Connects and orchestrates multiple enterprise systems, enabling intelligence to operate seamlessly across infrastructure, applications, and workflows.', icon: <svg {...purposeIconProps}><circle cx="12" cy="6" r="2" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /><path d="M12 8v2M8.5 16.5L12 13M15.5 16.5L12 13" /></svg> },
  { title: 'Continuous Intelligence Evolution', description: 'Learns from operational feedback and system outcomes to improve performance, decision quality, and execution efficiency over time.', icon: <svg {...purposeIconProps}><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" /></svg> },
];

const layerIconProps = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

const LAYERS = [
  { name: 'Enterprise Data Fabric', description: 'Unifies and processes enterprise signals from diverse data sources, systems, and environments, creating a consistent intelligence-ready data layer.', icon: <svg {...layerIconProps}><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" /></svg> },
  { name: 'Cognitive Intelligence Engine', description: 'Applies reasoning models, intelligence processing, and contextual analysis to transform signals into actionable intelligence.', icon: <svg {...layerIconProps}><path d="M12 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" /><path d="M12 13c-2.5 0-4.5 1.5-5.5 4 1 2.5 3 4 5.5 4s4.5-1.5 5.5-4c-1-2.5-3-4-5.5-4z" /><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" /></svg> },
  { name: 'Autonomous Agent Orchestration', description: 'Coordinates autonomous agents capable of executing tasks, workflows, and operational decisions across enterprise environments.', icon: <svg {...layerIconProps}><circle cx="12" cy="6" r="2" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /><path d="M12 8v2M8.5 16.5L12 13M15.5 16.5L12 13" /></svg> },
  { name: 'Execution Infrastructure', description: 'Interfaces directly with enterprise systems, enabling intelligence-driven execution within applications, platforms, and operational environments.', icon: <svg {...layerIconProps}><polygon points="5 3 19 12 5 21 5 3" /></svg> },
  { name: 'Adaptive Learning Layer', description: 'Continuously improves intelligence performance through feedback analysis, behavioral learning, and outcome optimization.', icon: <svg {...layerIconProps}><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" /></svg> },
];

const iconProps = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

const CAPABILITIES = [
  {
    title: 'Real-Time Intelligence Processing',
    icon: <svg {...iconProps}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
  },
  {
    title: 'Autonomous Execution Systems',
    icon: <svg {...iconProps}><rect x="4" y="8" width="16" height="12" rx="2" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /><circle cx="12" cy="14" r="1.5" /></svg>,
  },
  {
    title: 'Enterprise-Scale Infrastructure',
    icon: <svg {...iconProps}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.64 5.64l2.83 2.83M15.53 15.53l2.83 2.83M5.64 18.36l2.83-2.83M15.53 8.47l2.83-2.83" /><circle cx="12" cy="12" r="2.5" /></svg>,
  },
  {
    title: 'Privacy-First Architecture',
    icon: <svg {...iconProps}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  },
  {
    title: 'Cross-System Integration',
    icon: <svg {...iconProps}><circle cx="12" cy="6" r="2" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /><path d="M12 8v2M8.5 16.5L12 13M15.5 16.5L12 13" /></svg>,
  },
  {
    title: 'Continuous Optimization',
    icon: <svg {...iconProps}><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" /></svg>,
  },
];

const CAPABILITY_DESCRIPTIONS = {
  'Real-Time Intelligence Processing': 'Processes enterprise signals instantly, enabling immediate awareness and response.',
  'Autonomous Execution Systems': 'Executes operational decisions through coordinated autonomous agents.',
  'Enterprise-Scale Infrastructure': 'Built to support large-scale enterprise environments with high reliability and scalability.',
  'Privacy-First Architecture': 'Ensures enterprise data remains protected through secure and controlled intelligence processing.',
  'Cross-System Integration': 'Integrates seamlessly with enterprise systems, platforms, and digital environments.',
  'Continuous Optimization': 'Improves intelligence accuracy and efficiency through ongoing adaptive learning.',
};

const FLOW_STEPS = [
  { title: 'Signal Ingestion', description: 'Captures enterprise signals from systems, applications, and operational environments.' },
  { title: 'Intelligence Processing', description: 'Transforms signals into contextual intelligence using reasoning models.' },
  { title: 'Decision Orchestration', description: 'Coordinates autonomous agents to execute operational decisions.' },
  { title: 'Execution', description: 'Executes tasks directly within enterprise systems and infrastructure.' },
  { title: 'Learning and Optimization', description: 'Analyzes outcomes and continuously improves intelligence performance.' },
];

const diffIconProps = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

const DIFFERENTIATORS = [
  { title: 'Autonomous-First Architecture', description: 'Designed from the ground up to enable autonomous execution rather than manual operation.', icon: <svg {...diffIconProps}><rect x="4" y="8" width="16" height="12" rx="2" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /><circle cx="12" cy="14" r="1.5" /></svg> },
  { title: 'Intelligence-Native Platform', description: 'Intelligence is embedded at the core of the platform rather than added as a secondary feature.', icon: <svg {...diffIconProps}><path d="M12 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" /><path d="M12 13c-2.5 0-4.5 1.5-5.5 4 1 2.5 3 4 5.5 4s4.5-1.5 5.5-4c-1-2.5-3-4-5.5-4z" /><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" /></svg> },
  { title: 'Enterprise-Grade Reliability', description: 'Engineered for stability, scalability, and operational continuity.', icon: <svg {...diffIconProps}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> },
  { title: 'Continuous Intelligence Evolution', description: 'Platform improves itself through operational feedback and learning mechanisms.', icon: <svg {...diffIconProps}><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" /></svg> },
];

export default function Overview() {
  usePageMeta(pageMeta('/platform/overview'));
  const sectionRefs = useRef([]);
  const [activeLayer, setActiveLayer] = useState(0);
  const [metricsInView, setMetricsInView] = useState(false);

  useEffect(() => {
    const observers = [];
    sectionRefs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add(styles.inView);
            if (el.dataset.section === 'metrics') setMetricsInView(true);
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className={styles.page}>
      {/* SECTION 1 — Platform Hero */}
      <section className={styles.hero} ref={(el) => (sectionRefs.current[0] = el)}>
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <span className={styles.heroLabel}>Anoryx Platform</span>
            <h1 className={styles.heroTitle}>
              The Autonomous Intelligence Infrastructure for Modern Enterprises
            </h1>
            <p className={styles.heroSubtitle}>
              Anoryx provides a unified intelligence platform that senses enterprise signals, orchestrates autonomous reasoning, and executes real-time decisions across digital systems. Built as a scalable intelligence fabric, the platform enables organizations to transition from manual operations to continuously evolving autonomous execution.
            </p>
            <p className={styles.heroMicro}>
              Designed for enterprises that require intelligence, automation, security, and scalability within a single integrated architecture.
            </p>
            <div className={styles.heroCTAs}>
              <Link to="/platform/architecture" className={styles.ctaPrimary}>
                Explore Platform Architecture
              </Link>
              <Link to="/platform/intelligence-core" className={styles.ctaSecondary}>
                Understand Intelligence Core
              </Link>
            </div>
          </div>
          <div className={styles.heroVizWrap}>
            <div className={styles.heroVizReveal}>
              <HeroIntelligenceViz />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Platform Purpose */}
      <section className={styles.section} ref={(el) => (sectionRefs.current[1] = el)}>
        <div className={styles.container}>
          <span className={styles.sectionLabel}>Platform Purpose</span>
          <h2 className={styles.sectionTitle}>From Static Software to Living Intelligence Systems</h2>
          <p className={styles.sectionLead}>
            Traditional software executes predefined logic. Anoryx introduces intelligence infrastructure capable of perceiving signals, reasoning autonomously, and executing decisions dynamically. The platform transforms enterprise systems into continuously adaptive intelligence environments.
          </p>
          <div className={styles.purposeGrid}>
            {PURPOSE_CARDS.map((card, i) => (
              <div key={card.title} className={styles.purposeCard} style={{ animationDelay: `${i * 150}ms` }}>
                <div className={styles.purposeCardIcon} aria-hidden="true">
                  {card.icon}
                </div>
                <h3 className={styles.purposeCardTitle}>{card.title}</h3>
                <p className={styles.purposeCardDesc}>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — Platform Layers */}
      <section className={styles.sectionLayers} ref={(el) => (sectionRefs.current[2] = el)}>
        <div className={styles.container}>
          <span className={styles.sectionLabel}>Platform Architecture</span>
          <h2 className={styles.sectionTitle}>
            A Multi-Layer Intelligence Stack Engineered for Autonomous Operation
          </h2>
          <p className={styles.sectionLead}>
            The Anoryx platform operates as a layered intelligence system, where each layer performs a specialized function that contributes to perception, reasoning, execution, and continuous learning.
          </p>
          <div className={styles.layersWrap}>
            <div className={styles.layersStack}>
              {LAYERS.map((layer, i) => (
                <div
                  key={layer.name}
                  className={`${styles.layerSlab} ${activeLayer === i ? styles.layerSlabActive : ''}`}
                  onMouseEnter={() => setActiveLayer(i)}
                  style={{ animationDelay: `${i * 200}ms` }}
                >
                  <span className={styles.layerIcon} aria-hidden="true">{layer.icon}</span>
                  <span className={styles.layerName}>{layer.name}</span>
                </div>
              ))}
            </div>
            <div className={styles.layerDescPanel}>
              <h4 className={styles.layerDescTitle}>{LAYERS[activeLayer].name}</h4>
              <p className={styles.layerDescText}>{LAYERS[activeLayer].description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — Capabilities Grid */}
      <section className={styles.section} ref={(el) => (sectionRefs.current[3] = el)}>
        <div className={styles.container}>
          <span className={styles.sectionLabel}>Core Capabilities</span>
          <h2 className={styles.sectionTitle}>
            Intelligence Infrastructure Designed for Enterprise Scale
          </h2>
          <div className={styles.capGrid}>
            {CAPABILITIES.map((cap, i) => (
              <div key={cap.title} className={styles.capCard} style={{ animationDelay: `${(i % 3) * 120 + Math.floor(i / 3) * 200}ms` }}>
                <div className={styles.capCardIcon} aria-hidden="true">
                  {cap.icon}
                </div>
                <h3 className={styles.capCardTitle}>{cap.title}</h3>
                <p className={styles.capCardDesc}>{CAPABILITY_DESCRIPTIONS[cap.title]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — Flow */}
      <section className={styles.sectionFlow} ref={(el) => (sectionRefs.current[4] = el)}>
        <div className={styles.container}>
          <span className={styles.sectionLabel}>Intelligence Flow</span>
          <h2 className={styles.sectionTitle}>From Signal to Autonomous Execution</h2>
          <div className={styles.flowPipeline}>
            {FLOW_STEPS.map((step, i) => (
              <div key={step.title} className={styles.flowNode} style={{ animationDelay: `${i * 180}ms` }}>
                <div className={styles.flowNodeDot} />
                <div className={styles.flowNodeContent}>
                  <h4 className={styles.flowNodeTitle}>{step.title}</h4>
                  <p className={styles.flowNodeDesc}>{step.description}</p>
                </div>
                {i < FLOW_STEPS.length - 1 && <div className={styles.flowConnector} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — Differentiators */}
      <section className={styles.section} ref={(el) => (sectionRefs.current[5] = el)}>
        <div className={styles.container}>
          <span className={styles.sectionLabel}>Why Anoryx</span>
          <h2 className={styles.sectionTitle}>
            Built as Intelligence Infrastructure, Not Traditional Software
          </h2>
          <div className={styles.diffStack}>
            {DIFFERENTIATORS.map((d, i) => (
              <div key={d.title} className={styles.diffCard} data-side={i % 2 === 0 ? 'left' : 'right'} style={{ animationDelay: `${i * 120}ms` }}>
                <div className={styles.diffCardIcon} aria-hidden="true">
                  {d.icon}
                </div>
                <div className={styles.diffCardContent}>
                  <h3 className={styles.diffCardTitle}>{d.title}</h3>
                  <p className={styles.diffCardDesc}>{d.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — Scale and Trust */}
      <section className={styles.sectionMetrics} ref={(el) => { sectionRefs.current[6] = el; if (el) el.dataset.section = 'metrics'; }}>
        <div className={styles.container}>
          <span className={styles.sectionLabel}>Platform Scale</span>
          <h2 className={styles.sectionTitle}>Engineered for Enterprise-Scale Intelligence</h2>
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <span className={styles.metricValue} data-target="5">{metricsInView ? '5' : '0'}</span>
              <span className={styles.metricLabel}>Multi-layer intelligence architecture</span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricValue} data-target="24">{metricsInView ? '24/7' : '0'}</span>
              <span className={styles.metricLabel}>Continuous intelligence processing</span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricValue}>Enterprise</span>
              <span className={styles.metricLabel}>Enterprise-grade infrastructure design</span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricValue}>Privacy-first</span>
              <span className={styles.metricLabel}><span className={styles.metricLabelNowrap}>Privacy-first</span> platform engineering</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — Final CTA */}
      <section className={styles.sectionCTA} ref={(el) => (sectionRefs.current[7] = el)}>
        <div className={styles.ctaBg} aria-hidden="true" />
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>
            Explore the Intelligence Infrastructure Powering Autonomous Enterprises
          </h2>
          <p className={styles.ctaDesc}>
            Understand how Anoryx enables enterprises to operate with intelligence, automation, and continuous adaptation.
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/platform/architecture" className={styles.ctaPrimary}>Explore Architecture</Link>
            <Link to="/platform/intelligence-core" className={styles.ctaSecondary}>Understand Intelligence Core</Link>
            <Link to="/platform/security-trust" className={styles.ctaSecondary}>Explore Security Architecture</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
