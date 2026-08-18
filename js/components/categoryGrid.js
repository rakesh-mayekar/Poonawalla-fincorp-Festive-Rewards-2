// Category Navigation Grid Cards Component (Reference Prototype Styling)
import { getClaimedDealsCount, subscribeRewards } from '../state/rewardState.js';

export function renderCategoryGrid(container, onNavigate) {
  const section = document.createElement('section');
  section.className = 'category-section';

  const updateGridHTML = () => {
    const claimedCount = getClaimedDealsCount();

    section.innerHTML = `
      <div class="section-header">
        <h2 class="section-title">Explore Features & Offers</h2>
      </div>

      <div class="category-grid">
        <!-- Card 1: Festive Loans -->
        <a href="#loans" class="category-card" data-target="loans">
          <div class="card-top-head">
            <span class="card-badge-pill">0% Processing Fee</span>
          </div>
          <div class="card-body-content">
            <h3 class="card-title-text">Festive Loans</h3>
            <p class="card-desc-text">7 Tailored loan products with instant paperless approval & low EMIs.</p>
          </div>
          <div class="card-footer-row">
            <div class="card-circle-btn">↗</div>
          </div>
        </a>

        <!-- Card 2: Play & Win -->
        <a href="#games" class="category-card" data-target="games">
          <div class="card-top-head">
            <span class="card-badge-pill">3 Games Included</span>
          </div>
          <div class="card-body-content">
            <h3 class="card-title-text">Play & Win</h3>
            <p class="card-desc-text">Spin the wheel, scratch cards & shuffle cards to win brand vouchers.</p>
          </div>
          <div class="card-footer-row">
            <div class="card-circle-btn">↗</div>
          </div>
        </a>

        <!-- Card 3: Refer & Earn -->
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

        <!-- Card 4: Free CIBIL Check -->
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

        <!-- Card 5: EMI Calculator -->
        <a href="#emi" class="category-card" data-target="emi">
          <div class="card-top-head">
            <span class="card-badge-pill">Scratch Reward</span>
          </div>
          <div class="card-body-content">
            <h3 class="card-title-text">EMI Calculator</h3>
            <p class="card-desc-text">Interactive EMI visualizer & unlock a surprise scratch card reward.</p>
          </div>
          <div class="card-footer-row">
            <div class="card-circle-btn">↗</div>
          </div>
        </a>

        <!-- Card 6: PFIN Card -->
        <a href="#pfin" class="category-card" data-target="pfin">
          <div class="card-top-head">
            <span class="card-badge-pill">Guaranteed Gift</span>
          </div>
          <div class="card-body-content">
            <h3 class="card-title-text">PFIN Card</h3>
            <p class="card-desc-text">Consumer durable No Cost EMIs & guaranteed gift cards.</p>
          </div>
          <div class="card-footer-row">
            <div class="card-circle-btn">↗</div>
          </div>
        </a>

        <!-- Card 7: Top Offers -->
        <a href="#offers" class="category-card" data-target="offers">
          <div class="card-top-head">
            <span class="card-badge-pill">150+ Partner Deals</span>
          </div>
          <div class="card-body-content">
            <h3 class="card-title-text">Top Offers</h3>
            <p class="card-desc-text">Myntra, KFC, Swiggy, Ajio & Lifestyle discount promo codes.</p>
          </div>
          <div class="card-footer-row">
            <div class="card-circle-btn">↗</div>
          </div>
        </a>

        <!-- Card 8: My Offers (Dynamic post claim) -->
        ${claimedCount > 0 ? `
          <a href="#myoffers" class="category-card" data-target="myoffers" style="background: var(--wf-hero-bg);">
            <div class="card-top-head">
              <span class="card-badge-pill" style="background: #111111; color: #FFFFFF;">${claimedCount} Claimed</span>
            </div>
            <div class="card-body-content">
              <h3 class="card-title-text">My Offers</h3>
              <p class="card-desc-text">View your ${claimedCount} won brand voucher code${claimedCount > 1 ? 's' : ''}.</p>
            </div>
            <div class="card-footer-row">
              <div class="card-circle-btn">↗</div>
            </div>
          </a>
        ` : ''}
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
  subscribeRewards(() => updateGridHTML());

  container.appendChild(section);
}
