/**
 * Anoryx Backend — Contact form API, auth, and email sending
 * Run: npm install && node server.js
 * Set env vars in .env (see .env.example)
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const { ensureDb } = require('./db.js');
const proposal = require('./proposal.js');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const googleClient = GOOGLE_CLIENT_ID ? new OAuth2Client(GOOGLE_CLIENT_ID) : null;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  const token = auth && auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) {
    return res.status(401).json({ success: false, error: 'Missing or invalid token' });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Invalid or expired token' });
  }
}

function toUserPayload(doc) {
  if (!doc) return null;
  return {
    _id: doc._id.toString(),
    email: doc.email,
    name: doc.name || '',
    phone: doc.phone || '',
  };
}

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'afnan.ceo@anoryxtechsolutions.com';
const isProduction = process.env.NODE_ENV === 'production';

const corsOptions = isProduction
  ? (() => {
      const origin = process.env.FRONTEND_ORIGIN || process.env.CORS_ORIGIN;
      if (!origin) return { origin: false };
      const origins = origin.split(',').map((o) => o.trim()).filter(Boolean);
      return { origin: origins.length ? origins : false };
    })()
  : { origin: true };

app.use(cors(corsOptions));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRateLimiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX) || 20,
  message: { success: false, error: 'Too many attempts. Try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Create transporter (Gmail / SMTP). Reused across requests so each email skips the
// connection and login handshake.
let transporter = null;
function getTransporter() {
  if (transporter) return transporter;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = process.env.SMTP_SECURE === 'true';

  if (!user || !pass) {
    return null;
  }
  transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    pool: true,
    auth: { user, pass },
  });
  return transporter;
}

// ── Auth routes (require MongoDB + JWT_SECRET) ────────────────────────

// POST /api/auth/signup — email signup
app.post('/api/auth/signup', authRateLimiter, async (req, res) => {
  if (!JWT_SECRET) {
    return res.status(503).json({ success: false, error: 'Auth not configured' });
  }
  const db = await ensureDb();
  if (!db) {
    return res.status(503).json({ success: false, error: 'Database not connected' });
  }
  try {
    const { email } = req.body || {};
    const trimmed = typeof email === 'string' ? email.trim() : '';
    if (!EMAIL_REGEX.test(trimmed)) {
      return res.status(400).json({ success: false, error: 'Valid email is required' });
    }
    const users = db.collection('users');
    const now = new Date();
    // One round trip: return the existing user or create it.
    const user = await users.findOneAndUpdate(
      { email: trimmed.toLowerCase() },
      {
        $setOnInsert: {
          email: trimmed.toLowerCase(),
          name: null,
          phone: null,
          googleId: null,
          providerId: 'email',
          notificationsAllowed: false,
          cookiesAllowed: false,
          consentedAt: null,
          createdAt: now,
          updatedAt: now,
        },
      },
      { upsert: true, returnDocument: 'after' }
    );
    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.status(200).json({
      success: true,
      token,
      user: toUserPayload(user),
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ success: false, error: 'Signup failed' });
  }
});

// POST /api/auth/google — Google id_token signup/login
app.post('/api/auth/google', authRateLimiter, async (req, res) => {
  if (!JWT_SECRET || !googleClient) {
    return res.status(503).json({ success: false, error: 'Google auth not configured' });
  }
  const db = await ensureDb();
  if (!db) {
    return res.status(503).json({ success: false, error: 'Database not connected' });
  }
  try {
    const { id_token } = req.body || {};
    if (!id_token) {
      return res.status(400).json({ success: false, error: 'id_token is required' });
    }
    let ticket;
    try {
      ticket = await googleClient.verifyIdToken({ idToken: id_token, audience: GOOGLE_CLIENT_ID });
    } catch (verifyErr) {
      console.error('Google verifyIdToken failed:', verifyErr.message);
      return res.status(401).json({
        success: false,
        error: verifyErr.message?.includes('audience') ? 'Google sign-in: wrong app. Check Authorized origins in Google Console.' : 'Invalid Google sign-in token. Try again.',
      });
    }
    const payload = ticket.getPayload();
    const googleId = payload.sub;
    const email = (payload.email || '').trim().toLowerCase();
    const name = payload.name || null;
    if (!email) {
      return res.status(400).json({ success: false, error: 'Google account email not provided' });
    }
    const users = db.collection('users');
    const now = new Date();
    // One round trip: link Google to the existing account (by Google ID or email) or create it.
    const user = await users.findOneAndUpdate(
      { $or: [{ googleId }, { email }] },
      {
        $set: { googleId, providerId: 'google', email, name, updatedAt: now },
        $setOnInsert: {
          phone: null,
          notificationsAllowed: false,
          cookiesAllowed: false,
          consentedAt: null,
          createdAt: now,
        },
      },
      { upsert: true, returnDocument: 'after' }
    );
    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.status(200).json({
      success: true,
      token,
      user: toUserPayload(user),
    });
  } catch (err) {
    console.error('Google auth error:', err);
    const message = isProduction ? 'Google sign-in failed' : (err.message || 'Google sign-in failed');
    res.status(500).json({ success: false, error: message });
  }
});

// PATCH /api/auth/consent — update notifications/cookies consent (auth required)
app.patch('/api/auth/consent', authMiddleware, async (req, res) => {
  const db = await ensureDb();
  if (!db) return res.status(503).json({ success: false, error: 'Database not connected' });
  try {
    const { notificationsAllowed, cookiesAllowed } = req.body || {};
    const update = { updatedAt: new Date(), consentedAt: new Date() };
    if (typeof notificationsAllowed === 'boolean') update.notificationsAllowed = notificationsAllowed;
    if (typeof cookiesAllowed === 'boolean') update.cookiesAllowed = cookiesAllowed;
    const users = db.collection('users');
    const result = await users.findOneAndUpdate(
      { _id: new ObjectId(req.userId) },
      { $set: update },
      { returnDocument: 'after' }
    );
    if (!result) return res.status(404).json({ success: false, error: 'User not found' });
    res.status(200).json({ success: true, user: toUserPayload(result) });
  } catch (err) {
    console.error('Consent update error:', err);
    res.status(500).json({ success: false, error: 'Update failed' });
  }
});

// PATCH /api/auth/profile — update name, phone (auth required)
app.patch('/api/auth/profile', authMiddleware, async (req, res) => {
  const db = await ensureDb();
  if (!db) return res.status(503).json({ success: false, error: 'Database not connected' });
  try {
    const { name, phone } = req.body || {};
    const update = { updatedAt: new Date() };
    if (name !== undefined) update.name = typeof name === 'string' ? name.trim() : null;
    if (phone !== undefined) update.phone = typeof phone === 'string' ? phone.trim() : null;
    const users = db.collection('users');
    const result = await users.findOneAndUpdate(
      { _id: new ObjectId(req.userId) },
      { $set: update },
      { returnDocument: 'after' }
    );
    if (!result) return res.status(404).json({ success: false, error: 'User not found' });
    res.status(200).json({ success: true, user: toUserPayload(result) });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ success: false, error: 'Update failed' });
  }
});

// GET /api/auth/me — current user (auth required)
app.get('/api/auth/me', authMiddleware, async (req, res) => {
  const db = await ensureDb();
  if (!db) return res.status(503).json({ success: false, error: 'Database not connected' });
  try {
    const user = await db.collection('users').findOne({ _id: new ObjectId(req.userId) });
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.status(200).json({ success: true, user: toUserPayload(user) });
  } catch (err) {
    console.error('Me error:', err);
    res.status(500).json({ success: false, error: 'Request failed' });
  }
});

// Allowed "Product of interest" values from the contact form (slugs in frontend/src/data/products.js)
const PRODUCT_INTEREST_LABELS = {
  sentinel: 'Anoryx Sentinel',
  delta: 'Anoryx Delta',
  rendly: 'Anoryx Rendly',
  orchestration: 'Anoryx Orchestration Layer',
  ecosystem: 'The full Anoryx EcoSystem',
  other: 'Other',
};

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// POST /api/contact — send contact form as email
app.post('/api/contact', async (req, res) => {
  try {
    const { fullName, workEmail, companyName, subject, message, productInterest } = req.body || {};

    if (!fullName || !workEmail || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: fullName, workEmail, message',
      });
    }

    const transporter = getTransporter();
    if (!transporter) {
      console.warn('SMTP not configured (SMTP_USER/SMTP_PASS). Set them in .env to send emails.');
      return res.status(200).json({
        success: true,
        message: 'Message received. (Email not sent: SMTP not configured.)',
      });
    }

    const subjectLabel = { 'early-access': 'Early access / design partner', sales: 'Sales & Enterprise', engineering: 'Technical Support', partnerships: 'Partnerships', general: 'General Inquiry' }[subject] || 'General Inquiry';
    const productLabel = PRODUCT_INTEREST_LABELS[productInterest] || '';

    const mailOptions = {
      from: process.env.SMTP_FROM || CONTACT_EMAIL,
      to: CONTACT_EMAIL,
      replyTo: workEmail,
      subject: `[Anoryx Contact] ${subjectLabel}${productLabel ? ` (${productLabel})` : ''} — ${String(fullName).replace(/[\r\n]+/g, ' ')}`,
      text: [
        `From: ${fullName} <${workEmail}>`,
        companyName ? `Company: ${companyName}` : '',
        productLabel ? `Product of interest: ${productLabel}` : '',
        `Subject: ${subjectLabel}`,
        '',
        message,
      ].filter(Boolean).join('\n'),
      html: [
        `<p><strong>From:</strong> ${escapeHtml(fullName)} &lt;<a href="mailto:${escapeHtml(workEmail)}">${escapeHtml(workEmail)}</a>&gt;</p>`,
        companyName ? `<p><strong>Company:</strong> ${escapeHtml(companyName)}</p>` : '',
        productLabel ? `<p><strong>Product of interest:</strong> ${escapeHtml(productLabel)}</p>` : '',
        `<p><strong>Topic:</strong> ${escapeHtml(subjectLabel)}</p>`,
        '<hr/>',
        `<pre style="white-space:pre-wrap;font-family:inherit;">${escapeHtml(message)}</pre>`,
      ].filter(Boolean).join(''),
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Thank you. Your message has been sent.',
    });
  } catch (err) {
    console.error('Contact send error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again or email us directly.',
    });
  }
});

// Health check
// ── Business proposal (preview public, full document on approval) ─────────────
const PROPOSAL_ROLES = {
  investor: 'Investor',
  cofounder: 'Potential co-founder',
  partner: 'Design partner / customer',
  other: 'Other',
};
// Render sets RENDER and RENDER_EXTERNAL_URL itself, so links in emails are correct there
// even if PUBLIC_API_URL / SITE_URL were never configured.
const isHosted = isProduction || Boolean(process.env.RENDER);
const PUBLIC_API_URL = (process.env.PUBLIC_API_URL || process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`).replace(/\/$/, '');
const SITE_URL = (process.env.SITE_URL || (isHosted ? 'https://anoryxtechsolutions.com' : 'http://localhost:3000')).replace(/\/$/, '');
// Gmail only sends as the signed-in account, so the sender defaults to SMTP_USER.
const MAIL_FROM = process.env.SMTP_FROM || `"Anoryx Tech Solutions" <${process.env.SMTP_USER || CONTACT_EMAIL}>`;
const PROPOSAL_PAGE_PATH = '/company/business-proposal';
// Inbox that receives proposal access requests.
const PROPOSAL_NOTIFY_EMAIL = process.env.PROPOSAL_NOTIFY_EMAIL || CONTACT_EMAIL;

const proposalRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 30,
  message: { success: false, error: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const bearerToken = (req) => {
  const auth = req.headers.authorization || '';
  return auth.startsWith('Bearer ') ? auth.slice(7).trim() : '';
};

/** Send an email; in development without SMTP, log the important link instead. */
async function sendMailSafe(options, devLinkLabel, devLink) {
  const transporter = getTransporter();
  if (!transporter) {
    if (!isProduction && devLink) console.log(`[dev] ${devLinkLabel}: ${devLink}`);
    return false;
  }
  try {
    await transporter.sendMail({ from: MAIL_FROM, ...options });
    return true;
  } catch (err) {
    console.error('Email send error:', err.message);
    if (!isProduction && devLink) console.log(`[dev] ${devLinkLabel}: ${devLink}`);
    return false;
  }
}

