// Hero Section Component (Modern Geometric Wireframe Reference Style)
export function renderHero(container, onNavigate) {
  const heroWrapper = document.createElement('section');
  heroWrapper.className = 'festive-hero-wireframe section-wrapper';
  heroWrapper.id = 'hero-section';

  heroWrapper.innerHTML = `
    <div class="hero-content-container">
      <!-- Top Campaign Pill Badge -->
      <div class="hero-campaign-badge">
        <span class="badge-accent-dot"></span>
        <span class="badge-main">POONAWALLA FINCORP &bull; SAPNO KA CELEBRATION</span>
      </div>

      <!-- Main Headline -->
      <h1 class="hero-main-heading">
        Celebrate More.<br>
        <span class="hero-heading-highlight">Worry Less.</span>
      </h1>

      <!-- Subtitle -->
      <p class="hero-main-subheading">
        Make your festive moments bigger and brighter with instant approvals, zero processing fees, and guaranteed rewards.
      </p>

      <!-- Action Row -->
      <div class="hero-action-row">
        <button class="hero-primary-cta-btn" id="hero-play-win-btn">
          Play & Win Rewards &rarr;
        </button>
        <button class="hero-secondary-cta-btn" id="hero-explore-loans-btn">
          Explore Loan Offers
        </button>
      </div>
    </div>
  `;

  // Attach button events
  const playBtn = heroWrapper.querySelector('#hero-play-win-btn');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (onNavigate) onNavigate('games');
    });
  }

  const loansBtn = heroWrapper.querySelector('#hero-explore-loans-btn');
  if (loansBtn) {
    loansBtn.addEventListener('click', () => {
      const offersSection = document.getElementById('limited-period-offers');
      if (offersSection) {
        offersSection.scrollIntoView({ behavior: 'smooth' });
      } else if (onNavigate) {
        onNavigate('loans');
      }
    });
  }

  container.appendChild(heroWrapper);
}
