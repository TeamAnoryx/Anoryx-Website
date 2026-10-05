import { useRef, useEffect, useState } from 'react';
import styles from './AutonomousAgentSystem.module.css';

/* Section 1 exact content — paragraphs for scroll-reveal */
const SECTION1_PARAS = [
  'At Anoryx Tech Solutions, autonomous agent systems form a foundational layer of our intelligence infrastructure. Rather than relying on isolated automation scripts or monolithic logic, Anoryx implements a modular, distributed agent architecture designed for real-time reasoning, execution, and adaptive decision-making across enterprise environments.',
  'Our agent systems are built using a multi-model orchestration approach, combining advanced reasoning models such as Claude with modular workflow orchestration using n8n. This architecture enables the creation of intelligent agents that can interpret signals, make contextual decisions, coordinate actions, and continuously refine behavior based on operational feedback.',
  'Each agent operates as an independent intelligence unit within a microservices-based backend infrastructure. Agents communicate through secure APIs, event streams, and orchestration pipelines, enabling scalable and fault-tolerant execution across distributed systems. This modular approach ensures that individual agents can evolve independently while remaining fully integrated within the broader intelligence platform.',
  'At Anoryx, this architecture has been successfully implemented in Anoryx Sentinel, our zero-trust AI gateway. In Sentinel, autonomous agents continuously monitor data pipelines, detect sensitive personal information, classify risk levels, and execute protection mechanisms without manual intervention. Agents perform contextual reasoning on incoming data streams, coordinate remediation workflows, and adapt to evolving data patterns in real time.',
  'Similarly, in Anoryx Rendly, our secure enterprise collaboration platform, autonomous agents orchestrate operational workflows, coordinate system processes, and manage intelligent execution pipelines across interconnected modules. This agent-driven approach significantly reduces manual overhead, accelerates development cycles, and enables dynamic system adaptability.',
  'By combining advanced reasoning models with modular orchestration and microservices architecture, Anoryx enables the creation of highly scalable, resilient, and continuously evolving autonomous intelligence systems.',
];

