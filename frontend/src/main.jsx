/**
 * Application Entry Point
 *
 * Mounts the React app into the DOM, wraps with BrowserRouter,
 * and imports global styles (which cascade the design token system).
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/globals.css';

/* After a new deploy, a tab opened earlier still asks for the old hashed chunks (e.g. the
 * proposal viewer), which no longer exist. Reload once to pick up the new build instead of
 * failing. The timestamp guard stops a reload loop if the chunk is genuinely broken. */
const RELOAD_KEY = 'anoryx_chunk_reload_at';
const RELOAD_GUARD_MS = 10000;
window.addEventListener('vite:preloadError', () => {
  let last = 0;
  try {
    last = Number(sessionStorage.getItem(RELOAD_KEY)) || 0;
  } catch {
    /* storage unavailable */
  }
  if (Date.now() - last < RELOAD_GUARD_MS) return; // already tried: let the error boundary show
  try {
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    /* storage unavailable */
  }
  window.location.reload();
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