// GET /api/proposal/meta — page counts for the viewer
app.get('/api/proposal/meta', async (req, res) => {
  const db = await ensureDb();
  if (!db) return res.status(503).json({ success: false, error: 'Database not connected' });
  try {
    const doc = await proposal.loadDocument(db);
    if (!doc) return res.status(404).json({ success: false, error: 'Proposal not available yet' });
    res.json({
      success: true,
      pageCount: doc.pageCount,
      previewPages: Math.min(proposal.PREVIEW_PAGES, doc.pageCount),
    });
  } catch (err) {
    console.error('Proposal meta error:', err);
    res.status(500).json({ success: false, error: 'Could not load the proposal' });
  }
});

// GET /api/proposal/preview — first pages only (public)
app.get('/api/proposal/preview', async (req, res) => {
  const db = await ensureDb();
  if (!db) return res.status(503).end();
  try {
    const doc = await proposal.loadDocument(db);
    if (!doc) return res.status(404).end();
    res.set({ 'Content-Type': 'application/pdf', 'Cache-Control': 'public, max-age=600' });
    res.send(doc.preview);
  } catch (err) {
    console.error('Proposal preview error:', err);
    res.status(500).end();
  }
});

// GET /api/proposal/access — is this access token valid? (Authorization: Bearer <token>)
app.get('/api/proposal/access', async (req, res) => {
  const db = await ensureDb();
  if (!db) return res.status(503).json({ success: false, error: 'Database not connected' });
  const request = await proposal.findAccess(db, bearerToken(req));
  if (!request) return res.status(401).json({ success: false, error: 'This access link is invalid or has expired.' });
  res.json({ success: true, name: request.fullName, email: request.workEmail, expiresAt: request.accessExpiresAt });
});

