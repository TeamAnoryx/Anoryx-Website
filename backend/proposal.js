/**
 * Business proposal: storage, public preview and access tokens.
 *
 * The full PDF lives in MongoDB (collection `documents`), never in git or on the
 * website. Visitors get a preview made of the first PREVIEW_PAGES pages. The full
 * document is served only to a signed-in visitor whose verified email has an approved
 * request (the team approves from the "Give access" email).
 */

const crypto = require('crypto');
const { Binary } = require('mongodb');
const { PDFDocument } = require('pdf-lib');

const DOC_ID = 'business-proposal';
const PREVIEW_PAGES = 3;
const ACCESS_TTL_DAYS = Number(process.env.PROPOSAL_ACCESS_DAYS) || 30;
const REVIEW_TTL_DAYS = 30;

const randomToken = () => crypto.randomBytes(32).toString('base64url');
const hashToken = (token) => crypto.createHash('sha256').update(String(token)).digest('hex');
const safeEqual = (a, b) => {
  const ba = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  return ba.length === bb.length && crypto.timingSafeEqual(ba, bb);
};

let cache = null; // { version, full: Buffer, preview: Buffer, pageCount }

async function loadDocument(db) {
  const doc = await db.collection('documents').findOne(
    { _id: DOC_ID },
    { projection: { version: 1 } }
  );
  if (!doc) return null;
  if (cache && cache.version === doc.version) return cache;

  const full = await db.collection('documents').findOne({ _id: DOC_ID });
  const fullBuffer = Buffer.from(full.data.buffer);
  const source = await PDFDocument.load(fullBuffer);
  const pageCount = source.getPageCount();
  const preview = await PDFDocument.create();
  const pages = await preview.copyPages(
    source,
    Array.from({ length: Math.min(PREVIEW_PAGES, pageCount) }, (_, i) => i)
  );
  pages.forEach((p) => preview.addPage(p));
  preview.setTitle('Anoryx Business Proposal (preview)');

  cache = {
    version: full.version,
    full: fullBuffer,
    preview: Buffer.from(await preview.save()),
    pageCount,
  };
  return cache;
}

/** Store (or replace) the proposal PDF. Used by scripts/upload-proposal.js. */
async function saveDocument(db, buffer, filename) {
  const parsed = await PDFDocument.load(buffer); // throws if not a valid PDF
  await db.collection('documents').updateOne(
    { _id: DOC_ID },
    {
      $set: {
        data: new Binary(buffer),
        filename,
        pageCount: parsed.getPageCount(),
        version: Date.now(),
        uploadedAt: new Date(),
      },
    },
    { upsert: true }
  );
  cache = null;
  return parsed.getPageCount();
}

/** New request: returns the stored doc id and the one-time review token for the email link. */
async function createRequest(db, fields) {
  const reviewToken = randomToken();
  const now = new Date();
  const { insertedId } = await db.collection('proposal_requests').insertOne({
    ...fields,
    status: 'pending',
    reviewTokenHash: hashToken(reviewToken),
    reviewExpiresAt: new Date(now.getTime() + REVIEW_TTL_DAYS * 864e5),
    createdAt: now,
  });
  return { id: insertedId.toString(), reviewToken, createdAt: now };
}

async function findRequestForReview(db, id, reviewToken, ObjectId) {
  let _id;
  try {
    _id = new ObjectId(id);
  } catch {
    return null;
  }
  const request = await db.collection('proposal_requests').findOne({ _id });
  if (!request || !safeEqual(request.reviewTokenHash, hashToken(reviewToken))) return null;
  if (request.status === 'pending' && request.reviewExpiresAt < new Date()) return { ...request, expired: true };
  return request;
}

/** Approve: unlocks the full proposal for the requester's email for ACCESS_TTL_DAYS. */
async function approveRequest(db, request) {
  const expiresAt = new Date(Date.now() + ACCESS_TTL_DAYS * 864e5);
  await db.collection('proposal_requests').updateOne(
    { _id: request._id },
    { $set: { status: 'approved', accessExpiresAt: expiresAt, decidedAt: new Date() } }
  );
  return { expiresAt };
}

async function denyRequest(db, request) {
  await db.collection('proposal_requests').updateOne(
    { _id: request._id },
    { $set: { status: 'denied', decidedAt: new Date() } }
  );
}

/** The newest unexpired approved request for this (verified) email, or null. */
async function findGrant(db, email, { countView = false } = {}) {
  if (!email) return null;
  const request = await db.collection('proposal_requests').findOne(
    { workEmail: String(email).toLowerCase(), status: 'approved', accessExpiresAt: { $gt: new Date() } },
    { sort: { accessExpiresAt: -1 } }
  );
  if (request && countView) {
    await db.collection('proposal_requests').updateOne(
      { _id: request._id },
      { $set: { lastViewedAt: new Date() }, $inc: { views: 1 } }
    );
  }
  return request;
}

/** The newest pending request for this email, or null. */
async function findPending(db, email) {
  if (!email) return null;
  return db.collection('proposal_requests').findOne(
    { workEmail: String(email).toLowerCase(), status: 'pending' },
    { sort: { createdAt: -1 } }
  );
}

module.exports = {
  PREVIEW_PAGES,
  ACCESS_TTL_DAYS,
  loadDocument,
  saveDocument,
  createRequest,
  findRequestForReview,
  approveRequest,
  denyRequest,
  findGrant,
  findPending,
};
