/**
 * ProposalViewer — renders the business proposal with pdf.js.
 *
 * Visitors receive only the server-made preview (first pages). The remaining pages are
 * shown as blurred placeholders; scrolling into them reveals the request-access panel.
 * A visitor with an approved access link (?access=<token>) gets the full document.
 *
 * The document is view-only: no download link, no right-click or drag, print is blanked,
 * and the pages are covered whenever the tab loses focus (e.g. a screenshot tool opens).
 * Unlocked pages carry the reader's name and email as a watermark. A browser cannot fully
 * block screen capture; these measures make it harder and make leaks traceable.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { warmUpApi } from '../../context/AuthContext.jsx';
import styles from './ProposalViewer.module.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const ACCESS_KEY = 'anoryx_proposal_access';
const A4_RATIO = 1.414;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PROPOSAL_ROLES = [
  { value: 'investor', label: 'Investor' },
  { value: 'cofounder', label: 'Potential co-founder' },
  { value: 'partner', label: 'Design partner / customer' },
  { value: 'other', label: 'Other' },
];

function readStoredAccess() {
  try {
    return localStorage.getItem(ACCESS_KEY) || '';
  } catch {
    return '';
  }
}

/** Takes ?access=<token> from the URL (once), stores it and removes it from the address bar. */
function takeAccessFromUrl() {
  const url = new URL(window.location.href);
  const token = url.searchParams.get('access');
  if (!token) return '';
  url.searchParams.delete('access');
  window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
  try {
    localStorage.setItem(ACCESS_KEY, token);
  } catch {
    /* storage unavailable: token still works for this visit */
  }
  return token;
}

function Watermark({ text }) {
  return (
    <div className={styles.watermark} aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => <span key={i}>{text}</span>)}
    </div>
  );
}

