// Global OTP Identity & Session State (SOT v1.3 Section 8.1 & 8.2)

const SESSION_KEY = 'pfl_festive_session_token';
const MOBILE_KEY = 'pfl_festive_mobile';

let listeners = [];

export function subscribeSession(callback) {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter(l => l !== callback);
  };
}

function notifySessionChange() {
  const session = getSession();
  listeners.forEach(cb => cb(session));
}

// Generate simulated cryptographically signed JWT token
function generateFakeJwt(mobileNumber) {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    mobile: mobileNumber,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60) // 30 days
  }));
  const signature = btoa('pfl_secret_signature_key');
  return `${header}.${payload}.${signature}`;
}

export function getSession() {
  const token = localStorage.getItem(SESSION_KEY);
  const mobile = localStorage.getItem(MOBILE_KEY);

  if (!token || !mobile) {
    return { isAuthenticated: false, mobile: null, token: null };
  }

  // Verify JWT structure and expiry
  try {
    const parts = token.split('.');
    if (parts.length === 3) {
      const payload = JSON.parse(atob(parts[1]));
      if (payload.exp && payload.exp > Math.floor(Date.now() / 1000)) {
        return {
          isAuthenticated: true,
          mobile: payload.mobile || mobile,
          token
        };
      }
    }
  } catch (e) {
    // Session token invalid
  }

  // Clear invalid token
  clearSession();
  return { isAuthenticated: false, mobile: null, token: null };
}

export function saveSession(mobileNumber) {
  const token = generateFakeJwt(mobileNumber);
  localStorage.setItem(SESSION_KEY, token);
  localStorage.setItem(MOBILE_KEY, mobileNumber);
  notifySessionChange();
  return token;
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(MOBILE_KEY);
  notifySessionChange();
}
