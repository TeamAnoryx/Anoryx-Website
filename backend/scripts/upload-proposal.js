/**
 * Upload (or replace) the business proposal PDF in MongoDB.
 *
 *   node scripts/upload-proposal.js "path/to/Business Proposal.pdf"
 *
 * The PDF is stored in the database so it never has to be committed to git or
 * published with the website. Run it again whenever the proposal changes.
 */

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const fs = require('fs');
const path = require('path');
const { ensureDb, close } = require('../db.js');
const { saveDocument } = require('../proposal.js');

(async () => {
  const file = process.argv[2];
  if (!file || !fs.existsSync(file)) {
    console.error('Usage: node scripts/upload-proposal.js <path-to-pdf>');
    process.exit(1);
  }
  const db = await ensureDb();
  if (!db) {
    console.error('Could not connect to MongoDB. Check MONGODB_URI in backend/.env.');
    process.exit(1);
  }
  const buffer = fs.readFileSync(file);
  const pages = await saveDocument(db, buffer, path.basename(file));
  console.log(`Uploaded ${path.basename(file)} (${(buffer.length / 1024 / 1024).toFixed(2)} MB, ${pages} pages).`);
  await close();
})().catch((err) => {
  console.error('Upload failed:', err.message);
  process.exit(1);
});
