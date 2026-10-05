# Site audit: Products & Solutions rewrite (Anoryx EcoSystem)

Source brief: `ANORYX_SITE_PRODUCTS_UPDATE.md`. Branch: `site/products-v2`.

## Stack

- React 18 + Vite 5 SPA, `react-router-dom` v6, CSS Modules, design tokens in `frontend/src/styles/theme.css`.
- Copy lived in JSX. It now comes from `frontend/src/data/products.js` and `frontend/src/data/solutions.js`.
- Hosting: Vercel (`frontend/vercel.json` rewrites everything to `index.html`).
- No lint script exists in `frontend/package.json`; `vite build` is the only automated check.

## Routes

| Route | Status |
|---|---|
| `/` | Hero, product section and stats updated |
| `/products` | Rebuilt (EcoSystem grid, hub diagram, signature loop, status, CTA) |
| `/products/:slug` | New: `sentinel`, `delta`, `rendly`, `orchestration` (unknown slug → `/products`) |
| `/solutions` | Rebuilt (use case, role, industry, CTA) |
| `/solutions/enterprise-automation`, `/solutions/industry-applications` | Name fixes only |
| `/solutions/ai-infrastructure`, `/solutions/privacy-first-ai`, `/solutions/autonomous-decision-systems` | Placeholder pages (title only). Not linked in nav. **AFFU: keep / remove?** |
| `/platform/*` | Claim wording fixes only |
| `/company/about`, `/company/founders-note`, `/company/vision-mission` | Product names updated |
| `/contact` | "Product of interest" select added, pre-selected from `?product=<slug>` |

## Changes by file

