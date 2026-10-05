import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NeuralIntelligenceViz from './NeuralIntelligenceViz';
import styles from './IntelligenceCore.module.css';

const CAPABILITIES = [
  {
    title: 'Cognitive Signal Processing',
    body: 'Ingests and interprets enterprise signals from diverse data sources, APIs, and operational environments. Normalizes, structures, and enriches raw signals into a consistent intelligence-ready representation. Supports real-time and batch processing with configurable pipelines and schema-aware validation. Forms the input layer for all downstream reasoning and decision computation.',
  },
  {
    title: 'Autonomous Decision Engine',
    body: 'Computes actionable decisions from structured signals using reasoning models, context, and policy constraints. Produces execution intents, recommendations, and orchestration directives without requiring manual approval for defined decision classes. Designed for determinism and auditability: every decision is traceable to input state and model version. Enables safe autonomous operation at enterprise scale.',
  },
  {
    title: 'Context Awareness Layer',
    body: 'Maintains a system-wide context model that persists operational state, entity relationships, and temporal information. Enriches incoming signals with historical and cross-entity context to improve reasoning accuracy. Supports multi-tenant and multi-environment isolation while allowing shared intelligence where appropriate. Context is updated continuously as execution and feedback flow back into the core.',
  },
  {
    title: 'Execution Orchestration Runtime',
    body: 'Coordinates the execution of decisions across autonomous agents and downstream systems. Allocates tasks, manages dependencies, and ensures that execution intents are carried out in the correct order and within defined constraints. Handles retries, timeouts, and failure propagation. Acts as the bridge between the cognitive layer and the execution infrastructure that interfaces with enterprise systems.',
  },
  {
    title: 'Distributed Intelligence Coordination',
    body: 'Enables multiple Intelligence Core instances or reasoning nodes to operate in a coordinated fashion. Supports horizontal scaling, geographic distribution, and defined consistency levels where required. State synchronization and consensus are handled in a way that preserves latency and throughput for real-time enterprise workloads. Designed for high availability and fault tolerance.',
  },
  {
    title: 'Continuous Learning Engine',
    body: 'Integrates feedback from execution outcomes, user corrections, and system metrics back into the intelligence layer. Drives model refinement, policy updates, and parameter tuning without requiring full retraining in every cycle. Closes the loop from action to intelligence so that the platform improves with use. Operates under strict governance to maintain safety and predictability.',
  },
];