/* Notebook pages: title, content paragraphs, optional reference */
const NOTEBOOK_PAGES = [
  {
    title: 'Fundamental Principles of Autonomous Agent Systems in Enterprise Intelligence Infrastructure',
    paras: [
      'Autonomous agent systems represent a fundamental architectural shift from deterministic software execution toward adaptive computational intelligence capable of continuous environmental perception, contextual reasoning, and independent operational execution. Traditional enterprise software systems operate through explicitly defined procedural logic, where execution paths are predefined by developers and remain fixed regardless of changes in environmental conditions, system states, or operational complexity. This deterministic paradigm inherently limits system adaptability, scalability, and resilience, particularly in modern enterprise environments characterized by dynamic infrastructure, distributed systems, and continuously evolving operational requirements. Autonomous agent systems address these limitations by introducing computational entities capable of perceiving environmental signals, constructing internal representations of system state, reasoning about optimal execution strategies, and performing coordinated actions without requiring explicit runtime instruction. This model is formally grounded in the rational agent framework established in artificial intelligence research, where agents are defined as systems that perceive their environment through sensors and act upon that environment using actuators to achieve defined objectives while maximizing expected utility under uncertainty, as described in Russell and Norvig\'s foundational work on artificial intelligence. At Anoryx Tech Solutions, autonomous agents operate as core components of a distributed intelligence infrastructure, continuously monitoring enterprise signals originating from infrastructure telemetry, application execution states, database systems, external integrations, and user interaction environments. These agents transform raw operational signals into structured intelligence representations, enabling enterprise systems to transition from passive execution environments into adaptive intelligence platforms capable of autonomous decision execution, predictive optimization, and continuous operational evolution. This architectural transformation represents the foundational layer upon which enterprise-scale autonomous intelligence systems are constructed, enabling organizations to achieve unprecedented levels of automation, operational efficiency, and system intelligence.',
    ],
    reference: 'Reference: Russell & Norvig, Artificial Intelligence: A Modern Approach (2009)',
  },
  {
    title: 'Cognitive Architecture and Internal State Representation in Autonomous Agents',
    paras: [
      'The effectiveness of autonomous agent systems is fundamentally dependent on their ability to construct and maintain accurate internal representations of external system environments, a concept formally defined in cognitive architecture research as internal state modeling. Internal state representations allow agents to maintain a structured understanding of environmental conditions, operational constraints, system dependencies, and execution context, enabling agents to make informed decisions based on both current observations and historical system behavior. Unlike traditional software systems that execute predefined logic based solely on immediate input parameters, autonomous agents maintain persistent cognitive models that evolve continuously as new information becomes available. These models incorporate multiple layers of contextual abstraction, including real-time operational signals, historical execution outcomes, probabilistic system behavior predictions, and strategic execution objectives. This internal modeling capability allows agents to operate under conditions of uncertainty and incomplete information, which is a fundamental requirement for enterprise-scale intelligence systems operating in complex distributed environments. At Anoryx Tech Solutions, cognitive state modeling is implemented through distributed intelligence layers that continuously aggregate and process enterprise signals, constructing unified intelligence representations that enable agents to reason about enterprise system behavior at both micro and macro operational scales. These representations allow agents to detect anomalies, predict potential system failures, identify optimization opportunities, and execute corrective actions autonomously. The development of internal cognitive representations transforms enterprise systems from reactive execution environments into predictive intelligence platforms capable of continuous adaptation and autonomous operational optimization, representing a critical advancement in enterprise intelligence infrastructure.',
    ],
    reference: 'Reference: Newell, Unified Theories of Cognition (1990)',
  },
  {
    title: 'Distributed Multi-Agent Systems and Enterprise Intelligence Mesh Architecture',
    paras: [
      'Enterprise-scale autonomous intelligence systems rely on distributed multi-agent architectures rather than centralized intelligence models, enabling scalable, resilient, and parallel execution of intelligence operations across complex infrastructure environments. Multi-agent systems consist of multiple autonomous computational entities that operate independently while coordinating execution behavior through structured communication and orchestration protocols. This distributed architecture provides significant advantages in scalability, fault tolerance, execution efficiency, and system resilience, as individual agents can operate independently without introducing single points of failure or performance bottlenecks. Each agent within the intelligence mesh performs specialized operational functions, including signal analysis, contextual interpretation, decision reasoning, execution planning, and system interaction. These agents communicate through structured orchestration layers that ensure coordinated execution behavior while maintaining independence and modularity. At Anoryx Tech Solutions, the intelligence mesh architecture enables enterprise systems to process millions of operational signals continuously, allowing agents to execute intelligence operations in parallel across distributed infrastructure environments. This distributed execution model ensures that enterprise intelligence systems remain highly available, fault tolerant, and capable of operating at global scale. The intelligence mesh architecture represents a critical advancement over traditional centralized execution models, enabling enterprise systems to achieve unprecedented levels of scalability, resilience, and intelligence execution capability.',
    ],
    reference: 'Reference: Wooldridge, An Introduction to MultiAgent Systems (2009)',
  },
  {
    title: 'Reasoning Systems and Decision Intelligence Infrastructure',
    paras: [
      'Autonomous agents rely on advanced reasoning systems to evaluate operational conditions and determine optimal execution strategies based on contextual intelligence and defined operational objectives. Reasoning systems enable agents to interpret environmental signals, evaluate execution constraints, analyze potential outcomes, and select execution actions that maximize system performance and operational efficiency. This reasoning process is grounded in decision theory and computational intelligence research, which provides formal frameworks for evaluating decision outcomes under uncertainty. At Anoryx Tech Solutions, reasoning systems operate within the cognitive intelligence layer, continuously evaluating enterprise system signals and constructing execution strategies based on probabilistic outcome evaluation, contextual intelligence analysis, and operational objective prioritization. These reasoning systems enable agents to perform complex execution tasks autonomously, including anomaly detection, system optimization, workflow orchestration, and infrastructure management. The ability to perform autonomous reasoning transforms enterprise systems from passive execution environments into active intelligence platforms capable of continuously optimizing operational performance without requiring human intervention.',
    ],
    reference: 'Reference: Poole & Mackworth, Computational Intelligence (2017)',
  },
  {
    title: 'Adaptive Learning Systems and Continuous Intelligence Evolution',
    paras: [
      'Autonomous agent systems incorporate adaptive learning mechanisms that enable continuous improvement of intelligence performance over time. Learning systems allow agents to refine internal models, improve decision accuracy, and optimize execution strategies based on observed outcomes and operational feedback. This adaptive capability is grounded in reinforcement learning research, which provides formal frameworks for enabling agents to learn optimal execution strategies through interaction with their environment. At Anoryx Tech Solutions, adaptive learning systems continuously analyze execution outcomes and refine agent reasoning models to improve performance, accuracy, and efficiency. This continuous learning capability ensures that enterprise intelligence systems evolve over time, adapting to changing operational conditions and improving execution performance autonomously.',
    ],
    reference: 'Reference: Sutton & Barto, Reinforcement Learning (2018)',
  },
  {
    title: 'Orchestration Infrastructure and Agent Execution Coordination',
    paras: [
      'Enterprise autonomous intelligence systems require orchestration infrastructure to coordinate execution across distributed agents and enterprise systems. Orchestration infrastructure manages agent communication, execution scheduling, resource allocation, and system synchronization, ensuring coordinated intelligence execution across complex infrastructure environments. At Anoryx Tech Solutions, orchestration infrastructure enables seamless coordination between autonomous agents, ensuring stable, reliable, and efficient execution of intelligence operations across enterprise systems.',
    ],
    reference: 'Reference: Bernstein, Containers and Cloud Computing (2014)',
  },
  {
    title: 'Enterprise Integration and System Connectivity Architecture',
    paras: [
      'Autonomous agent systems must integrate seamlessly with enterprise infrastructure, including databases, APIs, cloud environments, and operational systems. Integration layers enable agents to access enterprise signals, execute actions, and coordinate system operations across distributed infrastructure environments. At Anoryx Tech Solutions, integration architecture ensures seamless connectivity between intelligence infrastructure and enterprise systems.',
    ],
    reference: 'Reference: Hohpe, Enterprise Integration Patterns (2004)',
  },
  {
    title: 'Safety, Reliability, and Trust in Autonomous Intelligence Systems',
    paras: [
      'Enterprise autonomous systems must operate safely, reliably, and securely to ensure operational stability and trust. Safety infrastructure ensures that agent execution remains within defined operational constraints and does not introduce unintended system behavior. At Anoryx Tech Solutions, safety and reliability infrastructure ensures secure and trustworthy intelligence execution.',
    ],
    reference: 'Reference: Amodei et al., Concrete Problems in AI Safety (2016)',
  },
  {
    title: 'Modular Microservices Architecture and Intelligence Scalability',
    paras: [
      'Anoryx intelligence infrastructure is implemented using modular microservices architecture, enabling scalable, independent deployment and execution of intelligence components. Modular architecture ensures system scalability, maintainability, and operational resilience.',
    ],
    reference: 'Reference: Newman, Building Microservices (2021)',
  },
  {
    title: 'Future of Autonomous Intelligence Infrastructure',
    paras: [
      'Autonomous intelligence systems represent the future of enterprise computing, enabling organizations to transition from manual execution toward fully autonomous operational environments. Anoryx Tech Solutions is advancing this transformation through continuous development of intelligence infrastructure capable of operating at global scale.',
    ],
    reference: 'Reference: LeCun, Bengio, Hinton, Deep Learning (2015)',
  },
];