// GET /api/proposal/document — full PDF for approved requesters only
app.get('/api/proposal/document', async (req, res) => {
  const db = await ensureDb();
  if (!db) return res.status(503).end();
  try {
    const request = await proposal.findAccess(db, bearerToken(req));
    if (!request) return res.status(401).json({ success: false, error: 'This access link is invalid or has expired.' });
    const doc = await proposal.loadDocument(db);
    if (!doc) return res.status(404).end();
    res.set({ 'Content-Type': 'application/pdf', 'Cache-Control': 'private, no-store' });
    res.send(doc.full);
  } catch (err) {
    console.error('Proposal document error:', err);
    res.status(500).end();
  }
});

// POST /api/proposal-request — ask for full access; emails the team a "Give access" link
app.post('/api/proposal-request', proposalRateLimiter, async (req, res) => {
  try {
    const body = req.body || {};
    const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
    const fullName = clean(body.fullName, 120);
    const workEmail = clean(body.workEmail, 200).toLowerCase();
    const organisation = clean(body.organisation, 160);
    const role = PROPOSAL_ROLES[body.role] ? body.role : '';
    const message = clean(body.message, 2000);

    if (!fullName || !EMAIL_REGEX.test(workEmail) || !role) {
      return res.status(400).json({
        success: false,
        error: 'Please add your name, a valid email address and how you would like to be involved.',
      });
    }

    const db = await ensureDb();
    if (!db) {
      return res.status(503).json({
        success: false,
        error: 'We could not record your request right now. Please try again shortly.',
      });
    }

    const { id, reviewToken, createdAt } = await proposal.createRequest(db, { fullName, workEmail, organisation, role, message });
    const reviewUrl = `${PUBLIC_API_URL}/api/proposal/review?id=${id}&token=${encodeURIComponent(reviewToken)}`;
    const roleLabel = PROPOSAL_ROLES[role];

    // Reply as soon as the request is stored; the team email goes out in the background
    // so the visitor never waits on the mail server.
    sendMailSafe(
      {
        to: PROPOSAL_NOTIFY_EMAIL,
        replyTo: workEmail,
        subject: `[Anoryx] Proposal access request: ${fullName.replace(/[\r\n]+/g, ' ')} (${roleLabel})`,
        text: [
          `${fullName} <${workEmail}> asked for access to the business proposal.`,
          organisation ? `Organisation: ${organisation}` : '',
          `Interest: ${roleLabel}`,
          message ? `\nMessage:\n${message}` : '',
          `\nReview and give access: ${reviewUrl}`,
        ].filter(Boolean).join('\n'),
        html: `
          <div style="font-family:Arial,sans-serif;max-width:560px;color:#091E42">
            <h2 style="margin:0 0 12px">New proposal access request</h2>
            <p style="margin:0 0 4px"><strong>${escapeHtml(fullName)}</strong> &lt;<a href="mailto:${escapeHtml(workEmail)}">${escapeHtml(workEmail)}</a>&gt;</p>
            ${organisation ? `<p style="margin:0 0 4px">Organisation: ${escapeHtml(organisation)}</p>` : ''}
            <p style="margin:0 0 12px">Interest: ${escapeHtml(roleLabel)}</p>
            ${message ? `<p style="margin:0 0 16px;white-space:pre-wrap;background:#F4F5F7;padding:12px;border-radius:8px">${escapeHtml(message)}</p>` : ''}
            <p style="margin:24px 0">
              <a href="${reviewUrl}" style="background:#0052CC;color:#fff;padding:12px 22px;border-radius:8px;text-decoration:none;font-weight:bold">Give access</a>
            </p>
            <p style="font-size:12px;color:#6B778C">The button opens a confirmation page where you can approve or decline. Nothing is shared until you confirm.</p>
          </div>`,
      },
      'Review link',
      reviewUrl
    ).then((sent) => {
      if (!sent) console.error(`Proposal request ${id}: team email not sent. Review link: ${reviewUrl}`);
      return db.collection('proposal_requests').updateOne(
        { _id: new ObjectId(id) },
        { $set: { teamEmailSent: sent, teamEmailTo: PROPOSAL_NOTIFY_EMAIL } }
      );
    }).catch((err) => console.error('Proposal request email status error:', err.message));

    res.status(200).json({
      success: true,
      sentAt: createdAt,
      message: "Request sent. You'll get an email with your private access link once it's approved.",
    });
  } catch (err) {
    console.error('Proposal request error:', err);
    res.status(500).json({ success: false, error: 'Something went wrong. Please try again.' });
  }
});

