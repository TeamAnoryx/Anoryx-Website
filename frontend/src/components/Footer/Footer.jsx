/**
 * Footer — Premium enterprise footer with all site links + icons
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import LegalModal from '../LegalModal/LegalModal';
import styles from './Footer.module.css';
import ProductIcon from '../Ecosystem/ProductIcon.jsx';
import { PRODUCTS, HERO_HEADLINE, CORE_NARRATIVE } from '../../data/products.js';
import { FEATURED_SOLUTION_IDS, getSolution } from '../../data/solutions.js';

const COMPANY_EMAIL = 'afnan.ceo@anoryxtechsolutions.com';

const iconProps = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

const FOOTER_SECTIONS = [
  {
    title: 'Products',
    links: PRODUCTS.map((p) => ({
      label: p.name,
      to: `/products/${p.slug}`,
      icon: <ProductIcon name={p.icon} size={18} />,
    })),
  },
  {
    title: 'Solutions',
    links: [
      ...FEATURED_SOLUTION_IDS.map((id) => ({
        label: getSolution(id).title,
        to: `/solutions#${id}`,
        icon: <svg {...iconProps}><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /></svg>,
      })),
      { label: 'All Solutions', to: '/solutions', icon: <svg {...iconProps}><path d="M5 12h14M12 5l7 7-7 7" /></svg> },
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'Platform Overview', to: '/platform/overview', icon: <svg {...iconProps}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg> },
      { label: 'Architecture', to: '/platform/architecture', icon: <svg {...iconProps}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.64 5.64l2.83 2.83M15.53 15.53l2.83 2.83M5.64 18.36l2.83-2.83M15.53 8.47l2.83-2.83" /><circle cx="12" cy="12" r="2.5" /></svg> },
      { label: 'Intelligence Core', to: '/platform/intelligence-core', icon: <svg {...iconProps}><path d="M12 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" /><path d="M12 13c-2.5 0-4.5 1.5-5.5 4 1 2.5 3 4 5.5 4s4.5-1.5 5.5-4c-1-2.5-3-4-5.5-4z" /><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" /></svg> },
      { label: 'Autonomous Agent System', to: '/platform/autonomous-agent-system', icon: <svg {...iconProps}><rect x="4" y="8" width="16" height="12" rx="2" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /><circle cx="12" cy="14" r="1.5" /></svg> },
      { label: 'Security & Trust', to: '/platform/security-trust', icon: <svg {...iconProps}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/company/about', icon: <svg {...iconProps}><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg> },
      { label: "Founder's Note", to: '/company/founders-note', icon: <svg {...iconProps}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg> },
      { label: 'Vision & Mission', to: '/company/vision-mission', icon: <svg {...iconProps}><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg> },
      { label: 'Business Proposal', to: '/company/business-proposal', icon: <svg {...iconProps}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M8 17l3-3 2 2 3-4" /></svg> },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Contact', to: '/contact', icon: <svg {...iconProps}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg> },
    ],
  },
];

const SOCIAL = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/109288294/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: `mailto:${COMPANY_EMAIL}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/anoryx_tech/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

function Footer() {
  const [legalModal, setLegalModal] = useState(null);

  return (
    <footer className={styles.footer}>
      {/* Animated gradient top border */}
      <div className={styles.gradientBorder} aria-hidden="true" />

      <div className={styles.footerInner}>
        <div className={styles.footerGrid}>
          <div className={styles.brandBlock}>
            <Link to="/" className={styles.footerLogo}>
              Anoryx
            </Link>
            <p className={styles.tagline}>
              {HERO_HEADLINE} {CORE_NARRATIVE}
            </p>
            <span className={styles.globalBadge}>Global</span>
          </div>

          <nav className={styles.footerLinksGrid} aria-label="Footer navigation">
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title} className={styles.footerColumn}>
                <h3 className={styles.footerColumnTitle}>{section.title}</h3>
                <ul className={styles.footerLinkList}>
                  {section.links.map((link) => (
                    <li key={link.to + link.label}>
                      <Link to={link.to} className={styles.footerLink}>
                        <span className={styles.footerLinkIcon} aria-hidden>{link.icon}</span>
                        <span className={styles.footerLinkText}>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className={styles.socialBlock}>
            <span className={styles.socialLabel}>Connect</span>
            <div className={styles.socialRow}>
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className={styles.socialIcon}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottomRow}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Anoryx Tech Solutions Pvt Ltd. All rights reserved.
          </p>
          <div className={styles.legal}>
            <Link
              to="/privacy"
              className={styles.legalLink}
              onClick={(e) => { e.preventDefault(); setLegalModal('privacy'); }}
            >
              <span className={styles.legalLinkIcon} aria-hidden>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </span>
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className={styles.legalLink}
              onClick={(e) => { e.preventDefault(); setLegalModal('terms'); }}
            >
              <span className={styles.legalLinkIcon} aria-hidden>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>
              </span>
              Terms
            </Link>
          </div>
        </div>
      </div>
      <LegalModal
        variant={legalModal}
        isOpen={legalModal !== null}
        onClose={() => setLegalModal(null)}
      />
    </footer>
  );
}

export default Footer;

