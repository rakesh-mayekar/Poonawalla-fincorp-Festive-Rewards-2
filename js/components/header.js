// Header Navigation Component with Desktop Navbar & Mobile Drawer
import { getSession } from '../state/sessionState.js';
import { getClaimedDealsCount, subscribeRewards } from '../state/rewardState.js';
import { toggleAudioMute, getAudioMuteState } from '../services/audioSynth.js';

export function renderHeader(container, onNavigate) {
  const session = getSession();
  const claimedCount = getClaimedDealsCount();
  const isMuted = getAudioMuteState();

  container.innerHTML = `
    <a href="#" class="brand-logo-wrap" id="header-brand-logo">
      <div class="brand-icon">✨</div>
      <div class="brand-name-group">
        <span class="brand-title">POONAWALLA</span>
        <span class="brand-subtitle">FINCORP FESTIVE</span>
      </div>
    </a>

    <!-- Desktop Navigation Links Bar -->
    <ul class="desktop-nav-bar" id="desktop-nav-bar">
      <li><a href="#home" class="desktop-nav-link active" data-nav="home">Home</a></li>
      <li><a href="#loans" class="desktop-nav-link" data-nav="loans">Loans</a></li>
      <li><a href="#games" class="desktop-nav-link" data-nav="games">Play & Win</a></li>
      <li><a href="#refer" class="desktop-nav-link" data-nav="refer">Refer & Earn</a></li>
      <li><a href="#cibil" class="desktop-nav-link" data-nav="cibil">Free CIBIL</a></li>
      <li><a href="#emi" class="desktop-nav-link" data-nav="emi">EMI Calculator</a></li>
      <li><a href="#pfin" class="desktop-nav-link" data-nav="pfin">PFIN Card</a></li>
      <li><a href="#offers" class="desktop-nav-link" data-nav="offers">Top Offers</a></li>
      <li id="desktop-myoffers-li" style="display: ${claimedCount > 0 ? 'inline-block' : 'none'};">
        <a href="#myoffers" class="desktop-nav-link" data-nav="myoffers">
          My Offers <span class="my-offers-badge" id="desktop-claimed-badge">${claimedCount}</span>
        </a>
      </li>
    </ul>

    <div class="header-actions">
      <button class="nav-toggle-btn" id="sound-toggle-btn" title="Toggle Sound Effects" style="font-size: 0.9rem;">
        ${isMuted ? '🔇' : '🔊'}
      </button>

      ${session.isAuthenticated ? `
        <div class="session-status-pill" title="Verified Session: ${session.mobile}">
          <span>✓</span> OTP Verified
        </div>
      ` : ''}

      <button class="nav-toggle-btn mobile-only-toggle" id="nav-toggle-btn" aria-label="Toggle Navigation">
        ☰
      </button>
    </div>

    <!-- Mobile Drawer Menu -->
    <div class="nav-drawer-overlay" id="nav-drawer-overlay"></div>
    <nav class="nav-drawer" id="nav-drawer">
      <div class="drawer-header">
        <span class="drawer-title">Festive Menu</span>
        <button class="drawer-close-btn" id="drawer-close-btn">&times;</button>
      </div>

      <ul class="nav-links-list">
        <li><a href="#home" class="nav-link-item active" data-nav="home">🏠 Home</a></li>
        <li><a href="#loans" class="nav-link-item" data-nav="loans">💳 Festive Loans</a></li>
        <li><a href="#games" class="nav-link-item" data-nav="games">🎰 Play & Win Rewards</a></li>
        <li><a href="#refer" class="nav-link-item" data-nav="refer">🤝 Refer & Earn</a></li>
        <li><a href="#cibil" class="nav-link-item" data-nav="cibil">📊 Free CIBIL Check</a></li>
        <li><a href="#emi" class="nav-link-item" data-nav="emi">🧮 EMI Calculator</a></li>
        <li><a href="#pfin" class="nav-link-item" data-nav="pfin">💳 PFIN Card</a></li>
        <li><a href="#offers" class="nav-link-item" data-nav="offers">🏷️ Top Partner Offers</a></li>
        <li id="mobile-myoffers-li" style="display: ${claimedCount > 0 ? 'block' : 'none'};">
          <a href="#myoffers" class="nav-link-item" data-nav="myoffers">
            🎁 My Offers
            <span class="my-offers-badge" id="mobile-claimed-badge">${claimedCount}</span>
          </a>
        </li>
      </ul>
    </nav>
  `;

  // Brand Logo Click Handler
  const brandLogo = container.querySelector('#header-brand-logo');
  brandLogo.addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('home');
  });

  // Sound Toggle Handler
  const soundBtn = container.querySelector('#sound-toggle-btn');
  soundBtn.addEventListener('click', () => {
    const muted = toggleAudioMute();
    soundBtn.textContent = muted ? '🔇' : '🔊';
  });

  // Mobile Drawer Handlers
  const toggleBtn = container.querySelector('#nav-toggle-btn');
  const closeBtn = container.querySelector('#drawer-close-btn');
  const overlay = container.querySelector('#nav-drawer-overlay');
  const drawer = container.querySelector('#nav-drawer');

  const openDrawer = () => {
    drawer.classList.add('open');
    overlay.classList.add('open');
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
  };

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  // Bind All Nav Links (Both Desktop & Mobile)
  const allNavLinks = container.querySelectorAll('.desktop-nav-link, .nav-link-item');
  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetNav = link.getAttribute('data-nav');
      allNavLinks.forEach(l => l.classList.remove('active'));
      
      container.querySelectorAll(`[data-nav="${targetNav}"]`).forEach(l => l.classList.add('active'));
      closeDrawer();
      onNavigate(targetNav);
    });
  });

  // Subscribe to reward state changes
  subscribeRewards(() => {
    const updatedCount = getClaimedDealsCount();
    
    const desktopLi = container.querySelector('#desktop-myoffers-li');
    const desktopBadge = container.querySelector('#desktop-claimed-badge');
    if (desktopLi && desktopBadge) {
      desktopLi.style.display = updatedCount > 0 ? 'inline-block' : 'none';
      desktopBadge.textContent = updatedCount;
    }

    const mobileLi = container.querySelector('#mobile-myoffers-li');
    const mobileBadge = container.querySelector('#mobile-claimed-badge');
    if (mobileLi && mobileBadge) {
      mobileLi.style.display = updatedCount > 0 ? 'block' : 'none';
      mobileBadge.textContent = updatedCount;
    }
  });
}
