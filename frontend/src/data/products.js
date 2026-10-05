/**
 * Anoryx EcoSystem — single source of truth for product data.
 *
 * Every page (home, navbar, footer, /products, /products/:slug, /solutions,
 * contact form) reads from this file. Do not hard-code product copy in components.
 *
 * Copy rules: no certification claims ("certified", "compliant"), no pricing,
 * no absolute security language. Status pills are honest by design.
 */

export const STATUS = {
  EARLY_ACCESS: 'Early Access',
  IN_DEVELOPMENT: 'In Development',
};

export const PLATFORM_NAME = 'Anoryx EcoSystem';

export const ONE_LINER =
  'Anoryx is the secure AI infrastructure platform for enterprises: one integrated stack for AI security, AI cost governance and team collaboration, connected by a central orchestration layer.';

export const CORE_NARRATIVE = 'Your data never leaves your organisation.';

/* Hero headline (chosen). Alternatives kept for Affu:
 *   - "Adopt AI at full speed. Keep every byte inside your perimeter."
 *   - "One platform to secure, govern and orchestrate enterprise AI."
 */
export const HERO_HEADLINE = 'The secure operating layer for enterprise AI.';

/** Contact page link with the product pre-selected in the "Product of interest" field. */
export const contactHref = (slug) => (slug ? `/contact?product=${slug}` : '/contact');

