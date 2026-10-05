import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TrustHeroViz from './TrustHeroViz';
import styles from './SecurityTrust.module.css';
import usePageMeta from '../../hooks/usePageMeta.js';
import { pageMeta } from '../../data/seo.js';

const PRINCIPLES = [
  {
    title: 'Execution Isolation',
    desc: 'Every intelligence action runs within controlled boundaries. Permission limits, execution scopes, and system isolation ensure no unintended infrastructure access.',
    icon: '◉',
  },
  {
    title: 'Decision Verification',
    desc: 'Intelligence decisions are validated before execution. Context consistency, safety constraints, and operational correctness are verified by a dedicated layer.',
    icon: '◇',
  },
  {
    title: 'Infrastructure Integrity',
    desc: 'Trust is enforced at the execution layer. Identity validation, readiness checks, and impact analysis occur before any autonomous action is permitted.',
    icon: '▣',
  },
  {
    title: 'Continuous Trust Monitoring',
    desc: 'Real-time observation of execution behavior, infrastructure health, and agent activity. Trust is continuously evaluated, not assumed.',
    icon: '◎',
  },
];

const TRUST_QA = [
  {
    id: 'safe-execution',
    question: 'How does Anoryx ensure autonomous agents execute safely without introducing infrastructure risk?',
    answer: 'At Anoryx, every execution request is first evaluated by the execution trust controller, which verifies origin, validates authorization, evaluates potential system impact, and confirms compliance with execution safety policies. Autonomous agents do not execute based solely on internal reasoning; they operate within a controlled model governed by infrastructure-level enforcement. Trust validation covers identity authenticity, execution context integrity, infrastructure readiness, and operational safety constraints. This proactive trust enforcement ensures that intelligence actions are inherently safe, controlled, and aligned with enterprise operational integrity requirements. Containment architecture and sandboxed execution environments further ensure that even unexpected behavior remains localized and cannot propagate beyond defined boundaries.',
  },
  {
    id: 'unauthorized-access',
    question: 'What prevents autonomous intelligence from accessing unauthorized systems or data?',
    answer: 'Execution isolation layers ensure that every intelligence action runs inside provisioned execution environments with defined resource access permissions, execution time constraints, system interaction limitations, and communication boundaries. Permission enforcement is applied at the infrastructure level rather than solely in software: agents cannot reach systems or data outside their authorized operational scope. The integration layer connects agents to the broader platform through secure APIs and orchestration pipelines that enforce access control and compliance. This controlled integration architecture ensures that autonomous intelligence operates only within explicitly defined operational boundaries, preventing unauthorized infrastructure access or data exposure.',
  },
  {
    id: 'decision-verification',
    question: 'How are intelligence decisions verified before execution?',
    answer: 'Every decision produced by the intelligence core is evaluated by a dedicated intelligence verification layer that validates decision integrity, contextual consistency, execution safety, and operational correctness. The verification system evaluates execution confidence, validates contextual dependencies, confirms infrastructure compatibility, and ensures that execution will not introduce system instability or unintended side effects. This checkpoint prevents execution of incomplete, inconsistent, or unsafe intelligence outputs. Decision validation, confidence evaluation, context consistency verification, and execution risk assessment are applied before any execution is authorized. Intelligence execution is thus governed by both reasoning capability and structured validation mechanisms that enforce execution correctness and operational safety.',
  },
  {
    id: 'real-time-monitoring',
    question: 'How does Anoryx monitor autonomous execution in real time?',
    answer: 'Continuous trust monitoring systems observe execution behavior, infrastructure performance, agent activity, and system interaction patterns to detect anomalies, inconsistencies, or potential operational risks. Trust is not assumed as a static property but is continuously evaluated through real-time infrastructure monitoring and behavioral analysis. If deviations from expected system behavior are detected, execution can be dynamically adjusted, restricted, or terminated to preserve system integrity. This real-time monitoring ensures that trust remains actively enforced throughout the entire execution lifecycle, allowing the infrastructure to maintain consistent operational reliability even under dynamic or evolving execution conditions. Infrastructure health monitoring, execution behavior monitoring, and system consistency monitoring operate continuously.',
  },
  {
    id: 'trust-at-scale',
    question: 'How does the platform maintain trust at enterprise scale?',
    answer: 'The Anoryx trust architecture distributes trust enforcement across multiple infrastructure layers, ensuring consistent trust validation regardless of system scale or execution volume. As enterprise intelligence infrastructure scales, trust enforcement mechanisms scale proportionally to maintain execution safety and infrastructure integrity. Distributed trust enforcement ensures that intelligence components operating across distributed environments remain governed by consistent safety and execution policies. This scalable trust model enables enterprise intelligence infrastructure to expand without compromising execution safety, operational reliability, or system integrity. Trust validation and enforcement are designed to scale with intelligence growth.',
  },
  {
    id: 'unexpected-behavior',
    question: 'What happens if an autonomous agent behaves unexpectedly?',
    answer: 'Failure containment mechanisms isolate and manage execution anomalies without introducing infrastructure instability. When execution anomalies occur, containment systems restrict impact scope, isolate affected execution environments, and preserve operational continuity across the broader infrastructure. Localized failures do not propagate across infrastructure layers or disrupt unrelated system operations. Execution sandboxing ensures that even in the event of unexpected execution behavior, the impact remains localized within defined containment boundaries. Recovery architecture and isolation at the infrastructure level allow independent operation and recovery of individual intelligence components without affecting overall system stability. Proactive failure containment is implemented at the infrastructure level to maintain consistent operational stability under complex and unpredictable execution conditions.',
  },
  {
    id: 'traceability',
    question: 'How does Anoryx ensure execution traceability and accountability?',
    answer: 'Execution traceability ensures that every intelligence action can be observed, verified, and audited throughout its execution lifecycle. The Anoryx infrastructure maintains execution trace records that capture execution origin, execution intent, infrastructure interaction, and execution outcomes. This traceability enables full operational transparency and allows enterprise operators to understand how intelligence systems interact with infrastructure environments. Observability infrastructure supports system auditing and accountability across intelligence operations. Every autonomous execution is fully observable and verifiable, enhancing trust and enabling compliance and governance requirements.',
  },
  {
    id: 'trust-in-infrastructure',
    question: 'Why is trust built into infrastructure instead of added as a feature?',
    answer: 'Trust within Anoryx infrastructure is not implemented as an external security layer but is engineered directly into the execution architecture itself. Every infrastructure component, intelligence module, and execution pathway operates within structured trust enforcement boundaries. This ensures that trust is an intrinsic property of intelligence infrastructure rather than a supplemental feature. By embedding trust directly into system architecture, Anoryx enables autonomous intelligence to operate safely, reliably, and predictably at enterprise scale. The architectural trust model means that execution-level enforcement is foundational: identity validation, infrastructure readiness verification, execution permission validation, and environmental safety confirmation occur before intelligence executes, making trust a prerequisite rather than an afterthought.',
  },
];