export default function IntelligenceCore() {
  const technicalBlockRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [technicalVisible, setTechnicalVisible] = useState(false);

  useEffect(() => {
    const block = technicalBlockRef.current;
    if (!block) return;
    const onScroll = () => {
      const rect = block.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      const progress = (viewHeight - rect.top) / (rect.height + viewHeight);
      setScrollProgress(Math.min(1, Math.max(0, progress)));
      if (rect.top < viewHeight * 0.85) setTechnicalVisible(true);
    };
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setTechnicalVisible(true); },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    io.observe(block);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.pageStrip}>
      {/* Section 1 — Intelligence Core Hero (asymmetric split) */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Intelligence Core</h1>
            <p className={styles.heroSubtitle}>The Cognitive Engine Powering Autonomous Enterprise Execution</p>
            <p className={styles.heroBody}>
              Intelligence Core is the central cognitive layer of the Anoryx platform. It processes enterprise signals from data fabrics, APIs, and operational systems; performs reasoning and context-aware analysis; and orchestrates autonomous decision execution across the stack. It maintains a system-wide intelligence state, acts as the orchestration and intelligence runtime for the entire platform, and integrates with the execution infrastructure and continuous learning systems. Built for scalability, determinism, and enterprise-grade reliability—it is the brain of Anoryx’s autonomous intelligence infrastructure.
            </p>
            <div className={styles.heroCTAs}>
              <Link to="/platform/architecture" className={styles.ctaPrimary}>Explore Architecture</Link>
              <Link to="/platform/autonomous-agent-system" className={styles.ctaSecondary}>Understand Autonomous Execution</Link>
            </div>
          </div>
          <div className={styles.heroViz}>
            <NeuralIntelligenceViz />
          </div>
        </div>
      </section>

      {/* Section 2 — Deep Technical Explanation */}
      <section className={styles.technical} ref={technicalBlockRef}>
        <div className={styles.readingIndicator} style={{ height: `${scrollProgress * 100}%` }} aria-hidden />
        <div className={styles.technicalInner}>
          <h2 className={styles.technicalHeading}>Technical Foundation</h2>
          <div className={`${styles.technicalContent} ${technicalVisible ? styles.visible : ''}`}>
            <p className={styles.technicalPara}>
              The Intelligence Core is responsible for signal interpretation, context modeling, decision computation, autonomous orchestration, execution coordination, and the integration of learning feedback. Enterprise signals—whether from the data fabric, integrated systems, or real-time streams—are ingested, normalized, and passed into a context-aware reasoning pipeline. The core maintains a persistent view of the operational state, entity relationships, and temporal context required for consistent and accurate decisions.
            </p>
            <p className={styles.technicalPara}>
              Decision computation is performed using configurable reasoning models and policy constraints. The system produces execution intents and orchestration directives that are then handed to the agent orchestration and execution infrastructure. This design ensures that intelligence is not an isolated layer but the central coordinator: it determines what should happen, and the execution layers determine how it is carried out in enterprise systems. State is updated continuously as actions complete and feedback is returned, enabling the platform to remain consistent and auditable.
            </p>
            <p className={styles.technicalPara}>
              Autonomous execution is enabled by strict boundaries around what the core can decide, how decisions are validated, and how execution is scoped. The architecture supports deterministic behavior where required and allows probabilistic or adaptive behavior only where it is safe and governed. Integration with the broader platform architecture is achieved through well-defined interfaces: the data fabric supplies signals, the execution layer consumes intents, and the learning engine consumes outcomes. This keeps the Intelligence Core focused on its role as the cognitive engine while the rest of the stack handles ingestion, execution, and evolution.
            </p>
            <p className={styles.technicalPara}>
              Scalable enterprise intelligence is achieved through horizontal scaling of reasoning nodes, distributed state coordination, and efficient use of compute and memory. The core is designed to handle high throughput and low latency where the business requires it, and to batch or defer work where latency is acceptable. Multi-tenant and multi-environment support ensure that enterprises can run isolated instances or shared infrastructure according to their compliance and operational needs.
            </p>
            <p className={styles.technicalPara}>
              Learning feedback is integrated in a controlled manner. Outcomes from execution, user corrections, and system metrics are fed back into the core to drive model refinement and policy updates. This closed loop is governed so that changes to intelligence behavior are traceable, reversible, and aligned with safety and compliance requirements. The result is a platform that improves with use while remaining predictable and trustworthy for enterprise deployment.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 — Core Functional Capabilities Grid */}
      <section className={styles.capabilities}>
        <div className={styles.capabilitiesInner}>
          <h2 className={styles.capabilitiesHeading}>Core Functional Capabilities</h2>
          <p className={styles.capabilitiesLead}>
            Infrastructure modules that together form the Intelligence Core. Each module has defined inputs, outputs, and integration points with the rest of the platform.
          </p>
          <div className={styles.capGrid}>
            {CAPABILITIES.map((cap, i) => (
              <article key={cap.title} className={styles.capCard} style={{ animationDelay: `${i * 0.08}s` }}>
                <h3 className={styles.capCardTitle}>{cap.title}</h3>
                <p className={styles.capCardBody}>{cap.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — Trust and Reliability Statement */}
      <section className={styles.trust}>
        <div className={styles.trustLine} aria-hidden />
        <div className={styles.trustInner}>
          <h2 className={styles.trustHeading}>Trust and Reliability</h2>
          <div className={styles.trustContent}>
            <p className={styles.trustPara}>
              Intelligence Core is engineered for reliability, determinism, security, scalability, and fault tolerance. It is designed to ensure safe and reliable autonomous execution in enterprise environments where incorrect or unpredictable behavior is not acceptable.
            </p>
            <p className={styles.trustPara}>
              Reliability is achieved through redundant reasoning paths, graceful degradation, and clear failure boundaries. Determinism is maintained where the business requires reproducible outcomes: same inputs and configuration produce the same decisions. Security is enforced at every layer—data in transit and at rest, access control, and audit trails for every decision and execution. Scalability is built in: the core can be deployed across multiple nodes and regions to meet throughput and latency requirements. Fault tolerance ensures that single-node or partial failures do not compromise system-wide intelligence; state is recovered and processing continues within defined recovery objectives.
            </p>
            <p className={styles.trustPara}>
              Enterprise-grade stability means predictable performance under load, controlled rollouts of model and policy changes, and compatibility with existing enterprise security and compliance frameworks. Anoryx builds technology that the world can rely on—Intelligence Core is the foundation of that commitment for autonomous enterprise execution.
            </p>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
