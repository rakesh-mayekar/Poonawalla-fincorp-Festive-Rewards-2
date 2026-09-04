// Clean Top Header Component (Matching PDF Design)
// Keeps centered Poonawalla Fincorp brand mark and clean account access

import { getSession, clearSession } from '../state/sessionState.js';
import { getClaimedDealsCount, subscribeRewards } from '../state/rewardState.js';
import { openOtpModal } from './otpModal.js';

export function renderHeader(container, onNavigate) {
  const session = getSession();
  const claimedCount = getClaimedDealsCount();

  container.innerHTML = `
    <div class="header-inner-container header-centered-brand">
      <a href="#" class="brand-logo-wrap center-logo" id="header-brand-logo">
        <div class="brand-icon">PF</div>
        <div class="brand-name-group">
          <span class="brand-title">POONAWALLA FINCORP</span>
          <span class="brand-subtitle">Festive Rewards 2026</span>
        </div>
      </a>

      <!-- Quick Account / Reward Actions on Right -->
      <div class="header-right-actions">
        ${claimedCount > 0 ? `
          <button class="header-claimed-pill" id="header-myoffers-btn">
            🎁 My Offers <span class="badge-num">${claimedCount}</span>
          </button>
        ` : ''}

        ${session.isAuthenticated ? `
          <button class="header-user-btn" id="header-logout-btn" title="Click to Logout">
            👤 ${session.mobile}
          </button>
        ` : `
          <button class="header-login-btn" id="header-login-trigger">
            🔒 Login
          </button>
        `}
      </div>
    </div>
  `;

  // Brand Logo Click
  const logo = container.querySelector('#header-brand-logo');
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      onNavigate('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Login Trigger
  const loginBtn = container.querySelector('#header-login-trigger');
  if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openOtpModal(() => {
        renderHeader(container, onNavigate);
      });
    });
  }

  // Logout Trigger
  const logoutBtn = container.querySelector('#header-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('Do you want to log out?')) {
        clearSession();
        renderHeader(container, onNavigate);
        onNavigate('home');
      }
    });
  }

  // My Offers Trigger
  const myOffersBtn = container.querySelector('#header-myoffers-btn');
  if (myOffersBtn) {
    myOffersBtn.addEventListener('click', (e) => {
      e.preventDefault();
      onNavigate('myoffers');
    });
  }

  // Update on reward claim
  subscribeRewards(() => {
    renderHeader(container, onNavigate);
  });
}
