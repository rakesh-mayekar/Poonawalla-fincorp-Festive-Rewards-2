// Header Navigation Component with Desktop Navbar & Mobile Drawer
import { getSession, clearSession } from '../state/sessionState.js';
import { getClaimedDealsCount, subscribeRewards } from '../state/rewardState.js';

export function renderHeader(container, onNavigate) {
  const session = getSession();
  const claimedCount = getClaimedDealsCount();

  container.innerHTML = `
    <div class="header-inner-container">
      <a href="#" class="brand-logo-wrap" id="header-brand-logo">
        <div class="brand-icon">PF</div>
        <div class="brand-name-group">
          <span class="brand-title">POONAWALLA FINCORP</span>
          <span class="brand-subtitle">Festive Rewards 2025</span>
        </div>
      </a>

      <!-- Desktop Navigation Links Bar -->
      <ul class="desktop-nav-bar" id="desktop-nav-bar">
        <!-- Loans Dropdown -->
        <li class="nav-dropdown">
          <a href="#loans" class="desktop-nav-link" data-nav="loans" aria-haspopup="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
            Loans
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="dropdown-caret"><path d="M6 9l6 6 6-6"/></svg>
          </a>
          <ul class="dropdown-menu">
            <li><a href="#loans" class="dropdown-item" data-nav="loans">💳 All Loans</a></li>
            <li><a href="#loan-detail?id=instant-personal-loan" class="dropdown-item" data-nav="loan-detail">⚡ Instant Personal Loan</a></li>
            <li><a href="#loan-detail?id=prime-personal-loan" class="dropdown-item" data-nav="loan-detail">⭐ 24x7 Prime Personal Loan</a></li>
            <li><a href="#loan-detail?id=business-loan" class="dropdown-item" data-nav="loan-detail">💼 Business Loan</a></li>
            <li><a href="#loan-detail?id=gold-loan" class="dropdown-item" data-nav="loan-detail">🥇 Gold Loan</a></li>
            <li><a href="#loan-detail?id=loan-against-property" class="dropdown-item" data-nav="loan-detail">🏠 Loan Against Property</a></li>
            <li><a href="#loan-detail?id=professional-loan" class="dropdown-item" data-nav="loan-detail">👨‍⚕️ Professional Loan</a></li>
            <li><a href="#loan-detail?id=car-loan" class="dropdown-item" data-nav="loan-detail">🚗 Pre-Owned Car Loan</a></li>
          </ul>
        </li>

        <!-- Play & Win Dropdown -->
        <li class="nav-dropdown">
          <a href="#games" class="desktop-nav-link" data-nav="games" aria-haspopup="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Play & Win
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="dropdown-caret"><path d="M6 9l6 6 6-6"/></svg>
          </a>
          <ul class="dropdown-menu">
            <li><a href="#games" class="dropdown-item" data-nav="games">🎰 Play & Win Hub</a></li>
            <li><a href="#spinwin" class="dropdown-item" data-nav="spinwin"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg> Spin & Win</a></li>
            <li><a href="#scratchcard" class="dropdown-item" data-nav="scratchcard"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z"/></svg> Scratch Card</a></li>
            <li><a href="#shufflecard" class="dropdown-item" data-nav="shufflecard"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg> Shuffle Card</a></li>
          </ul>
        </li>

        <li><a href="#cibil" class="desktop-nav-link" data-nav="cibil">Check CIBIL</a></li>
        <li><a href="#emi" class="desktop-nav-link" data-nav="emi">EMI Calculator</a></li>
        <li><a href="#pfin" class="desktop-nav-link" data-nav="pfin">PFIN Card</a></li>
        <li><a href="#offers" class="desktop-nav-link" data-nav="offers">Top Offers</a></li>
        <li><a href="#refer" class="desktop-nav-link" data-nav="refer">Refer & Earn</a></li>

        <!-- My Account Dropdown -->
        <li class="nav-dropdown account-dropdown">
          <a href="#" class="desktop-nav-link" aria-haspopup="true">
            ${session.isAuthenticated ? session.mobile : 'My Account'}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="dropdown-caret"><path d="M6 9l6 6 6-6"/></svg>
          </a>
          <ul class="dropdown-menu dropdown-menu-right">
            <li id="desktop-myoffers-li" style="display: ${claimedCount > 0 ? 'block' : 'none'};">
              <a href="#myoffers" class="dropdown-item" data-nav="myoffers">
                🎁 My Offers <span class="my-offers-badge" id="desktop-claimed-badge">${claimedCount}</span>
              </a>
            </li>
            ${session.isAuthenticated ? 
              `<li><a href="#" class="dropdown-item" id="logout-btn">🚪 Logout</a></li>` : 
              `<li><a href="#" class="dropdown-item" id="desktop-login-btn">🔒 Login</a></li>`
            }
          </ul>
        </li>
      </ul>

      <div class="header-actions">
        <button class="mobile-only-toggle" id="mobile-nav-user-btn" aria-label="User Account" style="background: none; border: none; font-size: 1.4rem; cursor: pointer; display: flex; align-items: center; padding: 0;">
          👤
        </button>
        <button class="nav-toggle-btn mobile-only-toggle" id="nav-toggle-btn" aria-label="Toggle Navigation">
          ☰
        </button>
      </div>
    </div>
  `;

  // Mobile Drawer Menu
  let drawerOverlay = document.getElementById('nav-drawer-overlay');
  let drawerNav = document.getElementById('nav-drawer');
  
  if (!drawerOverlay) {
    drawerOverlay = document.createElement('div');
    drawerOverlay.className = 'nav-drawer-overlay';
    drawerOverlay.id = 'nav-drawer-overlay';
    document.body.appendChild(drawerOverlay);
  }
  
  if (!drawerNav) {
    drawerNav = document.createElement('nav');
    drawerNav.className = 'nav-drawer';
    drawerNav.id = 'nav-drawer';
    document.body.appendChild(drawerNav);
  }

  drawerNav.innerHTML = `
      <div class="drawer-header">
        <span class="drawer-title">Festive Menu</span>
        <button class="drawer-close-btn" id="drawer-close-btn" aria-label="Close Navigation">&times;</button>
      </div>

      <ul class="nav-links-list">
        <!-- Loans -->
        <li class="mobile-dropdown-group">
          <div class="mobile-dropdown-header">
            <span>💳 Loans</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="drawer-dropdown-caret"><path d="M6 9l6 6 6-6"/></svg>
          </div>
          <ul class="mobile-dropdown-menu">
            <li><a href="#loans" class="nav-link-item" data-nav="loans">All Loans</a></li>
            <li><a href="#loan-detail?id=instant-personal-loan" class="nav-link-item" data-nav="loan-detail">Instant Personal Loan</a></li>
            <li><a href="#loan-detail?id=prime-personal-loan" class="nav-link-item" data-nav="loan-detail">24x7 Prime Personal Loan</a></li>
            <li><a href="#loan-detail?id=business-loan" class="nav-link-item" data-nav="loan-detail">Business Loan</a></li>
            <li><a href="#loan-detail?id=gold-loan" class="nav-link-item" data-nav="loan-detail">Gold Loan</a></li>
            <li><a href="#loan-detail?id=loan-against-property" class="nav-link-item" data-nav="loan-detail">Loan Against Property</a></li>
            <li><a href="#loan-detail?id=professional-loan" class="nav-link-item" data-nav="loan-detail">Professional Loan</a></li>
            <li><a href="#loan-detail?id=car-loan" class="nav-link-item" data-nav="loan-detail">Pre-Owned Car Loan</a></li>
          </ul>
        </li>

        <!-- Play & Win -->
        <li class="mobile-dropdown-group">
          <div class="mobile-dropdown-header">
            <span>🎰 Play & Win</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="drawer-dropdown-caret"><path d="M6 9l6 6 6-6"/></svg>
          </div>
          <ul class="mobile-dropdown-menu">
            <li><a href="#games" class="nav-link-item" data-nav="games">Play & Win Hub</a></li>
            <li><a href="#spinwin" class="nav-link-item" data-nav="spinwin">Spin & Win</a></li>
            <li><a href="#scratchcard" class="nav-link-item" data-nav="scratchcard">Scratch Card</a></li>
            <li><a href="#shufflecard" class="nav-link-item" data-nav="shufflecard">Shuffle Card</a></li>
          </ul>
        </li>

        <li><a href="#cibil" class="nav-link-item" data-nav="cibil">📊 Check CIBIL</a></li>
        <li><a href="#emi" class="nav-link-item" data-nav="emi">🧮 EMI Calculator</a></li>
        <li><a href="#pfin" class="nav-link-item" data-nav="pfin">💳 PFIN Card</a></li>
        <li><a href="#offers" class="nav-link-item" data-nav="offers">🏷️ Top Offers</a></li>
        <li><a href="#refer" class="nav-link-item" data-nav="refer">🤝 Refer & Earn</a></li>

        <!-- Account -->
        <li class="mobile-account-section mobile-dropdown-group">
           <div class="mobile-dropdown-header">
             <span>${session.isAuthenticated ? `👤 ${session.mobile}` : '👤 My Account'}</span>
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="drawer-dropdown-caret"><path d="M6 9l6 6 6-6"/></svg>
           </div>
           <ul class="mobile-dropdown-menu">
              <li id="mobile-myoffers-li" style="display: ${claimedCount > 0 ? 'block' : 'none'};">
                <a href="#myoffers" class="nav-link-item" data-nav="myoffers">🎁 My Offers <span class="my-offers-badge" id="mobile-claimed-badge">${claimedCount}</span></a>
              </li>
              ${session.isAuthenticated ? 
                `<li><a href="#" class="nav-link-item" id="mobile-logout-btn">🚪 Logout</a></li>` : 
                `<li><a href="#" class="nav-link-item" id="mobile-login-btn">🔒 Login</a></li>`
              }
           </ul>
        </li>
      </ul>
  `;

  // Brand Logo Click Handler
  const brandLogo = container.querySelector('#header-brand-logo');
  if (brandLogo) {
    brandLogo.addEventListener('click', (e) => {
      e.preventDefault();
      onNavigate('home');
    });
  }

  // Mobile Drawer Handlers
  const toggleBtn = container.querySelector('#nav-toggle-btn');
  const closeBtn = drawerNav.querySelector('#drawer-close-btn');
  const overlay = document.getElementById('nav-drawer-overlay');
  const drawer = document.getElementById('nav-drawer');

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

  // Login Click Handler (Open OTP Modal)
  const triggerLoginModal = (e) => {
    e.preventDefault();
    closeDrawer();
    import('./otpModal.js').then(({ openOtpModal }) => {
      openOtpModal(() => {
        renderHeader(container, onNavigate);
      });
    });
  };

  const desktopLoginBtn = container.querySelector('#desktop-login-btn');
  if (desktopLoginBtn) desktopLoginBtn.addEventListener('click', triggerLoginModal);

  const mobileLoginBtn = drawerNav.querySelector('#mobile-login-btn');
  if (mobileLoginBtn) mobileLoginBtn.addEventListener('click', triggerLoginModal);

  const mobileUserIconBtn = container.querySelector('#mobile-nav-user-btn');
  if (mobileUserIconBtn) {
    mobileUserIconBtn.addEventListener('click', (e) => {
      if (!getSession().isAuthenticated) {
        triggerLoginModal(e);
      } else {
        openDrawer();
      }
    });
  }

  // Mobile Accordion Handlers
  const mobileDropdownHeaders = drawerNav.querySelectorAll('.mobile-dropdown-header');
  mobileDropdownHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parentGroup = header.closest('.mobile-dropdown-group');
      if (parentGroup) {
        const isOpen = parentGroup.classList.contains('open');
        drawerNav.querySelectorAll('.mobile-dropdown-group').forEach(group => {
          group.classList.remove('open');
        });
        if (!isOpen) {
          parentGroup.classList.add('open');
        }
      }
    });
  });

  // Bind All Nav Links
  const desktopLinks = container.querySelectorAll('.desktop-nav-link, .dropdown-item');
  const mobileLinks = drawerNav.querySelectorAll('.nav-link-item');
  const allNavLinks = [...desktopLinks, ...mobileLinks];
  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetNav = link.getAttribute('data-nav');
      const isLogout = link.id === 'logout-btn' || link.id === 'mobile-logout-btn';
      
      if (link.id === 'desktop-login-btn' || link.id === 'mobile-login-btn') return;

      if (isLogout) {
        e.preventDefault();
        clearSession();
        closeDrawer();
        onNavigate('home');
        return;
      }

      if (!targetNav) return; 

      e.preventDefault();
      
      allNavLinks.forEach(l => l.classList.remove('active'));
      document.querySelectorAll(`[data-nav="${targetNav}"]`).forEach(l => l.classList.add('active'));
      
      closeDrawer();
      
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        onNavigate(href.substring(1));
      } else {
        onNavigate(targetNav);
      }
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

    const mobileLi = drawerNav.querySelector('#mobile-myoffers-li');
    const mobileBadge = drawerNav.querySelector('#mobile-claimed-badge');
    if (mobileLi && mobileBadge) {
      mobileLi.style.display = updatedCount > 0 ? 'block' : 'none';
      mobileBadge.textContent = updatedCount;
    }
  });
}
