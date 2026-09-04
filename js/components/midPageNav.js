// Mid-Page Quick Navigation Bar Component (Matching PDF Design)
// Items: Loans | Play and Win | Check CIBIL | PFIN Card | EMI Calculator | Top Offers

export function renderMidPageNav(container, onNavigate) {
  const navSection = document.createElement('nav');
  navSection.className = 'mid-page-quick-nav section-wrapper animate-on-scroll';
  navSection.id = 'quick-nav-bar';
  navSection.setAttribute('aria-label', 'Festive Quick Navigation');

  navSection.innerHTML = `
    <div class="quick-nav-pill-container">
      <!-- Loans -->
      <a href="#loans" class="quick-nav-item" data-nav="loans">
        <div class="quick-nav-icon-wrap">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
          </svg>
        </div>
        <span class="quick-nav-label">Loans</span>
      </a>

      <!-- Play and Win -->
      <a href="#games" class="quick-nav-item highlight-item" data-nav="games">
        <div class="quick-nav-icon-wrap">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </div>
        <span class="quick-nav-label">Play and Win</span>
      </a>

      <!-- Check CIBIL -->
      <a href="#cibil" class="quick-nav-item" data-nav="cibil">
        <div class="quick-nav-icon-wrap">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 20V10M12 20V4M6 20v-6"/>
          </svg>
        </div>
        <span class="quick-nav-label">Check CIBIL</span>
      </a>

      <!-- PFIN Card -->
      <a href="#pfin" class="quick-nav-item" data-nav="pfin">
        <div class="quick-nav-icon-wrap">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line>
          </svg>
        </div>
        <span class="quick-nav-label">PFIN Card</span>
      </a>

      <!-- EMI Calculator -->
      <a href="#emi" class="quick-nav-item" data-nav="emi">
        <div class="quick-nav-icon-wrap">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="18"></line><path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M8 18h.01M12 18h.01"></path>
          </svg>
        </div>
        <span class="quick-nav-label">EMI Calculator</span>
      </a>

      <!-- Top Offers -->
      <a href="#offers" class="quick-nav-item" data-nav="offers">
        <div class="quick-nav-icon-wrap">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line>
          </svg>
        </div>
        <span class="quick-nav-label">Top Offers</span>
      </a>
    </div>
  `;

  // Attach navigation listeners
  const navItems = navSection.querySelectorAll('.quick-nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetNav = item.getAttribute('data-nav');
      if (onNavigate) onNavigate(targetNav);
    });
  });

  container.appendChild(navSection);
}