function PdfPage({ pdf, pageNumber, width, watermark }) {
  const canvasRef = useRef(null);
  const holderRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [ratio, setRatio] = useState(1.414); // A4 until measured

  useEffect(() => {
    const el = holderRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { rootMargin: '600px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !pdf || !width) return undefined;
    let task;
    let cancelled = false;
    pdf.getPage(pageNumber).then((page) => {
      if (cancelled) return;
      const base = page.getViewport({ scale: 1 });
      setRatio(base.height / base.width);
      const scale = (width / base.width) * Math.min(window.devicePixelRatio || 1, 2);
      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      task = page.render({ canvasContext: canvas.getContext('2d'), viewport });
      task.promise.catch(() => {});
    });
    return () => {
      cancelled = true;
      task?.cancel();
    };
  }, [visible, pdf, pageNumber, width]);

  return (
    <div ref={holderRef} className={styles.page} style={{ aspectRatio: `1 / ${ratio}`, width: width || undefined }} data-page={pageNumber}>
      <canvas ref={canvasRef} className={styles.canvas} aria-label={`Proposal page ${pageNumber}`} />
      {watermark && <Watermark text={watermark} />}
      {!visible && <div className={styles.pageSkeleton} aria-hidden="true" />}
    </div>
  );
}

function LockedPage({ number, width }) {
  return (
    <div className={`${styles.page} ${styles.lockedPage}`} style={{ aspectRatio: '1 / 1.414', width: width || undefined }} data-page={number} aria-hidden="true">
      <div className={styles.fakeContent}>
        <span className={styles.fakeTitle} />
        {Array.from({ length: 9 }, (_, i) => (
          <span key={i} className={styles.fakeLine} style={{ width: `${68 + ((i * 37 + number * 13) % 30)}%` }} />
        ))}
        <span className={styles.fakeBlock} />
        {Array.from({ length: 6 }, (_, i) => (
          <span key={`b${i}`} className={styles.fakeLine} style={{ width: `${60 + ((i * 23 + number * 7) % 35)}%` }} />
        ))}
      </div>
      <span className={styles.lockedNumber}>{number}</span>
    </div>
  );
}

const emptyForm = (role) => ({ fullName: '', workEmail: '', organisation: '', role: role || '', message: '' });

function RequestForm({ presetRole, lockedFrom, pageCount, onClose }) {
  const [form, setForm] = useState(() => emptyForm(presetRole));
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');
  const [sentAt, setSentAt] = useState(null);

  useEffect(() => {
    if (presetRole) setForm((f) => ({ ...f, role: presetRole }));
  }, [presetRole]);

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.fullName.trim() || !EMAIL_REGEX.test(form.workEmail.trim()) || !form.role) {
      setStatus('error');
      setError('Please add your name, a valid email address and how you would like to be involved.');
      return;
    }
    setStatus('sending');
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/proposal-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not send your request.');
      setSentAt(data.sentAt ? new Date(data.sentAt) : new Date());
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Could not send your request. Please try again.');
    }
  };

  // Keep who they are, clear the rest, so another request is quick to send.
  const sendAnother = () => {
    setForm((f) => ({ ...emptyForm(f.role), fullName: f.fullName, workEmail: f.workEmail, organisation: f.organisation }));
    setStatus('idle');
    setError('');
  };

  if (status === 'sent') {
    return (
      <div className={styles.sent} role="status">
        <svg className={styles.sentIcon} viewBox="0 0 52 52" aria-hidden="true">
          <circle cx="26" cy="26" r="24" />
          <path d="M15 27l7 7 15-16" />
        </svg>
        <h3>Request sent</h3>
        <p className={styles.sentMeta}>
          Sent {sentAt.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })} to the{' '}
          <strong>Anoryx Tech Solutions team</strong>
        </p>
        <p>
          Once it&apos;s approved we&apos;ll email <strong>{form.workEmail}</strong> a private link that unlocks pages{' '}
          {lockedFrom}–{pageCount}.
        </p>
        <div className={styles.sentActions}>
          <button type="button" className={styles.secondaryBtn} onClick={sendAnother}>Send another request</button>
          <button type="button" className={styles.submit} onClick={onClose}>Done</button>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <div className={styles.formGrid}>
        <label>
          Full name
          <input name="fullName" value={form.fullName} onChange={update} onFocus={warmUpApi} autoComplete="name" required />
        </label>
        <label>
          Work / personal email
          <input name="workEmail" type="email" value={form.workEmail} onChange={update} autoComplete="email" required />
        </label>
        <label>
          Firm or company
          <input name="organisation" value={form.organisation} onChange={update} autoComplete="organization" />
        </label>
        <label>
          I&apos;m interested as
          <select name="role" value={form.role} onChange={update} required>
            <option value="">Select one</option>
            {PROPOSAL_ROLES.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </label>
        <label className={styles.full}>
          <span>
            Message <span className={styles.optional}>(optional)</span>
          </span>
          <textarea name="message" rows={2} value={form.message} onChange={update} placeholder="A line about you and what you'd like to discuss" />
        </label>
      </div>
      {status === 'error' && <p className={styles.formError} role="alert">{error}</p>}
      <button type="submit" className={styles.submit} disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Request full access'}
      </button>
      <p className={styles.formNote}>Requests are reviewed personally by the founder. Your details are used only to reply to you.</p>
    </form>
  );
}

