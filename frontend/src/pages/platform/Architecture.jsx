import { Link } from 'react-router-dom';
import styles from './Architecture.module.css';
import usePageMeta from '../../hooks/usePageMeta.js';
import { pageMeta } from '../../data/seo.js';

/* Components section: black icons (left of title), modern stroke style */
const COMPONENT_ICONS = {
  'Real-Time Signal Processing': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M4 12h2v6H4v-6zm4-4h2v10H8V8zm4-3h2v13h-2V5zm4 5h2v8h-2v-8z" /></svg>
  ),
  'Autonomous Decision Execution': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 9h6v6H9z" /><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" /></svg>
  ),
  'Cross-System Orchestration': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="12" r="2.5" /><circle cx="12" cy="19" r="2.5" /><path d="M12 7.5v2M9.5 10.5L8 12M12 16.5v2M14.5 10.5L16 12M7.5 12H9.5M16.5 12H14.5M10.5 14.5L12 16" /></svg>
  ),
  'Enterprise Integration Infrastructure': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
  ),
  'Continuous Learning Systems': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 21h5v-5" /></svg>
  ),
  'Execution Automation Engine': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polygon points="5 3 19 12 5 21 5 3" /><line x1="19" y1="12" x2="5" y2="12" /></svg>
  ),
};

/* Principles section: square wrapper + black icons (different from Components) */
const PRINCIPLE_ICONS = {
  'Autonomous-First Design': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="3" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>
  ),
  'Execution-Native Intelligence': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
  ),
  'Continuous Evolution': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
  ),
  'Infrastructure-Grade Reliability': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
  ),
};

const LAYERS = [
  { name: 'Enterprise Data Fabric', desc: 'Unifies and processes enterprise signals from diverse data sources and systems, creating a consistent intelligence-ready data layer. Handles ingestion, normalization, and structuring for downstream processing.', responsibilities: 'Signal ingestion, schema normalization, data quality', inputs: 'Enterprise systems, APIs, streaming sources', outputs: 'Structured intelligence-ready datasets' },
  { name: 'Cognitive Intelligence Engine', desc: 'Applies reasoning models and contextual analysis to transform structured signals into actionable intelligence. Performs perception, inference, and decision generation.', responsibilities: 'Reasoning, context enrichment, decision generation', inputs: 'Structured data from fabric', outputs: 'Decisions, recommendations, execution intents' },
  { name: 'Agent Orchestration Layer', desc: 'Coordinates autonomous agents to execute operational decisions. Manages task distribution, coordination, and workflow execution across the platform.', responsibilities: 'Agent coordination, task allocation, execution scheduling', inputs: 'Execution intents from Intelligence Core', outputs: 'Orchestrated execution tasks' },
  { name: 'Execution Infrastructure', desc: 'Interfaces directly with enterprise systems to perform intelligence-driven actions. Enables execution within applications, platforms, and operational environments.', responsibilities: 'System integration, action execution, result capture', inputs: 'Orchestrated tasks', outputs: 'Execution results, system state changes' },
  { name: 'Integration Layer', desc: 'Connects the platform to enterprise systems, data stores, and external services. Provides standardized connectors and secure communication.', responsibilities: 'Connectivity, protocol translation, security boundaries', inputs: 'External systems', outputs: 'Unified platform interface' },
  { name: 'Security Layer', desc: 'Enforces isolation, access control, and infrastructure protection. Ensures execution security and platform integrity across all layers.', responsibilities: 'Isolation, authentication, audit', inputs: 'All layer interactions', outputs: 'Secure, auditable operations' },
  { name: 'Learning and Optimization Layer', desc: 'Continuously improves intelligence performance through feedback analysis and outcome optimization. Closes the loop from execution back to intelligence.', responsibilities: 'Feedback ingestion, model refinement, performance optimization', inputs: 'Execution outcomes, metrics', outputs: 'Improved intelligence, updated models' },
];

const FLOW_STAGES = [
  { title: 'Signal Ingestion', desc: 'Enterprise signals captured from systems, APIs, and operational environments' },
  { title: 'Data Structuring', desc: 'Raw signals normalized and structured for intelligence processing' },
  { title: 'Intelligence Processing', desc: 'Reasoning and decision generation from structured data' },
  { title: 'Decision Orchestration', desc: 'Autonomous agents coordinated to execute decisions' },
  { title: 'Execution Layer', desc: 'Actions executed across enterprise systems and infrastructure' },
  { title: 'Feedback Loop', desc: 'Outcomes fed back to drive continuous learning and optimization' },
];

