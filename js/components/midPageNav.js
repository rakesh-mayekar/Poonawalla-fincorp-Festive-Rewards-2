// Mid-Page Navigation Component on Microsite Homepage
// Ensures full accessibility & discoverability across Desktop, Tablet, Mobile
export function renderMidPageNav(container, onNavigate) {
  const navSection = document.createElement('nav');
  navSection.className = 'mid-page-nav-section animate-on-scroll';
  navSection.setAttribute('aria-label', 'Mid-Page Quick Navigation');

  navSection.innerHTML = `
    <div class="mid-page-nav-container">
      <div class="mid-page-nav-header">
        <span class="mid-page-kicker">EXPLORE MICROSITE</span>
        <span class="mid-page-subtitle">Quick access to festive offerings & interactive tools</span>
      </div>

      <div class="mid-page-nav-scroll-wrapper">
        <div class="mid-page-nav-pills">
          <!-- Loans -->
          <a href="#loans" class="mid-nav-pill" data-nav="loans">
            <span class="mid-nav-icon">💳</span>
            <span class="mid-nav-label">All Loans</span>
          </a>

          <!-- Play & Win -->
          <a href="#games" class="mid-nav-pill highlight" data-nav="games">
            <span class="mid-nav-icon">🎰</span>
            <span class="mid-nav-label">Play & Win</span>
            <span class="mid-nav-badge">Rewards</span>
          </a>

          <!-- Check CIBIL -->
          <a href="#cibil" class="mid-nav-pill" data-nav="cibil">
            <span class="mid-nav-icon">📊</span>
            <span class="mid-nav-label">Check CIBIL</span>
            <span class="mid-nav-free-badge">FREE</span>
          </a>

          <!-- EMI Calculator -->
          <a href="#emi" class="mid-nav-pill" data-nav="emi">
            <span class="mid-nav-icon">🧮</span>
            <span class="mid-nav-label">EMI Calculator</span>
          </a>

          <!-- PFIN Card -->
          <a href="#pfin" class="mid-nav-pill" data-nav="pfin">
            <span class="mid-nav-icon">✨</span>
            <span class="mid-nav-label">PFIN Card</span>
          </a>

          <!-- Top Offers -->
          <a href="#offers" class="mid-nav-pill" data-nav="offers">
            <span class="mid-nav-icon">🏷️</span>
            <span class="mid-nav-label">Top Offers</span>
          </a>

          <!-- Refer & Earn -->
          <a href="#refer" class="mid-nav-pill" data-nav="refer">
            <span class="mid-nav-icon">🤝</span>
            <span class="mid-nav-label">Refer & Earn</span>
          </a>
        </div>
      </div>
    </div>
  `;

  // Attach navigation listeners
  const navPills = navSection.querySelectorAll('.mid-nav-pill');
  navPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const targetNav = pill.getAttribute('data-nav');
      if (onNavigate) {
        onNavigate(targetNav);
      } else {
        window.location.hash = `#${targetNav}`;
      }
    });
  });

  container.appendChild(navSection);
}
