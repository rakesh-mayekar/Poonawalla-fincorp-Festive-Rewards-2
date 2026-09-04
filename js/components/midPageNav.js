// Homepage Mid-Page Navigation Bar Component (7 Core Items)
// Positioned below Hero on Homepage, smooth scrolling to homepage sections with zero clipping

export function renderMidPageNav(container, onNavigate) {
  const navSection = document.createElement('nav');
  navSection.className = 'mid-page-quick-nav';
  navSection.id = 'quick-nav-bar';
  navSection.setAttribute('aria-label', 'Festive Quick Navigation');

  navSection.innerHTML = `
    <div class="quick-nav-pill-container" id="quick-nav-pill-box">
      <!-- Loans -->
      <a href="#limited-period-offers" class="quick-nav-item active" data-target-id="limited-period-offers" data-nav="loans">
        <span class="quick-nav-icon">💳</span>
        <span class="quick-nav-label">Loans</span>
      </a>

      <!-- Play & Win -->
      <a href="#play-win-section" class="quick-nav-item" data-target-id="play-win-section" data-nav="games">
        <span class="quick-nav-icon">🎁</span>
        <span class="quick-nav-label">Play & Win</span>
      </a>

      <!-- Check CIBIL -->
      <a href="#cibil-feature-card" class="quick-nav-item" data-target-id="cibil-feature-card" data-nav="cibil">
        <span class="quick-nav-icon">📊</span>
        <span class="quick-nav-label">Check CIBIL</span>
      </a>

      <!-- Festive Film -->
      <a href="#campaign-video-section" class="quick-nav-item" data-target-id="campaign-video-section" data-nav="showreel">
        <span class="quick-nav-icon">🎬</span>
        <span class="quick-nav-label">Festive Film</span>
      </a>

      <!-- PFIN Card -->
      <a href="#pfin-credit-card-section" class="quick-nav-item" data-target-id="pfin-credit-card-section" data-nav="pfin">
        <span class="quick-nav-icon">✨</span>
        <span class="quick-nav-label">PFIN Card</span>
      </a>

      <!-- EMI Calculator -->
      <a href="#emi-feature-card" class="quick-nav-item" data-target-id="emi-feature-card" data-nav="emi">
        <span class="quick-nav-icon">🧮</span>
        <span class="quick-nav-label">EMI Calculator</span>
      </a>

      <!-- Top Offers -->
      <a href="#featured-offers-grid" class="quick-nav-item" data-target-id="featured-offers-grid" data-nav="offers">
        <span class="quick-nav-icon">🏷️</span>
        <span class="quick-nav-label">Top Offers</span>
      </a>
    </div>
  `;

  // Attach Smooth Scroll Navigation Handlers for Homepage
  const navItems = navSection.querySelectorAll('.quick-nav-item');
  
  const scrollToTarget = (targetId) => {
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const navOffset = 60;
      const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navOffset;
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
      
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      scrollToTarget(targetId);
    });
  });

  // Highlight active section on scroll
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
    const scrollPos = window.scrollY + 140;
    
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
