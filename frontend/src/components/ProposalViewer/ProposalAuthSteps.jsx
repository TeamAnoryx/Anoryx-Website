/**
 * Steps shown in the proposal request popup before the request form:
 * 1. Sign in (Google, or email), 2. confirm the email with a 6-digit code.
 * Google sign-in counts as confirmed, so those visitors skip step 2.
 */

import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { GOOGLE_CLIENT_ID, mountGoogleButton } from '../../utils/googleSignIn.js';
import styles from './ProposalViewer.module.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function postJson(path, body, token) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(body || {}),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) throw new Error(data.error || 'Something went wrong. Please try again.');
  return data;
}

export function SignInStep() {
  const { login } = useAuth();
  const googleRef = useRef(null);
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  // Google's button calls back with an ID token that the server verifies.
  useEffect(
    () =>
      mountGoogleButton(() => googleRef.current, async ({ credential }) => {
        if (!credential) return;
        setBusy(true);
        setError('');
        try {
          const data = await postJson('/api/auth/google', { id_token: credential });
          login(data.token, data.user);
        } catch (err) {
          setError(err.message);
        } finally {
          setBusy(false);
        }
      }),
    [login]
  );

  const submit = async (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!EMAIL_REGEX.test(trimmed)) {
      setError('Please enter a valid email address.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const data = await postJson('/api/auth/signup', { email: trimmed });
      login(data.token, data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={styles.authStep}>
      <h4>Sign in to request access</h4>
      <p>The full proposal is shared with signed-in visitors only. Your access stays with your account.</p>
      {GOOGLE_CLIENT_ID && <div ref={googleRef} className={styles.googleBtn} />}
      {GOOGLE_CLIENT_ID && <span className={styles.orDivider}>or use your email</span>}
      <form onSubmit={submit} className={styles.inlineForm} noValidate>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Work / personal email"
          autoComplete="email"
          aria-label="Email"
        />
        <button type="submit" className={styles.submit} disabled={busy}>{busy ? 'Signing in…' : 'Continue'}</button>
      </form>
      {error && <p className={styles.formError} role="alert">{error}</p>}
    </div>
  );
}

export function VerifyEmailStep() {
  const { user, token, login, logout } = useAuth();
  const [code, setCode] = useState('');
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  // Show the code box straight away; the request only stores the code and queues the email.
  const sendCode = async () => {
    setSent(true);
    setError('');
    try {
      await postJson('/api/auth/email-code', {}, token);
    } catch (err) {
      setSent(false);
      setError(err.message);
    }
  };

  const verify = async (e, value = code) => {
    e?.preventDefault();
    if (busy) return;
    if (!/^\d{6}$/.test(value.trim())) {
      setError('Enter the 6-digit code from the email.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const data = await postJson('/api/auth/verify-email', { code: value.trim() }, token);
      login(data.token, data.user);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <div className={styles.authStep}>
      <h4>Confirm your email</h4>
      <p>
        {sent ? 'We sent a 6-digit code to ' : 'We will send a 6-digit code to '}
        <strong>{user?.email}</strong>
        {sent ? '. It expires in 10 minutes.' : ' to confirm it is yours.'}
      </p>
      {sent ? (
        <form onSubmit={verify} className={styles.inlineForm} noValidate>
          <input
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={code}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 6);
              setCode(value);
              if (value.length === 6) verify(null, value); // confirm as soon as the code is complete
            }}
            placeholder="6-digit code"
            aria-label="Verification code"
            className={styles.codeInput}
          />
          <button type="submit" className={styles.submit} disabled={busy}>{busy ? 'Checking…' : 'Confirm'}</button>
        </form>
      ) : (
        <button type="button" className={styles.submit} onClick={sendCode} disabled={busy}>
          {busy ? 'Sending…' : 'Email me a code'}
        </button>
      )}
      {error && <p className={styles.formError} role="alert">{error}</p>}
      <p className={styles.authLinks}>
        {sent && <button type="button" onClick={sendCode} disabled={busy}>Send a new code</button>}
        <button type="button" onClick={logout}>Use a different account</button>
      </p>
    </div>
  );
}