| File | Before | After |
|---|---|---|
| `frontend/src/data/products.js` | n/a | New single source of truth: 4 products, statuses, one-liner, hero headline, signature loop, contact options |
| `frontend/src/data/solutions.js` | n/a | 7 use cases, 4 roles, 5 industries, footer top-4 |
| `frontend/src/components/Ecosystem/*` | n/a | `StatusPill`, `ProductIcon`, `ProductCard`, `EcosystemDiagram` (inline SVG + text alternative), `SignatureLoop`, shared widget CSS |
| `frontend/src/hooks/usePageMeta.js` | n/a | Per-route title, description, OG/Twitter tags, JSON-LD |
| `frontend/src/hooks/useSectionsInView.js` | n/a | The existing fade-in-on-scroll pattern, shared |
| `frontend/src/App.jsx` | No detail route, no scroll reset | `/products/:slug` route; scroll to top on route change (hash links excluded) |
| `pages/products/Products.jsx` | PII Sentinel, Rendly, B4Labs sections, TAM/market copy | EcoSystem page on the existing `Products.module.css` styles |
| `pages/products/ProductDetail.jsx` | n/a | Shared detail template on `Products.module.css` |
| `pages/solutions/Solutions.jsx` | Capability cards, PII Sentinel demo video, legacy service sections | Use case / role / industry page on the existing `Solutions.module.css` styles |
| `components/Navbar/Navbar.jsx` | Products under Solutions | `Products` dropdown first (name, category, status pill) from data; Solutions dropdown |
| `components/Footer/Footer.jsx` | Products column = 1 link; tagline "Building Intelligent Systems…" | Products column = 4 products; Solutions column = top 4 use cases + All; tagline = §1 positioning |
| `components/CategorySection/*` (home) | 3 cards: PII SENTINEL, B4LABS, RENDLY | 4 data-driven cards with status pills, teal theme for the Orchestration Layer, one-line ecosystem summary + link to /solutions |
| `pages/Home.jsx` | "Build with INTELLIGENCE, not assumptions" | "The secure operating layer for ENTERPRISE AI." + early-access / explore CTAs; mock widget "GDPR Compliance" → "GDPR readiness" |
| `components/Main/Main.jsx` | Link `/products#pii-sentinel` "Explore Privacy Intelligence" | `/products/sentinel` "Explore Anoryx Sentinel" |
| `components/StripeSection/StripeSection.jsx` | "3 intelligent products in ecosystem" | "4 products in the Anoryx EcoSystem" |
| `components/WhySection/WhySection.jsx` | "Three products … PII Sentinel, B4Labs, and Rendly" | "Four products, one platform …" |
| `components/PlatformIntelligenceIndex/*` | PII Sentinel, B4LABS, Rendly | Canonical names; B4Labs removed |
| `components/LegalModal/legalContent.jsx` | PII Sentinel, Rendly | Anoryx Sentinel, Anoryx Rendly |
| `pages/company/About.jsx` | PII Sentinel / Rendly / B4LABS cards and timeline | Canonical names; product grid from data; company described as building the Anoryx EcoSystem; patents fact kept |
| `pages/company/FoundersNote.jsx` | PII Sentinel in roadmap table | Canonical names only (founder's text otherwise unchanged) |
| `pages/company/VisionMission.jsx` | "Products like PII Sentinel deliver … compliance automation" | Sentinel described by mechanism |
| `pages/platform/AutonomousAgentSystem.jsx` | Old PII-Sentinel and Rendly descriptions | Rewritten to the brief's descriptions of Sentinel and Rendly |
| `pages/products/ProductDetail.jsx` (Sentinel) | n/a | Old PII Sentinel screenshots and demo video removed (different product) |
| `pages/solutions/EnterpriseAutomation.jsx` | "Orchestrator" node | "Orchestration Layer" |
| `pages/platform/Architecture.jsx`, `SecurityTrust.jsx`, `IntelligenceCore.jsx`, `pages/solutions/IndustryApplications.jsx`, `IndustriesHeroEcosystem.jsx` | "compliant", "guarantees" | "auditable", "audit-ready", "aligned with", "defined consistency levels", "recovery objectives" |
| `frontend/index.html` | Generic description, no OG tags | §1 one-liner as description, OG/Twitter tags, `Organization` JSON-LD |
| `frontend/public/sitemap.xml` | No detail routes | 4 `/products/<slug>` routes added; lastmod updated |
| `backend/server.js` | No product field; name/company inserted into email HTML unescaped | `productInterest` allow-list; "Early access" topic; all user fields HTML-escaped; newlines stripped from email subject |

## Redirects

Old URLs were in-page anchors on a client-rendered SPA, so they redirect in the client (servers never see `#hash`):

- `/products#pii-sentinel` → `/products/sentinel`
- `/products#rendly` → `/products/rendly`
- `/solutions#pii-sentinel-video` → `/products/sentinel` (the old PII Sentinel demo video was removed: it showed a different, earlier product)

## Items for Affu

### ⚠️ VERIFY

- Sentinel "Observability: Redis-backed rate limiting, Prometheus metrics, OpenTelemetry tracing" (`data/products.js`, marked `// AFFU: VERIFY`).

### AFFU: keep / remove?

- **Home feature cards 2 and 3** (`pages/Home.jsx`): AI workflow automation (n8n visual) and blockchain/digital trust. No matching product.
- **Main.jsx n8n workflow-builder visual** (`components/Main/Main.jsx`).
- **"More from Anoryx" on /solutions**: Enterprise Automation, Industry Applications, custom backend engineering, domain-specific SLM systems.
- **Placeholder solution routes**: `/solutions/ai-infrastructure`, `/solutions/privacy-first-ai`, `/solutions/autonomous-decision-systems`.
- **Founder's Note roadmap table**: contains user targets ("100k users") and fundraising, which the brief keeps off the public site. Delta and the Orchestration Layer aren't in it.
- **Rendly screenshots** (`ProductDetail.jsx`): early builds of the earlier Rendly platform; may not reflect the new collaboration product.
- **About page**: "Four patents filed (pending)" sits on the Sentinel timeline entry. Confirm the patents apply to Anoryx Sentinel.
- **Unused assets**: `pii1.jpg`–`pii4.jpg` (old PII Sentinel screenshots) are no longer referenced.

## Not done / out of scope

- No 404 page exists in the app (unknown routes render an empty main area). Unknown product slugs redirect to `/products`.
- No email templates other than the contact email in `backend/server.js`.
- Lighthouse not run; diagrams have `<title>`/`<desc>` and a visible text caption.

## B4Labs

Removed from every page on request (Products research block, About card, Founder's Note roadmap, platform intelligence FAQ).