function highlightText(text, terms) {
  if (!terms || terms.length === 0) return [text];
  const lower = text.toLowerCase();
  const ranges = [];
  terms.forEach((term) => {
    const t = term.toLowerCase();
    let idx = 0;
    while ((idx = lower.indexOf(t, idx)) !== -1) {
      ranges.push({ start: idx, end: idx + term.length });
      idx += 1;
    }
  });
  ranges.sort((a, b) => a.start - b.start);
  const merged = [];
  ranges.forEach((r) => {
    if (merged.length && r.start <= merged[merged.length - 1].end) {
      merged[merged.length - 1].end = Math.max(merged[merged.length - 1].end, r.end);
    } else {
      merged.push({ ...r });
    }
  });
  const result = [];
  let pos = 0;
  merged.forEach(({ start, end }) => {
    if (start > pos) result.push(text.slice(pos, start));
    result.push({ type: 'highlight', text: text.slice(start, end) });
    pos = end;
  });
  if (pos < text.length) result.push(text.slice(pos));
  return result.length ? result : [text];
}

function toRoman(n) {
  const map = [{ v: 10, s: 'X' }, { v: 9, s: 'IX' }, { v: 5, s: 'V' }, { v: 4, s: 'IV' }, { v: 1, s: 'I' }];
  let out = '';
  map.forEach(({ v, s }) => { while (n >= v) { out += s; n -= v; } });
  return out;
}

