// Category Navigation Grid Cards Component (Secondary Features)
export function renderCategoryGrid(container, onNavigate) {
  const section = document.createElement('section');
  section.className = 'category-section section-wrapper animate-on-scroll';
  section.id = 'explore-features-section';

  const updateGridHTML = () => {
    section.innerHTML = `
      <div class="section-header align-left">
        <span class="section-kicker" style="color: var(--wf-text-secondary); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">• ESSENTIAL FINANCIAL SUITE</span>
        <h2 style="margin-top: 4px;">
          <svg class="section-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4C11 8.5 7.5 11 4 11C7.5 11 11 13.5 11 18C11 13.5 14.5 11 19 11C14.5 11 11 8.5 11 4Z" /><circle cx="6" cy="17" r="1.5" /><path d="M18 5 v4 m-2 -2 h4" /></svg>
          Explore More <span style="font-style: italic; font-weight: 500; color: var(--wf-text-secondary); margin-left: 6px;">Features</span>
        </h2>
        <p class="subheading" style="margin-top: 4px;">Take control of your finances with zero-cost tools and verified benefits.</p>
      </div>

      <div class="category-grid">
        <!-- Check CIBIL (with Prominent FREE Tag) -->
        <a href="#cibil" class="category-card" id="cibil-feature-card" data-target="cibil" style="position: relative;">
          <div class="card-top-head">
            <span class="card-badge-pill free-tag" style="background: #10B981; color: #FFFFFF; font-weight: 800; letter-spacing: 0.05em; font-size: 0.75rem; padding: 4px 10px; border-radius: 4px;">FREE</span>
            <span class="card-category-indicator" style="font-size: 0.75rem; color: var(--wf-text-secondary); font-weight: 600;">Instant Score</span>
          </div>
          <div class="card-body-content">
            <h3 class="card-title-text" style="font-size: 1.25rem;">Check CIBIL</h3>
            <p class="card-desc-text">Check your official credit score 100% free with zero impact on your credit rating.</p>
          </div>
          <div class="card-footer-row">
            <span class="card-action-text" style="font-size: 0.85rem; font-weight: 600; color: var(--wf-text-primary);">Check My Score</span>
            <div class="card-circle-btn">↗</div>
          </div>
        </a>

        <!-- EMI Calculator -->
        <a href="#emi" class="category-card" id="emi-feature-card" data-target="emi">
          <div class="card-top-head">
            <span class="card-badge-pill">Smart Tool</span>
            <span class="card-category-indicator" style="font-size: 0.75rem; color: var(--wf-text-secondary); font-weight: 600;">Instant Calculator</span>
          </div>
          <div class="card-body-content">
            <h3 class="card-title-text" style="font-size: 1.25rem;">EMI Calculator</h3>
            <p class="card-desc-text">Calculate monthly installments with interactive sliders and plan your festive finances.</p>
          </div>
          <div class="card-footer-row">
            <span class="card-action-text" style="font-size: 0.85rem; font-weight: 600; color: var(--wf-text-primary);">Calculate EMI</span>
            <div class="card-circle-btn">↗</div>
          </div>
        </a>

        <!-- Refer & Earn -->
        <a href="#refer" class="category-card" id="refer-feature-card" data-target="refer">
          <div class="card-top-head">
            <span class="card-badge-pill">Cash Vouchers</span>
            <span class="card-category-indicator" style="font-size: 0.75rem; color: var(--wf-text-secondary); font-weight: 600;">Referral Payouts</span>
          </div>
          <div class="card-body-content">
            <h3 class="card-title-text" style="font-size: 1.25rem;">Refer & Earn</h3>
            <p class="card-desc-text">Refer friends & family to earn guaranteed festive vouchers upon sanction.</p>
          </div>
          <div class="card-footer-row">
            <span class="card-action-text" style="font-size: 0.85rem; font-weight: 600; color: var(--wf-text-primary);">Start Referring</span>
            <div class="card-circle-btn">↗</div>
          </div>
        </a>
      </div>
    `;

    // Attach Click Handlers
    const cards = section.querySelectorAll('.category-card');
    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const target = card.getAttribute('data-target');
        onNavigate(target);
      });
    });
  };

  updateGridHTML();
  container.appendChild(section);
}
