// My Offers Component SOT v1.3 Section 13.4
import { BRAND_OFFERS } from '../data/offersData.js';
import { trackGa4Event, GA4_EVENTS } from '../services/gaService.js';
import { getUserRewards } from '../state/rewardState.js';
import { openRewardModal } from './rewardModal.js';

export function renderMyOffersSection(container, onNavigate) {
  const wrapper = document.createElement('div');
  wrapper.className = 'offers-page-container';

  trackGa4Event(GA4_EVENTS.MY_OFFERS_VIEWED);

  const userRewards = getUserRewards();
  const claims = userRewards.claims || {};
  const claimedDealIds = Object.values(claims).map(c => c.dealId);

  const claimedDeals = BRAND_OFFERS.filter(offer => claimedDealIds.includes(offer.dealId));

  wrapper.innerHTML = `
    <div class="offers-header">
      <div class="festive-badge-pill" style="background: var(--pfl-red); color: white;">
        🎁 Wallet & Reward History
      </div>
      <h2 class="loans-title festive-heading">My Claimed Festive Rewards</h2>
      <p class="loans-subtitle">All your won coupon codes & brand partner vouchers in one place.</p>
    </div>

    ${claimedDeals.length === 0 ? `
      <div class="my-offers-empty">
        <div class="empty-icon">🎁</div>
        <h3>No Rewards Claimed Yet</h3>
        <p style="font-size: 0.82rem; color: var(--text-secondary); margin: 8px 0 16px;">
          Play festive games or explore EMI/PFIN sections to unlock exclusive coupon codes!
        </p>
        <button class="btn-gold" id="myoffers-play-btn">🎰 Play & Win Now</button>
      </div>
    ` : `
      <div class="offers-grid">
        ${claimedDeals.map(offer => `
          <div class="offer-card" style="border-color: var(--pfl-gold); background: linear-gradient(135deg, #1E293B 0%, rgba(255, 215, 0, 0.08) 100%);">
            <div class="offer-card-head">
              <div class="brand-logo-badge" style="border-color: var(--pfl-gold);">${offer.brandInitials}</div>
              <div class="offer-brand-details">
                <span class="brand-name" style="color: var(--text-gold);">${offer.brandName}</span>
                <h3 class="offer-title">${offer.offerTitle}</h3>
              </div>
            </div>

            <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 6px 0;">
              ${offer.offerDescription}
            </p>

            <div class="offer-card-foot">
              <div class="coupon-preview-box">${offer.couponCode}</div>
              <button class="btn-gold my-offer-view-btn" data-deal-id="${offer.dealId}" style="font-size: 0.78rem; padding: 6px 14px;">
                View Voucher 🎁
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `}
  `;

  const playBtn = wrapper.querySelector('#myoffers-play-btn');
  if (playBtn) {
    playBtn.addEventListener('click', () => onNavigate('games'));
  }

  const viewBtns = wrapper.querySelectorAll('.my-offer-view-btn');
  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const dealId = btn.getAttribute('data-deal-id');
      const targetOffer = BRAND_OFFERS.find(o => o.dealId === dealId);
      if (targetOffer) {
        openRewardModal(targetOffer);
      }
    });
  });

  container.appendChild(wrapper);
}
