import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCT_INTEREST_OPTIONS } from '../../data/products.js';
import styles from './Contact.module.css';

const VALID_INTERESTS = new Set(PRODUCT_INTEREST_OPTIONS.map((o) => o.value));

export default function Contact() {
  const sectionRefs = useRef([]);
  const [inView, setInView] = useState({});
  const [searchParams] = useSearchParams();
  const requestedProduct = searchParams.get('product') || '';
  const initialInterest = VALID_INTERESTS.has(requestedProduct) ? requestedProduct : '';
  const [form, setForm] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    productInterest: initialInterest,
    subject: initialInterest ? 'early-access' : '',
    message: '',
  });

  /* Pre-select the product when arriving from a product CTA (?product=<slug>). */
  useEffect(() => {
    if (initialInterest) {
      setForm((prev) => ({ ...prev, productInterest: initialInterest, subject: prev.subject || 'early-access' }));
    }
  }, [initialInterest]);
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'sending' | 'success' | 'error'
  const [submitMessage, setSubmitMessage] = useState('');

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('sending');
    setSubmitMessage('');
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitStatus('error');
        setSubmitMessage(data.error || 'Something went wrong. Please try again or email us directly.');
        return;
      }
      setSubmitStatus('success');
      setSubmitMessage(data.message || 'Thank you. Your message has been sent.');
      setForm({ fullName: '', workEmail: '', companyName: '', productInterest: '', subject: '', message: '' });
    } catch (err) {
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection or email us at afnan.ceo@anoryxtechsolutions.com');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageStrip}>
        {/* Section 1 — Contact Hero */}
        <section
          className={`${styles.hero} ${styles.sectionStripe} ${inView.hero ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[0] = el)}
          data-section="hero"
        >
          <div className={styles.heroBg} />
          <div className={styles.heroInner}>
            <span className={styles.heroLabel}>CONTACT ANORYX</span>
            <h1 className={styles.heroTitle}>Get in Touch with Anoryx Tech Solutions</h1>
            <p className={styles.heroSub}>
              Enterprises, partners, researchers, and customers can reach out for solutions, collaboration, product inquiries, or enterprise deployment discussions. We are here to help.
            </p>
            <div className={styles.heroCTAs}>
              <a href="#contact-message" className={styles.btnPrimary}>Get In Touch Via Email</a>
            </div>
          </div>
        </section>

        {/* Section 2 — Contact (single company email) */}
        <section
          className={`${styles.section} ${styles.sectionStripe} ${inView.options ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[1] = el)}
          data-section="options"
        >
          <div className={styles.container}>
            <h2 className={styles.sectionHeading}>Contact</h2>
            <div className={styles.optionCardSingle}>
              <span className={styles.optionIcon} aria-hidden>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              </span>
              <h3 className={styles.optionTitle}>Get in touch</h3>
              <p className={styles.optionDesc}>For all inquiries — sales, engineering, partnerships, or general — reach us at our company email.</p>
              <a href="mailto:afnan.ceo@anoryxtechsolutions.com" className={styles.optionBtn}>afnan.ceo@anoryxtechsolutions.com</a>
            </div>
          </div>
        </section>

        {/* Section 3 — Contact Form (message section) */}
        <section
          id="contact-message"
          className={`${styles.sectionAlt} ${styles.sectionStripe} ${inView.form ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[2] = el)}
          data-section="form"
        >
          <div className={styles.container}>
            <div className={styles.formLayout}>
              <div className={styles.formIntro}>
                <h2 className={styles.sectionHeading}>Send a Message</h2>
                <p className={styles.formIntroText}>
                  We aim to respond to all messages within one to two business days. Our team is available to support enterprise deployments, technical questions, and partnership discussions.
                </p>
              </div>
              <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.formLabel}>
                  Full Name
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className={styles.formInput}
                    placeholder="Your name"
                    required
                  />
                </label>
                <label className={styles.formLabel}>
                  Work Email
                  <input
                    type="email"
                    name="workEmail"
                    value={form.workEmail}
                    onChange={handleChange}
                    className={styles.formInput}
                    placeholder="you@company.com"
                    required
                  />
                </label>
                <label className={styles.formLabel}>
                  Company Name
                  <input
                    type="text"
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    className={styles.formInput}
                    placeholder="Your company"
                  />
                </label>
                <label className={styles.formLabel}>
                  Product of interest
                  <select
                    name="productInterest"
                    value={form.productInterest}
                    onChange={handleChange}
                    className={styles.formSelect}
                  >
                    <option value="">Select a product (optional)</option>
                    {PRODUCT_INTEREST_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </label>
                <label className={styles.formLabel}>
                  Subject
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={styles.formSelect}
                    required
                  >
                    <option value="">Select a topic</option>
                    <option value="early-access">Early access / design partner</option>
                    <option value="sales">Sales & Enterprise</option>
                    <option value="engineering">Technical Support</option>
                    <option value="partnerships">Partnerships</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </label>
                <label className={styles.formLabel}>
                  Message
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className={styles.formTextarea}
                    placeholder="How can we help?"
                    rows={5}
                    required
                  />
                </label>
                {submitStatus === 'success' && (
                  <p className={styles.formStatusSuccess} role="status">{submitMessage}</p>
                )}
                {submitStatus === 'error' && (
                  <p className={styles.formStatusError} role="alert">{submitMessage}</p>
                )}
                <button type="submit" className={styles.formSubmit} disabled={submitStatus === 'sending'}>
                  {submitStatus === 'sending' ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Section 4 — Company Information */}
        <section
          className={`${styles.section} ${styles.sectionStripe} ${inView.company ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[3] = el)}
          data-section="company"
        >
          <div className={styles.container}>
            <h2 className={styles.sectionHeading}>Company Information</h2>
            <div className={styles.companyCard}>
              <div className={styles.companyRow}>
                <span className={styles.companyIcon} aria-hidden>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
                </span>
                <div>
                  <strong>Company Name</strong>
                  <p>Anoryx Tech Solutions Pvt Ltd</p>
                </div>
              </div>
              <div className={styles.companyRow}>
                <span className={styles.companyIcon} aria-hidden>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                </span>
                <div>
                  <strong>Business type</strong>
                  <p>Enterprise Intelligence Infrastructure Company</p>
                </div>
              </div>
              <div className={styles.companyRow}>
                <span className={styles.companyIcon} aria-hidden>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                </span>
                <div>
                  <strong>Primary operations</strong>
                  <p>AI infrastructure, autonomous systems, privacy-first intelligence platforms</p>
                </div>
              </div>
              <div className={styles.companyRow}>
                <span className={styles.companyIcon} aria-hidden>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                </span>
                <div>
                  <strong>Email</strong>
                  <p><a href="mailto:afnan.ceo@anoryxtechsolutions.com" className={styles.companyEmailLink}>afnan.ceo@anoryxtechsolutions.com</a></p>
                </div>
              </div>
              <div className={styles.companyRow}>
                <span className={styles.companyIcon} aria-hidden>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                </span>
                <div>
                  <strong>Office</strong>
                  <p>Bangalore, India</p>
                </div>
              </div>
              <div className={styles.companyRow}>
                <span className={styles.companyIcon} aria-hidden>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                </span>
                <div>
                  <strong>Operating region</strong>
                  <p>Global</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 — Enterprise CTA */}
        <section
          className={`${styles.sectionAlt} ${styles.sectionStripe} ${inView.enterprise ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[4] = el)}
          data-section="enterprise"
        >
          <div className={styles.container}>
            <h2 className={styles.sectionHeadingCentered}>Enterprise Deployment and Platform Access</h2>
            <p className={styles.enterpriseLead}>
              Anoryx works with enterprises deploying intelligence infrastructure and autonomous systems. Request access to our platform or schedule a consultation to discuss your requirements.
            </p>
            <p className={styles.enterpriseMailLabel}>Mail for Scheduling an Appointment</p>
            <div className={styles.enterpriseMailWrap}>
              <a href="mailto:afnan.ceo@anoryxtechsolutions.com?subject=Scheduling%20an%20Appointment" className={styles.enterpriseMailPill}>
                afnan.ceo@anoryxtechsolutions.com
              </a>
            </div>
          </div>
        </section>

        {/* Section 6 — Social Links */}
        <section
          className={`${styles.section} ${styles.sectionStripe} ${inView.social ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[5] = el)}
          data-section="social"
        >
          <div className={styles.container}>
            <h2 className={styles.socialTitle}>Connect</h2>
            <p className={styles.socialSubtitle}>Follow us on social and explore our open-source work on GitHub.</p>
            <div className={styles.socialWrap}>
              <a href="https://www.linkedin.com/company/109288294/" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="LinkedIn">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              <a href="mailto:afnan.ceo@anoryxtechsolutions.com" className={styles.socialBtn} aria-label="Email">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              </a>
              <a href="https://www.instagram.com/anoryx_tech/" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Instagram">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
              <a href="https://github.com/TeamAnoryx" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="GitHub">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              </a>
            </div>
          </div>
        </section>

        {/* Section 7 — Final Trust */}
        <section
          className={`${styles.trustSection} ${inView.trust ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[6] = el)}
          data-section="trust"
        >
          <div className={styles.container}>
            <p className={styles.trustText}>
              Anoryx Tech Solutions builds <strong>intelligence infrastructure</strong> designed for <strong>enterprise-grade autonomy</strong>, <strong>privacy</strong>, and <strong>scale</strong>.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
