// Hero Section Component matching PDF Wireframe & Final Look
// Features "Sapno Ka Celebration", "Celebrate More. Worry Less.", and festive visual atmosphere

export function renderHero(container, onNavigate) {
  const heroWrapper = document.createElement('section');
  heroWrapper.className = 'festive-hero-pdf-style section-wrapper';
  heroWrapper.id = 'hero-section';

  heroWrapper.innerHTML = `
    <!-- Top Floating Marigold & Toran Garland -->
    <div class="hero-festive-toran-decor">
      <div class="toran-garland-line"></div>
    </div>

    <div class="hero-content-container">
      <!-- Top Campaign Badge -->
      <div class="hero-campaign-badge">
        <div class="badge-diya-icon">🪔</div>
        <div class="badge-text-group">
          <span class="badge-sub">POONAWALLA FINCORP</span>
          <span class="badge-main">Sapno Ka Celebration</span>
        </div>
      </div>

      <!-- Main Headline -->
      <h1 class="hero-main-heading">
        Celebrate More.<br>
        <span class="hero-heading-highlight">Worry Less.</span>
      </h1>

      <!-- Subtitle -->
      <p class="hero-main-subheading">
        Make your festive moments bigger and brighter with the financial support you need.
      </p>

      <!-- Primary CTA Button -->
      <div class="hero-action-row">
        <button class="hero-primary-cta-btn" id="hero-play-win-btn">
          <span class="btn-star-sparkle">✨</span> Play & Win Rewards
        </button>
      </div>

      <!-- Festive Floating Accents (Characters / Lanterns / Diyas) -->
      <div class="hero-floating-character left">
        <div class="festive-character-box">
          <span class="character-emoji">🏮</span>
          <span class="character-caption">Shubh Labh</span>
        </div>
      </div>

      <div class="hero-floating-character right">
        <div class="festive-character-box">
          <span class="character-emoji">🪔</span>
          <span class="character-caption">Joy & Prosperity</span>
        </div>
      </div>
    </div>
  `;

  // Attach button event
  const playBtn = heroWrapper.querySelector('#hero-play-win-btn');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (onNavigate) onNavigate('games');
    });
  }

  container.appendChild(heroWrapper);
}
