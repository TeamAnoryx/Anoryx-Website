/**
 * One shared setup for Google's "Continue with Google" button.
 *
 * Google Identity Services must be initialised once per page; calling initialize()
 * again from another component (home sign-up, proposal popup) replaces the first
 * set-up and can break the sign-in popup. Here it is initialised once and the
 * credential is passed to whichever button the visitor clicked most recently mounted.
 * Google also only accepts button widths of 200–400 px.
 */

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const MIN_WIDTH = 200;
const MAX_WIDTH = 400;

let initialized = false;
let currentHandler = null;

/** Renders the Google button into `el`. Returns false while Google's script is still loading. */
export function renderGoogleButton(el, onCredential) {
  const gsi = window.google?.accounts?.id;
  if (!GOOGLE_CLIENT_ID || !gsi || !el) return false;
  currentHandler = onCredential;
  if (!initialized) {
    gsi.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (response) => currentHandler?.(response),
    });
    initialized = true;
  }
  const width = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, Math.round(el.offsetWidth || 320)));
  gsi.renderButton(el, { type: 'standard', theme: 'outline', size: 'large', text: 'continue_with', width });
  return true;
}

/** Keeps trying until Google's script has loaded; returns a cleanup function. */
export function mountGoogleButton(getEl, onCredential) {
  if (!GOOGLE_CLIENT_ID) return () => {};
  if (renderGoogleButton(getEl(), onCredential)) return () => {};
  const id = setInterval(() => renderGoogleButton(getEl(), onCredential) && clearInterval(id), 150);
  return () => clearInterval(id);
}