export default function ProposalViewer({ presetRole = '', requestSignal = 0, onAccess }) {
  const wrapRef = useRef(null);
  const scrollRef = useRef(null);
  const lockedRef = useRef(null);
  const [meta, setMeta] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [access, setAccess] = useState(null); // { name, expiresAt } when unlocked
  const [loadError, setLoadError] = useState('');
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [panelOpen, setPanelOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [shielded, setShielded] = useState(false);
  const autoOpenedRef = useRef(false);

  // Full-screen viewer: lock page scroll, close on Escape, keep the reader on the same page.
  useEffect(() => {
    if (!expanded) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setExpanded(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [expanded]);

  const toggleExpanded = useCallback((next) => {
    const el = scrollRef.current;
    const page = el?.querySelector(`[data-page="${currentPage}"]`);
    setExpanded(next);
    // After the layout changes size, bring the same page back into view.
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const target = scrollRef.current?.querySelector(`[data-page="${page?.dataset.page || 1}"]`);
      if (target && scrollRef.current) scrollRef.current.scrollTop = target.offsetTop - 16;
    }));
  }, [currentPage]);

  // Load meta + the right document (full when the access token is valid, else preview).
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const token = takeAccessFromUrl() || readStoredAccess();
        const metaRes = await fetch(`${API_BASE}/api/proposal/meta`);
        const metaData = await metaRes.json().catch(() => ({}));
        if (!metaRes.ok) throw new Error(metaData.error || 'The proposal is not available right now.');

        let bytes;
        let unlocked = null;
        if (token) {
          const check = await fetch(`${API_BASE}/api/proposal/access`, { headers: { Authorization: `Bearer ${token}` } });
          if (check.ok) {
            unlocked = await check.json();
            const docRes = await fetch(`${API_BASE}/api/proposal/document`, { headers: { Authorization: `Bearer ${token}` } });
            if (docRes.ok) bytes = await docRes.arrayBuffer();
            else unlocked = null;
          } else if (check.status === 401) {
            try { localStorage.removeItem(ACCESS_KEY); } catch { /* ignore */ }
          }
        }
        if (!bytes) {
          const prevRes = await fetch(`${API_BASE}/api/proposal/preview`);
          if (!prevRes.ok) throw new Error('The proposal preview could not be loaded.');
          bytes = await prevRes.arrayBuffer();
        }

        const pdfjs = await import('pdfjs-dist');
        pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
        const doc = await pdfjs.getDocument({ data: new Uint8Array(bytes) }).promise;
        if (cancelled) return;
        setMeta({ pageCount: metaData.pageCount, previewPages: metaData.previewPages });
        setAccess(unlocked);
        if (unlocked) onAccess?.(unlocked);
        setPdf(doc);
      } catch (err) {
        if (!cancelled) setLoadError(err.message || 'The proposal could not be loaded.');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Request popup: lock page scroll and close on Escape while it is open.
  useEffect(() => {
    if (!panelOpen) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setPanelOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [panelOpen]);

  // View-only: block save/print shortcuts, and cover the pages whenever the tab is hidden,
  // loses focus (screenshot and recording tools take focus) or Print Screen is pressed.
  useEffect(() => {
    const cover = () => setShielded(true);
    const uncover = () => !document.hidden && document.hasFocus() && setShielded(false);
    const onKeyDown = (e) => {
      const key = (e.key || '').toLowerCase();
      if ((e.ctrlKey || e.metaKey) && (key === 's' || key === 'p')) e.preventDefault();
      if (e.key === 'PrintScreen' || (e.metaKey && e.shiftKey && ['3', '4', '5', 's'].includes(key))) cover();
    };
    const onKeyUp = (e) => {
      if (e.key !== 'PrintScreen') return;
      cover();
      navigator.clipboard?.writeText('').catch(() => {});
      setTimeout(uncover, 1500);
    };
    const onVisibility = () => (document.hidden ? cover() : uncover());
    window.addEventListener('blur', cover);
    window.addEventListener('focus', uncover);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('blur', cover);
      window.removeEventListener('focus', uncover);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  // Page width follows the viewer width.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([entry]) => setBox({ w: Math.round(entry.contentRect.width), h: Math.round(entry.contentRect.height) }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Inline: a whole A4 portrait page fits the frame. Full screen: wider pages for reading.
  const width = expanded ? Math.min(box.w, 980) : Math.floor(Math.min(box.w, box.h / A4_RATIO));
  const renderedPages = pdf ? pdf.numPages : 0;
  const lockedFrom = meta ? meta.previewPages + 1 : 4;
  const lockedCount = meta && !access ? Math.max(0, meta.pageCount - meta.previewPages) : 0;

  // Track the current page and open the request panel once the reader reaches the locked pages.
  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const mid = el.scrollTop + el.clientHeight * 0.35;
    const pages = el.querySelectorAll('[data-page]');
    let page = 1;
    pages.forEach((p) => {
      if (p.offsetTop <= mid) page = Number(p.dataset.page);
    });
    setCurrentPage(page);
    if (lockedRef.current && !access) {
      const reached = lockedRef.current.offsetTop < el.scrollTop + el.clientHeight * 0.8;
      // Open the request popup once when the reader first reaches the locked pages.
      if (reached && !autoOpenedRef.current) {
        autoOpenedRef.current = true;
        setPanelOpen(true);
      }
    }
  }, [access]);

  // Another section asked to open the request form (e.g. "I'm an investor" button).
  useEffect(() => {
    if (!requestSignal || access) return;
    setPanelOpen(true);
  }, [requestSignal, access]);

  const watermark = access
    ? `${access.name} · ${access.email || ''} · Confidential`
    : 'Anoryx Tech Solutions · Confidential preview';
  const blockAction = (e) => e.preventDefault();

  if (loadError) {
    return (
      <div className={styles.viewerWrap}>
        <div className={styles.errorBox} role="alert">
          <p>{loadError}</p>
          <p>
            You can also request the proposal by email:{' '}
            <a href="mailto:afnan.ceo@anoryxtechsolutions.com?subject=Business%20proposal%20request">afnan.ceo@anoryxtechsolutions.com</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={wrapRef}
      className={`${styles.viewerWrap} ${expanded ? styles.expanded : ''}`}
      onContextMenu={blockAction}
      onDragStart={blockAction}
      onCopy={blockAction}
      role={expanded ? 'dialog' : undefined} aria-modal={expanded || undefined} aria-label={expanded ? 'Business proposal viewer' : undefined}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <span className={styles.docIcon} aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
          </span>
          <span className={styles.docName}>Anoryx Business Proposal</span>
        </div>
        <div className={styles.toolbarRight}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => toggleExpanded(!expanded)}
            aria-label={expanded ? 'Close full-screen viewer' : 'Open full-screen viewer'}
            title={expanded ? 'Close (Esc)' : 'Open viewer'}
          >
            {expanded ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
            )}
          </button>
          {meta && (
            <span className={styles.pageCounter} aria-live="polite">
              Page {Math.min(currentPage, meta.pageCount)} of {meta.pageCount}
            </span>
          )}
          {access ? (
            <span className={styles.unlockedBadge}>Unlocked</span>
          ) : (
            meta && (
              <button type="button" className={styles.toolbarBtn} onClick={() => setPanelOpen(true)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
                Request full access
              </button>
            )
          )}
        </div>
      </div>

      <div
        ref={scrollRef}
        className={styles.scroller}
        onScroll={onScroll}
        onClick={(e) => {
          if (!expanded && e.target.closest('[data-page]')) toggleExpanded(true);
        }} tabIndex={0} aria-label="Business proposal pages">
        {!pdf && (
          <div className={styles.loading}>
            <span className={styles.spinner} aria-hidden="true" />
            Loading the proposal…
          </div>
        )}
        {pdf &&
          Array.from({ length: renderedPages }, (_, i) => (
            <PdfPage key={i} pdf={pdf} pageNumber={i + 1} width={width} watermark={watermark} />
          ))}
        {pdf && lockedCount > 0 && (
          <div ref={lockedRef} className={styles.lockedZone}>
            {Array.from({ length: lockedCount }, (_, i) => (
              <LockedPage key={i} number={lockedFrom + i} width={width} />
            ))}
          </div>
        )}
        {access && (
          <p className={styles.accessNote}>
            Shared with {access.name}. Access ends {new Date(access.expiresAt).toLocaleDateString()}. View only: please don&apos;t copy or share this document.
          </p>
        )}
      </div>

      {shielded && pdf && (
        <div className={styles.shield} aria-hidden="true" onClick={() => setShielded(false)}>
          <span>Click here to keep reading</span>
        </div>
      )}

      {!access && meta && createPortal(
        <div
          className={`${styles.modalOverlay} ${panelOpen ? styles.modalOpen : ''}`}
          onMouseDown={(e) => e.target === e.currentTarget && setPanelOpen(false)}
          aria-hidden={!panelOpen}
        >
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="proposal-request-title"
            inert={panelOpen ? undefined : ''}
          >
            <button type="button" className={styles.closePanel} onClick={() => setPanelOpen(false)} aria-label="Close">×</button>
            <div className={styles.lockHead}>
              <span className={styles.lockIcon} aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
              </span>
              <div>
                <h3 id="proposal-request-title">Pages {lockedFrom}–{meta.pageCount} are shared on request</h3>
                <p>The full proposal covers our go-to-market plan, unit economics and capital plan. Tell us who you are and we&apos;ll send you a private link.</p>
              </div>
            </div>
            <RequestForm presetRole={presetRole} lockedFrom={lockedFrom} pageCount={meta.pageCount} onClose={() => setPanelOpen(false)} />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
