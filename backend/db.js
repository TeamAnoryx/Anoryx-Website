/**
 * MongoDB connection for Anoryx backend.
 * Requires MONGODB_URI in .env.
 *
 * The connection is created lazily and retried on demand: if the first attempt
 * fails (cold start, DNS blip, Atlas unavailable) the next request tries again
 * instead of leaving auth broken until the process restarts.
 */

const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
const dbName = process.env.MONGODB_DB_NAME || 'Anoryx_userBase';

/* Fail fast so a dead database surfaces as a quick 503, not a 30 s hang. */
const CLIENT_OPTIONS = {
  serverSelectionTimeoutMS: Number(process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS) || 8000,
  connectTimeoutMS: 8000,
  maxPoolSize: 10,
  minPoolSize: 1,
};

let client = null;
let db = null;
let connecting = null;

async function ensureIndexes(database) {
  const users = database.collection('users');
  await Promise.all([
    users.createIndex({ email: 1 }, { unique: true, name: 'email_unique' }),
    users.createIndex({ googleId: 1 }, { sparse: true, name: 'googleId' }),
  ]);
}

async function connect() {
  if (db) return db;
  if (!uri) {
    console.warn('MONGODB_URI is not set. Auth and user features will be disabled.');
    return null;
  }
  if (!connecting) {
    connecting = (async () => {
      const c = new MongoClient(uri, CLIENT_OPTIONS);
      try {
        await c.connect();
        const database = c.db(dbName);
        try {
          await ensureIndexes(database);
        } catch (err) {
          // Duplicate emails in old data block the unique index; auth still works without it.
          console.warn('MongoDB index setup skipped:', err.message);
        }
        client = c;
        db = database;
        return db;
      } catch (err) {
        await c.close().catch(() => {});
        throw err;
      } finally {
        connecting = null;
      }
    })();
  }
  return connecting;
}

/** Returns the database, connecting (or reconnecting) if needed. Null when unavailable. */
async function ensureDb() {
  try {
    return await connect();
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    return null;
  }
}

function getDb() {
  return db;
}

async function close() {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}

module.exports = { connect, ensureDb, getDb, close };