export const PRODUCTS = [
  {
    slug: 'sentinel',
    name: 'Anoryx Sentinel',
    shortName: 'Sentinel',
    category: 'Zero-Trust AI Gateway',
    status: STATUS.EARLY_ACCESS,
    accent: 'blue',
    icon: 'shield',
    tagline: 'Use any LLM without ever sending it your secrets.',
    summary:
      'Sentinel is a self-hostable, OpenAI-compatible AI gateway. It sits between your applications and external model providers. It inspects every request and response, redacts sensitive data before it leaves your network, blocks injection attacks, enforces signed policies, and writes a tamper-evident audit trail. Teams integrate it by changing one API base URL.',
    problem: [
      'Employees and agents paste customer PII, source code and live API keys into external LLMs.',
      'Shadow AI: unmonitored model usage across teams creates blind spots.',
      'Customer-facing agents are exposed to prompt injection and data-exfiltration payloads.',
      "Legacy DLP tools can't see LLM token streams.",
    ],
    howItWorks: [
      'Your app',
      'Authenticate',
      'Detect & redact',
      'Policy check',
      'Route to model',
      'Scan response & audit',
    ],
    howItWorksText:
      'App → Sentinel (authenticate → detect & redact → policy check → route) → model provider → Sentinel (scan response, restore context, audit) → App.',
    keyCapabilities: ['OpenAI-compatible API', 'PII & secret redaction', 'Tamper-evident audit log'],
    available: [
      { title: 'OpenAI-compatible API', desc: '/v1/chat/completions, /v1/completions and /v1/models, with streaming. No code rewrites.' },
      { title: 'Virtual API keys', desc: 'Per-tenant, per-team and per-project keys resolved server-side. Provider keys never reach developers.' },
      { title: 'PII detection & redaction', desc: 'Sensitive data is detected and masked before it leaves your environment.' },
      { title: 'Secret-leak protection', desc: 'API keys and credentials are caught in prompts and redacted from structured outputs.' },
      { title: 'Prompt-injection defence', desc: 'Rule-based detection plus an LLM-judge classifier.' },
      { title: 'Shadow-AI egress monitoring', desc: 'Flags traffic headed to disallowed AI endpoints.' },
      { title: 'Multi-provider routing', desc: 'OpenAI, Anthropic and AWS Bedrock, with security-aware fallback and per-tenant routing policy.' },
      { title: 'Cryptographically signed policies', desc: 'Budget limits and model allow/deny lists, signed with ECDSA and protected against replay and rollback.' },
      { title: 'Tamper-evident audit log', desc: 'A hash-chained record of every request, rejection and policy decision.' },
      { title: 'Hard tenant isolation', desc: 'Database row-level security on every tenant-scoped table.' },
      { title: 'Deploy anywhere', desc: 'Docker Compose for local and pilot setups, Helm/Kubernetes for production, including inside your own VPC.' },
      // AFFU: VERIFY — observability stack (Redis rate limiting, Prometheus, OpenTelemetry)
      { title: 'Observability', desc: 'Redis-backed rate limiting, Prometheus metrics, OpenTelemetry tracing.', verify: true },
    ],
    roadmap: [
      { title: 'Compliance engine', desc: 'SOC 2 and GDPR control mapping, readiness score and exportable evidence packs.' },
      { title: 'Admin console & dashboards', desc: 'Operate policies, keys and audit from one console.' },
      { title: 'SSO', desc: 'OIDC and SAML sign-in for administrators.' },
      { title: 'MCP & third-party tool gateway', desc: 'Apply the same inspection and policy to agent tool calls.' },
      { title: 'Custom PII patterns', desc: 'Client-defined detectors for organisation-specific identifiers.' },
      { title: 'HIPAA and EU AI Act modules', desc: 'Control mapping for regulated workloads.' },
      { title: 'Generated-code security scanning', desc: 'Scan code returned by models before it reaches developers.' },
      { title: 'Provider-key vaulting', desc: 'Store provider keys in Vault or a cloud KMS.' },
      { title: 'Air-gapped deployment', desc: 'Run fully disconnected from the public internet.' },
    ],
    integrations: {
      orchestration: 'Streams usage and security events to the Orchestration Layer.',
      delta: 'Enforces the budget policies that Delta issues.',
      rendly: "Provides the safety layer for Rendly's AI features.",
    },
    buyers: ['CISOs', 'Security engineering', 'Platform / AI-infra teams', 'Compliance leads'],
    ctaLabel: 'Request Sentinel early access',
    demoVideoId: 'c5985A2xU6Q',
  },
  {
    slug: 'delta',
    name: 'Anoryx Delta',
    shortName: 'Delta',
    category: 'AI FinOps & Financial Governance',
    status: STATUS.IN_DEVELOPMENT,
    accent: 'purple',
    icon: 'gauge',
    tagline: 'Put a hard ceiling on AI spend before an agent burns through it.',
    summary:
      'Delta is a real-time financial control layer for AI. It meters token and compute spend down to the team, project and agent, assigns budgets, and through Sentinel cuts off spend the moment a limit is hit. Finance and engineering work from the same live numbers.',
    problem: [
      'Runaway agent loops can burn through API credits over a weekend.',
      "Cloud and LLM billing updates hourly or daily. By the time finance sees an overrun, it's too late.",
      'Engineers ship without seeing what their architecture costs.',
    ],
    howItWorks: ['Sentinel usage events', 'Orchestration Layer', 'Delta ledger', 'Budget engine', 'Signed limit policy', 'Sentinel blocks scope'],
    howItWorksText:
      'Sentinel usage events → Orchestration Layer → Delta ledger → budget engine → when a limit is crossed, a signed deny/limit policy is pushed back to Sentinel, which blocks further requests for that scope.',
    keyCapabilities: ['Real-time cost metering', 'Budgets & guardrails', 'Runaway-loop kill-switch'],
    available: [
      { title: 'Real-time cost metering', desc: 'Spend attributed to team, project, developer and agent.' },
      { title: 'Budgets & guardrails', desc: 'Hard limits, soft warnings, escalation rules and time windows.' },
      { title: 'Runaway-loop kill-switch', desc: 'Automated enforcement through Sentinel when spend spikes.' },
      { title: 'Double-entry AI ledger', desc: 'An append-only, auditable record of every cost event.' },
      { title: 'Cost-to-value dashboards', desc: 'Burn rate, top spenders, cost per request and cost per outcome.' },
      { title: 'Forecasting & anomaly detection', desc: 'See a budget breach before it happens.' },
      { title: 'Chargeback & showback reports', desc: 'For finance and department heads.' },
      { title: 'Cost integrations', desc: 'AWS, GCP and Azure cost sync, then ERP (NetSuite, SAP) and procurement tools.' },
    ],
    roadmap: [],
    integrations: {
      orchestration: 'Consumes Sentinel usage events through the Orchestration Layer.',
      sentinel: 'Pushes signed budget policies to Sentinel for enforcement.',
      rendly: 'Acts as the monetisation and billing backbone for Rendly.',
    },
    buyers: ['CTOs / VPs of Engineering', 'CFOs and FinOps teams', 'Platform leads'],
    ctaLabel: 'Join the Delta waitlist',
  },
  {
    slug: 'rendly',
    name: 'Anoryx Rendly',
    shortName: 'Rendly',
    category: 'Secure Enterprise Collaboration',
    status: STATUS.IN_DEVELOPMENT,
    accent: 'orange',
    icon: 'people',
    tagline: 'Find the right people and work together inside your own security perimeter.',
    summary:
      'Rendly is an intent-driven collaboration platform. Teams post an Intent ("need a senior AWS architect for a 7-day migration sprint"). Rendly\'s matching engine finds the right people, and they collaborate over encrypted chat, video and group Huddles. Everything stays behind the Anoryx security perimeter instead of in third-party meeting and chat tools.',
    problem: [
      'Static org charts make it slow to assemble cross-functional strike teams.',
      'Engineering discussions leak into unmonitored third-party chat and video tools.',
      'Talent and skills sit hidden in silos.',
    ],
    howItWorks: ['Post an Intent', 'Matching engine', 'Shortlist people', 'Whispers & Huddles', 'Sentinel-protected AI'],
    howItWorksText:
      'A team posts an Intent → the matching engine ranks people on skills, experience and availability → the team collaborates over encrypted Whispers and Huddles, with AI features protected by Sentinel.',
    keyCapabilities: ['Intents & matching engine', 'Encrypted Whispers & Huddles', 'Live skills inventory'],
    available: [
      { title: 'Intents & matching engine', desc: 'Matches people on skills, experience and availability.' },
      { title: 'Whispers', desc: 'Encrypted 1:1 chat and video.' },
      { title: 'Huddles', desc: 'Real-time group rooms for architecture and sprint planning.' },
      { title: 'Skills inventory', desc: 'A live map of capability across the organisation.' },
      { title: 'Project & sprint workspaces', desc: 'Keep the work next to the people doing it.' },
      { title: 'AI safety & moderation', desc: 'AI features are protected by Sentinel.' },
      { title: 'Enterprise tenancy & RBAC', desc: 'Tenant isolation and role-based access control.' },
      { title: 'Embeddable API', desc: 'Add Rendly matching and video to your own product (later phase).' },
    ],
    roadmap: [],
    communityNote: 'Rendly Community (coming later): a public professional network for builders and founders.',
    integrations: {
      sentinel: "Rendly's AI features run through Sentinel.",
      delta: 'Usage and monetisation are tracked in Delta.',
      orchestration: 'Cross-product alerts are delivered by the Orchestration Layer, e.g. pinging an engineering lead to approve a budget increase.',
    },
    buyers: ['VPs of Engineering', 'CISOs (comms consolidation)', 'HR / talent leaders'],
    ctaLabel: 'Join the Rendly waitlist',
  },
  {
    slug: 'orchestration',
    name: 'Anoryx Orchestration Layer',
    shortName: 'Orchestration Layer',
    category: 'The Connective Fabric',
    status: STATUS.IN_DEVELOPMENT,
    accent: 'teal',
    icon: 'hub',
    isHub: true,
    tagline: 'One nervous system for your AI stack.',
    summary:
      'The Orchestration Layer connects Sentinel, Delta and Rendly into one closed-loop system. It carries events between products, distributes signed policies to every Sentinel instance, and runs cross-product workflows. Security, cost and people signals then trigger coordinated action automatically.',
    problem: [
      'Security, finance and operations run on separate dashboards.',
      'A cost spike, a security event and the person who can fix them never meet in one place.',
    ],
    howItWorks: ['Product events', 'Event bus', 'Cross-product workflow', 'Signed policy distribution', 'Coordinated action'],
    howItWorksText:
      'Events from Sentinel, Delta and Rendly arrive on the event bus → cross-product workflows decide what happens → signed policies and alerts are distributed back to each product.',
    keyCapabilities: ['Ecosystem event bus', 'Signed policy distribution', 'Cross-product workflows'],
    available: [
      { title: 'Ecosystem event bus', desc: 'A standard event envelope with replay and dead-letter handling.' },
      { title: 'Signed policy distribution', desc: "Delivers Delta's budget and model policies to every Sentinel, with delivery tracking and retries." },
      { title: 'Multi-Sentinel fleet registry', desc: 'Health checks and coordinated policy rollout.' },
      { title: 'Cross-product workflows', desc: '"If X, then Y" automation across products.' },
      { title: 'Unified telemetry', desc: 'Security, cost and collaboration signals in one view.' },
      { title: 'Predictive scaling', desc: 'Forecasts traffic and spend from fleet telemetry.' },
      { title: 'mTLS between products', desc: 'With a tamper-evident audit trail.' },
    ],
    roadmap: [],
    integrations: {
      sentinel: 'Distributes signed policies to every Sentinel instance and receives its events.',
      delta: 'Routes usage events into the Delta ledger and carries its budget decisions.',
      rendly: 'Delivers cross-product alerts to the right people through Rendly.',
    },
    buyers: ['CTOs', 'Platform engineering', 'Enterprise architects'],
    ctaLabel: 'Talk to us about the platform',
  },
];

/** The closed loop that shows why the products are better together. */
export const SIGNATURE_LOOP = [
  { product: null, text: 'An AI agent starts burning budget.' },
  { product: 'delta', text: 'Delta detects the breach.' },
  { product: 'orchestration', text: 'The Orchestration Layer distributes a signed limit policy.' },
  { product: 'sentinel', text: "Sentinel blocks the agent's next request." },
  { product: 'rendly', text: 'Rendly pings the owning engineering lead to approve more budget or fix the code.' },
];

export const getProduct = (slug) => PRODUCTS.find((p) => p.slug === slug);

/** Options for the contact form "Product of interest" select. */
export const PRODUCT_INTEREST_OPTIONS = [
  ...PRODUCTS.map((p) => ({ value: p.slug, label: p.name })),
  { value: 'ecosystem', label: `The full ${PLATFORM_NAME}` },
  { value: 'other', label: 'Other' },
];
