// Header & Navigation Component
// On Homepage: Centered clean brand mark (Pill navigation is below hero)
// On All Inner Pages: Top bar with Brand Logo + Loans Dropdown + Inner Page Routing

export function renderHeader(container, onNavigate) {
  const isHomePage = !window.location.hash || window.location.hash === '#' || window.location.hash === '#home';

  if (isHomePage) {
    // -------------------------------------------------------------
    // HOMEPAGE HEADER MODE: Centered Brand Mark (matching PDF design)
    // -------------------------------------------------------------
    container.innerHTML = `
      <div class="site-header-nav-wrapper home-header-mode" id="unified-header-nav">
        <div class="header-inner-container home-centered-container">
          <a href="#home" class="brand-logo-wrap center-logo" id="header-brand-logo">
            <div class="brand-icon">PF</div>
            <div class="brand-name-group">
              <span class="brand-title">POONAWALLA FINCORP</span>
              <span class="brand-subtitle">Sapno Ka Celebration</span>
            </div>
          </a>
        </div>
      </div>
    `;
  } else {
    // -------------------------------------------------------------
    // ALL INNER PAGES HEADER MODE: Brand Logo + Complete Navigation + Loans Dropdown
    // -------------------------------------------------------------
    const currentHash = window.location.hash.replace('#', '').split('?')[0];

    container.innerHTML = `
      <div class="site-header-nav-wrapper inner-header-mode" id="unified-header-nav">
        <div class="header-inner-container">
          <!-- Left: Brand Logo -->
          <a href="#home" class="brand-logo-wrap" id="header-brand-logo">
            <div class="brand-icon">PF</div>
            <div class="brand-name-group">
              <span class="brand-title">POONAWALLA FINCORP</span>
              <span class="brand-subtitle">Festive Rewards</span>
            </div>
          </a>

          <!-- Center: Inner Pages Navigation with Loans Dropdown -->
          <nav class="header-nav-pills-wrap" aria-label="Inner Page Navigation">
            <div class="header-nav-pills">
              <!-- Loans with Dropdown -->
              <div class="nav-pill-dropdown-group">
                <button class="nav-pill-item has-dropdown ${currentHash === 'loans' || currentHash === 'loan-detail' ? 'active' : ''}" id="inner-nav-loans-btn" data-route="loans">
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
              <button class="nav-pill-item ${currentHash === 'games' || currentHash === 'spinwin' || currentHash === 'scratchcard' || currentHash === 'shufflecard' ? 'active' : ''}" data-route="games">
                <span class="pill-icon">🎁</span>
                <span class="pill-text">Play & Win</span>
              </button>

              <!-- Check CIBIL -->
              <button class="nav-pill-item ${currentHash === 'cibil' ? 'active' : ''}" data-route="cibil">
                <span class="pill-icon">📊</span>
                <span class="pill-text">Check CIBIL</span>
              </button>

              <!-- Festive Film / Showreel (routes to home & scrolls to film) -->
              <button class="nav-pill-item" data-route="showreel">
                <span class="pill-icon">🎬</span>
                <span class="pill-text">Festive Film</span>
              </button>

              <!-- PFIN Card -->
              <button class="nav-pill-item ${currentHash === 'pfin' ? 'active' : ''}" data-route="pfin">
                <span class="pill-icon">✨</span>
                <span class="pill-text">PFIN Card</span>
              </button>

              <!-- EMI Calculator -->
              <button class="nav-pill-item ${currentHash === 'emi' ? 'active' : ''}" data-route="emi">
                <span class="pill-icon">🧮</span>
                <span class="pill-text">EMI Calculator</span>
              </button>

              <!-- Top Offers -->
              <button class="nav-pill-item ${currentHash === 'offers' ? 'active' : ''}" data-route="offers">
                <span class="pill-icon">🏷️</span>
                <span class="pill-text">Top Offers</span>
              </button>

              <!-- Blogs -->
              <button class="nav-pill-item ${currentHash === 'blogs' || currentHash === 'blog-detail' ? 'active' : ''}" data-route="blogs">
                <span class="pill-icon">📚</span>
                <span class="pill-text">Blogs</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    `;
  }

  // Brand Logo Click Handler
  const logo = container.querySelector('#header-brand-logo');
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      onNavigate('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Dropdown Links Handler (on Inner Pages)
  container.querySelectorAll('.pill-dropdown-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const route = link.getAttribute('data-route');
      if (onNavigate) onNavigate(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Inner Page Nav Buttons Handler
  container.querySelectorAll('.nav-pill-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const route = btn.getAttribute('data-route');
      if (!route) return;

      if (route === 'showreel') {
        onNavigate('home');
        setTimeout(() => {
          const videoSection = document.getElementById('campaign-video-section');
          if (videoSection) {
            videoSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 150);
      } else {
        if (onNavigate) onNavigate(route);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });
}
