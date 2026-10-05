/**
 * SEO metadata per route. Used by pages (via usePageMeta) and by
 * scripts/prerender-meta.mjs, which writes a static <head> for every route at build
 * time so link previews and non-JavaScript crawlers see the right title.
 * Plain data only: this file is imported by Node as well as the browser bundle.
 */

import { PRODUCTS } from './products.js';

export const SITE_URL = 'https://anoryxtechsolutions.com';
export const SITE_NAME = 'Anoryx Tech Solutions';
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

const STATIC_ROUTES = {
  '/': {
    title: 'Anoryx Tech Solutions | The secure operating layer for enterprise AI',
    description:
      'Anoryx builds the secure operating layer for enterprise AI: AI security, AI cost governance and team collaboration in one platform, the Anoryx EcoSystem.',
  },
  '/products': {
    title: 'Anoryx EcoSystem: Products | Anoryx Tech Solutions',
    description:
      'Anoryx Sentinel, Anoryx Delta, Anoryx Rendly and the Anoryx Orchestration Layer: one platform to secure, govern and orchestrate enterprise AI.',
  },
  '/solutions': {
    title: 'Solutions: secure, govern and orchestrate enterprise AI | Anoryx',
    description:
      'Anoryx solutions by use case, role and industry: protect sensitive data in LLM traffic, control AI spend, and connect the people who build with AI.',
  },
  '/solutions/enterprise-automation': {
    title: 'Enterprise Automation | Anoryx Solutions',
    description:
      'Automate enterprise workflows with AI agents that stay inside your security and cost policies, with every action logged for audit.',
  },
  '/solutions/ai-infrastructure': {
    title: 'AI Infrastructure | Anoryx Solutions',
    description:
      'A secure gateway, cost controls and orchestration for the models and agents your teams run, without rewriting application code.',
  },
  '/solutions/privacy-first-ai': {
    title: 'Privacy-First AI Systems | Anoryx Solutions',
    description:
      'Use large language models without exposing sensitive data: Anoryx Sentinel masks personal data and secrets before prompts leave your network.',
  },
  '/solutions/autonomous-decision-systems': {
    title: 'Autonomous Decision Systems | Anoryx Solutions',
    description:
      'Run AI agents that make decisions within guardrails you define, with spending limits, policy checks and a full audit trail.',
  },
  '/solutions/industry-applications': {
    title: 'Industry Applications | Anoryx Solutions',
    description:
      'How Anoryx secures and governs enterprise AI across SaaS, financial services, healthcare, enterprise IT and AI-native companies.',
  },
  '/platform/overview': {
    title: 'Platform Overview | Anoryx',
    description:
      'An overview of the Anoryx platform: how security, cost governance and collaboration connect through one orchestration layer for enterprise AI.',
  },
  '/platform/architecture': {
    title: 'Platform Architecture | Anoryx',
    description:
      'The layered architecture behind Anoryx: signal ingestion, a central intelligence engine, agent orchestration and execution infrastructure.',
  },
  '/platform/intelligence-core': {
    title: 'Intelligence Core | Anoryx Platform',
    description:
      'The Anoryx Intelligence Core: the engine that turns security, cost and usage signals into decisions across the platform.',
  },
  '/platform/autonomous-agent-system': {
    title: 'Autonomous Agent System | Anoryx Platform',
    description:
      'How Anoryx runs AI agents safely in production: orchestration, policy enforcement and observability for agentic workloads.',
  },
  '/platform/security-trust': {
    title: 'Security & Trust | Anoryx Platform',
    description:
      'Zero-trust by default: tenant isolation, signed policies, data masking and a tamper-evident audit log across the Anoryx platform.',
  },
  '/company/about': {
    title: 'About Anoryx Tech Solutions',
    description:
      'Anoryx Tech Solutions is building the secure operating layer for enterprise AI. Learn about the company, the team and what drives us.',
  },
  '/company/founders-note': {
    title: "Founder's Note | Anoryx Tech Solutions",
    description:
      'A letter from Afnan Pasha, Founder & CEO of Anoryx, on why enterprise AI needs a secure operating layer and what we are building today.',
  },
  '/company/vision-mission': {
    title: 'Vision & Mission | Anoryx Tech Solutions',
    description:
      'The vision and mission of Anoryx: help enterprises adopt AI quickly while keeping their data, budgets and people protected.',
  },
  '/company/business-proposal': {
    title: 'Business Proposal | Anoryx Tech Solutions',
    description:
      'The Anoryx business proposal for investors, potential co-founders and partners. Preview the first pages and request the full proposal.',
  },
  '/contact': {
    title: 'Contact Anoryx Tech Solutions',
    description:
      'Talk to Anoryx about early access, design-partner pilots, partnerships or investment. We reply to every message.',
  },
};

const PRODUCT_ROUTES = Object.fromEntries(
  PRODUCTS.map((p) => [
    `/products/${p.slug}`,
    {
      title: `${p.name}: ${p.category} | Anoryx`,
      description: `${p.tagline} ${p.summary.split('. ')[0]}.`,
    },
  ]),
);

export const SEO_ROUTES = { ...STATIC_ROUTES, ...PRODUCT_ROUTES };

/** Meta for a route, ready for usePageMeta. */
export function pageMeta(path) {
  const meta = SEO_ROUTES[path] || STATIC_ROUTES['/'];
  return { ...meta, path };
}