export default function SecurityTrust() {
  usePageMeta(pageMeta('/platform/security-trust'));
  const [openId, setOpenId] = useState(null);
  const principlesRef = useRef(null);
  const [principlesVisible, setPrinciplesVisible] = useState(false);

  useEffect(() => {
    const el = principlesRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setPrinciplesVisible(true); },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageStrip}>
        {/* Section 1 — Hero */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <span className={styles.heroLabel}>ANORYX SECURITY FRAMEWORK</span>
              <h1 className={styles.heroTitle}>Security and Trust Infrastructure for Autonomous Intelligence</h1>
              <p className={styles.heroBody}>
                Trust is enforced at the execution level, not the application level. Before any autonomous action runs, the system performs multi-stage trust validation—identity, infrastructure readiness, execution permissions, and impact analysis—so that intelligence operates within controlled, verifiable boundaries.
              </p>
              <div className={styles.heroCTAs}>
                <Link to="#trust-qa" className={styles.ctaPrimary}>Explore Trust Layers</Link>
                <Link to="/platform/autonomous-agent-system" className={styles.ctaSecondary}>View Execution Safeguards</Link>
              </div>
            </div>
            <div className={styles.heroViz}>
              <div className={styles.heroVizMock}>
                <div className={styles.heroVizPills}>
                  <span className={styles.heroVizPill}>Validation</span>
                  <span className={styles.heroVizPill}>Isolation</span>
                  <span className={styles.heroVizPill}>Monitor</span>
                </div>
                <TrustHeroViz />
                <div className={styles.heroVizStats}>
                  <span className={styles.heroVizStat}>Trust layers: 5</span>
                  <span className={styles.heroVizStat}>Checks: 24/7</span>
                </div>
              </div>
              <div className={styles.heroVizLabels}>
                <span className={styles.heroVizLabel} data-side="tl">Core</span>
                <span className={styles.heroVizLabel} data-side="tr">Shield</span>
                <span className={styles.heroVizLabel} data-side="br">Verify</span>
                <span className={styles.heroVizLabel} data-side="bl">Enforce</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 — Trust Principles Grid */}
        <section className={styles.principles} ref={principlesRef}>
          <div className={styles.principlesInner}>
            <h2 className={styles.principlesTitle}>Foundational Principles of Autonomous Execution Trust</h2>
            <div className={styles.principlesGrid}>
              {PRINCIPLES.map((p, i) => (
                <div key={p.title} className={`${styles.principleCard} ${principlesVisible ? styles.visible : ''}`} style={{ animationDelay: `${i * 0.1}s` }}>
                  <span className={styles.principleIcon}>{p.icon}</span>
                  <h3 className={styles.principleTitle}>{p.title}</h3>
                  <p className={styles.principleDesc}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3 — Trust Q&A */}
        <section className={styles.qaSection} id="trust-qa">
          <div className={styles.qaInner}>
            <span className={styles.qaLabel}>TRUST KNOWLEDGE BASE</span>
            <h2 className={styles.qaTitle}>Understanding How Anoryx Ensures Secure Autonomous Execution</h2>
            <p className={styles.qaSubtitle}>
              Detailed explanations of trust enforcement, execution safety, infrastructure protection, and autonomous reliability.
            </p>
            <div className={styles.qaList}>
              {TRUST_QA.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <article key={item.id} className={styles.qaItem} data-open={isOpen}>
                    <button
                      type="button"
                      className={styles.qaTrigger}
                      onClick={() => toggle(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={`answer-${item.id}`}
                    >
                      <span className={styles.qaQuestion}>{item.question}</span>
                      <span className={styles.qaIcon} aria-hidden>
                        <span className={styles.qaPlus} />
                        <span className={styles.qaMinus} />
                      </span>
                    </button>
                    <div id={`answer-${item.id}`} className={styles.qaAnswerWrap} role="region">
                      <div className={styles.qaAnswerInner}>
                        <p className={styles.qaAnswer}>{item.answer}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 4 — Trust Flow Visual */}
        <section className={styles.flowSection}>
          <div className={styles.flowInner}>
            <h2 className={styles.flowTitle}>Trust Validation Flow</h2>
            <p className={styles.flowSub}>Execution requests pass through verification checkpoints before reaching the execution core.</p>
            <div className={styles.flowViz}>
              <div className={styles.flowNode}>Request</div>
              <span className={styles.flowArrow}>→</span>
              <div className={styles.flowNode}>Identity</div>
              <span className={styles.flowArrow}>→</span>
              <div className={styles.flowNode}>Verification</div>
              <span className={styles.flowArrow}>→</span>
              <div className={styles.flowNode}>Safety</div>
              <span className={styles.flowArrow}>→</span>
              <div className={styles.flowNode}>Execution</div>
            </div>
          </div>
        </section>

        {/* Section 5 — CTA */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>Enterprise-Grade Trust for Autonomous Intelligence</h2>
            <p className={styles.ctaDesc}>
              Anoryx builds trust into the execution architecture so that autonomous intelligence operates safely, reliably, and at scale. Trust is engineered into infrastructure—not added later.
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/platform/architecture" className={styles.ctaBtnPrimary}>Explore Architecture</Link>
              <Link to="/platform/intelligence-core" className={styles.ctaBtnSecondary}>Understand Intelligence Core</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
