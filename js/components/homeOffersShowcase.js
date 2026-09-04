// Featured Top Offers 3-Card Showcase Component (Matching PDF Grid)
// Features the 3 primary campaign cards (Foldable Phone, 5G Smartphone, Smart Electronics)

export function renderHomeOffersShowcase(container, onNavigate) {
  const section = document.createElement('section');
  section.className = 'home-offers-showcase-section section-wrapper animate-on-scroll';
  section.id = 'featured-offers-grid';

  section.innerHTML = `
    <div class="section-header center">
      <div class="festive-kicker-badge">
        <span class="sparkle-icon">🏷️</span> EXCLUSIVE DEALS
      </div>
      <h2 class="festive-heading">
        Top Offers <span class="accent-italic">For You</span>
      </h2>
      <p class="subheading center-subheading">
        Explore offers from 50+ Brands, plus solutions tailored to your goals.
      </p>
    </div>

    <div class="featured-offers-grid">
      <!-- Offer Card 1: Foldable Flagship / EasyEMI -->
      <div class="featured-offer-card">
        <div class="featured-card-top-tag">
          <span class="festive-tag-orange">✨ Handcrafted Goodness</span>
        </div>
        <div class="featured-card-visual electronic-visual-1">
          <div class="offer-product-icon">📱</div>
          <div class="offer-badge-float">0% EMI</div>
        </div>
        <div class="featured-card-content">
          <h3 class="featured-card-title">Foldable & Premium Flagships</h3>
          <p class="featured-card-desc">Unfold the future with PFIN Card EasyEMI and 5% Instant Cash-back.</p>
        </div>
        <div class="featured-card-action">
          <button class="featured-action-btn" data-offer="gadgets">Claim Deal &rarr;</button>
        </div>
      </div>

      <!-- Offer Card 2: 5G Power & Cashback -->
      <div class="featured-offer-card highlight-card">
        <div class="featured-card-top-tag">
          <span class="festive-tag-green">🔥 Galaxy 5G Flagship</span>
        </div>
        <div class="featured-card-visual electronic-visual-2">
          <div class="offer-product-icon">⚡</div>
          <div class="offer-badge-float">5% CashBack</div>
        </div>
        <div class="featured-card-content">
          <h3 class="featured-card-title">Galaxy 5G Flagship Series</h3>
          <p class="featured-card-desc">Power through 5G with 5% Instant Cash-back on PFIN Card.</p>
        </div>
        <div class="featured-card-action">
          <button class="featured-action-btn" data-offer="galaxy">Claim Deal &rarr;</button>
        </div>
      </div>

      <!-- Offer Card 3: Smart Living & Electronics -->
      <div class="featured-offer-card">
        <div class="featured-card-top-tag">
          <span class="festive-tag-blue">⭐ Discover What's New</span>
        </div>
        <div class="featured-card-visual electronic-visual-3">
          <div class="offer-product-icon">⌚</div>
          <div class="offer-badge-float">Festive Special</div>
        </div>
        <div class="featured-card-content">
          <h3 class="featured-card-title">Smart Gadgets & Lifestyle</h3>
          <p class="featured-card-desc">Power through 5G with 5% Instant Cash-back on PFIN Card & vouchers.</p>
        </div>
        <div class="featured-card-action">
          <button class="featured-action-btn" data-offer="lifestyle">Claim Deal &rarr;</button>
        </div>
      </div>
    </div>

    <div class="featured-offers-footer center" style="margin-top: 36px; text-align: center;">
      <button class="btn-primary" id="home-view-all-offers-btn" style="padding: 12px 28px;">
        View All Offers &rarr;
      </button>
    </div>
  `;

  const viewAllBtn = section.querySelector('#home-view-all-offers-btn');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
      if (onNavigate) onNavigate('offers');
    });
  }

  section.querySelectorAll('.featured-action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (onNavigate) onNavigate('offers');
    });
  });

  container.appendChild(section);
}
