// Top Offers Component
import { BRAND_OFFERS, AUTO_SCROLLER_OFFERS } from '../data/offersData.js';
import { REWARD_ACTIVITIES } from '../state/rewardState.js';
import { renderTopOffersSection } from './topOffersScroller.js';

export function renderOffersSection(container, onNavigate) {
  const wrapper = document.createElement('div');
  wrapper.className = 'offers-page-container section-wrapper';

  wrapper.innerHTML = `
    <div class="section-header align-left">
      <span class="section-kicker" style="color: var(--wf-text-secondary); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">• FESTIVE BRAND PARTNERSHIPS</span>
      <h2 style="margin-top: 4px;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="section-icon"><path d="M11 4C11 8.5 7.5 11 4 11C7.5 11 11 13.5 11 18C11 13.5 14.5 11 19 11C14.5 11 11 8.5 11 4Z" /><circle cx="6" cy="17" r="1.5" /><path d="M18 5 v4 m-2 -2 h4" /></svg>
        Top Festive <span style="font-style: italic; font-weight: 500; color: var(--wf-text-secondary); margin-left: 6px;">Offers</span>
      </h2>
      <p class="subheading">Exclusive festive vouchers from premier lifestyle, jewellery, electronics & travel partners.</p>
    </div>

    <!-- Suggested User Guidance & 5 Unlock Activities Section -->
    <div class="unlock-activities-banner" style="background: var(--wf-surface); border: 1px solid var(--wf-border); border-radius: var(--radius-lg); padding: 32px; margin-bottom: 40px; box-shadow: var(--shadow-sm);">
      <div style="text-align: center; max-width: 680px; margin: 0 auto 28px auto;">
        <span style="font-size: 2.2rem; display: block; margin-bottom: 10px;">🎁</span>
        <h3 style="font-size: 1.4rem; color: var(--wf-text-primary); margin-bottom: 8px;">
          To unlock and avail exciting festive offers, explore the activities below:
        </h3>
        <p style="font-size: 0.95rem; color: var(--wf-text-secondary); margin: 0;">
          Complete any of our verified festive activities to earn guaranteed digital voucher coupons directly.
        </p>
      </div>

      <!-- 5 Activity Action Cards Grid -->
      <div class="activities-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
        ${REWARD_ACTIVITIES.map(act => `
          <div class="activity-promo-card" data-route="${act.route}" style="background: var(--wf-surface-subtle); border: 1px solid var(--wf-border); border-radius: var(--radius-md); padding: 20px; text-align: left; cursor: pointer; transition: all 0.2s ease; display: flex; flex-direction: column;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <span style="font-size: 1.8rem;">${act.icon}</span>
              <span style="font-size: 0.72rem; font-weight: 700; color: #10B981; background: rgba(16, 185, 129, 0.1); padding: 3px 8px; border-radius: 4px;">
                ${act.badge}
              </span>
            </div>
            <h4 style="font-size: 1.05rem; color: var(--wf-text-primary); margin-bottom: 6px;">${act.title}</h4>
            <p style="font-size: 0.82rem; color: var(--wf-text-secondary); line-height: 1.4; margin-bottom: 16px; flex: 1;">${act.description}</p>
            <div style="font-size: 0.85rem; font-weight: 700; color: var(--wf-text-primary); display: flex; align-items: center; justify-content: space-between;">
              <span>Start Activity</span>
              <span>&rarr;</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Partner Catalog Showcase Header -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
      <div>
        <h3 style="font-size: 1.25rem; color: var(--wf-text-primary); margin: 0;">Featured Partner Deals Catalog</h3>
        <p style="font-size: 0.85rem; color: var(--wf-text-secondary); margin: 4px 0 0 0;">Browse our complete festive reward catalogue</p>
      </div>
      
      <div class="offers-search-bar" style="margin: 0; max-width: 320px;">
        <input type="text" class="offers-search-input" id="offers-search" placeholder="Search brand (Lenovo, Senco, Myntra)..." style="font-size: 0.85rem; padding: 10px 14px;">
      </div>
    </div>

    <!-- Partner Offers Grid (No Coupon Codes displayed directly, No Get Offer button) -->
    <div class="offers-grid" id="offers-grid-container" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; margin-bottom: 48px;"></div>
  `;

  const gridContainer = wrapper.querySelector('#offers-grid-container');
  const searchInput = wrapper.querySelector('#offers-search');

  let searchQuery = '';

  function renderGrid() {
    gridContainer.innerHTML = '';

    const filtered = AUTO_SCROLLER_OFFERS.filter(offer => {
      return offer.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
             offer.offerDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
             offer.category.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div class="my-offers-empty" style="grid-column: 1 / -1; padding: 36px; text-align: center; background: var(--wf-surface); border: 1px dashed var(--wf-border); border-radius: var(--radius-lg);">
          <div style="font-size: 2.5rem; margin-bottom: 8px;">🔍</div>
          <h3>No matching partner deals found</h3>
          <p style="font-size: 0.85rem; color: var(--wf-text-secondary); margin-top: 4px;">Try searching with another keyword or clear search.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(offer => {
      const card = document.createElement('div');
      card.className = 'offer-card informational-card';
      card.style.background = 'var(--wf-surface)';
      card.style.border = '1px solid var(--wf-border)';
      card.style.borderRadius = 'var(--radius-md)';
      card.style.padding = '20px';
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      card.style.gap = '12px';

      card.innerHTML = `
        <div class="offer-card-head" style="display: flex; align-items: center; gap: 12px;">
          <div class="brand-logo-badge" style="width: 44px; height: 44px; border-radius: 8px; background: var(--wf-surface-subtle); border: 1px solid var(--wf-border); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.85rem;">
            ${offer.brandInitials}
          </div>
          <div class="offer-brand-details" style="flex: 1;">
            <span class="brand-name" style="font-size: 0.8rem; font-weight: 700; color: var(--wf-text-secondary); text-transform: uppercase;">${offer.brandName}</span>
            <span class="offer-category" style="font-size: 0.72rem; color: #10B981; display: block; font-weight: 600;">${offer.category}</span>
          </div>
        </div>

        <p style="font-size: 0.95rem; font-weight: 700; color: var(--wf-text-primary); margin: 0; line-height: 1.4; flex: 1;">
          ${offer.offerDescription}
        </p>

        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid var(--wf-border); margin-top: 4px;">
          <span style="font-size: 0.75rem; color: var(--wf-text-secondary); font-weight: 600;">Festive Partner Deal</span>
          <span style="font-size: 0.75rem; color: #10B981; font-weight: 700; background: rgba(16, 185, 129, 0.08); padding: 3px 8px; border-radius: 4px;">
            🔒 Unlock via Activities
          </span>
        </div>
      `;

      gridContainer.appendChild(card);
    });
  }

  // Filter Listeners
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderGrid();
  });

  // Activity Card Click Listeners (redirecting to respective journeys)
  const activityCards = wrapper.querySelectorAll('.activity-promo-card');
  activityCards.forEach(card => {
    card.addEventListener('click', () => {
      const route = card.getAttribute('data-route');
      if (onNavigate) {
        onNavigate(route);
      } else {
        window.location.hash = `#${route}`;
      }
    });
  });

  renderGrid();
  container.appendChild(wrapper);

  // Render Top Offers at the bottom of the Offers page
  renderTopOffersSection(container, onNavigate, {
    title: 'Top Offers For You',
    showHeading: true,
    isBottomSection: true
  });
}
