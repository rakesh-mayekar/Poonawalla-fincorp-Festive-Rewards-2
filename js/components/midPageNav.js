// Sticky Top Navigation Bar Component (7 Core Items)
// Sticks to the top on scroll & smooth scrolls directly to corresponding homepage sections

export function renderMidPageNav(container, onNavigate) {
  const navSection = document.createElement('nav');
  navSection.className = 'mid-page-quick-nav sticky-top-nav-wrap';
  navSection.id = 'quick-nav-bar';
  navSection.setAttribute('aria-label', 'Festive Quick Navigation');

  navSection.innerHTML = `
    <div class="quick-nav-pill-container" id="quick-nav-pill-box">
      <!-- Loans -->
      <a href="#limited-period-offers" class="quick-nav-item active" data-target-id="limited-period-offers" data-nav="loans">
        <div class="quick-nav-icon-wrap">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
          </svg>
        </div>
        <span class="quick-nav-label">Loans</span>
      </a>

      <!-- Play and Win -->
      <a href="#play-win-section" class="quick-nav-item" data-target-id="play-win-section" data-nav="games">
        <div class="quick-nav-icon-wrap">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </div>
        <span class="quick-nav-label">Play & Win</span>
      </a>

      <!-- Check CIBIL -->
      <a href="#cibil-feature-card" class="quick-nav-item" data-target-id="cibil-feature-card" data-nav="cibil">
        <div class="quick-nav-icon-wrap">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 20V10M12 20V4M6 20v-6"/>
          </svg>
        </div>
        <span class="quick-nav-label">Check CIBIL</span>
      </a>

      <!-- Festive Film / Showreel -->
      <a href="#campaign-video-section" class="quick-nav-item" data-target-id="campaign-video-section" data-nav="showreel">
        <div class="quick-nav-icon-wrap">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </div>
        <span class="quick-nav-label">Festive Film</span>
      </a>

      <!-- PFIN Card (Instant Virtual Card) -->
      <a href="#pfin-credit-card-section" class="quick-nav-item" data-target-id="pfin-credit-card-section" data-nav="pfin">
        <div class="quick-nav-icon-wrap">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line>
          </svg>
        </div>
        <span class="quick-nav-label">PFIN Card</span>
      </a>

      <!-- EMI Calculator -->
      <a href="#emi-feature-card" class="quick-nav-item" data-target-id="emi-feature-card" data-nav="emi">
        <div class="quick-nav-icon-wrap">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="18"></line><path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M8 18h.01M12 18h.01"></path>
          </svg>
        </div>
        <span class="quick-nav-label">EMI Calculator</span>
      </a>

      <!-- Top Offers -->
      <a href="#featured-offers-grid" class="quick-nav-item" data-target-id="featured-offers-grid" data-nav="offers">
        <div class="quick-nav-icon-wrap">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line>
          </svg>
        </div>
        <span class="quick-nav-label">Top Offers</span>
      </a>
    </div>
  `;

  // Attach Smooth Scroll Navigation Handlers
  const navItems = navSection.querySelectorAll('.quick-nav-item');
  
  const scrollToTarget = (targetId) => {
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const navHeight = 70;
      const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      return true;
    }
    return false;
  };

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('data-target-id');
      const currentRoute = window.location.hash.replace('#', '');
      
      // Update active styling
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      if (currentRoute === '' || currentRoute === 'home') {
        scrollToTarget(targetId);
      } else {
        // If on inner page, return to home and scroll to target
        if (onNavigate) {
          onNavigate('home');
          setTimeout(() => scrollToTarget(targetId), 150);
        }
      }
    });
  });

  // Highlight on scroll
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
    const scrollPos = window.scrollY + 120;
    
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          navItems.forEach(item => {
            if (item.getAttribute('data-target-id') === id) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
        }
      }
    });
  }, { passive: true });

  container.appendChild(navSection);
}
