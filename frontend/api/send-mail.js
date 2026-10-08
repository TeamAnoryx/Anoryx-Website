/**
 * Mail relay for the backend. Render's free plan blocks outgoing SMTP, so the backend
 * posts each email here (HTTPS) and this Vercel function sends it through the GoDaddy
 * mailbox. Only callers holding MAIL_RELAY_SECRET can use it.
 *
 * Vercel env: MAIL_RELAY_SECRET, SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS,
 * SMTP_FROM (default sender).
 */

import crypto from 'node:crypto';
import nodemailer from 'nodemailer';

const MAX_RECIPIENTS = 5;
const MAX_BODY_CHARS = 200_000;
const EMAIL_REGEX = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

let transporter = null;
function getTransporter() {
  if (transporter) return transporter;
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_USER || !SMTP_PASS) return null;
  transporter = nodemailer.createTransport({
    host: SMTP_HOST || 'smtpout.secureserver.net',
    port: Number(SMTP_PORT) || 465,
    secure: SMTP_SECURE ? SMTP_SECURE === 'true' : true,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return transporter;
}

function authorized(req) {
  const secret = process.env.MAIL_RELAY_SECRET;
  if (!secret) return false;
  const given = Buffer.from(String(req.headers.authorization || ''));
  const expected = Buffer.from(`Bearer ${secret}`);
  return given.length === expected.length && crypto.timingSafeEqual(given, expected);
}

const asList = (value) => (Array.isArray(value) ? value : [value]).filter(Boolean).map(String);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });
  if (!authorized(req)) return res.status(401).json({ ok: false, error: 'Unauthorized' });

  const mailer = getTransporter();
  if (!mailer) return res.status(503).json({ ok: false, error: 'Relay SMTP is not configured' });

  const { from, to, replyTo, subject, text, html } = req.body || {};
  const recipients = asList(to);
  if (!recipients.length || recipients.length > MAX_RECIPIENTS || !recipients.every((r) => EMAIL_REGEX.test(r))) {
    return res.status(400).json({ ok: false, error: 'Invalid recipients' });
  }
  if (!subject || String(text || '').length + String(html || '').length > MAX_BODY_CHARS) {
    return res.status(400).json({ ok: false, error: 'Invalid message' });
  }

  try {
    const info = await mailer.sendMail({
      from: from || process.env.SMTP_FROM || process.env.SMTP_USER,
      to: recipients,
      ...(replyTo ? { replyTo: String(replyTo) } : {}),
      subject: String(subject).replace(/[\r\n]+/g, ' ').slice(0, 300),
      text: text ? String(text) : undefined,
      html: html ? String(html) : undefined,
    });
    return res.status(200).json({ ok: true, id: info.messageId });
  } catch (err) {
    console.error('Relay send error:', err.message);
    return res.status(502).json({ ok: false, error: 'Send failed' });
  }
}
