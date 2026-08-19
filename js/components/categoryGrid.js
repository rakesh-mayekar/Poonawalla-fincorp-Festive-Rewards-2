// Category Navigation Grid Cards Component (Secondary Features)
export function renderCategoryGrid(container, onNavigate) {
  const section = document.createElement('section');
  section.className = 'category-section';

  const updateGridHTML = () => {
    section.innerHTML = `
      <div class="section-header align-left">
        <h2>
          <svg class="section-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4C11 8.5 7.5 11 4 11C7.5 11 11 13.5 11 18C11 13.5 14.5 11 19 11C14.5 11 11 8.5 11 4Z" /><circle cx="6" cy="17" r="1.5" /><path d="M18 5 v4 m-2 -2 h4" /></svg>
          Explore More Features
        </h2>
        <p class="subheading">Discover smart tools and bonus rewards designed to elevate your financial journey.</p>
      </div>

      <div class="category-grid">
        <!-- Refer & Earn -->
        <a href="#refer" class="category-card" data-target="refer">
          <div class="card-top-head">
            <span class="card-badge-pill">Cash Vouchers</span>
          </div>
          <div class="card-body-content">
            <h3 class="card-title-text">Refer & Earn</h3>
            <p class="card-desc-text">Refer family & friends to earn guaranteed referral payouts.</p>
          </div>
          <div class="card-footer-row">
            <div class="card-circle-btn">↗</div>
          </div>
        </a>

        <!-- Free CIBIL Check -->
        <a href="#cibil" class="category-card" data-target="cibil">
          <div class="card-top-head">
            <span class="card-badge-pill">+1 Bonus Spin</span>
          </div>
          <div class="card-body-content">
            <h3 class="card-title-text">Free CIBIL Check</h3>
            <p class="card-desc-text">Check your credit score 100% free and unlock an extra bonus spin!</p>
          </div>
          <div class="card-footer-row">
            <div class="card-circle-btn">↗</div>
          </div>
        </a>

        <!-- EMI Calculator -->
        <a href="#emi" class="category-card" data-target="emi">
          <div class="card-top-head">
            <span class="card-badge-pill">Smart Tool</span>
          </div>
          <div class="card-body-content">
            <h3 class="card-title-text">EMI Calculator</h3>
            <p class="card-desc-text">Interactive EMI visualizer & plan your finances better.</p>
          </div>
          <div class="card-footer-row">
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
