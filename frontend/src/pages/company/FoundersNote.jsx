import { useEffect, useRef, useState } from 'react';
import styles from './FoundersNote.module.css';
import founderImg from '../../assets/founder.webp';

const FOUNDER_NAME = 'Afnan Pasha';
const FOUNDER_TITLE = 'Founder & Director';
const FOUNDER_TITLE_ARCHITECT = 'Founder & Chief Architect';

export default function FoundersNote() {
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
          { rootMargin: '-5% 0px -5% 0px', threshold: 0 }
        );
        observer.observe(el);
        return () => observer.disconnect();
      });
    return () => observers.forEach((o) => o?.disconnect?.());
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.pageStrip}>
        {/* Section 1 — Hero */}
        <section
          className={`${styles.hero} ${styles.sectionStripe} ${inView.hero ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[0] = el)}
          data-section="hero"
        >
          <div className={styles.heroBg} />
          <div className={styles.heroInner}>
            <div className={styles.heroPortraitWrap}>
              <div className={styles.heroPortrait} aria-hidden>
                <img src={founderImg} alt="" className={styles.heroPortraitImg} />
              </div>
            </div>
            <div className={styles.heroContent}>
              <span className={styles.heroLabel}>FOUNDER'S NOTE</span>
              <h1 className={styles.heroTitle}>A Letter from the Founder</h1>
              <p className={styles.heroMeta}>{FOUNDER_NAME}</p>
              <p className={styles.heroRole}>{FOUNDER_TITLE_ARCHITECT}<br />Anoryx Tech Solutions Pvt Ltd</p>
            </div>
          </div>
        </section>

        {/* Section 2 — Full Founder's Note */}
        <section
          className={`${styles.section} ${styles.sectionStripe} ${styles.noteSection} ${inView.note ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[1] = el)}
          data-section="note"
        >
          <div className={styles.container}>
            <div className={styles.noteColumn}>
              <div className={styles.noteVerticalStripe} aria-hidden />
              <div className={styles.noteBody}>
                <p>
                  I did not start Anoryx to simply build software. I started it because I saw a world moving faster than its ability to protect, understand, and empower the people living in it. Technology was evolving, but trust, security, and meaningful digital connection were not evolving at the same pace. I wanted to change that.
                </p>
                <p>
                  Anoryx was born from a deep belief that technology should not just be powerful—it should be intelligent, responsible, and deeply human-centric. Every product we build carries a single underlying purpose: to solve real problems that affect real lives at scale. Whether it is protecting sensitive personal data, building intelligent AI systems, or creating platforms that redefine how people connect and grow professionally, our mission is to build technology that the world can rely on without hesitation.
                </p>
                <p>
                  I have always been driven by curiosity—how systems work, how intelligence can be replicated, and how technology can be pushed beyond conventional limits. But curiosity alone is not enough. What drives Anoryx forward is a combination of ambition and responsibility. We are not here to follow trends. We are here to build foundational digital infrastructure that will still matter decades from now.
                </p>
                <p>
                  Through products like privacy protection platforms, advanced AI research systems, and next-generation digital ecosystems, Anoryx is building a future where individuals feel safe in the digital world, businesses can innovate without fear of data compromise, and technology becomes a partner to human progress rather than a risk to it.
                </p>
                <p>
                  This company is deeply personal to me. It represents years of learning, experimentation, failures, rebuilding, and relentless effort. Every system we design, every architecture we plan, and every product we launch carries a piece of that journey. Anoryx is not just a company—it is a commitment to building technology with purpose, depth, and global impact.
                </p>
                <p>
                  I envision Anoryx growing into a global deep-technology powerhouse known for three things: intelligence, trust, and innovation. A company that leads in AI engineering, data privacy infrastructure, and large-scale digital platforms. A company that attracts brilliant minds who want to build technology that actually matters.
                </p>
                <p>
                  The world is entering an era where AI, digital identity, and data security will define how societies function. Anoryx will stand at that intersection—building systems that make this new world safer, smarter, and more connected.
                </p>
                <p>
                  This is not a short-term mission. This is a generational journey. And we are just getting started.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 — Why Anoryx Was Created */}
        <section
          className={`${styles.sectionAlt} ${styles.sectionStripe} ${styles.whySection} ${inView.why ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[2] = el)}
          data-section="why"
        >
          <div className={styles.whyBg} />
          <div className={styles.container}>
            <div className={styles.whyLayout}>
              <div className={styles.whyContent}>
                <div className={styles.whyHeadingWrap}>
                  <span className={styles.whySectionIcon} aria-hidden>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /></svg>
                  </span>
                  <h2 className={styles.whySectionHeading}>Why Anoryx Exists</h2>
                </div>
                <p className={styles.whyLead}>
                  Traditional software systems are built for static execution: they process data when asked, follow fixed rules, and require constant human oversight. The limitations are clear—they cannot adapt at the pace of modern data, they cannot reason over context, and they treat intelligence as an add-on rather than the core.
                </p>
                <p>
                  Anoryx exists because the next evolution of computing is <strong>autonomous execution infrastructure</strong>. Enterprises need systems that operate continuously, perceive context, and execute decisions without waiting for manual intervention. That requires <strong>intelligence-native backend systems</strong>—orchestration layers, agent frameworks, and execution platforms designed from the ground up for adaptive behavior.
                </p>
                <p>
                  Equally critical is <strong>privacy-first AI infrastructure</strong>. Data must be treated as sensitive infrastructure, not a resource to exploit. As AI and automation become central to every domain, trust and protection cannot be afterthoughts. Anoryx builds systems where privacy, security, and controlled intelligence are foundational—enabling enterprises to deploy intelligent automation without compromising on compliance or user trust.
                </p>
              </div>
              <div className={styles.whyViz}>
                <div className={styles.whyVizCard}>
                  <div className={styles.whyVizHeader}>
                    <div className={styles.whyVizDots}>
                      <span className={styles.whyVizDot} /><span className={styles.whyVizDot} /><span className={styles.whyVizDot} />
                    </div>
                    <span className={styles.whyVizCardTitle}>Execution infrastructure</span>
                  </div>
                  <div className={styles.whyVizMeta}>
                    <span className={styles.whyVizPill}>Orchestration</span>
                    <span className={styles.whyVizPill}>Agents</span>
                    <span className={styles.whyVizPill}>Privacy</span>
                  </div>
                  <div className={styles.whyVizRows}>
                    <div className={styles.whyVizRow}>
                      <span className={styles.whyVizRowLabel}>Intelligence layer</span>
                      <div className={styles.whyVizRowTrack}>
                        <span className={styles.whyVizRowBar} style={{ width: '72%' }} />
                      </div>
                    </div>
                    <div className={styles.whyVizRow}>
                      <span className={styles.whyVizRowLabel}>Autonomous execution</span>
                      <div className={styles.whyVizRowTrack}>
                        <span className={styles.whyVizRowBar} style={{ width: '88%' }} />
                      </div>
                    </div>
                    <div className={styles.whyVizRow}>
                      <span className={styles.whyVizRowLabel}>Privacy-first pipeline</span>
                      <div className={styles.whyVizRowTrack}>
                        <span className={styles.whyVizRowBar} style={{ width: '65%' }} />
                      </div>
                    </div>
                  </div>
                  <div className={styles.whyVizNodes}>
                    {[...Array(6)].map((_, i) => (
                      <span key={i} className={styles.whyVizNode} style={{ '--i': i }} />
                    ))}
                  </div>
                  <div className={styles.whyVizFooter}>
                    <span className={styles.whyVizProgress} style={{ width: '78%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 — Strategic Roadmap Table */}
        <section
          className={`${styles.section} ${styles.sectionStripe} ${styles.roadmapSection} ${inView.roadmap ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[3] = el)}
          data-section="roadmap"
        >
          <div className={styles.container}>
            <div className={styles.roadmapHeadingWrap}>
              <span className={styles.roadmapSectionIcon} aria-hidden>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </span>
              <h2 className={styles.roadmapSectionHeading}>Strategic Roadmap</h2>
            </div>
            <div className={styles.tableWrap}>
              <table className={styles.roadmapTable}>
                <thead>
                  <tr>
                    <th className={styles.roadmapThTimeline}>Timeline</th>
                    <th>Focus Area</th>
                    <th>Strategic Objective</th>
                    <th>Expected Outcome</th>
                  </tr>
                </thead>
                {/* AFFU: keep / remove? Roadmap includes user targets and fundraising, which the products brief keeps off the public site. Anoryx Delta and the Orchestration Layer are not in this roadmap yet. */}
                <tbody>
                  <tr>
                    <td data-label="Timeline"><span className={styles.timelineBadge}><span className={styles.timelineIcon} aria-hidden>1</span> Year 1</span></td>
                    <td data-label="Focus Area">Anoryx Rendly as main product; Anoryx Sentinel (sell in Year 1 only)</td>
                    <td data-label="Strategic Objective">Develop and launch Rendly; gain 100k users; raise initial investments. Launch and sell Sentinel in Year 1.</td>
                    <td data-label="Expected Outcome">Rendly live with 100k users; initial funding secured; Sentinel in market.</td>
                  </tr>
                  <tr>
                    <td data-label="Timeline"><span className={styles.timelineBadge}><span className={styles.timelineIcon} aria-hidden>2</span> Year 2</span></td>
                    <td data-label="Focus Area">Sentinel expansion; expanding Rendly</td>
                    <td data-label="Strategic Objective">Expand Sentinel; scale Rendly.</td>
                    <td data-label="Expected Outcome">Multi-product traction; stronger Rendly and Sentinel presence.</td>
                  </tr>
                  <tr>
                    <td data-label="Timeline"><span className={styles.timelineBadge}><span className={styles.timelineIcon} aria-hidden>5</span> Year 5</span></td>
                    <td data-label="Focus Area">Rendly and Sentinel globally</td>
                    <td data-label="Strategic Objective">Take Rendly and Sentinel global; scale as global intelligence infrastructure provider.</td>
                    <td data-label="Expected Outcome">Rendly and Sentinel in global markets; recognized deep-tech platform company; strong growth and adoption.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 5 — Philosophy */}
        <section
          className={`${styles.sectionAlt} ${styles.sectionStripe} ${styles.philosophySection} ${inView.philosophy ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[4] = el)}
          data-section="philosophy"
        >
          <div className={styles.philosophyBg} />
          <div className={styles.container}>
            <h2 className={styles.sectionHeadingCentered}>Philosophy Behind Anoryx</h2>
            <div className={styles.philosophyContent}>
              <p>
                <strong>Intelligence at the infrastructure level.</strong> Intelligence cannot be bolted on. It must exist in the execution layer—in the way systems orchestrate workflows, reason over data, and adapt to context. We build intelligence core systems first, so every product and every deployment inherits the same foundational capability.
              </p>
              <p>
                <strong>Modular agent-based systems.</strong> The future of enterprise computing is not monolithic applications but modular, agent-driven architectures. Autonomous agents that coordinate, decide, and execute—with clear boundaries and scalable orchestration—are critical for the next decade of automation.
              </p>
              <p>
                <strong>Privacy-first design is non-negotiable.</strong> Data is sensitive infrastructure. Privacy, protection, and controlled intelligence are core design principles. We build systems that enterprises and regulators can trust—where compliance and user safety are built in, not retrofitted.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6 — Vision for the Future */}
        <section
          className={`${styles.section} ${styles.sectionStripe} ${styles.visionSection} ${inView.vision ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[5] = el)}
          data-section="vision"
        >
          <div className={styles.visionBg} />
          <div className={styles.container}>
            <h2 className={styles.sectionHeadingCentered}>The Long-Term Vision</h2>
            <p className={styles.visionLead}>
              The long-term goal is to build <strong>foundational intelligence infrastructure</strong> that powers autonomous systems globally. Not applications that use AI—but the infrastructure layer that makes intelligent, adaptive, and secure execution possible at scale.
            </p>
            <p className={styles.visionBody}>
              We aim to enable <strong>privacy-safe intelligent computing</strong> for enterprises and governments—where data is protected, automation is trustworthy, and systems evolve continuously without compromising security or compliance. Anoryx will stand at the intersection of AI, digital identity, and data security, building the systems that make the next era of computing safer, smarter, and more connected.
            </p>
          </div>
        </section>

        {/* Section 7 — Closing & Signature */}
        <section
          className={`${styles.signatureSection} ${inView.signature ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[6] = el)}
          data-section="signature"
        >
          <div className={styles.container}>
            <div className={styles.signatureBlock}>
              <span className={styles.signatureLine} aria-hidden />
              <p className={styles.signatureName}>{FOUNDER_NAME}</p>
              <p className={styles.signatureTitle}>{FOUNDER_TITLE}</p>
              <p className={styles.signatureCompany}>Anoryx Tech Solutions Pvt Ltd</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
