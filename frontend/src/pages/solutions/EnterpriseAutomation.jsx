/**
 * Enterprise Automation Solutions — Anoryx Tech Solutions.
 * Light-theme whitepaper-style page: hero, 3 article sections, references, stats, mock visuals.
 */

import { Link } from 'react-router-dom';
import styles from './EnterpriseAutomation.module.css';

export default function EnterpriseAutomation() {
  return (
    <div className={styles.page}>
      <div className={styles.gridBg} aria-hidden />

      {/* ── Section 1: Hero ───────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Enterprise Automation Infrastructure for Autonomous Enterprise Operations
            </h1>
            <p className={styles.heroSub}>
              Enterprise automation is no longer limited to basic workflow scripting or task scheduling. Modern enterprise automation integrates artificial intelligence, distributed execution systems, agent-based orchestration, and real-time decision pipelines to create infrastructure capable of executing operational tasks autonomously. Anoryx Tech Solutions provides enterprise automation infrastructure that transforms static business processes into continuously adapting intelligent systems.
            </p>
            <div className={styles.heroCTAs}>
              <Link to="/platform/architecture" className={styles.btnPrimary}>Explore Automation Architecture</Link>
              <Link to="/solutions/industry-applications" className={styles.btnSecondary}>View Automation Use Cases</Link>
            </div>
          </div>
          <div className={styles.heroMock}>
            <div className={styles.dashboardMock}>
              <div className={styles.mockTitleBar}>
                <span className={styles.mockDots}><i /><i /><i /></span>
                <span>Automation Control</span>
              </div>
              <div className={styles.mockTabs}>
                <span className={styles.mockTabActive}>Workflows</span>
                <span>Pipeline</span>
                <span>Status</span>
              </div>
              <div className={styles.mockBody}>
                <div className={styles.mockPipeline}>
                  <div className={styles.mockNode}><span>Ingest</span><span className={styles.statusOk}>✓</span></div>
                  <div className={styles.mockEdge} />
                  <div className={styles.mockNode}><span>Process</span><span className={styles.statusOk}>✓</span></div>
                  <div className={styles.mockEdge} />
                  <div className={styles.mockNode}><span>Decide</span><span className={styles.statusRun}>⋯</span></div>
                  <div className={styles.mockEdge} />
                  <div className={styles.mockNode}><span>Execute</span><span className={styles.statusIdle}>○</span></div>
                </div>
                <div className={styles.mockAgents}>
                  <div className={styles.agentRow}><span className={styles.agentDot} style={{ background: '#22c55e' }} /><span>Data Agent</span><span className={styles.agentStat}>Active</span></div>
                  <div className={styles.agentRow}><span className={styles.agentDot} style={{ background: '#3b82f6' }} /><span>Decision Agent</span><span className={styles.agentStat}>Running</span></div>
                  <div className={styles.agentRow}><span className={styles.agentDot} style={{ background: '#94a3b8' }} /><span>Execution Agent</span><span className={styles.agentStat}>Idle</span></div>
                </div>
                <div className={styles.mockStatusBar}>
                  <span className={styles.statusLabel}>Execution</span>
                  <div className={styles.statusBarTrack}><div className={styles.statusBarFill} style={{ width: '68%' }} /></div>
                  <span className={styles.statusPct}>68%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Article 1 — Evolution ──────────────────────── */}
      <section className={styles.articleSection}>
        <div className={styles.articleWrap}>
          <h2 className={styles.articleTitle}>
            The Evolution from Process Automation to Autonomous Enterprise Systems
          </h2>
          <div className={styles.articleBody}>
            <p>
              Enterprise automation has evolved significantly over the past two decades. Early automation systems focused on rule-based scripts designed to perform repetitive tasks such as batch processing, report generation, or simple workflow transitions. These systems were limited in their adaptability and required manual configuration, maintenance, and scaling. As enterprise systems became more distributed and data-driven, traditional automation approaches were no longer sufficient to handle dynamic workloads, real-time decision requirements, and multi-system orchestration.
            </p>
            <p>
              Modern enterprise automation integrates artificial intelligence, distributed systems, and agent-based orchestration to create adaptive execution environments capable of managing complex operational processes autonomously. These systems continuously monitor enterprise signals, analyze contextual information, make decisions, and execute actions without manual intervention. Instead of automating individual tasks, enterprise automation now automates entire operational pipelines, including data ingestion, validation, processing, decision making, and execution.
            </p>
            <p>
              Agent-based automation architectures allow enterprises to deploy modular autonomous agents responsible for executing specific operational tasks. These agents operate within a coordinated orchestration layer, enabling systems to scale horizontally and adapt dynamically to workload changes. This architecture significantly improves reliability, execution speed, and operational resilience compared to monolithic automation systems.
            </p>
            <p>
              According to research published by McKinsey Global Institute, automation technologies have the potential to automate up to 60% of current enterprise operational activities, resulting in substantial efficiency gains and operational cost reductions. Similarly, studies by MIT Sloan and Stanford Human-Centered AI Institute demonstrate that organizations implementing AI-driven automation achieve significant improvements in productivity, decision accuracy, and operational scalability.
            </p>
            <p className={styles.articleLeadOut}>
              Enterprise automation is no longer a support function. It has become a core infrastructure layer that enables enterprises to operate autonomously at scale.
            </p>
          </div>
          <div className={styles.references}>
            <h3 className={styles.referencesTitle}>References</h3>
            <ul className={styles.referencesList}>
              <li>McKinsey Global Institute — <em>The Future of Work and Automation</em></li>
              <li>MIT Sloan Management Review — <em>Artificial Intelligence and Business Automation</em></li>
              <li>Stanford Human-Centered AI Institute — <em>AI Index Report</em></li>
              <li>Gartner — <em>Hyperautomation and Enterprise Automation Infrastructure</em></li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Section 3: Article 2 — Economic Impact ─────────────────── */}
      <section className={styles.articleSection}>
        <div className={styles.articleWrap}>
          <h2 className={styles.articleTitle}>
            Economic Impact of Enterprise Automation: Cost Reduction, Efficiency, and Scalable Growth
          </h2>
          <div className={styles.articleBody}>
            <p>
              Enterprise automation directly impacts organizational efficiency, cost structure, and scalability by eliminating manual operational overhead and enabling intelligent execution systems. Manual enterprise operations introduce inefficiencies due to human limitations, operational delays, and coordination complexity across distributed systems. Automation eliminates these inefficiencies by allowing software infrastructure to perform operational tasks continuously, reliably, and at scale.
            </p>
            <p>
              One of the most significant economic benefits of enterprise automation is operational cost reduction. Automated systems reduce the need for manual intervention in repetitive and routine operational tasks, lowering labor costs while improving execution accuracy. Automated infrastructure operates continuously without interruption, increasing throughput while reducing operational bottlenecks. According to McKinsey Global Institute, automation can reduce operational costs by up to 30% in certain enterprise environments.
            </p>
            <p>
              Enterprise automation also improves scalability by enabling organizations to increase operational capacity without proportional increases in operational cost. Traditional operational scaling requires hiring additional personnel, increasing management overhead, and introducing coordination complexity. Automated systems scale computationally rather than organizationally, allowing enterprises to expand operations efficiently without increasing workforce size proportionally.
            </p>
            <p>
              Automation also improves decision quality and operational reliability. Automated systems execute tasks using deterministic logic, AI-based reasoning, and real-time contextual analysis, reducing human error and improving consistency. This leads to improved system stability, reduced downtime, and improved service reliability.
            </p>
            <p>
              According to research by Deloitte and Gartner, enterprises implementing automation technologies experience significant improvements in operational efficiency, productivity, and business performance. Automation enables enterprises to operate faster, scale more efficiently, and reduce long-term operational costs while improving system reliability and performance.
            </p>
            <p className={styles.articleLeadOut}>
              Enterprise automation is not merely a cost-saving tool. It is a foundational infrastructure capability that enables autonomous enterprise operations.
            </p>
          </div>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statValue}>Up to 30%</span>
              <span className={styles.statLabel}>Operational cost reduction</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>Up to 50%</span>
              <span className={styles.statLabel}>Productivity improvement</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>24/7</span>
              <span className={styles.statLabel}>Autonomous operational execution</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>Significant</span>
              <span className={styles.statLabel}>Reduction in operational error rates</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Article 3 — Anoryx Architecture ───────────────── */}
      <section className={styles.articleSection}>
        <div className={styles.articleWrap}>
          <h2 className={styles.articleTitle}>
            How Anoryx Enterprise Automation Infrastructure Enables Autonomous Enterprise Operations
          </h2>
          <div className={styles.articleBody}>
            <p>
              Anoryx Tech Solutions develops enterprise automation infrastructure designed specifically for autonomous enterprise operations. Unlike traditional automation systems that rely on static workflows, Anoryx automation infrastructure integrates intelligent agents, distributed execution systems, and modular orchestration layers to enable adaptive, scalable automation.
            </p>
            <p>
              Anoryx enterprise automation architecture consists of several core layers, including signal ingestion, intelligent decision processing, agent orchestration, execution infrastructure, and continuous learning systems. This architecture allows enterprises to automate complex operational workflows across distributed environments while maintaining reliability, security, and scalability.
            </p>
            <p>
              Agent-based automation enables enterprise systems to operate autonomously by deploying specialized agents responsible for executing operational tasks. These agents interact with enterprise systems, analyze contextual data, make execution decisions, and perform operational actions without manual intervention. This significantly improves operational speed, reduces latency, and improves execution efficiency.
            </p>
            <p>
              Anoryx automation infrastructure is designed using modular microservice architecture, enabling enterprises to deploy automation systems incrementally and scale dynamically. This modular design improves system flexibility, maintainability, and scalability.
            </p>
            <p className={styles.articleLeadOut}>
              This infrastructure enables enterprises to transition from manually operated systems to fully autonomous operational environments capable of continuous execution, adaptation, and optimization.
            </p>
          </div>

          <div className={styles.anoryxOutcomes}>
            <p className={styles.anoryxOutcomesIntro}>Anoryx enterprise automation infrastructure enables organizations to achieve:</p>
            <ul className={styles.anoryxOutcomesList}>
              <li>Reduced operational cost</li>
              <li>Improved operational efficiency</li>
              <li>Autonomous workflow execution</li>
              <li>Horizontal scalability</li>
              <li>Improved system reliability</li>
              <li>Faster operational execution</li>
            </ul>
            <p className={styles.anoryxLeadOut}>
              This represents the transition from manual enterprise operations to autonomous enterprise infrastructure.
            </p>
          </div>

          {/* Mock visuals: workflow diagram + orchestration + execution pipeline */}
          <div className={styles.visualsRow}>
            <div className={styles.visualCard}>
              <div className={styles.visualCardHeader}>Automation Workflow</div>
              <div className={styles.workflowDiagram}>
                <div className={styles.wfNode}>Signals</div>
                <div className={styles.wfConnector} aria-hidden="true" />
                <div className={styles.wfNode}>Intelligence</div>
                <div className={styles.wfConnector} aria-hidden="true" />
                <div className={styles.wfNode}>Orchestration</div>
                <div className={styles.wfConnector} aria-hidden="true" />
                <div className={styles.wfNode}>Execution</div>
              </div>
            </div>
            <div className={styles.visualCard}>
              <div className={styles.visualCardHeader}>Agent Orchestration</div>
              <div className={styles.orchestrationViz}>
                <div className={styles.orchCenter}>Orchestration Layer</div>
                <div className={styles.orchRing}>
                  <span className={styles.orchAgent}>Data</span>
                  <span className={styles.orchAgent}>Decision</span>
                  <span className={styles.orchAgent}>Execute</span>
                  <span className={styles.orchAgent}>Learn</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.executionMock}>
            <div className={styles.execMockHeader}>Execution Pipeline</div>
            <div className={styles.execPipeline}>
              <div className={styles.execStage}>
                <span className={styles.execStageIcon} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                </span>
                <span className={styles.execStageLabel}>Ingest</span>
              </div>
              <div className={styles.execStage}>
                <span className={styles.execStageIcon} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                </span>
                <span className={styles.execStageLabel}>Process</span>
              </div>
              <div className={styles.execStage}>
                <span className={styles.execStageIcon} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                </span>
                <span className={styles.execStageLabel}>Decide</span>
              </div>
              <div className={styles.execStage}>
                <span className={styles.execStageIcon} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                </span>
                <span className={styles.execStageLabel}>Execute</span>
              </div>
              <div className={styles.execStage}>
                <span className={styles.execStageIcon} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                </span>
                <span className={styles.execStageLabel}>Feedback</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
