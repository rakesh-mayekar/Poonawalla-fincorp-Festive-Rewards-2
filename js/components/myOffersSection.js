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
    <div class="section-header align-left" style="margin-bottom: 32px;">
      <h2>
        <svg class="section-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
        My Claimed Offers
      </h2>
      <p class="subheading">Access and redeem the vouchers you've won from the Festive Campaign.</p>
    </div>

    ${claimedDeals.length === 0 ? `
      <div class="my-offers-empty" style="background: var(--wf-surface); border: 1px dashed var(--wf-border); padding: 48px 24px; border-radius: var(--radius-lg); text-align: center; max-width: 600px; margin: 0 auto;">
        <div class="empty-icon" style="font-size: 4rem; margin-bottom: 16px;">🎁</div>
        <h3 style="font-size: 1.5rem; color: var(--wf-text-primary); margin-bottom: 12px;">Your Reward Wallet is Empty</h3>
        <p style="font-size: 1rem; color: var(--wf-text-secondary); margin-bottom: 24px;">
          You haven't claimed any festive rewards yet. Play our festive games or use our free utilities to unlock exclusive brand vouchers right now!
        </p>
        <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
          <button class="btn-primary" id="myoffers-play-btn" style="padding: 12px 32px; font-size: 1.05rem;">
            🎰 Play Games & Win
          </button>
          <a href="#cibil" class="btn-secondary" style="padding: 12px 32px; font-size: 1.05rem; display: inline-flex; align-items: center; justify-content: center;">
            📈 Check Free CIBIL
          </a>
        </div>
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
              <button class="btn-primary my-offer-view-btn" data-deal-id="${offer.dealId}" style="font-size: 0.78rem; padding: 6px 14px;">
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
