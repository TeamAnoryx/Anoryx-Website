import { useState, useRef, useEffect } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import styles from './Home.module.css';

import Main from '../components/Main/Main.jsx';

import CategorySection from '../components/CategorySection/CategorySection.jsx';

import WhySection from '../components/WhySection/WhySection.jsx';

import PlatformArchitecture from '../components/TechSection/PlatformArchitecture.jsx';

import ExecutionCapabilities from '../components/ExecutionCapabilities/ExecutionCapabilities.jsx';

import FoundersNote from '../components/FoundersNote/FoundersNote.jsx';

import StripeSection from '../components/StripeSection/StripeSection.jsx';

import PlatformIntelligenceIndex from '../components/PlatformIntelligenceIndex/PlatformIntelligenceIndex.jsx';

import AnnouncementStrip from '../components/AnnouncementStrip/AnnouncementStrip.jsx';

import n8nImage from '../assets/n8n.jpg';

import { useAuth, warmUpApi } from '../context/AuthContext.jsx';

import { CORE_NARRATIVE, contactHref } from '../data/products.js';

import usePageMeta from '../hooks/usePageMeta.js';

import { pageMeta } from '../data/seo.js';
import { mountGoogleButton } from '../utils/googleSignIn.js';



const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const SIGNUP_PROMPT_MSG = 'Enter valid email address and sign in.';

const SLOW_NOTICE_DELAY_MS = 3000;

const RETRY_DELAY_MS = 1500;



/* POST JSON to the API. Retries once when the server is still waking up

 * (network error or 502/503/504), which happens on the first request after idle. */

async function postAuth(path, body) {

  const attempt = () =>

    fetch(`${API_BASE}${path}`, {

      method: 'POST',

      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify(body),

    });

  let res;

  try {

    res = await attempt();

  } catch {

    res = null;

  }

  if (!res || [502, 503, 504].includes(res.status)) {

    await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));

    res = await attempt();

  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok || !data.token || !data.user) throw new Error(data.error || 'Sign-in failed. Please try again.');

  return data;

}



