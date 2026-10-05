import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const TOKEN_KEY = 'anoryx_token';
const USER_KEY = 'anoryx_user';
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/* The API host sleeps when idle and takes a while to wake. Ping it as soon as the
 * site loads so it is awake by the time the visitor signs up or signs in. */
let warmUpPromise = null;
export function warmUpApi() {
  if (!warmUpPromise) {
    warmUpPromise = fetch(`${API_BASE}/api/health`, { cache: 'no-store' })
      .catch(() => {})
      .finally(() => {
        // Allow another wake-up ping later (e.g. after the tab sat idle).
        setTimeout(() => { warmUpPromise = null; }, 60 * 1000);
      });
  }
  return warmUpPromise;
}

function readJson(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** True while the token's own expiry claim is still in the future. */
function tokenLooksValid(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    return !payload.exp || payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function AuthProvider({ children }) {
  // Restore the session instantly from storage; the server check runs in the background.
  const [token, setToken] = useState(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    return stored && tokenLooksValid(stored) ? stored : null;
  });
  const [user, setUserState] = useState(() => (token ? readJson(USER_KEY) : null));
  const [loading, setLoading] = useState(Boolean(token && !user));

  const persistUser = useCallback((u) => {
    setUserState(u);
    try {
      if (u) localStorage.setItem(USER_KEY, JSON.stringify(u));
      else localStorage.removeItem(USER_KEY);
    } catch {
      /* storage unavailable: session still works for this page view */
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUserState(null);
  }, []);

  useEffect(() => {
    warmUpApi();
    if (!token) {
      localStorage.removeItem(TOKEN_KEY);
      setLoading(false);
      return;
    }
    let cancelled = false;
    fetch(`${API_BASE}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => {
        if (cancelled) return;
        // Only a rejected token ends the session. A sleeping or failing server keeps
        // the visitor signed in with the cached profile.
        if (res.status === 401 || res.status === 404) {
          logout();
          return;
        }
        if (!res.ok) return;
        const data = await res.json().catch(() => ({}));
        if (data.user) persistUser(data.user);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // Validate once per stored token on load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback((newToken, newUser) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
    persistUser(newUser);
  }, [persistUser]);

  const updateUser = useCallback((updated) => {
    setUserState((prev) => {
      const next = prev ? { ...prev, ...updated } : updated;
      try {
        localStorage.setItem(USER_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const value = {
    user,
    token,
    loading,
    setUser: updateUser,
    login,
    logout,
    isAuthenticated: !!token && !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
