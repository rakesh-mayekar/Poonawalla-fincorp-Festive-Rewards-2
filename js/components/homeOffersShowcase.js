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
          <span class="wireframe-tag">Featured Deal</span>
        </div>
        <div class="featured-card-visual">
          <div class="wireframe-img-placeholder">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            <span>Offer Visual</span>
          </div>
          <div class="offer-badge-float">0% EMI</div>
        </div>
        <div class="featured-card-content">
          <h3 class="featured-card-title">Foldable & Premium Flagships</h3>
          <p class="featured-card-desc">PFIN Card EasyEMI with 5% instant cashback across authorized partner stores.</p>
        </div>
        <div class="featured-card-action">
          <button class="featured-action-btn" data-offer="gadgets">Claim Deal &rarr;</button>
        </div>
      </div>

      <!-- Offer Card 2: 5G Power & Cashback -->
      <div class="featured-offer-card">
        <div class="featured-card-top-tag">
          <span class="wireframe-tag">Top Cashback</span>
        </div>
        <div class="featured-card-visual">
          <div class="wireframe-img-placeholder">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            <span>Offer Visual</span>
          </div>
          <div class="offer-badge-float">5% CashBack</div>
        </div>
        <div class="featured-card-content">
          <h3 class="featured-card-title">Galaxy 5G Flagship Series</h3>
          <p class="featured-card-desc">Exclusive pre-approved discounts and guaranteed vouchers with PFIN Card.</p>
        </div>
        <div class="featured-card-action">
          <button class="featured-action-btn" data-offer="galaxy">Claim Deal &rarr;</button>
        </div>
      </div>

      <!-- Offer Card 3: Smart Living & Electronics -->
      <div class="featured-offer-card">
        <div class="featured-card-top-tag">
          <span class="wireframe-tag">Festive Special</span>
        </div>
        <div class="featured-card-visual">
          <div class="wireframe-img-placeholder">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            <span>Offer Visual</span>
          </div>
          <div class="offer-badge-float">Festive Offer</div>
        </div>
        <div class="featured-card-content">
          <h3 class="featured-card-title">Smart Gadgets & Lifestyle</h3>
          <p class="featured-card-desc">Upgrade electronics with zero processing fee and curated partner vouchers.</p>
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