const COMPONENTS = [
  { title: 'Real-Time Signal Processing', desc: 'Processes enterprise signals at ingestion speed for immediate awareness and response.', summary: 'Low-latency signal handling' },
  { title: 'Autonomous Decision Execution', desc: 'Converts intelligence into action through coordinated autonomous agents without manual intervention.', summary: 'Agent-driven execution' },
  { title: 'Cross-System Orchestration', desc: 'Orchestrates workflows and decisions across multiple enterprise systems and environments.', summary: 'Unified orchestration' },
  { title: 'Enterprise Integration Infrastructure', desc: 'Secure, scalable connectivity to enterprise data and systems with standardized connectors.', summary: 'Integration fabric' },
  { title: 'Continuous Learning Systems', desc: 'Improves intelligence and execution quality from operational feedback and outcomes.', summary: 'Closed-loop learning' },
  { title: 'Execution Automation Engine', desc: 'Runs intelligence-driven automation across applications and operational infrastructure.', summary: 'Automation runtime' },
];

const PRINCIPLES = [
  { title: 'Autonomous-First Design', desc: 'Architecture is designed for autonomous operation rather than manual control at every step.' },
  { title: 'Execution-Native Intelligence', desc: 'Intelligence is built for execution; decisions flow directly into actionable outcomes.' },
  { title: 'Continuous Evolution', desc: 'Platform improves through operational feedback and continuous optimization.' },
  { title: 'Infrastructure-Grade Reliability', desc: 'Engineered for stability, scalability, and operational continuity at enterprise scale.' },
];

