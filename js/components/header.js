// Unified Header & Sticky Top Navigation Component
// On Homepage: Smooth scrolls to sections.
// On Inner Pages: Clicking "Loans" opens Loans Listing Page (#loans), with Loans Dropdown menu.

export function renderHeader(container, onNavigate) {
  const isHomePage = !window.location.hash || window.location.hash === '#' || window.location.hash === '#home';

  container.innerHTML = `
    <div class="site-header-nav-wrapper ${isHomePage ? 'home-header-mode' : 'inner-header-mode'}" id="unified-header-nav">
      <div class="header-inner-container">
        <!-- Brand Logo (Left on Sticky / Inner Pages) -->
        <a href="#home" class="brand-logo-wrap" id="header-brand-logo">
          <div class="brand-icon">PF</div>
          <div class="brand-name-group">
            <span class="brand-title">POONAWALLA FINCORP</span>
            <span class="brand-subtitle">Sapno Ka Celebration</span>
          </div>
        </a>

        <!-- 7 Core Navigation Pill Items (with Loans Dropdown) -->
        <nav class="header-nav-pills-wrap" aria-label="Festive Quick Navigation">
          <div class="header-nav-pills">
            <!-- Loans with Dropdown -->
            <div class="nav-pill-dropdown-group">
              <button class="nav-pill-item has-dropdown" id="nav-loans-btn" data-target-id="limited-period-offers" data-route="loans">
                <span class="pill-icon">💳</span>
                <span class="pill-text">Loans</span>
                <svg class="pill-caret-svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              
              <ul class="nav-pill-dropdown-menu" id="loans-dropdown-menu">
                <li><a href="#loans" class="pill-dropdown-link" data-route="loans">💳 All Loans Catalog</a></li>
                <li class="dropdown-divider"></li>
                <li><a href="#loan-detail?id=instant-personal-loan" class="pill-dropdown-link" data-route="loan-detail?id=instant-personal-loan">⚡ Instant Personal Loan</a></li>
                <li><a href="#loan-detail?id=prime-personal-loan" class="pill-dropdown-link" data-route="loan-detail?id=prime-personal-loan">⭐ 24x7 Prime Personal Loan</a></li>
                <li><a href="#loan-detail?id=business-loan" class="pill-dropdown-link" data-route="loan-detail?id=business-loan">💼 Business Loan</a></li>
                <li><a href="#loan-detail?id=gold-loan" class="pill-dropdown-link" data-route="loan-detail?id=gold-loan">🥇 Gold Loan</a></li>
                <li><a href="#loan-detail?id=loan-against-property" class="pill-dropdown-link" data-route="loan-detail?id=loan-against-property">🏠 Loan Against Property</a></li>
                <li><a href="#loan-detail?id=professional-loan" class="pill-dropdown-link" data-route="loan-detail?id=professional-loan">👨‍⚕️ Professional Loan</a></li>
                <li><a href="#loan-detail?id=car-loan" class="pill-dropdown-link" data-route="loan-detail?id=car-loan">🚗 Pre-Owned Car Loan</a></li>
              </ul>
            </div>

            <!-- Play & Win -->
            <button class="nav-pill-item" data-target-id="play-win-section" data-route="games">
              <span class="pill-icon">🎁</span>
              <span class="pill-text">Play & Win</span>
            </button>

            <!-- Check CIBIL -->
            <button class="nav-pill-item" data-target-id="cibil-feature-card" data-route="cibil">
              <span class="pill-icon">📊</span>
              <span class="pill-text">Check CIBIL</span>
            </button>

            <!-- Festive Film / Showreel -->
            <button class="nav-pill-item" data-target-id="campaign-video-section" data-route="showreel">
              <span class="pill-icon">🎬</span>
              <span class="pill-text">Festive Film</span>
            </button>

            <!-- PFIN Card -->
            <button class="nav-pill-item" data-target-id="pfin-credit-card-section" data-route="pfin">
              <span class="pill-icon">✨</span>
              <span class="pill-text">PFIN Card</span>
            </button>

            <!-- EMI Calculator -->
            <button class="nav-pill-item" data-target-id="emi-feature-card" data-route="emi">
              <span class="pill-icon">🧮</span>
              <span class="pill-text">EMI Calculator</span>
            </button>

            <!-- Top Offers -->
            <button class="nav-pill-item" data-target-id="featured-offers-grid" data-route="offers">
              <span class="pill-icon">🏷️</span>
              <span class="pill-text">Top Offers</span>
            </button>
          </div>
        </nav>
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

  // Smooth Scroll Helper
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

  // Dropdown Links Handler
  container.querySelectorAll('.pill-dropdown-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const route = link.getAttribute('data-route');
      if (onNavigate) onNavigate(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Navigation Buttons Handler
  const navButtons = container.querySelectorAll('.nav-pill-item');
  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetId = btn.getAttribute('data-target-id');
      const route = btn.getAttribute('data-route');
      const currentRoute = window.location.hash.replace('#', '') || 'home';

      navButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Rule: On Homepage, clicking buttons scrolls smoothly to section
      if (currentRoute === 'home' || currentRoute === '') {
        e.preventDefault();
        scrollToTarget(targetId);
      } else {
        // Rule: On Inner Pages, clicking "Loans" goes to Loans listing page (#loans)
        if (route === 'loans') {
          e.preventDefault();
          onNavigate('loans');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          // Other items on inner pages return to home and scroll to section
          e.preventDefault();
          onNavigate('home');
          setTimeout(() => {
            scrollToTarget(targetId);
          }, 150);
        }
      }
    });
  });

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
  const sectionIds = [
    'limited-period-offers', 
    'play-win-section', 
    'cibil-feature-card', 
    'campaign-video-section',
    'pfin-credit-card-section', 
    'emi-feature-card', 
    'featured-offers-grid'
  ];
  
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
}