const reviewPage = (title, bodyHtml) => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex">
<title>${escapeHtml(title)} | Anoryx</title>
<style>
  body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0B1020;font-family:Inter,Arial,sans-serif;color:#091E42;padding:16px}
  .card{background:#fff;border-radius:16px;max-width:520px;width:100%;padding:32px;box-shadow:0 20px 60px rgba(0,0,0,.35)}
  h1{font-size:22px;margin:0 0 16px} p{line-height:1.6;margin:0 0 8px;color:#42526E} strong{color:#091E42}
  .msg{background:#F4F5F7;border-radius:8px;padding:12px;white-space:pre-wrap;margin:12px 0}
  .row{display:flex;gap:12px;margin-top:24px;flex-wrap:wrap}
  button{flex:1;min-width:140px;border:0;border-radius:10px;padding:14px 18px;font-size:15px;font-weight:700;cursor:pointer}
  .ok{background:#0052CC;color:#fff}.no{background:#F4F5F7;color:#42526E}
  .link{word-break:break-all;background:#DEEBFF;padding:10px;border-radius:8px;font-size:13px}
</style></head><body><div class="card">${bodyHtml}</div></body></html>`;

// GET /api/proposal/review — confirmation page opened from the email (no side effects,
// so email scanners that pre-open links can't approve anything)
app.get('/api/proposal/review', async (req, res) => {
  const db = await ensureDb();
  if (!db) return res.status(503).send(reviewPage('Unavailable', '<h1>Database unavailable</h1><p>Please try again shortly.</p>'));
  const { id = '', token = '' } = req.query;
  const request = await proposal.findRequestForReview(db, String(id), String(token), ObjectId);
  if (!request) return res.status(404).send(reviewPage('Not found', '<h1>Link not valid</h1><p>This review link is invalid.</p>'));
  if (request.expired) return res.status(410).send(reviewPage('Expired', '<h1>Link expired</h1><p>Ask them to send a new request.</p>'));

  const roleLabel = PROPOSAL_ROLES[request.role] || request.role;
  const details = `
    <p><strong>${escapeHtml(request.fullName)}</strong> &lt;${escapeHtml(request.workEmail)}&gt;</p>
    ${request.organisation ? `<p>Organisation: ${escapeHtml(request.organisation)}</p>` : ''}
    <p>Interest: ${escapeHtml(roleLabel)}</p>
    ${request.message ? `<div class="msg">${escapeHtml(request.message)}</div>` : ''}`;

  if (request.status !== 'pending') {
    return res.send(reviewPage('Already decided', `<h1>Already ${escapeHtml(request.status)}</h1>${details}`));
  }
  res.send(reviewPage('Give access', `
    <h1>Give access to the business proposal?</h1>
    ${details}
    <form method="post" action="${PUBLIC_API_URL}/api/proposal/review" class="row">
      <input type="hidden" name="id" value="${escapeHtml(String(id))}">
      <input type="hidden" name="token" value="${escapeHtml(String(token))}">
      <button class="ok" name="decision" value="approve" type="submit">Give access</button>
      <button class="no" name="decision" value="deny" type="submit">Decline</button>
    </form>
    <p style="font-size:12px;margin-top:16px">Approving emails ${escapeHtml(request.workEmail)} a private link that unlocks the full proposal for ${proposal.ACCESS_TTL_DAYS} days.</p>`));
});

// POST /api/proposal/review — approve or decline (form on the confirmation page)
app.post('/api/proposal/review', async (req, res) => {
  const db = await ensureDb();
  if (!db) return res.status(503).send(reviewPage('Unavailable', '<h1>Database unavailable</h1><p>Please try again shortly.</p>'));
  const { id = '', token = '', decision = '' } = req.body || {};
  const request = await proposal.findRequestForReview(db, String(id), String(token), ObjectId);
  if (!request) return res.status(404).send(reviewPage('Not found', '<h1>Link not valid</h1>'));
  if (request.expired) return res.status(410).send(reviewPage('Expired', '<h1>Link expired</h1>'));
  if (request.status !== 'pending') {
    return res.send(reviewPage('Already decided', `<h1>Already ${escapeHtml(request.status)}</h1>`));
  }

  if (decision === 'deny') {
    await proposal.denyRequest(db, request);
    return res.send(reviewPage('Declined', `<h1>Request declined</h1><p>${escapeHtml(request.fullName)} will not get access. No email was sent to them.</p>`));
  }
  if (decision !== 'approve') return res.status(400).send(reviewPage('Error', '<h1>Unknown action</h1>'));

  const { accessToken, expiresAt } = await proposal.approveRequest(db, request);
  const accessUrl = `${SITE_URL}${PROPOSAL_PAGE_PATH}?access=${encodeURIComponent(accessToken)}`;
  const firstName = request.fullName.split(' ')[0];
  const sent = await sendMailSafe(
    {
      to: request.workEmail,
      replyTo: CONTACT_EMAIL,
      subject: 'Your access to the Anoryx business proposal',
      text: `Hi ${firstName},\n\nYou now have access to the Anoryx business proposal. Open it here (valid until ${expiresAt.toDateString()}):\n${accessUrl}\n\nPlease don't share this link.\n\nAfnan Pasha\nFounder & CEO, Anoryx Tech Solutions`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;color:#091E42">
          <p>Hi ${escapeHtml(firstName)},</p>
          <p>Thank you for your interest in Anoryx. You now have access to our business proposal.</p>
          <p style="margin:24px 0"><a href="${accessUrl}" style="background:#0052CC;color:#fff;padding:12px 22px;border-radius:8px;text-decoration:none;font-weight:bold">Open the proposal</a></p>
          <p style="font-size:13px;color:#6B778C">This private link works until ${escapeHtml(expiresAt.toDateString())}. Please don't share it.</p>
          <p>Afnan Pasha<br>Founder &amp; CEO, Anoryx Tech Solutions</p>
        </div>`,
    },
    'Access link',
    accessUrl
  );

  res.send(reviewPage('Access given', `
    <h1>Access given</h1>
    <p>${escapeHtml(request.fullName)} can now read the full proposal until ${escapeHtml(expiresAt.toDateString())}.</p>
    <p>${sent ? `We emailed the access link to ${escapeHtml(request.workEmail)}.` : '<strong>The email could not be sent.</strong> Send them this link yourself:'}</p>
    ${sent ? '' : `<p class="link">${escapeHtml(accessUrl)}</p>`}`));
});

// Health check. Also used by the frontend to wake the server (and the DB connection)
// before the visitor reaches the sign-up form.
app.get('/api/health', async (req, res) => {
  const db = await ensureDb();
  res.json({ ok: true, db: Boolean(db) });
});

// Start accepting requests immediately; connect to MongoDB in the background.
// Requests that need the database retry the connection themselves (see db.js).
app.listen(PORT, () => {
  console.log(`Anoryx backend running on http://localhost:${PORT}`);
});
ensureDb().then((db) => {
  if (db) console.log('MongoDB connected');
});
