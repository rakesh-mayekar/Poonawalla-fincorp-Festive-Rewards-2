// Common Reward Redemption Screen Modal Component SOT v1.3 Section 5 & Section 13.2
import { trackGa4Event, GA4_EVENTS } from '../services/gaService.js';

export function openRewardModal(deal) {
  const container = document.querySelector('#reward-modal-container');
  if (!container) return;

  container.innerHTML = `
    <div class="modal-backdrop active" id="reward-modal-backdrop">
      <div class="modal-card reward-reveal-card">
        <button class="modal-close-btn" id="reward-close-btn">&times;</button>
        
        <div class="reward-brand-logo-large">
          ${deal.brandInitials}
        </div>

        <span class="festive-tag tag-green" style="margin-bottom: 8px;">🎁 Reward Unlocked!</span>

        <h3 class="reward-offer-title">${deal.offerTitle}</h3>
        <p class="reward-offer-desc">${deal.offerDescription}</p>

        <!-- Coupon Code Box -->
        <div class="coupon-display-box">
          <span class="coupon-code-text" id="modal-coupon-code">${deal.couponCode}</span>
          <button class="copy-btn" id="copy-coupon-btn">
            <span>📋</span> Copy Code
          </button>
        </div>

        <!-- Redemption Steps -->
        <div class="redemption-steps-box">
          <div class="redemption-steps-title">
            Channel: ${deal.channel === 'Online + Offline' ? '🏬 Online & Store Counter' : '🌐 Online Only'}
          </div>
          <div style="white-space: pre-line;">${deal.redemptionInstructions}</div>
        </div>

        <details style="text-align: left; font-size: 0.72rem; color: var(--text-muted); margin-bottom: 16px;">
          <summary style="cursor: pointer; color: var(--text-gold); font-weight: 600;">Terms & Conditions</summary>
          <p style="margin-top: 6px;">${deal.termsAndConditions}</p>
        </details>

        <a href="${deal.redemptionUrl}" target="_blank" rel="noopener noreferrer" class="btn-gold glow-effect" style="width: 100%; padding: 12px;">
          Redeem Offer Now ↗
        </a>
      </div>
    </div>

    <div class="toast-notification" id="toast-notif">✓ Coupon code copied to clipboard!</div>
  `;

  const backdrop = container.querySelector('#reward-modal-backdrop');
  const closeBtn = container.querySelector('#reward-close-btn');
  const copyBtn = container.querySelector('#copy-coupon-btn');
  const toast = container.querySelector('#toast-notif');

  const closeModal = () => {
    backdrop.classList.remove('active');
    setTimeout(() => { container.innerHTML = ''; }, 300);
  };

  closeBtn.addEventListener('click', closeModal);

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(deal.couponCode).then(() => {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);

      trackGa4Event(GA4_EVENTS.COUPON_COPIED, {
        deal_id: deal.dealId,
        brand: deal.brandName
      });
    }).catch(() => {
      alert(`Coupon code: ${deal.couponCode}`);
    });
  });
}
