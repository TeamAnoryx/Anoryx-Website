/**
 * Anoryx solutions — organised by problem, role and industry.
 * Products are referenced by slug; names and statuses come from products.js.
 */

export const SOLUTIONS = [
  {
    id: 'secure-genai-adoption',
    title: 'Secure GenAI Adoption',
    problem: 'Let teams use any LLM without leaking customer data or code.',
    solution:
      'Point applications at Sentinel instead of the provider. PII and secrets are redacted before the request leaves your network, and every call is written to a tamper-evident audit log.',
    products: ['sentinel'],
  },
  {
    id: 'ai-cost-control',
    title: 'AI Cost Control & FinOps',
    problem: 'Stop runaway agent spend before it hits the invoice.',
    solution:
      'Delta meters token and compute spend per team, project and agent. When a budget is crossed, a signed limit policy reaches Sentinel and further requests for that scope are blocked.',
    products: ['delta', 'sentinel'],
  },
  {
    id: 'agentic-ai-guardrails',
    title: 'Agentic AI Guardrails',
    problem: 'Put policy, budget and audit around autonomous agents.',
    solution:
      'Sentinel enforces model allow-lists and injection defence on every agent call, Delta caps spend, and the Orchestration Layer closes the loop so a breach triggers action automatically.',
    products: ['sentinel', 'delta', 'orchestration'],
  },
  {
    id: 'ai-audit-compliance',
    title: 'AI Audit & Compliance Readiness',
    problem: 'Prove what every model saw, did and returned.',
    solution:
      "Sentinel's hash-chained audit log records every request, rejection and policy decision. A compliance engine that maps controls to SOC 2 and GDPR is on the roadmap.",
    products: ['sentinel'],
  },
  {
    id: 'shadow-ai-visibility',
    title: 'Shadow AI Visibility',
    problem: "Know which teams use which models, and stop the ones you didn't approve.",
    solution:
      'Sentinel monitors egress to AI endpoints, flags traffic to disallowed providers and attributes approved usage to the team and project behind it.',
    products: ['sentinel'],
  },
  {
    id: 'secure-engineering-collaboration',
    title: 'Secure Engineering Collaboration',
    problem: 'Move engineering conversations inside your perimeter.',
    solution:
      'Rendly matches the right people to each Intent and hosts encrypted Whispers and Huddles behind the Anoryx perimeter, with AI features protected by Sentinel.',
    products: ['rendly', 'sentinel'],
  },
  {
    id: 'unified-ai-operations',
    title: 'Unified AI Operations',
    problem: 'One view of security, cost and teams, acting together.',
    solution:
      'The Orchestration Layer joins security, cost and people signals from every product and runs cross-product workflows, so the right action follows each event.',
    products: ['orchestration', 'sentinel', 'delta', 'rendly'],
  },
];

export const ROLES = [
  { role: 'CISO / Security', products: ['sentinel'] },
  { role: 'CTO / VP Engineering', products: ['delta', 'rendly', 'orchestration'] },
  { role: 'CFO / FinOps', products: ['delta'] },
  { role: 'Platform & AI Infra', products: ['sentinel', 'orchestration'] },
];

export const INDUSTRIES = [
  { name: 'Banking & Financial Services', line: 'Built for regulated data, strict audit trails and model governance.' },
  { name: 'Healthcare', line: 'Built for patient-data redaction before any model call. HIPAA module on the roadmap.' },
  { name: 'Government & Defence', line: 'Built for self-hosted deployment. Air-gapped deployment on the roadmap.' },
  { name: 'SaaS & Technology', line: 'Built for teams shipping AI features to their own customers.' },
  { name: 'Enterprise IT / GCCs in India', line: 'Built for large engineering centres adopting AI at scale.' },
];

/** Top use cases shown in the footer and home page. */
export const FEATURED_SOLUTION_IDS = [
  'secure-genai-adoption',
  'ai-cost-control',
  'agentic-ai-guardrails',
  'shadow-ai-visibility',
];

export const getSolution = (id) => SOLUTIONS.find((s) => s.id === id);
