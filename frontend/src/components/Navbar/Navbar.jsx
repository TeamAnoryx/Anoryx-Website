/**
 * Navbar Component
 *
 * Jira-inspired top navigation bar.
 * Left: logo box + animated brand name
 * Right: nav items (Products, Solutions, Platform, Company dropdowns + Contact link) — collapses to hamburger on mobile/tablet
 */

import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import styles from './Navbar.module.css';
import { useAuth } from '../../context/AuthContext.jsx';
import ProductIcon from '../Ecosystem/ProductIcon.jsx';
import { PRODUCTS, PLATFORM_NAME } from '../../data/products.js';

/* Shared icon props for dropdown row icons */
const iconProps = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

/* Navigation: Products (from products.js), Solutions, Platform, Company, Contact */
const DROPDOWNS = [
  {
    label: 'Products',
    wide: true,
    items: [
      ...PRODUCTS.map((p) => ({
        text: p.name,
        desc: p.category,
        to: `/products/${p.slug}`,
        icon: <ProductIcon name={p.icon} size={18} />,
      })),
      { text: `The ${PLATFORM_NAME}`, desc: 'How the four products connect', to: '/products', separator: true, icon: <svg {...iconProps}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><path d="m3.27 6.96 8 4.04M12 19.08l8-4.04" /></svg> },
    ],
  },
  {
    label: 'Solutions',
    items: [
      { text: 'All Solutions', to: '/solutions', icon: <svg {...iconProps}><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /></svg> },
      { text: 'Enterprise Automation', to: '/solutions/enterprise-automation', icon: <svg {...iconProps}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><path d="M10 6h4M6 14v-4M18 10h-4" /></svg> },
      { text: 'Industry Applications', to: '/solutions/industry-applications', icon: <svg {...iconProps}><path d="M3 21h18" /><path d="M5 21V7l8-4v18" /><path d="M19 21V11l-6-4" /><path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01" /></svg> },
    ],
  },
  {
    label: 'Platform',
    items: [
      { text: 'Platform Overview', to: '/platform/overview', icon: <svg {...iconProps}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg> },
      { text: 'Architecture', to: '/platform/architecture', icon: <svg {...iconProps}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.64 5.64l2.83 2.83M15.53 15.53l2.83 2.83M5.64 18.36l2.83-2.83M15.53 8.47l2.83-2.83" /><circle cx="12" cy="12" r="2.5" /></svg> },
      { text: 'Intelligence Core', to: '/platform/intelligence-core', icon: <svg {...iconProps}><path d="M12 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" /><path d="M12 13c-2.5 0-4.5 1.5-5.5 4 1 2.5 3 4 5.5 4s4.5-1.5 5.5-4c-1-2.5-3-4-5.5-4z" /><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" /></svg> },
      { text: 'Autonomous Agent System', to: '/platform/autonomous-agent-system', icon: <svg {...iconProps}><rect x="4" y="8" width="16" height="12" rx="2" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /><circle cx="12" cy="14" r="1.5" /></svg> },
      { text: 'Security & Trust Architecture', to: '/platform/security-trust', icon: <svg {...iconProps}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> },
    ],
  },
  {
    label: 'Company',
    items: [
      { text: 'About Anoryx', to: '/company/about', icon: <svg {...iconProps}><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg> },
      { text: "Founder's Note", to: '/company/founders-note', icon: <svg {...iconProps}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg> },
      { text: 'Vision & Mission', to: '/company/vision-mission', icon: <svg {...iconProps}><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg> },
    ],
  },
];

/* Chevron down SVG icon */
function ChevronIcon({ className }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3.5 5.25L7 8.75L10.5 5.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token, logout, setUser } = useAuth();
  const isDarkNavbar = location.pathname === '/company/founders-note' || location.pathname === '/platform/intelligence-core' || location.pathname === '/platform/security-trust' || location.pathname === '/solutions/industry-applications';
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [profilePhone, setProfilePhone] = useState('');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSavedMessage, setProfileSavedMessage] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    if (user) {
      setProfileName(user.name || '');
      setProfilePhone(user.phone || '');
    }
  }, [user]);

  useEffect(() => {
    if (!userMenuOpen) return;
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [userMenuOpen]);

  const handleSignupClick = (e) => {
    e.preventDefault();
    closeMobile();
    navigate('/', { state: { focusSignup: true } });
  };

  const handleSaveProfile = async () => {
    if (!token) return;
    setProfileSaving(true);
    setProfileSavedMessage(false);
    try {
      const res = await fetch(`${API_BASE}/api/auth/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: profileName.trim() || undefined, phone: profilePhone.trim() || undefined }),
      });
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
        setProfileSavedMessage(true);
        setTimeout(() => setProfileSavedMessage(false), 4000);
      }
    } catch (_) {}
    setProfileSaving(false);
  };

  const handleLogout = () => {
    setUserMenuOpen(false);
    logout();
    closeMobile();
  };

  const avatarInitial = user
    ? (user.name && user.name.trim() ? user.name.trim().charAt(0).toUpperCase() : (user.email || '?').charAt(0).toUpperCase())
    : '';

  const toggleMobile = () => {
    setMobileOpen((prev) => !prev);
    setOpenDropdown(null);
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  const handleDropdownToggle = (label) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <nav className={`${styles.navbar} ${isDarkNavbar ? styles.navbarDark : ''}`} aria-label="Main navigation">
      <div className={styles.navbarInner}>
        {/* Left section — logo + brand name (both link to home) */}
        <div className={styles.left}>
          <Link to="/" className={styles.logoBrandLink} onClick={closeMobile} aria-label="Anoryx Tech Solutions – Home">
            <span className={styles.logoBox}>
              <img src={logo} alt="" className={styles.logoImage} />
            </span>
            <div className={styles.brandName}>
              <span className={`${styles.brandWord} ${styles.word3}`}>Anoryx</span>
              <span className={`${styles.brandWord} ${styles.word2}`}>Tech</span>
              <span className={`${styles.brandWord} ${styles.word1}`}>Solutions</span>
            </div>
          </Link>
        </div>

        {/* Hamburger button — visible on mobile/tablet only */}
        <button
          className={styles.hamburger}
          onClick={toggleMobile}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.line1Open : ''}`} />
          <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.line2Open : ''}`} />
          <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.line3Open : ''}`} />
        </button>

        {/* Nav items — desktop: flex row | mobile: dropdown panel */}
        <div className={`${styles.navItems} ${mobileOpen ? styles.navItemsOpen : ''}`}>
          {DROPDOWNS.map((dropdown) => (
            <div
              key={dropdown.label}
              className={`${styles.dropdownWrapper} ${
                openDropdown === dropdown.label ? styles.dropdownWrapperActive : ''
              }`}
            >
              {/* Dropdown trigger — opens panel on click */}
              <button
                className={styles.dropdownTrigger}
                onClick={() => handleDropdownToggle(dropdown.label)}
                aria-expanded={openDropdown === dropdown.label}
              >
                <span>{dropdown.label}</span>
                <ChevronIcon
                  className={`${styles.chevron} ${
                    openDropdown === dropdown.label ? styles.chevronOpen : ''
                  }`}
                />
              </button>

              {/* Dropdown panel */}
              {openDropdown === dropdown.label && (
                <div className={`${styles.dropdownPanel} ${dropdown.wide ? styles.dropdownPanelWide : ''}`}>
                  {dropdown.items.map((item) => (
                    <Link
                      key={item.text}
                      to={item.to}
                      className={`${styles.dropdownLink} ${item.desc ? styles.dropdownLinkRich : ''} ${item.separator ? styles.dropdownLinkSeparated : ''}`}
                      onClick={closeMobile}
                    >
                      <span className={styles.dropdownLinkIcon} aria-hidden="true">{item.icon}</span>
                      {item.desc ? (
                        <span className={styles.dropdownLinkBody}>
                          <span className={styles.dropdownLinkTitle}>{item.text}</span>
                          <span className={styles.dropdownLinkDesc}>{item.desc}</span>
                        </span>
                      ) : (
                        item.text
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Contact link */}
          <Link to="/contact" className={styles.contactLink} onClick={closeMobile}>
            Contact
          </Link>

          {/* Sign up (when not logged in) — avatar is after Home on desktop */}
          {!user && (
            <>
              <span className={styles.divider} aria-hidden="true">|</span>
              <button type="button" className={styles.signupLink} onClick={handleSignupClick}>
                Sign up
              </button>
            </>
          )}
          {/* Home — inside menu for mobile only */}
          <Link to="/" className={styles.homeLinkMobile} onClick={closeMobile}>
            Home
          </Link>
        </div>
        {/* Home — outside group, far right on desktop only */}
        <Link to="/" className={styles.homeLinkDesktop} onClick={closeMobile}>
          <span className={styles.homeIcon} aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </span>
          Home
        </Link>
        {/* User avatar + dropdown — far right on desktop (after Home) */}
        {user && (
          <div className={styles.userMenuWrapper} ref={userMenuRef}>
            <button
              type="button"
              className={styles.avatarButton}
              onClick={() => setUserMenuOpen((o) => !o)}
              aria-expanded={userMenuOpen}
              aria-haspopup="true"
            >
              <span className={styles.avatarCircle}>{avatarInitial}</span>
            </button>
            {userMenuOpen && (
              <div className={styles.userDropdown}>
                <div className={styles.userDropdownEmail}>{user.email}</div>
                <label className={styles.userDropdownLabel}>
                  Name
                  <input
                    type="text"
                    className={styles.userDropdownInput}
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    placeholder="Your name"
                  />
                </label>
                <label className={styles.userDropdownLabel}>
                  Phone
                  <input
                    type="text"
                    className={styles.userDropdownInput}
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    placeholder="Phone number"
                  />
                </label>
                <button
                  type="button"
                  className={styles.userDropdownSave}
                  onClick={handleSaveProfile}
                  disabled={profileSaving}
                >
                  {profileSaving ? 'Saving…' : 'Save'}
                </button>
                {profileSavedMessage && (
                  <p className={styles.userDropdownSaved} role="status">
                    Your details have been updated.
                  </p>
                )}
                <button type="button" className={styles.userDropdownLogout} onClick={handleLogout}>
                  Log out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
