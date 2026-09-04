// My Offers Component
import { BRAND_OFFERS } from '../data/offersData.js';
import { trackGa4Event, GA4_EVENTS } from '../services/gaService.js';
import { getUserRewards } from '../state/rewardState.js';
import { openRewardModal } from './rewardModal.js';
import { renderTopOffersSection } from './topOffersScroller.js';

export function renderMyOffersSection(container, onNavigate) {
  const wrapper = document.createElement('div');
  wrapper.className = 'offers-page-container section-wrapper';

  trackGa4Event(GA4_EVENTS.MY_OFFERS_VIEWED);

  const userRewards = getUserRewards();
  const claims = userRewards.claims || {};
  const claimedDealIds = Object.values(claims).map(c => c.dealId);

  const claimedDeals = BRAND_OFFERS.filter(offer => claimedDealIds.includes(offer.dealId));

  wrapper.innerHTML = `
    <div class="section-header align-left" style="margin-bottom: 32px;">
      <span class="section-kicker" style="color: var(--wf-text-secondary); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">• REWARD VAULT</span>
      <h2 style="margin-top: 4px;">
        <svg class="section-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
        My Claimed <span style="font-style: italic; font-weight: 500; color: var(--wf-text-secondary); margin-left: 6px;">Offers</span>
      </h2>
      <p class="subheading">Access and redeem the vouchers you've won from our Festive Campaign activities.</p>
    </div>

    ${claimedDeals.length === 0 ? `
      <div class="my-offers-empty" style="background: var(--wf-surface); border: 1px dashed var(--wf-border); padding: 56px 24px; border-radius: var(--radius-lg); text-align: center; max-width: 650px; margin: 0 auto 48px auto; box-shadow: var(--shadow-sm);">
        <div class="empty-icon" style="font-size: 4rem; margin-bottom: 16px;">🎁</div>
        <h3 style="font-size: 1.5rem; color: var(--wf-text-primary); margin-bottom: 12px;">Your Reward Wallet is Empty</h3>
        <p style="font-size: 1rem; color: var(--wf-text-secondary); margin-bottom: 28px; line-height: 1.5;">
          You haven't claimed any festive rewards yet. Play our festive games, check your CIBIL score for free, or calculate EMIs to unlock brand vouchers right now!
        </p>
        <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
          <button class="btn-primary" id="myoffers-play-btn" style="padding: 14px 32px; font-size: 1rem;">
            🎰 Play & Win Rewards
          </button>
          <a href="#cibil" id="myoffers-cibil-btn" class="btn-secondary" style="padding: 14px 32px; font-size: 1rem; display: inline-flex; align-items: center; justify-content: center;">
            📊 Check CIBIL
          </a>
        </div>
      </div>
    ` : `
      <div class="offers-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; margin-bottom: 48px;">
        ${claimedDeals.map(offer => `
          <div class="offer-card" style="background: var(--wf-surface); border: 1px solid #10B981; border-radius: var(--radius-md); padding: 20px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.08);">
            <div class="offer-card-head" style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
              <div class="brand-logo-badge" style="width: 44px; height: 44px; border-radius: 8px; background: rgba(16, 185, 129, 0.1); color: #065F46; font-weight: 800; display: flex; align-items: center; justify-content: center;">${offer.brandInitials}</div>
              <div class="offer-brand-details" style="flex: 1;">
                <span class="brand-name" style="font-size: 0.8rem; font-weight: 700; color: #065F46; text-transform: uppercase;">${offer.brandName}</span>
                <h3 class="offer-title" style="font-size: 0.95rem; font-weight: 700; margin-top: 2px;">${offer.offerTitle}</h3>
              </div>
            </div>

            <p style="font-size: 0.82rem; color: var(--wf-text-secondary); margin: 0 0 16px 0; line-height: 1.4;">
              ${offer.offerDescription}
            </p>

            <div class="offer-card-foot" style="display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px dashed var(--wf-border);">
              <div class="coupon-preview-box" style="font-family: var(--font-mono); font-size: 0.85rem; font-weight: 700; color: #10B981;">${offer.couponCode}</div>
              <button class="btn-primary my-offer-view-btn" data-deal-id="${offer.dealId}" style="font-size: 0.8rem; padding: 6px 16px;">
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

  const cibilBtn = wrapper.querySelector('#myoffers-cibil-btn');
  if (cibilBtn) {
    cibilBtn.addEventListener('click', (e) => {
      e.preventDefault();
      onNavigate('cibil');
    });
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

  // Render Top Offers at the bottom of My Offers page
  renderTopOffersSection(container, onNavigate, {
    title: 'Top Offers For You',
    showHeading: true,
    isBottomSection: true
  });
}
