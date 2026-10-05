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

// Create transporter (Gmail / SMTP)
function getTransporter() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = process.env.SMTP_SECURE === 'true';

  if (!user || !pass) {
    return null;
  }
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
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
