// Sticky Bottom Offers Bar Component SOT v1.3 Section 4.8
import { BRAND_OFFERS } from '../data/offersData.js';
import { trackGa4Event, GA4_EVENTS } from '../services/gaService.js';
import { getSession } from '../state/sessionState.js';
import { openOtpModal } from './otpModal.js';
import { openRewardModal } from './rewardModal.js';

export function renderStickyOffers(container) {
  const bar = document.createElement('div');
  bar.className = 'sticky-offers-bar';

  bar.innerHTML = `
    <div class="sticky-bar-header">
      <span class="sticky-bar-title">
        <span>🔥</span> Top Offers For You
      </span>
      <span style="font-size: 0.7rem; color: var(--text-muted);">Scroll & Tap to Unlock →</span>
    </div>

    <div class="sticky-offers-scroll">
      ${BRAND_OFFERS.slice(0, 6).map(deal => `
        <div class="sticky-offer-chip" data-deal-id="${deal.dealId}">
          <div class="chip-brand-logo">${deal.brandInitials}</div>
          <div class="chip-info">
            <div class="chip-brand-name">${deal.brandName}</div>
            <div class="chip-offer-title">${deal.offerTitle}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // Attach Chip Click Handlers
  const chips = bar.querySelectorAll('.sticky-offer-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const dealId = chip.getAttribute('data-deal-id');
      const deal = BRAND_OFFERS.find(d => d.dealId === dealId);
      if (!deal) return;

      const session = getSession();
      if (!session.isAuthenticated) {
        openOtpModal(() => {
          trackGa4Event(GA4_EVENTS.OFFER_CARD_VIEWED, {
            brand: deal.brandName,
            deal_id: deal.dealId
          });
          openRewardModal(deal);
        });
        return;
      }

      trackGa4Event(GA4_EVENTS.OFFER_CARD_VIEWED, {
        brand: deal.brandName,
        deal_id: deal.dealId
      });
      openRewardModal(deal);
    });
  });

  container.appendChild(bar);
}
