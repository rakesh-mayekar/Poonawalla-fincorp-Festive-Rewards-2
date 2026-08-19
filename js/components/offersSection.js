// Top Brand Partner Offers Component SOT v1.3 Section 4.8
import { BRAND_OFFERS } from '../data/offersData.js';
import { trackGa4Event, GA4_EVENTS } from '../services/gaService.js';
import { getSession } from '../state/sessionState.js';
import { openOtpModal } from './otpModal.js';
import { openRewardModal } from './rewardModal.js';

export function renderOffersSection(container) {
  const wrapper = document.createElement('div');
  wrapper.className = 'offers-page-container';

  wrapper.innerHTML = `
    <div class="section-header align-left">
      <h2>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="section-icon"><path d="M11 4C11 8.5 7.5 11 4 11C7.5 11 11 13.5 11 18C11 13.5 14.5 11 19 11C14.5 11 11 8.5 11 4Z" /><circle cx="6" cy="17" r="1.5" /><path d="M18 5 v4 m-2 -2 h4" /></svg>
        Exclusive Partner Offers
      </h2>
      <p class="subheading">Claim your rewards across top lifestyle and electronics brands.</p>
    </div>

    <div class="offers-search-bar">
      <span class="search-icon-svg">🔍</span>
      <input type="text" class="offers-search-input" id="offers-search" placeholder="Search brand (Myntra, KFC, Swiggy, Ajio)...">
    </div>

    <div class="offer-category-pills">
      <button class="category-pill active" data-cat="ALL">All Offers</button>
      <button class="category-pill" data-cat="Shopping">Shopping</button>
      <button class="category-pill" data-cat="Food">Food & Dining</button>
      <button class="category-pill" data-cat="Home & Living">Home & Living</button>
      <button class="category-pill" data-cat="Online">Online</button>
      <button class="category-pill" data-cat="Online + Offline">Online + Offline</button>
    </div>

    <div class="offers-grid" id="offers-grid-container"></div>
  `;

  const gridContainer = wrapper.querySelector('#offers-grid-container');
  const searchInput = wrapper.querySelector('#offers-search');
  const categoryPills = wrapper.querySelectorAll('.category-pill');

  let activeCategory = 'ALL';
  let searchQuery = '';

  function renderGrid() {
    gridContainer.innerHTML = '';

    const filtered = BRAND_OFFERS.filter(offer => {
      const matchesSearch = offer.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            offer.offerTitle.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCat = activeCategory === 'ALL' || 
                         offer.category === activeCategory || 
                         offer.channel === activeCategory;

      return matchesSearch && matchesCat;
    });

    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div class="my-offers-empty" style="grid-column: 1 / -1;">
          <div class="empty-icon">🔍</div>
          <h3>No matching offers found</h3>
          <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 4px;">Try searching for another brand or clearing your search term.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(offer => {
      const card = document.createElement('div');
      card.className = 'offer-card';

      card.innerHTML = `
        <div class="offer-card-head">
          <div class="brand-logo-badge">${offer.brandInitials}</div>
          <div class="offer-brand-details">
            <span class="brand-name">${offer.brandName}</span>
            <h3 class="offer-title">${offer.offerTitle}</h3>
          </div>
        </div>

        <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 6px 0;">
          ${offer.offerDescription}
        </p>

        <div style="margin-bottom: 8px;">
          <span class="channel-tag">
            ${offer.channel === 'Online + Offline' ? '🏬 Online + Store' : '🌐 Online Only'}
          </span>
        </div>

        <div class="offer-card-foot">
          <div class="coupon-preview-box">••••••••</div>
          <button class="btn-primary view-offer-btn" style="font-size: 0.78rem; padding: 6px 14px;">
            Get Offer
          </button>
        </div>
      `;

      card.querySelector('.view-offer-btn').addEventListener('click', () => {
        const session = getSession();
        if (!session.isAuthenticated) {
          openOtpModal(() => {
            trackGa4Event(GA4_EVENTS.OFFER_CARD_VIEWED, {
              brand: offer.brandName,
              deal_id: offer.dealId
            });
            openRewardModal(offer);
          });
          return;
        }

        trackGa4Event(GA4_EVENTS.OFFER_CARD_VIEWED, {
          brand: offer.brandName,
          deal_id: offer.dealId
        });
        openRewardModal(offer);
      });

      gridContainer.appendChild(card);
    });
  }

  // Filter Listeners
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderGrid();
  });

  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.getAttribute('data-cat');
      renderGrid();
    });
  });

  renderGrid();
  container.appendChild(wrapper);
}