function NotebookPage({ page, pageNum }) {
  const hasHighlights = page.highlights && page.highlights.length > 0;
  return (
    <div className={styles.notebookPage}>
      <div className={styles.notebookLines}>
        <h2 className={styles.notebookTitle}>
          <span className={styles.notebookNum}>{toRoman(pageNum)}.</span> {page.title}
        </h2>
        <div className={styles.notebookBody}>
          {page.paras.map((para, i) => (
            <p key={i} className={styles.notebookPara}>
              {hasHighlights
                ? highlightText(para, page.highlights).map((part, j) =>
                    typeof part === 'string' ? (
                      <span key={j}>{part}</span>
                    ) : (
                      <span key={j} className={styles.highlight}>{part.text}</span>
                    )
                  )
                : para}
            </p>
          ))}
        </div>
        {page.reference && (
          <p className={styles.notebookReference}>{page.reference}</p>
        )}
      </div>
    </div>
  );
}

export default function AutonomousAgentSystem() {
  const section1Ref = useRef(null);
  const [section1Visible, setSection1Visible] = useState(false);

  useEffect(() => {
    const el = section1Ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setSection1Visible(true); },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.pageStrip}>
      {/* Section 1 — Agent Engineering (before notebook) */}
      <section className={styles.section1} ref={section1Ref}>
        <div className={styles.section1Inner}>
          <h1 className={`${styles.section1Title} ${section1Visible ? styles.visible : ''}`}>
            Agentic Intelligence Infrastructure at Anoryx
          </h1>
          <div className={`${styles.section1Content} ${section1Visible ? styles.visible : ''}`}>
            {SECTION1_PARAS.map((para, i) => (
              <p key={i} className={styles.section1Para}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2 — Notebook (fixed-height scrollable container) */}
      <section className={styles.notebookSection}>
        <div className={styles.notebookHeader}>
          <h2 className={styles.notebookSectionTitle}>Autonomous Agent Systems — Engineering Foundations</h2>
          <p className={styles.notebookSectionSub}>
            Formal technical documentation and reference for agent architecture, distributed intelligence, and integration with the Anoryx platform.
          </p>
        </div>
        <div className={styles.notebookOuter}>
          <div className={styles.notebookBook}>
            <div className={styles.notebookScroll}>
              {NOTEBOOK_PAGES.map((page, i) => (
                <NotebookPage key={i} page={page} pageNum={i + 1} />
              ))}
            </div>
            <div className={styles.scrollIndicator} aria-hidden>
              <span className={styles.scrollArrow}>↓</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — Agent Architecture Integration */}
      <section className={styles.section3}>
        <div className={styles.section3Inner}>
          <h2 className={styles.section3Title}>Agent Architecture Integration</h2>
          <p className={styles.section3Para}>
            Autonomous agents at Anoryx integrate through a well-defined architecture. The <strong>agent orchestration layer</strong> coordinates multiple agents, manages task distribution, and ensures that execution intents from the Intelligence Core are translated into agent-level operations. Agents receive structured signals, execute reasoning, and return outcomes through this layer.
          </p>
          <p className={styles.section3Para}>
            <strong>Execution systems</strong> provide the runtime environment in which agents perform actions. These systems interface with enterprise applications, data stores, and external services. Execution is auditable, secure, and designed for horizontal scaling so that additional agent capacity can be deployed as demand grows.
          </p>
          <p className={styles.section3Para}>
            The <strong>integration layer</strong> connects agents to the broader platform and to external enterprise systems. Secure APIs, event streams, and orchestration pipelines ensure that agents can consume signals and trigger actions without compromising security or compliance. This layer is essential for multi-system coordination and for enabling agents to operate across distributed environments.
          </p>
          <p className={styles.section3Para}>
            The <strong>learning loop</strong> closes the cycle from execution back to intelligence. Outcomes from agent execution—success, failure, and contextual feedback—are fed into the platform’s learning and optimization systems. This enables agents to refine their behavior over time, adapt to new patterns, and maintain alignment with enterprise policies and objectives. Together, orchestration, execution, integration, and learning form a complete agent architecture that supports scalable, trustworthy autonomous intelligence.
          </p>
        </div>
      </section>
      </div>
    </div>
  );
}
