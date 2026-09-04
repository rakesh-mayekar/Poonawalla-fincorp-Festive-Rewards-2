// Unified Header & Sticky Top Navigation Component
// On Homepage: Docks at top once scrolled past hero with brand logo + 6 items
// On Inner Pages: Always sticky at top with brand logo + 6 items

import { getSession, clearSession } from '../state/sessionState.js';
import { getClaimedDealsCount, subscribeRewards } from '../state/rewardState.js';
import { openOtpModal } from './otpModal.js';

export function renderHeader(container, onNavigate) {
  const session = getSession();
  const claimedCount = getClaimedDealsCount();
  const isHomePage = !window.location.hash || window.location.hash === '#' || window.location.hash === '#home';

  container.innerHTML = `
    <div class="site-header-nav-wrapper ${isHomePage ? 'home-header-mode' : 'inner-header-mode'}" id="unified-header-nav">
      <div class="header-inner-container">
        <!-- Brand Logo (Left on Sticky / Inner Pages) -->
        <a href="#" class="brand-logo-wrap" id="header-brand-logo">
          <div class="brand-icon">PF</div>
          <div class="brand-name-group">
            <span class="brand-title">POONAWALLA FINCORP</span>
            <span class="brand-subtitle">Festive Rewards</span>
          </div>
        </a>

        <!-- 6 Core Navigation Pill Items -->
        <nav class="header-nav-pills-wrap" aria-label="Festive Quick Navigation">
          <div class="header-nav-pills">
            <button class="nav-pill-item" data-target-id="limited-period-offers" data-route="loans">
              <span class="pill-icon">💳</span>
              <span class="pill-text">Loans</span>
            </button>
            <button class="nav-pill-item" data-target-id="play-win-section" data-route="games">
              <span class="pill-icon">🎁</span>
              <span class="pill-text">Play and Win</span>
            </button>
            <button class="nav-pill-item" data-target-id="cibil-feature-card" data-route="cibil">
              <span class="pill-icon">📊</span>
              <span class="pill-text">Check CIBIL</span>
            </button>
            <button class="nav-pill-item" data-target-id="pfin-credit-card-section" data-route="pfin">
              <span class="pill-icon">✨</span>
              <span class="pill-text">PFIN Card</span>
            </button>
            <button class="nav-pill-item" data-target-id="emi-feature-card" data-route="emi">
              <span class="pill-icon">🧮</span>
              <span class="pill-text">EMI Calculator</span>
            </button>
            <button class="nav-pill-item" data-target-id="featured-offers-grid" data-route="offers">
              <span class="pill-icon">🏷️</span>
              <span class="pill-text">Top Offers</span>
            </button>
          </div>
        </nav>

        <!-- Right Side Account Actions -->
        <div class="header-right-actions">
          ${claimedCount > 0 ? `
            <button class="header-claimed-pill" id="header-myoffers-btn">
              🎁 <span class="claimed-count-badge">${claimedCount}</span>
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

  // Smooth Navigation Handler
  const navButtons = container.querySelectorAll('.nav-pill-item');
  const scrollToTarget = (targetId) => {
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const navOffset = 80;
      const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({
        top: targetPos,
        behavior: 'smooth'
      });
    }
  };

  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target-id');
      const currentRoute = window.location.hash.replace('#', '') || 'home';

      navButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (currentRoute === 'home' || currentRoute === '') {
        scrollToTarget(targetId);
      } else {
        onNavigate('home');
        setTimeout(() => {
          scrollToTarget(targetId);
        }, 150);
      }
    });
  });

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

  // Handle scroll trigger on Homepage: Once user scrolls past the first section (Hero), dock sticky
  const headerWrapper = container.querySelector('#unified-header-nav');
  
  const handleHeaderScroll = () => {
    const isCurrentHome = !window.location.hash || window.location.hash === '#' || window.location.hash === '#home';
    if (!isCurrentHome) {
      headerWrapper.classList.add('is-sticky');
      headerWrapper.classList.remove('home-header-mode');
      headerWrapper.classList.add('inner-header-mode');
      return;
    }

    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      if (heroBottom <= 60) {
        headerWrapper.classList.add('is-sticky');
      } else {
        headerWrapper.classList.remove('is-sticky');
      }
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // Highlight active section on scroll on homepage
  const sectionIds = ['limited-period-offers', 'play-win-section', 'cibil-feature-card', 'pfin-credit-card-section', 'emi-feature-card', 'featured-offers-grid'];
  
  window.addEventListener('scroll', () => {
    const isCurrentHome = !window.location.hash || window.location.hash === '#' || window.location.hash === '#home';
    if (!isCurrentHome) return;

    const scrollPos = window.scrollY + 140;
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          navButtons.forEach(btn => {
            if (btn.getAttribute('data-target-id') === id) {
              btn.classList.add('active');
            } else {
              btn.classList.remove('active');
            }
          });
        }
      }
    });
  }, { passive: true });

  // Update on reward changes
  subscribeRewards(() => {
    renderHeader(container, onNavigate);
  });
}