export default function Architecture() {
  usePageMeta(pageMeta('/platform/architecture'));
  return (
    <div className={styles.page}>
      <div className={styles.pageStrip}>
      {/* SECTION 1 — Architecture Hero */}
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <span className={styles.heroLabel}>ANORYX PLATFORM ARCHITECTURE</span>
            <h1 className={styles.heroTitle}>
              The Intelligence Infrastructure Powering Autonomous Enterprise Execution
            </h1>
            <p className={styles.heroSubtext}>
              Anoryx is built as a layered intelligence infrastructure: enterprise signal ingestion, a central cognitive engine, agent orchestration, and execution infrastructure—all connected by a continuous learning loop. This is not a SaaS wrapper; it is execution-native intelligence infrastructure.
            </p>
            <div className={styles.heroCTAs}>
              <a href="#layers" className={styles.ctaPrimary}>Explore Intelligence Layers</a>
              <a href="#execution" className={styles.ctaSecondary}>Understand Execution Architecture</a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Layer-by-Layer Deep Explanation */}
      <section className={styles.section} id="layers">
        <div className={styles.container}>
          <span className={styles.sectionLabel}>Layer-by-Layer</span>
          <h2 className={styles.sectionTitle}>Architecture Deep Explanation</h2>
          <p className={styles.sectionLead}>
            Each layer has defined responsibilities, inputs, outputs, and internal components. Together they form the intelligence execution stack.
          </p>
          <div className={styles.layerStack}>
            {LAYERS.map((layer) => (
              <div key={layer.name} className={styles.layerCard}>
                <h3 className={styles.layerCardTitle}>{layer.name}</h3>
                <p className={styles.layerCardDesc}>{layer.desc}</p>
                <dl className={styles.layerMeta}>
                  <dt>Responsibilities</dt>
                  <dd>{layer.responsibilities}</dd>
                  <dt>Inputs</dt>
                  <dd>{layer.inputs}</dd>
                  <dt>Outputs</dt>
                  <dd>{layer.outputs}</dd>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — Intelligence Flow Pipeline */}
      <section className={styles.sectionFlow}>
        <div className={styles.container}>
          <span className={styles.sectionLabel}>Execution Flow</span>
          <h2 className={styles.sectionTitle}>Intelligence Flow Pipeline</h2>
          <p className={styles.sectionLead}>
            How intelligence moves through the system: from signal ingestion through processing, orchestration, execution, and back into learning.
          </p>
          <div className={styles.flowPipeline}>
            {FLOW_STAGES.map((stage, i) => (
              <div key={stage.title} className={styles.flowNode}>
                <div className={styles.flowDot} />
                <h4 className={styles.flowNodeTitle}>{stage.title}</h4>
                <p className={styles.flowNodeDesc}>{stage.desc}</p>
                {i < FLOW_STAGES.length - 1 && <span className={styles.flowArrow} aria-hidden>→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — Core Infrastructure Components Grid */}
      <section className={styles.section}>
        <div className={styles.container}>
          <span className={styles.sectionLabel}>Components</span>
          <h2 className={styles.sectionTitle}>Core Infrastructure Components</h2>
          <div className={styles.compGrid}>
            {COMPONENTS.map((c) => (
              <div key={c.title} className={styles.compCard}>
                <div className={styles.compCardHeader}>
                  <span className={styles.compCardIcon}>{COMPONENT_ICONS[c.title]}</span>
                  <h3 className={styles.compCardTitle}>{c.title}</h3>
                </div>
                <p className={styles.compCardDesc}>{c.desc}</p>
                <span className={styles.compCardSummary}>{c.summary}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — Platform Execution Architecture */}
      <section className={styles.sectionAlt} id="execution">
        <div className={styles.container}>
          <span className={styles.sectionLabel}>Execution</span>
          <h2 className={styles.sectionTitle}>Platform Execution Architecture</h2>
          <p className={styles.sectionLead}>
            Anoryx converts intelligence into real actions through an execution engine, agent orchestration, and system integration layer. The execution infrastructure interfaces with enterprise systems to perform intelligence-driven automation at scale.
          </p>
          <div className={styles.execBlock}>
            <h4>Execution Engine</h4>
            <p>Runs decision outputs as concrete tasks and workflows, with retries, observability, and result capture.</p>
            <h4>Agent Orchestration</h4>
            <p>Coordinates autonomous agents for task distribution, scheduling, and execution coordination.</p>
            <h4>System Integration Layer</h4>
            <p>Secure connectivity to enterprise applications, data stores, and external systems.</p>
            <h4>Automation Infrastructure</h4>
            <p>Runtime for running automated workflows and actions across the enterprise.</p>
          </div>
        </div>
      </section>

      {/* SECTION 7 — Security and Trust Architecture */}
      <section className={styles.section}>
        <div className={styles.container}>
          <span className={styles.sectionLabel}>Trust</span>
          <h2 className={styles.sectionTitle}>Security and Trust Architecture</h2>
          <p className={styles.sectionLead}>
            Isolation model, execution security, infrastructure protection, and platform integrity are built into every layer.
          </p>
          <div className={styles.securityWrap}>
            <div className={styles.securityShield} aria-hidden />
            <div className={styles.securityContent}>
              <div className={styles.securityItem}>
                <h4>Isolation Model</h4>
                <p>Tenant and execution isolation to prevent cross-tenant and cross-workflow interference.</p>
              </div>
              <div className={styles.securityItem}>
                <h4>Execution Security</h4>
                <p>Signed, audited execution paths and least-privilege access for agents and integrations.</p>
              </div>
              <div className={styles.securityItem}>
                <h4>Infrastructure Protection</h4>
                <p>Network and compute hardening, encryption in transit and at rest.</p>
              </div>
              <div className={styles.securityItem}>
                <h4>Platform Integrity</h4>
                <p>Integrity checks, supply-chain security, and continuous verification.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — Scalability and Deployment */}
      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <span className={styles.sectionLabel}>Scale</span>
          <h2 className={styles.sectionTitle}>Scalability and Deployment Architecture</h2>
          <p className={styles.sectionLead}>
            Cloud deployment model, distributed architecture, horizontal scalability, and enterprise readiness.
          </p>
          <ul className={styles.scaleList}>
            <li><strong>Cloud deployment:</strong> Deployable on major clouds with consistent control plane.</li>
            <li><strong>Distributed architecture:</strong> Components scale independently; no single bottleneck.</li>
            <li><strong>Horizontal scalability:</strong> Add capacity by adding nodes; linear scaling for ingestion and execution.</li>
            <li><strong>Enterprise readiness:</strong> SLAs, multi-region, disaster recovery, and compliance-oriented design.</li>
          </ul>
        </div>
      </section>

      {/* SECTION 9 — Architecture Principles */}
      <section className={styles.section}>
        <div className={styles.container}>
          <span className={styles.sectionLabel}>Principles</span>
          <h2 className={styles.sectionTitle}>Architecture Principles</h2>
          <div className={styles.principlesGrid}>
            {PRINCIPLES.map((p) => (
              <div key={p.title} className={styles.principleCard}>
                <div className={styles.principleCardHeader}>
                  <span className={styles.principleIconWrap}>{PRINCIPLE_ICONS[p.title]}</span>
                  <h3 className={styles.principleTitle}>{p.title}</h3>
                </div>
                <p className={styles.principleDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      </div>
      {/* SECTION 10 — Summary and CTA (no vertical lines) */}
      <section className={styles.sectionCTA}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Anoryx is intelligence infrastructure</h2>
          <p className={styles.ctaDesc}>
            Not a SaaS tool or an AI wrapper. A true intelligence execution platform—layered, scalable, and built for autonomous enterprise operation.
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/platform/intelligence-core" className={styles.ctaPrimary}>Explore Intelligence Core</Link>
            <Link to="/platform/overview" className={styles.ctaSecondary}>Explore Platform Overview</Link>
            <a href="/company/about#contact" className={styles.ctaTertiary}>Contact Architecture Team</a>
          </div>
        </div>
      </section>
    </div>
  );
}