function Home() {

  usePageMeta(pageMeta('/'));

  const location = useLocation();

  const navigate = useNavigate();

  const { login: authLogin } = useAuth();

  const [email, setEmail] = useState('');

  const [signupPrompt, setSignupPrompt] = useState('');

  const [inputHighlight, setInputHighlight] = useState(false);

  const [signupLoading, setSignupLoading] = useState(false);

  const [slowNotice, setSlowNotice] = useState(false);

  const [consentModalOpen, setConsentModalOpen] = useState(false);

  const [thankYouModalOpen, setThankYouModalOpen] = useState(false);

  const emailInputRef = useRef(null);

  const googleButtonRef = useRef(null);



  // Callback for Google sign-in (used by both renderButton and prompt)

  const runAuth = async (path, body) => {

    setSignupLoading(true);

    setSignupPrompt('');

    setInputHighlight(false);

    const slowTimer = setTimeout(() => setSlowNotice(true), SLOW_NOTICE_DELAY_MS);

    try {

      const data = await postAuth(path, body);

      authLogin(data.token, data.user);

      setConsentModalOpen(true);

      return true;

    } catch (err) {

      setSignupPrompt(err.message || 'Sign-in failed. Please try again.');

      return false;

    } finally {

      clearTimeout(slowTimer);

      setSlowNotice(false);

      setSignupLoading(false);

    }

  };



  const handleGoogleCredential = (response) => {

    if (!response?.credential) return;

    runAuth('/api/auth/google', { id_token: response.credential });

  };



  // Render the official Google button (shared set-up: see utils/googleSignIn.js)
  const googleHandlerRef = useRef(handleGoogleCredential);
  googleHandlerRef.current = handleGoogleCredential;
  useEffect(
    () => mountGoogleButton(() => googleButtonRef.current, (response) => googleHandlerRef.current(response)),
    []
  );



  // Focus signup when navigating from Navbar "Sign up"

  useEffect(() => {

    if (location.state?.focusSignup) {

      setSignupPrompt(SIGNUP_PROMPT_MSG);

      setInputHighlight(true);

      const t = setTimeout(() => emailInputRef.current?.focus(), 100);

      navigate(location.pathname, { replace: true, state: {} });

      return () => clearTimeout(t);

    }

  }, [location.state?.focusSignup, location.pathname, navigate]);



  const handleEmailSignup = async () => {

    const trimmed = email.trim();

    if (!EMAIL_REGEX.test(trimmed)) {

      setSignupPrompt(SIGNUP_PROMPT_MSG);

      setInputHighlight(true);

      emailInputRef.current?.focus();

      return;

    }

    const ok = await runAuth('/api/auth/signup', { email: trimmed });

    if (!ok) setInputHighlight(true);

  };



  const handleConsentAllow = async () => {

    const token = localStorage.getItem('anoryx_token');

    if (token) {

      try {

        await fetch(`${API_BASE}/api/auth/consent`, {

          method: 'PATCH',

          headers: {

            'Content-Type': 'application/json',

            Authorization: `Bearer ${token}`,

          },

          body: JSON.stringify({ notificationsAllowed: true, cookiesAllowed: true }),

        });

        if ('Notification' in window) Notification.requestPermission?.();

        document.cookie = 'anoryx_consent=1; path=/; max-age=31536000';

      } catch (_) {}

    }

    setConsentModalOpen(false);

    setThankYouModalOpen(true);

  };



  const handleConsentMaybeLater = () => {

    setConsentModalOpen(false);

    setThankYouModalOpen(true);

  };



  const closeThankYou = () => setThankYouModalOpen(false);



  return (

    <>

      <AnnouncementStrip />

      <section className={styles.hero}>

        <div className={styles.blackSection}>

          <div className={styles.blackSectionContent}>

            {/* Left — Headline */}

            <div className={styles.heroLeft}>

              {/* Headline = HERO_HEADLINE in data/products.js ("The secure operating layer for enterprise AI."). */}

              <h1 className={styles.heroHeadline}>

                <span className={styles.heroSmall}>The secure operating</span>

                <span className={styles.heroSmall}>layer for</span>

                <span className={styles.heroAccent}>ENTERPRISE AI.</span>

              </h1>

              <p className={styles.heroSlogan}>

                {CORE_NARRATIVE} One platform for AI security, AI cost governance and team collaboration.

              </p>

              <div className={styles.heroCtaRow}>

                <Link to={contactHref('ecosystem')} className={styles.heroCtaPrimary}>Request early access</Link>

                <Link to="/products" className={styles.heroCtaSecondary}>Explore the platform</Link>

              </div>

            </div>



            {/* Right — Sign up form */}

            <div className={styles.heroRight}>

              <div className={styles.signupWrapper}>

                <div className={styles.signupForm}>

                  <label className={styles.emailLabel}>Work email</label>

                  {signupPrompt && (

                    <p className={styles.signupPromptMessage} role="alert">

                      {signupPrompt}

                    </p>

                  )}

                  <input

                    ref={emailInputRef}

                    type="email"

                    className={`${styles.emailInputPill} ${inputHighlight ? styles.emailInputHighlight : ''}`}

                    placeholder="you@company.com"

                    value={email}

                    onChange={(e) => { setEmail(e.target.value); setSignupPrompt(''); setInputHighlight(false); }}

                    onFocus={warmUpApi}

                    aria-label="Work email"

                  />

                  <p className={styles.signupDescription}>

                    Using a work email helps find teammates and boost collaboration.

                  </p>

                  <button

                    type="button"

                    className={styles.signupButtonPill}

                    onClick={handleEmailSignup}

                    disabled={signupLoading}

                  >

                    {signupLoading ? 'Signing up…' : 'Sign up'}

                  </button>

                  {slowNotice && (

                    <p className={styles.signupDescription} role="status">

                      Waking up our server. The first sign-in after a quiet spell can take a few seconds.

                    </p>

                  )}

                  <div className={styles.dividerWithText}>

                    <span className={styles.dividerLine}></span>

                    <span className={styles.dividerText}>Or continue with</span>

                    <span className={styles.dividerLine}></span>

                  </div>

                  <div

                    ref={googleButtonRef}

                    className={styles.googleButtonContainer}

                    aria-label="Sign in with Google"

                  />

                  {!GOOGLE_CLIENT_ID && (

                    <p className={styles.signupPromptMessage}>Google sign-in is not configured (VITE_GOOGLE_CLIENT_ID).</p>

                  )}

                </div>

              </div>

            </div>

          </div>



          {/* Consent modal */}

          {consentModalOpen && (

            <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-labelledby="consent-title">

              <div className={styles.modalCard}>

                <h2 id="consent-title" className={styles.modalTitle}>Allow notifications and cookies</h2>

                <p className={styles.modalBody}>

                  We’d like to send you updates and use cookies to improve your experience.

                </p>

                <div className={styles.modalActions}>

                  <button type="button" className={styles.modalButtonPrimary} onClick={handleConsentAllow}>

                    Allow

                  </button>

                  <button type="button" className={styles.modalButtonSecondary} onClick={handleConsentMaybeLater}>

                    Maybe later

                  </button>

                </div>

              </div>

            </div>

          )}



          {/* Thank you modal */}

          {thankYouModalOpen && (

            <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-labelledby="thankyou-title">

              <div className={styles.modalCard}>

                <h2 id="thankyou-title" className={styles.modalTitle}>Thank you for signing up with Anoryx Tech Solutions.</h2>

                <div className={styles.modalActions}>

                  <button type="button" className={styles.modalButtonPrimary} onClick={closeThankYou}>

                    OK

                  </button>

                </div>

              </div>

            </div>

          )}



          {/* 4 Premium Feature Cards */}

          <div className={styles.featureCardsGrid}>

            {/* Card 1 - Privacy & Security */}

            <div className={styles.featureCard}>

              <div className={styles.featureCardHeader}>

                <h3 className={styles.featureCardTitle}>Protect sensitive data with AI-powered detection</h3>

                <div className={styles.featureCardArrow}>

                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">

                    <path d="M7 17L17 7M17 7H7M17 7V17" />

                  </svg>

                </div>

              </div>

              <div className={`${styles.featureCardPreview} ${styles.gradientPink}`}>

                {/* Main Dashboard Card */}

                <div className={styles.mockupCard}>

                  <div className={styles.mockupHeader}>

                    <div className={styles.mockupDots}>

                      <span></span><span></span><span></span>

                    </div>

                    <div className={styles.mockupNav}>

                      <span className={styles.navActive}>Dashboard</span>

                      <span>Alerts</span>

                      <span>Reports</span>

                    </div>

                  </div>

                  <div className={styles.mockupContent}>

                    <div className={styles.alertBanner}>

                      <svg className={styles.alertSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">

                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />

                        <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />

                      </svg>

                      <span>3 PII Risks Detected</span>

                    </div>

                    <div className={styles.riskList}>

                      <div className={styles.riskRow}>

                        <span className={styles.riskHigh}>CRITICAL</span>

                        <div className={styles.riskInfo}>

                          <span className={styles.riskTitle}>SSN exposed in logs</span>

                          <span className={styles.riskMeta}>aws-prod-logs • 2 min ago</span>

                        </div>

                      </div>

                      <div className={styles.riskRow}>

                        <span className={styles.riskMed}>WARNING</span>

                        <div className={styles.riskInfo}>

                          <span className={styles.riskTitle}>Email in public repo</span>

                          <span className={styles.riskMeta}>github.com/acme • 15 min ago</span>

                        </div>

                      </div>

                      <div className={styles.riskRow}>

                        <span className={styles.riskLow}>INFO</span>

                        <div className={styles.riskInfo}>

                          <span className={styles.riskTitle}>Phone in metadata</span>

                          <span className={styles.riskMeta}>s3://uploads • 1 hr ago</span>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

                {/* Floating Compliance Widget */}

                <div className={styles.floatingWidget}>

                  <div className={styles.widgetIcon}>

                    <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">

                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />

                    </svg>

                  </div>

                  <div className={styles.widgetContent}>

                    <div className={styles.widgetLabel}>GDPR readiness</div>

                    <div className={styles.widgetBar}><div style={{ width: '94%' }}></div></div>

                    <div className={styles.widgetValue}>94% Ready</div>

                  </div>

                </div>

              </div>

            </div>



            {/* Card 2 - AI & Automation. AFFU: keep / remove? Pre-EcoSystem service card (n8n workflow builder visual). */}

            <div className={styles.featureCard}>

              <div className={styles.featureCardHeader}>

                <h3 className={styles.featureCardTitle}>Automate workflows with intelligent AI agents</h3>

                <div className={styles.featureCardArrow}>

                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">

                    <path d="M7 17L17 7M17 7H7M17 7V17" />

                  </svg>

                </div>

              </div>

              <div className={`${styles.featureCardPreview} ${styles.gradientPurple}`}>

                {/* n8n Workflow Image - Main Visual */}

                <div className={styles.workflowImageCard}>

                  <div className={styles.workflowImageHeader}>

                    <div className={styles.mockupDots}>

                      <span></span><span></span><span></span>

                    </div>

                    <span className={styles.workflowTitle}>AI Workflow Builder</span>

                    <div className={styles.workflowBadge}>Live</div>

                  </div>

                  <div className={styles.workflowImageWrapper}>

                    <img src={n8nImage} alt="AI Workflow Automation" className={styles.workflowImage} />

                  </div>

                </div>

                {/* Calendar Section */}

                <div className={styles.calendarSection}>

                  <div className={styles.calendarHeader}>

                    <svg viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" width="14" height="14">

                      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />

                    </svg>

                    <span>February 2026</span>

                  </div>

                  <div className={styles.calendarWeekDays}>

                    <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>

                  </div>

                  <div className={styles.calendarDatesGrid}>

                    <span>10</span><span>11</span><span className={styles.calendarDateActive}>12</span><span>13</span><span>14</span><span>15</span><span>16</span>

                  </div>

                </div>

                {/* Agent Status Section */}

                <div className={styles.agentStatusSection}>

                  <div className={styles.agentStatusRow}>

                    <span className={styles.agentStatusDot} style={{ background: '#8b5cf6' }}></span>

                    <span className={styles.agentStatusName}>Document Parser</span>

                    <span className={styles.agentStatusValue}>847 docs</span>

                  </div>

                  <div className={styles.agentStatusRow}>

                    <span className={styles.agentStatusDot} style={{ background: '#06b6d4' }}></span>

                    <span className={styles.agentStatusName}>Decision Engine</span>

                    <span className={styles.agentStatusValue}>12ms</span>

                  </div>

                </div>

              </div>

            </div>



            {/* Card 3 - Blockchain & Digital Trust. AFFU: keep / remove? Pre-EcoSystem service card, no matching product. */}

            <div className={styles.featureCard}>

              <div className={styles.featureCardHeader}>

                <h3 className={styles.featureCardTitle}>Build trust with decentralized verification</h3>

                <div className={styles.featureCardArrow}>

                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">

                    <path d="M7 17L17 7M17 7H7M17 7V17" />

                  </svg>

                </div>

              </div>

              <div className={`${styles.featureCardPreview} ${styles.gradientTeal}`}>

                {/* Kanban/Project Board */}

                <div className={styles.kanbanCard}>

                  <div className={styles.kanbanHeader}>

                    <svg viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2" width="16" height="16">

                      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />

                      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />

                    </svg>

                    <span>Smart Contracts</span>

                  </div>

                  <div className={styles.kanbanItems}>

                    <div className={styles.kanbanItem}>

                      <div className={styles.kanbanDot} style={{ background: '#10b981' }}></div>

                      <span>Token Transfer</span>

                      <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" width="14" height="14">

                        <polyline points="20 6 9 17 4 12" />

                      </svg>

                    </div>

                    <div className={styles.kanbanItem}>

                      <div className={styles.kanbanDot} style={{ background: '#10b981' }}></div>

                      <span>Identity Verify</span>

                      <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" width="14" height="14">

                        <polyline points="20 6 9 17 4 12" />

                      </svg>

                    </div>

                    <div className={styles.kanbanItem}>

                      <div className={styles.kanbanDot} style={{ background: '#f59e0b' }}></div>

                      <span>Asset Registry</span>

                      <span className={styles.kanbanProgress}>75%</span>

                    </div>

                  </div>

                </div>

                {/* Transaction & Identity Cards */}

                <div className={styles.trustCards}>

                  <div className={styles.txCard}>

                    <div className={styles.txHeader}>

                      <svg viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2" width="14" height="14">

                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />

                      </svg>

                      <span>Latest Block</span>

                    </div>

                    <div className={styles.txHash}>0x8f3a...2c1b</div>

                    <div className={styles.txMeta}>

                      <span>14 transactions</span>

                      <span className={styles.txVerified}>

                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">

                          <polyline points="20 6 9 17 4 12" />

                        </svg>

                        Verified

                      </span>

                    </div>

                  </div>

                  <div className={styles.identityCard}>

                    <div className={styles.idIcon}>

                      <svg viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2">

                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />

                      </svg>

                    </div>

                    <div className={styles.idInfo}>

                      <span className={styles.idTitle}>DID Verified</span>

                      <span className={styles.idSub}>Enterprise Identity</span>

                    </div>

                  </div>

                </div>

              </div>

            </div>



            {/* Card 4 - Platforms & Digital Ecosystems */}

            <div className={styles.featureCard}>

              <div className={styles.featureCardHeader}>

                <h3 className={styles.featureCardTitle}>Connect talent with opportunity at scale</h3>

                <div className={styles.featureCardArrow}>

                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">

                    <path d="M7 17L17 7M17 7H7M17 7V17" />

                  </svg>

                </div>

              </div>

              <div className={`${styles.featureCardPreview} ${styles.gradientOrange}`}>

                {/* Form/Request Card */}

                <div className={styles.formCard}>

                  <div className={styles.formHeader}>

                    <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" width="16" height="16">

                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />

                      <circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" />

                    </svg>

                    <span>Talent Request</span>

                  </div>

                  <div className={styles.formFields}>

                    <div className={styles.formField}>

                      <label>Role</label>

                      <div className={styles.formSelect}>Senior Engineer <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg></div>

                    </div>

                    <div className={styles.formField}>

                      <label>Skills</label>

                      <div className={styles.formTags}>

                        <span>React</span><span>AI/ML</span><span>+3</span>

                      </div>

                    </div>

                  </div>

                </div>

                {/* Match Results */}

                <div className={styles.matchCard}>

                  <div className={styles.matchHeader}>Top Matches</div>

                  <div className={styles.matchList}>

                    <div className={styles.matchRow}>

                      <div className={styles.matchAvatar} style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>JD</div>

                      <div className={styles.matchInfo}>

                        <span className={styles.matchName}>Jane Doe</span>

                        <span className={styles.matchRole}>Senior Engineer</span>

                      </div>

                      <span className={styles.matchScore}>98%</span>

                    </div>

                    <div className={styles.matchRow}>

                      <div className={styles.matchAvatar} style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}>MK</div>

                      <div className={styles.matchInfo}>

                        <span className={styles.matchName}>Mike Kim</span>

                        <span className={styles.matchRole}>ML Engineer</span>

                      </div>

                      <span className={styles.matchScore}>94%</span>

                    </div>

                    <div className={styles.matchRow}>

                      <div className={styles.matchAvatar} style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}>AS</div>

                      <div className={styles.matchInfo}>

                        <span className={styles.matchName}>Amy Shah</span>

                        <span className={styles.matchRole}>Tech Lead</span>

                      </div>

                      <span className={styles.matchScore}>91%</span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      <Main />

      <CategorySection />

      {/* Sticky scene: WhySection sticks, ribbons + below scroll over it */}

      <div className={styles.stickyScene}>

        <WhySection />

        {/* Scroll spacer — WhySection stays stuck while user scrolls through this */}

        <div className={styles.scrollSpacer} />

        <PlatformArchitecture />

        <ExecutionCapabilities />

        <FoundersNote />

        <StripeSection />

        <PlatformIntelligenceIndex />

      </div>

    </>

  );

}



export default Home;

