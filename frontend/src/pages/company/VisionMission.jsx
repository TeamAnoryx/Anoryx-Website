import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './VisionMission.module.css';
import usePageMeta from '../../hooks/usePageMeta.js';
import { pageMeta } from '../../data/seo.js';

export default function VisionMission() {
  usePageMeta(pageMeta('/company/vision-mission'));
  const sectionRefs = useRef([]);
  const [inView, setInView] = useState({});

  useEffect(() => {
    const observers = sectionRefs.current
      .filter(Boolean)
      .map((el) => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setInView((prev) => ({ ...prev, [entry.target.dataset.section]: true }));
              }
            });
          },
          { rootMargin: '-2% 0px -2% 0px', threshold: 0 }
        );
        observer.observe(el);
        return () => observer.disconnect();
      });
    return () => observers.forEach((o) => o?.disconnect?.());
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.pageStrip}>
        {/* Section 1 — Hero: Vision Declaration */}
        <section
          className={`${styles.hero} ${inView.hero ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[0] = el)}
          data-section="hero"
        >
          <div className={styles.heroBg}>
            <div className={styles.heroBgNodes}>
              {[...Array(12)].map((_, i) => (
                <span key={i} className={styles.heroNode} style={{ '--i': i }} />
              ))}
            </div>
            <div className={styles.heroBgWaves} aria-hidden>
              <span /><span /><span />
            </div>
          </div>
          <div className={styles.heroInner}>
            <span className={styles.heroLabel}>VISION & MISSION</span>
            <h1 className={styles.heroTitle}>
              Building the Intelligence Infrastructure for Autonomous Systems
            </h1>
            <p className={styles.heroSub}>
              Anoryx Tech Solutions exists to design and deploy foundational intelligence infrastructure that enables software systems to operate autonomously, securely, and continuously adapt to dynamic environments. Our long-term vision is to transform traditional software architectures into intelligent execution environments capable of perception, reasoning, and autonomous decision execution.
            </p>
            <div className={styles.heroScrollIndicator} aria-hidden>
              <span className={styles.heroScrollDot} />
            </div>
          </div>
        </section>

        {/* Section 2 — Vision */}
        <section
          className={`${styles.section} ${styles.sectionStripe} ${styles.visionSection} ${inView.vision ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[1] = el)}
          data-section="vision"
        >
          <div className={styles.visionBg} />
          <div className={styles.container}>
            <div className={styles.visionLayout}>
              <div className={styles.visionContent}>
                <h2 className={styles.sectionHeading}>Our Vision</h2>
                <p>
                  The next evolution of computing is the transition from static software to <strong>intelligent execution systems</strong>. Software that merely processes data is being replaced by systems that perceive context, reason over constraints, and execute decisions autonomously. Intelligence infrastructure is the foundational layer that makes this possible—orchestration, execution platforms, and adaptive learning at the core of every operation.
                </p>
                <p>
                  Anoryx focuses on building this foundational layer rather than applications built on top of it. We believe that autonomous execution systems will reshape industries by enabling enterprises to run continuously adaptive workflows, privacy-first data pipelines, and agent-driven operations at scale. Our vision is to build globally impactful intelligent technology platforms that redefine digital trust, human–AI collaboration, and next-generation digital experiences for individuals, enterprises, and governments.
                </p>
                <p>
                  We are building the intelligence infrastructure for a future where software systems operate with the same reliability, security, and adaptability that enterprises and societies will demand as AI and data become central to every domain.
                </p>
              </div>
              <div className={styles.visionViz}>
                <div className={styles.visionVizCard}>
                  <div className={styles.visionVizCardHeader}>
                    <span className={styles.visionVizCardLabel}>Intelligence systems</span>
                  </div>
                  <div className={styles.visionVizNodes}>
                    <div className={styles.visionVizCell} style={{ '--i': 0 }}>
                      <span className={styles.visionVizIcon} aria-hidden>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 9h6v6H9z" /><path d="M9 4v2M15 4v2M9 18v2M15 18v2M4 9h2M4 15h2M18 9h2M18 15h2" /></svg>
                      </span>
                      <span className={styles.visionVizCellLabel}>Intelligence</span>
                    </div>
                    <div className={styles.visionVizCell} style={{ '--i': 1 }}>
                      <span className={styles.visionVizIcon} aria-hidden>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg>
                      </span>
                      <span className={styles.visionVizCellLabel}>Orchestration</span>
                    </div>
                    <div className={styles.visionVizCell} style={{ '--i': 2 }}>
                      <span className={styles.visionVizIcon} aria-hidden>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                      </span>
                      <span className={styles.visionVizCellLabel}>Execution</span>
                    </div>
                    <div className={styles.visionVizCell} style={{ '--i': 3 }}>
                      <span className={styles.visionVizIcon} aria-hidden>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                      </span>
                      <span className={styles.visionVizCellLabel}>Trust</span>
                    </div>
                    <div className={styles.visionVizCell} style={{ '--i': 4 }}>
                      <span className={styles.visionVizIcon} aria-hidden>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 21h5v-5" /></svg>
                      </span>
                      <span className={styles.visionVizCellLabel}>Adaptive</span>
                    </div>
                    <div className={styles.visionVizCell} style={{ '--i': 5 }}>
                      <span className={styles.visionVizIcon} aria-hidden>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
                      </span>
                      <span className={styles.visionVizCellLabel}>Scale</span>
                    </div>
                  </div>
                  <div className={styles.visionVizFooter}>
                    <div className={styles.visionVizBar}>
                      <span className={styles.visionVizBarFill} style={{ width: '78%' }} />
                    </div>
                    <span className={styles.visionVizBarLabel}>System readiness</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 — Mission */}
        <section
          className={`${styles.sectionAlt} ${styles.sectionStripe} ${styles.missionSection} ${inView.mission ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[2] = el)}
          data-section="mission"
        >
          <div className={styles.missionBg} />
          <div className={styles.container}>
            <header className={styles.missionHeader}>
              <h2 className={styles.sectionHeadingCentered}>Our Mission</h2>
              <p className={styles.missionLead}>
                To research, engineer, and deploy advanced AI-driven software systems, privacy protection platforms, autonomous workflows, and digital ecosystems that are scalable, secure, and globally competitive.
              </p>
            </header>
            <div className={styles.missionCards}>
              <div className={styles.missionCard} style={{ transitionDelay: '0.1s' }}>
                <span className={styles.missionCardIcon} aria-hidden>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><path d="M6 14v4M18 14v4M10 10h4" /></svg>
                </span>
                <h3 className={styles.missionCardTitle}>Building Autonomous Intelligence Infrastructure</h3>
                <p className={styles.missionCardBody}>
                  We develop intelligence core systems, orchestration layers, and execution platforms that enable software to operate autonomously. This includes agent orchestration frameworks, modular backend services, and intelligence execution pipelines that perform tasks without manual intervention—transitioning from static execution to continuously adaptive, intelligence-driven environments.
                </p>
              </div>
              <div className={styles.missionCard} style={{ transitionDelay: '0.2s' }}>
                <span className={styles.missionCardIcon} aria-hidden>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                </span>
                <h3 className={styles.missionCardTitle}>Enabling Privacy-First Intelligent Systems</h3>
                <p className={styles.missionCardBody}>
                  We focus on privacy infrastructure that protects sensitive data while enabling intelligent automation. Anoryx Sentinel detects and redacts PII and secrets before they reach external AI models, and writes a tamper-evident audit trail—treating data as sensitive infrastructure and ensuring privacy, protection, and controlled intelligence are core design principles.
                </p>
              </div>
              <div className={styles.missionCard} style={{ transitionDelay: '0.3s' }}>
                <span className={styles.missionCardIcon} aria-hidden>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><path d="m3.27 6.96 8 4.04M12 19.08l8-4.04" /></svg>
                </span>
                <h3 className={styles.missionCardTitle}>Delivering Enterprise-Grade Intelligence Platforms</h3>
                <p className={styles.missionCardBody}>
                  We build scalable backend intelligence platforms for enterprises and global SaaS providers. Our work includes cloud-native architectures, API ecosystems, microservices platforms, and enterprise workflow automation—designed for long-term reliability, security, and maintainability at scale.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 — Strategic Direction */}
        <section
          className={`${styles.section} ${styles.sectionStripe} ${styles.strategySection} ${inView.strategy ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[3] = el)}
          data-section="strategy"
        >
          <div className={styles.strategyBg} />
          <div className={styles.container}>
            <header className={styles.strategyHeader}>
              <h2 className={styles.sectionHeadingCentered}>From Vision to Execution</h2>
            </header>
            <div className={styles.strategyLayout}>
              <div className={styles.strategyContent}>
                <p className={styles.strategyLead}>
                  Vision becomes reality through a clear execution philosophy.
                </p>
                <p>
                  We develop <strong>intelligence core systems</strong> that form the backbone of adaptive software; we deploy <strong>agent orchestration platforms</strong> that coordinate autonomous workflows and decision pipelines; we create <strong>autonomous execution systems</strong> that run without constant human intervention; and we ensure <strong>continuous evolution</strong> through adaptive learning and research-driven innovation.
                </p>
                <p>
                  Our engineering approach is research-first, with system-level architecture design that emphasizes scalability, security, and maintainability. We build reusable frameworks and internal accelerators that support multiple products—from privacy platforms to AI research labs to digital identity ecosystems—so that intelligence infrastructure compounds across the entire portfolio.
                </p>
              </div>
              <div className={styles.strategyViz}>
                <div className={styles.strategyVizCard}>
                  <div className={styles.strategyVizFlow}>
                    <span className={styles.strategyVizStep} style={{ '--order': 0 }}>Core</span>
                    <span className={styles.strategyVizArrow} aria-hidden />
                    <span className={styles.strategyVizStep} style={{ '--order': 1 }}>Orchestration</span>
                    <span className={styles.strategyVizArrow} aria-hidden />
                    <span className={styles.strategyVizStep} style={{ '--order': 2 }}>Execution</span>
                    <span className={styles.strategyVizArrow} aria-hidden />
                    <span className={styles.strategyVizStep} style={{ '--order': 3 }}>Evolution</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 — Foundational Principles */}
        <section
          className={`${styles.sectionAlt} ${styles.sectionStripe} ${styles.principlesSection} ${inView.principles ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[4] = el)}
          data-section="principles"
        >
          <div className={styles.container}>
            <h2 className={styles.sectionHeadingCentered}>Foundational Principles</h2>
            <div className={styles.principlesGrid}>
              {[
                {
                  title: 'Execution-Native Intelligence',
                  body: 'Intelligence is built into the execution layer, not bolted on. Systems are designed for adaptive, autonomous operation from the ground up—enabling perception, reasoning, and autonomous decision execution rather than static data processing.',
                  icon: 'execution',
                },
                {
                  title: 'Privacy-First Architecture',
                  body: 'Data is treated as sensitive infrastructure. Privacy, protection, and controlled intelligence are core design principles. We build systems that protect users and comply with evolving regulatory frameworks by design.',
                  icon: 'privacy',
                },
                {
                  title: 'Infrastructure-Level Intelligence',
                  body: 'We focus on the foundational layer—intelligence core systems, orchestration, and execution platforms—rather than applications alone. This enables long-term technical defensibility and compound impact across products.',
                  icon: 'infrastructure',
                },
                {
                  title: 'Continuous System Evolution',
                  body: 'Research-driven innovation and long-term system thinking. We invest in adaptive learning, experimentation, and reusable frameworks so that our infrastructure evolves with the demands of enterprises and societies.',
                  icon: 'evolution',
                },
              ].map((principle, i) => (
                <div key={principle.title} className={styles.principleCard} style={{ transitionDelay: `${i * 0.08}s` }}>
                  <span className={styles.principleIcon} aria-hidden>
                    {principle.icon === 'execution' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                    )}
                    {principle.icon === 'privacy' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    )}
                    {principle.icon === 'infrastructure' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M6 12h.01M10 12h.01M14 12h.01M18 12h.01" /></svg>
                    )}
                    {principle.icon === 'evolution' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /><circle cx="12" cy="12" r="4" /></svg>
                    )}
                  </span>
                  <h3 className={styles.principleTitle}>{principle.title}</h3>
                  <p className={styles.principleBody}>{principle.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6 — Long-Term Commitment */}
        <section
          className={`${styles.section} ${styles.sectionStripe} ${styles.commitmentSection} ${inView.commitment ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[5] = el)}
          data-section="commitment"
        >
          <div className={styles.commitmentBg}>
            <div className={styles.commitmentBgGlow} />
          </div>
          <div className={styles.container}>
            <header className={styles.commitmentHeader}>
              <h2 className={styles.sectionHeadingCentered}>Our Commitment to the Future of Intelligent Systems</h2>
            </header>
            <p className={styles.commitmentLead}>
              Anoryx is committed to building foundational intelligence infrastructure that will matter for decades. We focus on engineering excellence—scalable, secure, high-performance systems with enterprise-grade architecture—and on responsibility: privacy, reliability, and scalability are non-negotiable.
            </p>
            <p className={styles.commitmentBody}>
              We build technology that lasts, prioritizes user protection, and creates real-world impact beyond short-term trends. Our long-term commitment is to stand at the intersection of AI, digital identity, and data security—building systems that make the next era of computing safer, smarter, and more connected for individuals, enterprises, and governments.
            </p>
          </div>
        </section>

        {/* Section 7 — CTA (no stripe) */}
        <section
          className={`${styles.ctaSection} ${inView.cta ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[6] = el)}
          data-section="cta"
        >
          <div className={styles.container}>
            <h2 className={styles.ctaHeading}>Building the Foundation for Autonomous Intelligence</h2>
            <p className={styles.ctaSub}>
              Explore our platform architecture, intelligence core, and solutions for enterprise and privacy-critical environments.
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/platform/overview" className={styles.ctaBtnPrimary}>Explore Platform</Link>
              <Link to="/solutions" className={styles.ctaBtnSecondary}>View Solutions</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
