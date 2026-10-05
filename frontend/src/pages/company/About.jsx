import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './About.module.css';
import { PRODUCTS, PLATFORM_NAME } from '../../data/products.js';

const PRODUCT_CARD_CLASS = { blue: 'productCardBlue', purple: 'productCardPurple', orange: 'productCardOrange', teal: 'productCardTeal' };
import founderImg from '../../assets/founder.jpg';
import farhanaImg from '../../assets/farhana.jpg';

export default function About() {
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
          { rootMargin: '-10% 0px -10% 0px', threshold: 0 }
        );
        observer.observe(el);
        return () => observer.disconnect();
      });
    return () => observers.forEach((o) => o?.disconnect?.());
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.pageStrip}>
        {/* Section 1 — Company Identity Hero */}
        <section
          className={`${styles.hero} ${styles.sectionStripe} ${inView.hero ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[0] = el)}
          data-section="hero"
        >
          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <span className={styles.heroLabel}>ABOUT ANORYX</span>
              <h1 className={styles.heroTitle}>
                Building the Intelligence Infrastructure for Autonomous Digital Systems
              </h1>
              <p className={styles.heroSub}>
                Anoryx Tech Solutions is an intelligence infrastructure company focused on developing autonomous execution platforms, privacy-first intelligence systems, and enterprise-grade backend intelligence architectures. We build foundational systems that enable software platforms to transition from static execution models to continuously adaptive, intelligence-driven environments.
              </p>
            </div>
            <div className={styles.heroViz}>
              <div className={styles.heroVizCard}>
                <div className={styles.heroVizHeader}>
                  <span className={styles.heroVizDot} /><span className={styles.heroVizDot} /><span className={styles.heroVizDot} />
                  <span className={styles.heroVizTitle}>Intelligence Orchestration</span>
                </div>
                <div className={styles.orchestrateDiagram}>
                  <div className={styles.orchestrateLayer}>
                    <span className={styles.orchestrateNode}>Input</span>
                    <span className={styles.orchestrateNode}>Data</span>
                  </div>
                  <svg className={styles.orchestrateConnector} viewBox="0 0 40 12" preserveAspectRatio="none" aria-hidden><path d="M20 0v4c0 2 4 4 8 4h4M20 0v4c0 2-4 4-8 4H8" stroke="currentColor" strokeWidth="1.2" fill="none" strokeOpacity="0.45"/></svg>
                  <div className={styles.orchestrateLayer}>
                    <span className={`${styles.orchestrateNode} ${styles.orchestrateNodePrimary}`}>Process</span>
                    <span className={`${styles.orchestrateNode} ${styles.orchestrateNodePrimary}`}>Analyze</span>
                  </div>
                  <svg className={styles.orchestrateConnector} viewBox="0 0 40 12" preserveAspectRatio="none" aria-hidden><path d="M20 0v4c0 2 4 4 8 4h4M20 0v4c0 2-4 4-8 4H8" stroke="currentColor" strokeWidth="1.2" fill="none" strokeOpacity="0.45"/></svg>
                  <div className={styles.orchestrateLayer}>
                    <span className={styles.orchestrateNode}>Orchestrate</span>
                    <span className={styles.orchestrateNode}>Execute</span>
                  </div>
                  <svg className={styles.orchestrateConnector} viewBox="0 0 40 12" preserveAspectRatio="none" aria-hidden><path d="M20 0v4c0 2 4 4 8 4h4M20 0v4c0 2-4 4-8 4H8" stroke="currentColor" strokeWidth="1.2" fill="none" strokeOpacity="0.45"/></svg>
                  <div className={styles.orchestrateLayer}>
                    <span className={styles.orchestrateNode}>Output</span>
                  </div>
                </div>
                <div className={styles.heroVizBar}><span style={{ width: '78%' }} /></div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 — Who We Are */}
        <section
          className={`${styles.section} ${styles.sectionStripe} ${styles.whoSection} ${inView.who ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[1] = el)}
          data-section="who"
        >
          <div className={styles.container}>
            <div className={styles.whoHeadingWrap}>
              <span className={styles.whoIcon} aria-hidden>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
              </span>
              <h2 className={styles.whoHeading}>Who We Are</h2>
            </div>
            <p className={styles.whoLead}>
              Anoryx Tech Solutions Private Limited is a deep-technology product and solutions company. We operate in the category of <strong>intelligence infrastructure</strong>—building systems that combine artificial intelligence, autonomous agents, privacy engineering, and enterprise-grade digital platforms.
            </p>
            <div className={styles.whoPillars}>
              <div className={styles.whoPillar}>
                <span className={styles.whoPillarIcon} aria-hidden><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" /><path d="M12 6v6l4 2" /></svg></span>
                <span>Backend intelligence</span>
              </div>
              <div className={styles.whoPillar}>
                <span className={styles.whoPillarIcon} aria-hidden><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /></svg></span>
                <span>Agent orchestration</span>
              </div>
              <div className={styles.whoPillar}>
                <span className={styles.whoPillarIcon} aria-hidden><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg></span>
                <span>Privacy-first pipelines</span>
              </div>
              <div className={styles.whoPillar}>
                <span className={styles.whoPillarIcon} aria-hidden><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><path d="M6 6v.01M6 18v.01" /></svg></span>
                <span>Enterprise AI</span>
              </div>
            </div>
            <div className={styles.whoProse}>
              <p>
                The company exists to address a critical gap: digital transformation has outpaced the world&apos;s ability to secure data, preserve privacy, manage intelligent automation responsibly, and create trusted digital ecosystems. Anoryx researches, engineers, and deploys advanced AI-driven software systems, privacy protection platforms, autonomous workflows, and digital ecosystems that are scalable, secure, and globally competitive. Today the company is building the {PLATFORM_NAME}: one integrated stack for AI security, AI cost governance and team collaboration, connected by a central orchestration layer.
              </p>
              <p>
                We integrate AI, privacy, blockchain, and autonomous workflows into cohesive systems designed for long-term global relevance—rather than addressing intelligence, security, or platforms in isolation.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 — Our Origin */}
        <section
          className={`${styles.sectionAlt} ${styles.sectionStripe} ${styles.originSection} ${inView.origin ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[2] = el)}
          data-section="origin"
        >
          <div className={styles.container}>
            <div className={styles.originHeadingWrap}>
              <span className={styles.originIcon} aria-hidden>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>
              </span>
              <h2 className={styles.originHeading}>Our Origin</h2>
            </div>
            <p className={styles.originLead}>
              Anoryx was founded to overcome the limitations of traditional software systems: static execution models, fragmented security and intelligence layers, and a lack of execution-native intelligence infrastructure that could scale with modern data and automation demands.
            </p>
            <div className={styles.timeline}>
              <div className={`${styles.timelineItem} ${inView.origin ? styles.timelineVisible : ''}`} style={{ transitionDelay: '0.1s' }}>
                <span className={styles.timelineIcon} aria-hidden><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg></span>
                <div className={styles.timelineContent}>
                  <strong>Company founding</strong> — Anoryx Tech Solutions Private Limited incorporated (September 2025), ROC Bangalore. Private limited company focused on deep-technology product development.
                </div>
              </div>
              <div className={`${styles.timelineItem} ${inView.origin ? styles.timelineVisible : ''}`} style={{ transitionDelay: '0.2s' }}>
                <span className={styles.timelineIcon} aria-hidden><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" /><path d="M12 6v6l4 2" /></svg></span>
                <div className={styles.timelineContent}>
                  <strong>Core intelligence infrastructure</strong> — Design and development of scalable backend intelligence architectures, research-first engineering approach, and system-level architecture for autonomous execution.
                </div>
              </div>
              <div className={`${styles.timelineItem} ${inView.origin ? styles.timelineVisible : ''}`} style={{ transitionDelay: '0.3s' }}>
                <span className={styles.timelineIcon} aria-hidden><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /></svg></span>
                <div className={styles.timelineContent}>
                  <strong>Agent orchestration framework</strong> — Development of multi-agent workflows, LLM integration, and autonomous agent systems that power enterprise automation and intelligent decision pipelines.
                </div>
              </div>
              <div className={`${styles.timelineItem} ${inView.origin ? styles.timelineVisible : ''}`} style={{ transitionDelay: '0.4s' }}>
                <span className={styles.timelineIcon} aria-hidden><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg></span>
                <div className={styles.timelineContent}>
                  <strong>Anoryx Sentinel</strong> — zero-trust AI gateway that detects and redacts sensitive data before it reaches external models. Grew out of Anoryx&apos;s earlier PII-protection work; now in early access. Four patents filed (pending).
                </div>
              </div>
              <div className={`${styles.timelineItem} ${inView.origin ? styles.timelineVisible : ''}`} style={{ transitionDelay: '0.5s' }}>
                <span className={styles.timelineIcon} aria-hidden><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg></span>
                <div className={styles.timelineContent}>
                  <strong>Anoryx Rendly</strong> — secure enterprise collaboration: intent-driven matching, encrypted chat and video. In active development, alongside Anoryx Delta (AI FinOps) and the Anoryx Orchestration Layer.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 — What We Build */}
        <section
          className={`${styles.section} ${styles.sectionStripe} ${styles.buildSection} ${inView.build ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[3] = el)}
          data-section="build"
        >
          <div className={styles.container}>
            <div className={styles.buildHeadingWrap}>
              <span className={styles.buildIcon} aria-hidden>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><path d="M6 6v.01M6 18v.01M18 6v.01M18 18v.01" /></svg>
              </span>
              <h2 className={styles.buildHeading}>What We Build</h2>
            </div>
            <div className={styles.buildGrid}>
              {[
                {
                  title: 'Intelligence Infrastructure Systems',
                  body: 'Scalable backend systems that enable software platforms to operate with continuous, adaptive intelligence—replacing static execution with intelligence-driven environments.',
                  variant: 'blue',
                },
                {
                  title: 'Agent Execution Platforms',
                  body: 'Autonomous AI agents, multi-agent enterprise workflows, and LLM-based automation frameworks that deliver intelligent coordination and task execution at scale.',
                  variant: 'green',
                },
                {
                  title: 'Privacy-First Intelligence Systems',
                  body: 'AI-powered PII detection, data leak monitoring, compliance automation, and secure data processing infrastructure for enterprises and regulated industries.',
                  variant: 'purple',
                },
                {
                  title: 'Enterprise Intelligence Backends',
                  body: 'Cloud-native architectures, API ecosystems, microservices platforms, and enterprise workflow automation designed for global SaaS and platform companies.',
                  variant: 'amber',
                },
                {
                  title: 'Autonomous Workflow Execution Platforms',
                  body: 'Execution-native intelligence infrastructure that automates decision workflows, data handling, and operational execution through structured logic and intelligence models.',
                  variant: 'teal',
                },
              ].map((card, i) => (
                <div key={card.title} className={`${styles.buildCard} ${styles[`buildCard${card.variant}`]}`} style={{ transitionDelay: `${i * 0.08}s` }}>
                  <span className={styles.buildCardIcon} aria-hidden>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><path d="M6 14v4M18 14v4M10 10h4" /></svg>
                  </span>
                  <h3 className={styles.buildCardTitle}>{card.title}</h3>
                  <p className={styles.buildCardBody}>{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5 — Mission */}
        <section
          className={`${styles.sectionAlt} ${styles.sectionStripe} ${styles.missionSection} ${inView.mission ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[4] = el)}
          data-section="mission"
        >
          <div className={styles.container}>
            <h2 className={styles.sectionHeading}>Our Mission</h2>
            <p className={styles.missionStatement}>
              To research, engineer, and deploy advanced AI-driven software systems, privacy protection platforms, autonomous workflows, and digital ecosystems that are scalable, secure, and globally competitive.
            </p>
            <p className={styles.missionSub}>
              We focus on execution-native intelligence, modular backend design, and long-term system thinking—building technology that enterprises and governments can rely on for data security, intelligent automation, and trusted digital infrastructure.
            </p>
          </div>
        </section>

        {/* Section 6 — Vision */}
        <section
          className={`${styles.section} ${styles.sectionStripe} ${styles.visionSection} ${inView.vision ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[5] = el)}
          data-section="vision"
        >
          <div className={styles.container}>
            <h2 className={styles.sectionHeading}>Our Vision</h2>
            <p className={styles.visionStatement}>
              To build globally impactful intelligent technology platforms that redefine digital trust, human–AI collaboration, and next-generation digital experiences for individuals, enterprises, and governments.
            </p>
            <p className={styles.visionBold}>
              Long-term, we aim to power autonomous digital systems worldwide through intelligence infrastructure that is secure, scalable, and responsible.
            </p>
          </div>
        </section>

        {/* Section 7 — Engineering Philosophy */}
        <section
          className={`${styles.sectionAlt} ${styles.sectionStripe} ${styles.philosophySection} ${inView.philosophy ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[6] = el)}
          data-section="philosophy"
        >
          <div className={styles.container}>
            <div className={styles.philosophyHeadingWrap}>
              <span className={styles.philosophyIcon} aria-hidden>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /></svg>
              </span>
              <h2 className={styles.philosophyHeading}>Our Engineering Philosophy</h2>
            </div>
            {/* Design Pillars — full width at top */}
            <div className={styles.philosophyVizFull}>
              <div className={styles.philosophyVizCard}>
                <div className={styles.philosophyVizBar} />
                <span className={styles.philosophyVizTitle}>Design pillars</span>
                <div className={styles.philosophyVizMeta}>
                  <span className={styles.philosophyVizMetaItem}>Architecture</span>
                  <span className={styles.philosophyVizMetaItem}>System design</span>
                  <span className={styles.philosophyVizMetaItem}>Infrastructure</span>
                </div>
                <div className={styles.philosophyPillars}>
                  <div className={styles.philosophyPillar}>
                    <span className={styles.philosophyPillarIcon} aria-hidden><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg></span>
                    <span className={styles.philosophyPillarLabel}>Execution-native</span>
                  </div>
                  <div className={styles.philosophyPillar}>
                    <span className={styles.philosophyPillarIcon} aria-hidden><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg></span>
                    <span className={styles.philosophyPillarLabel}>Privacy-first</span>
                  </div>
                  <div className={styles.philosophyPillar}>
                    <span className={styles.philosophyPillarIcon} aria-hidden><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg></span>
                    <span className={styles.philosophyPillarLabel}>Modular</span>
                  </div>
                  <div className={styles.philosophyPillar}>
                    <span className={styles.philosophyPillarIcon} aria-hidden><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg></span>
                    <span className={styles.philosophyPillarLabel}>Scalable</span>
                  </div>
                </div>
                <div className={styles.philosophyVizNodes}>
                  {[...Array(10)].map((_, i) => (
                    <span key={i} className={styles.philosophyVizNode} style={{ animationDelay: `${i * 0.06}s` }} />
                  ))}
                </div>
                <div className={styles.philosophyVizMockRow}>
                  <span className={styles.philosophyVizMockBlock} />
                  <span className={styles.philosophyVizMockBlock} />
                  <span className={styles.philosophyVizMockBlock} />
                  <span className={styles.philosophyVizMockBlock} />
                  <span className={styles.philosophyVizMockBlock} />
                </div>
                <div className={styles.philosophyVizFooter}><span className={styles.philosophyVizProgress} style={{ width: '85%' }} /></div>
              </div>
            </div>
            {/* 4 principles — 2x2 grid below */}
            <div className={styles.philosophyPrinciplesGrid}>
              <div className={`${styles.philosophyPrincipleCard} ${styles.philosophyPrincipleBlue}`}>
                <span className={styles.philosophyPrincipleIcon} aria-hidden><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg></span>
                <div className={styles.philosophyPrincipleContent}>
                  <h3 className={styles.philosophyPrincipleTitle}>Execution-native intelligence</h3>
                  <p className={styles.philosophyPrincipleDesc}>Intelligence built into the execution layer. Systems designed for adaptive, autonomous operation from the ground up.</p>
                </div>
              </div>
              <div className={`${styles.philosophyPrincipleCard} ${styles.philosophyPrincipleGreen}`}>
                <span className={styles.philosophyPrincipleIcon} aria-hidden><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg></span>
                <div className={styles.philosophyPrincipleContent}>
                  <h3 className={styles.philosophyPrincipleTitle}>Privacy-first architecture</h3>
                  <p className={styles.philosophyPrincipleDesc}>Data treated as sensitive infrastructure. Privacy, protection, and controlled intelligence as core design principles.</p>
                </div>
              </div>
              <div className={`${styles.philosophyPrincipleCard} ${styles.philosophyPrinciplePurple}`}>
                <span className={styles.philosophyPrincipleIcon} aria-hidden><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg></span>
                <div className={styles.philosophyPrincipleContent}>
                  <h3 className={styles.philosophyPrincipleTitle}>Modular backend design</h3>
                  <p className={styles.philosophyPrincipleDesc}>Reusable frameworks, clear service boundaries, and system-level architecture for scalability, security, and maintainability.</p>
                </div>
              </div>
              <div className={`${styles.philosophyPrincipleCard} ${styles.philosophyPrincipleAmber}`}>
                <span className={styles.philosophyPrincipleIcon} aria-hidden><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg></span>
                <div className={styles.philosophyPrincipleContent}>
                  <h3 className={styles.philosophyPrincipleTitle}>Scalable infrastructure</h3>
                  <p className={styles.philosophyPrincipleDesc}>Cloud-native, distributed systems for enterprise and global-scale demands with predictable performance and reliability.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8 — Products Developed */}
        <section
          className={`${styles.section} ${styles.sectionStripe} ${styles.productsSection} ${inView.products ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[7] = el)}
          data-section="products"
        >
          <div className={styles.container}>
            <div className={styles.productsHeadingWrap}>
              <span className={styles.productsSectionIcon} aria-hidden>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="7.5 4.21 12 6.81 16.5 4.21" /><polyline points="7.5 19.79 7.5 14.6 3 12" /><polyline points="21 8 12 12 3 8" /><polyline points="3 16 12 20 21 16" /><polyline points="16.5 19.79 16.5 14.6 21 12" /><polyline points="7.5 4.21 7.5 9.4 3 12" /><polyline points="16.5 4.21 16.5 9.4 21 12" /><polyline points="12 6.81 12 12 16.5 14.6" /><polyline points="12 12 12 20 7.5 17.4" /><polyline points="12 12 7.5 9.4 7.5 14.6" /><polyline points="12 12 16.5 14.6 16.5 9.4" /></svg>
              </span>
              <h2 className={styles.productsSectionHeading}>The {PLATFORM_NAME}</h2>
            </div>
            <div className={styles.productsGrid}>
              {PRODUCTS.map((p) => (
                <Link key={p.slug} to={`/products/${p.slug}`} className={`${styles.productCard} ${styles[PRODUCT_CARD_CLASS[p.accent]] || ''}`}>
                  <span className={styles.productCardLabel}>{p.category} · {p.status}</span>
                  <h3 className={styles.productCardTitle}>{p.name}</h3>
                  <p className={styles.productCardBody}>{p.tagline}</p>
                  <span className={styles.productCardLink}>View product →</span>
                </Link>
              ))}
              {/* AFFU: keep / remove? B4Labs is a research lab, not part of the EcoSystem product line. */}
              <Link to="/products#research" className={`${styles.productCard} ${styles.productCardPurple}`}>
                <span className={styles.productCardIcon} aria-hidden><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg></span>
                <span className={styles.productCardLabel}>AI Research</span>
                <h3 className={styles.productCardTitle}>B4LABS</h3>
                <p className={styles.productCardBody}>
                  AI research and experimental technology lab. Focus on autonomous agents, multi-agent workflows, LLM integration, and prototype development. Proof-of-concept completed; advanced development and expansion in progress. Innovation engine for Anoryx products.
                </p>
                <span className={styles.productCardLink}>View research platform →</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Section 9 — Our Team */}
        <section
          className={`${styles.sectionAlt} ${styles.sectionStripe} ${styles.teamSection} ${inView.team ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[8] = el)}
          data-section="team"
        >
          <div className={styles.container}>
            <div className={styles.teamHeadingWrap}>
              <span className={styles.teamSectionIcon} aria-hidden>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
              </span>
              <h2 className={styles.teamSectionHeading}>Our Team</h2>
            </div>
            <p className={styles.teamLead}>
              Anoryx is an engineering-focused organization with technical leadership that prioritizes backend systems, AI infrastructure, and platform engineering. Leadership brings deep-technology orientation, system-level thinking, and research-driven product development.
            </p>
            <div className={styles.teamCards}>
              <div className={styles.teamCard}>
                <div className={styles.teamCardImageWrap}>
                  <img src={founderImg} alt="Afnan Pasha" className={styles.teamCardImage} />
                </div>
                <h4 className={styles.teamCardName}>Afnan Pasha</h4>
                <p className={styles.teamCardRole}>Founder & Director</p>
                <p className={styles.teamCardBio}>Deep technology, system-level thinking, AI engineering, privacy infrastructure, and future-facing digital platforms. Research-driven product development and long-term vision-led execution.</p>
              </div>
              <div className={styles.teamCard}>
                <div className={styles.teamCardImageWrap}>
                  <img src={farhanaImg} alt="Farhana Unnisa" className={styles.teamCardImage} />
                </div>
                <h4 className={styles.teamCardName}>Farhana Unnisa</h4>
                <p className={styles.teamCardRole}>Director</p>
                <p className={styles.teamCardBio}>Director since incorporation (September 2025). Part of the leadership structure guiding company strategy and governance.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10 — Our Core Values */}
        <section
          className={`${styles.section} ${styles.sectionStripe} ${styles.valuesSection} ${inView.values ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[9] = el)}
          data-section="values"
        >
          <div className={styles.container}>
            <div className={styles.valuesHeadingWrap}>
              <span className={styles.valuesIcon} aria-hidden>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              </span>
              <h2 className={styles.valuesHeading}>Our Core Values</h2>
            </div>
            <div className={styles.valuesGrid}>
              {[
                { title: 'Engineering Excellence', body: 'Build scalable, secure, high-performance systems with enterprise-grade code quality and architecture. Integrate AI, automation, and data intelligence into core solutions.', variant: 'blue', icon: 'code' },
                { title: 'Privacy and Security', body: 'Privacy-first engineering and strong security standards. Data treated as sensitive infrastructure; compliance and user protection are non-negotiable.', variant: 'green', icon: 'shield' },
                { title: 'Long-Term Infrastructure Thinking', body: 'Focus on technology that lasts decades, not trends. Responsible AI, product-led growth, and sustainable technical defensibility.', variant: 'purple', icon: 'compass' },
                { title: 'System Reliability', body: 'Predictable release cycles, DevOps and automation-first delivery, and operational excellence that enterprises can depend on.', variant: 'amber', icon: 'activity' },
              ].map((v, i) => (
                <div key={v.title} className={`${styles.valueCard} ${styles[`valueCard${v.variant}`]}`} style={{ transitionDelay: `${i * 0.08}s` }}>
                  <span className={styles.valueCardIcon} aria-hidden>
                    {v.icon === 'code' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>}
                    {v.icon === 'shield' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>}
                    {v.icon === 'compass' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>}
                    {v.icon === 'activity' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>}
                  </span>
                  <h3 className={styles.valueCardTitle}>{v.title}</h3>
                  <p className={styles.valueCardBody}>{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 11 — Technology Focus */}
        <section
          className={`${styles.sectionAlt} ${styles.sectionStripe} ${styles.techSection} ${inView.tech ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[10] = el)}
          data-section="tech"
        >
          <div className={styles.container}>
            <div className={styles.techHeadingWrap}>
              <span className={styles.techSectionIcon} aria-hidden>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /></svg>
              </span>
              <h2 className={styles.techSectionHeading}>Technology Focus</h2>
            </div>
            <div className={styles.techGrid}>
              {[
                { label: 'Backend intelligence systems', icon: 'server' },
                { label: 'Agent orchestration systems', icon: 'layers' },
                { label: 'Enterprise AI infrastructure', icon: 'cpu' },
                { label: 'Privacy-first execution systems', icon: 'lock' },
                { label: 'LLMs and autonomous agents', icon: 'brain' },
                { label: 'Secure data pipelines & compliance automation', icon: 'shield' },
              ].map((item, i) => (
                <div key={item.label} className={styles.techPill} style={{ transitionDelay: `${i * 0.06}s` }}>
                  <span className={styles.techPillIcon} aria-hidden>
                    {item.icon === 'server' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><path d="M6 6v.01M6 18v.01M18 6v.01M18 18v.01" /></svg>}
                    {item.icon === 'layers' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /></svg>}
                    {item.icon === 'cpu' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" /></svg>}
                    {item.icon === 'lock' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>}
                    {item.icon === 'brain' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" /></svg>}
                    {item.icon === 'shield' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>}
                  </span>
                  <span className={styles.techPillLabel}>{item.label}</span>
                </div>
              ))}
            </div>
            <div className={styles.techProseWrap}>
              <p className={styles.techProse}>
                Our stack emphasizes research-first development, system-level architecture, scalability, security, and maintainability. We use AI/ML, LLMs, autonomous agents, privacy engineering, blockchain, distributed systems, and cloud-native architecture to deliver intelligent automation, digital trust, and future-proof infrastructure.
              </p>
            </div>
          </div>
        </section>

        {/* Section 12 — Global Impact */}
        <section
          className={`${styles.section} ${styles.sectionStripe} ${styles.impactSection} ${inView.impact ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[11] = el)}
          data-section="impact"
        >
          <div className={styles.container}>
            <h2 className={styles.sectionHeading}>Building the Future of Intelligent Systems</h2>
            <p className={styles.impactLead}>
              Intelligence infrastructure will define how societies and enterprises operate in the coming decades. Anoryx is positioned at the intersection of AI, digital identity, and data security—building systems that make this new world safer, smarter, and more connected.
            </p>
            <p className={styles.impactBody}>
              Our long-term direction is to become a recognized global deep-technology company known for intelligence infrastructure, privacy-first systems, and multi-product platforms that serve enterprises, governments, and individuals. We focus on product-led growth, proprietary technology IP, and global credibility through measurable impact and technical leadership.
            </p>
          </div>
        </section>

        {/* Section 13 — Company Information */}
        <section
          className={`${styles.sectionAlt} ${styles.sectionStripe} ${styles.companySection} ${inView.company ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[12] = el)}
          data-section="company"
        >
          <div className={styles.container}>
            <div className={styles.companyHeadingWrap}>
              <span className={styles.companyIcon} aria-hidden>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
              </span>
              <h2 className={styles.companyHeading}>Company Information</h2>
            </div>
            <div className={styles.companyGrid}>
              {[
                { label: 'Legal name', value: 'Anoryx Tech Solutions Private Limited', icon: 'building' },
                { label: 'Company type', value: 'Private Limited (Non-Government Company)', icon: 'briefcase' },
                { label: 'CIN', value: 'U58200KA2025PTC207944', icon: 'id' },
                { label: 'Date of incorporation', value: '06 September 2025', icon: 'calendar' },
                { label: 'Registrar of Companies', value: 'ROC – Bangalore', icon: 'file' },
                { label: 'Registered office', value: 'RT Nagar, Bangalore North, Karnataka – 560032, India', icon: 'map' },
                { label: 'Industry classification', value: 'Publishing Activities (Digital / Software / Technology Content & Platforms)', icon: 'layers' },
                { label: 'Country of operation', value: 'India (global market focus)', icon: 'globe' },
              ].map((item, i) => (
                <div key={item.label} className={styles.companyCard} style={{ transitionDelay: `${i * 0.06}s` }}>
                  <span className={styles.companyCardIcon} aria-hidden>
                    {item.icon === 'building' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>}
                    {item.icon === 'briefcase' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>}
                    {item.icon === 'id' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M9 14h6M9 18h6" /></svg>}
                    {item.icon === 'calendar' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>}
                    {item.icon === 'file' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>}
                    {item.icon === 'map' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>}
                    {item.icon === 'layers' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /></svg>}
                    {item.icon === 'globe' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>}
                  </span>
                  <div className={styles.companyCardContent}>
                    <span className={styles.companyCardLabel}>{item.label}</span>
                    <span className={styles.companyCardValue}>{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 14 — CTA */}
        <section
          className={`${styles.ctaSection} ${styles.sectionStripe} ${inView.cta ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[13] = el)}
          data-section="cta"
        >
          <div className={styles.container}>
            <h2 className={styles.ctaHeading}>Join Us in Building the Future of Intelligence Infrastructure</h2>
            <p className={styles.ctaSub}>
              We are building technology that is intelligent, secure, responsible, and globally impactful. If you share our focus on deep-technology and long-term impact, we would like to hear from you.
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/contact" className={styles.ctaBtnSecondary}>Contact</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
