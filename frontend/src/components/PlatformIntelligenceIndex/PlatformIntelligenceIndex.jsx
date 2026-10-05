import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './PlatformIntelligenceIndex.module.css';

const INDEX_ITEMS = [
  {
    id: 'infrastructure',
    question: 'What is Anoryx Intelligence Infrastructure?',
    primary:
      'Anoryx Intelligence Infrastructure is the unified technology layer that powers the Anoryx EcoSystem: AI security, AI cost governance and secure team collaboration, connected by a central orchestration layer. It combines scalable cloud-native architecture, secure data pipelines, and research-led engineering to deliver enterprise-grade intelligence across Anoryx Sentinel, Anoryx Delta, Anoryx Rendly and the Anoryx Orchestration Layer.',
    secondary:
      'The infrastructure is designed for long-term relevance—emphasizing privacy-first engineering, system-level thinking, and integration with existing enterprise environments rather than isolated point solutions.',
    knowMoreLink: null,
  },
  {
    id: 'autonomous-execution',
    question: 'How does autonomous execution work within enterprise environments?',
    primary:
      'Autonomous execution within Anoryx is delivered through AI agents and multi-agent workflows that sense enterprise signals, make decisions, and execute actions across infrastructure without constant human intervention. The system uses LLM integration, workflow orchestration, and continuous feedback to operate within governance and security constraints.',
    secondary:
      'Execution is designed to coordinate across cloud systems, internal infrastructure, and enterprise platforms while maintaining compliance and auditability.',
    knowMoreLink: null,
  },
  {
    id: 'integration',
    question: 'How does Anoryx integrate with existing enterprise systems?',
    primary:
      'Anoryx systems integrate via API ecosystems, microservices interfaces, and cloud-native architectures. Our platforms are built for deployment into existing enterprise environments—supporting secure data pipelines, standardized compliance hooks, and scalable backend integration without requiring full rip-and-replace.',
    secondary:
      'Enterprise onboarding workflows and integration readiness are core to our post-development focus, especially for privacy and AI automation products.',
    knowMoreLink: '/platform/architecture',
  },
  {
    id: 'security-trust',
    question: 'How is enterprise security and trust enforced?',
    primary:
      'Security and trust are enforced through privacy-first engineering, intelligent PII detection and protection, compliance automation, and cryptography-backed data processing. Enterprise data is treated as sensitive infrastructure—with controlled access, audit trails, and alignment to global and regional compliance frameworks.',
    secondary:
      'Our approach combines automated compliance intelligence with human oversight and transparent governance so enterprises can innovate without compromising trust.',
    knowMoreLink: '/platform/security-trust',
  },
  {
    id: 'differentiation',
    question: 'What makes Anoryx different from traditional AI platforms?',
    primary:
      'Anoryx integrates AI, data privacy, blockchain, and autonomous workflows into a single cohesive ecosystem rather than offering AI or security in isolation. We focus on research-driven innovation, long-term system thinking, and product-led growth—building technology that remains relevant at scale.',
    secondary:
      'Differentiation comes from combining intelligence, trust, and autonomy in one stack—addressing data protection, intelligent automation, and digital identity together.',
    knowMoreLink: null,
  },
  {
    id: 'continuous-improvement',
    question: 'How does the platform continuously improve and learn?',
    primary:
      'The platform improves through B4Labs, Anoryx’s internal research lab, converting proof-of-concepts into production-ready AI frameworks, reusable agent modules, and workflow intelligence. Operational feedback, research experimentation, and continuous optimization are built into the architecture.',
    secondary:
      'Learning is applied across products: Sentinel benefits from improved detection models, Delta from better cost forecasting, and Rendly from evolving matching capabilities.',
    knowMoreLink: null,
  },
];

export default function PlatformIntelligenceIndex() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      className={styles.section}
      aria-labelledby="platform-intelligence-heading"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.label}>Platform Intelligence Index</span>
          <h2 id="platform-intelligence-heading" className={styles.title}>
            Understanding the Anoryx Intelligence Platform
          </h2>
          <p className={styles.subtitle}>
            Explore how autonomous intelligence operates, executes, and
            integrates across enterprise environments.
          </p>
        </header>

        <div className={styles.list} role="list">
          {INDEX_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <article
                key={item.id}
                className={styles.module}
                data-open={isOpen}
                role="listitem"
              >
                <button
                  type="button"
                  className={styles.trigger}
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`answer-${item.id}`}
                  id={`trigger-${item.id}`}
                >
                  <span className={styles.questionText}>{item.question}</span>
                  <span className={styles.icon} aria-hidden="true">
                    <span className={styles.plus} />
                    <span className={styles.minus} />
                  </span>
                </button>
                <div
                  id={`answer-${item.id}`}
                  className={styles.answerWrapper}
                  role="region"
                  aria-labelledby={`trigger-${item.id}`}
                >
                  <div className={styles.answerInner}>
                    <p className={styles.answerPrimary}>{item.primary}</p>
                    {item.secondary && (
                      <p className={styles.answerSecondary}>{item.secondary}</p>
                    )}
                    {item.knowMoreLink && (
                      <Link
                        to={item.knowMoreLink}
                        className={styles.knowMore}
                      >
                        Know More
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
