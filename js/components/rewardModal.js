// Common Reward Redemption Screen Modal Component SOT v4.0
// Client Requirement: "Once a user lands on the page and clicks any Call to Action (CTA), give him force to regester and remove after playing game login flow"
// Since registration is completed upfront, the reward modal now directly displays the full unlocked voucher code with zero post-game login friction.

import { trackGa4Event, GA4_EVENTS } from '../services/gaService.js';
import { getSession } from '../state/sessionState.js';
import { saveRewardClaim } from '../state/rewardState.js';
import { sendLeadToLeadSquared } from '../services/crmService.js';
import { showWhatsAppNotification } from '../services/whatsappService.js';

export function openRewardModal(deal, options = {}) {
  const container = document.querySelector('#reward-modal-container');
  if (!container) return;

  const session = getSession();
  const userMobile = session && session.mobile ? session.mobile : '';
  const fullCode = deal.couponCode || 'PFIN-FESTIVE-GIFT';
  const activityKey = options.activityKey || 'play_and_win';

  // Automatically trigger simulated WhatsApp voucher delivery
  showWhatsAppNotification({
    title: 'Festive Reward Voucher Unlocked!',
    recipient: userMobile,
    message: `Congratulations! Your ${deal.brandName || 'Brand'} festive voucher for ${deal.offerTitle} has been claimed. Code: ${fullCode}. Redeem now!`,
    voucherCode: fullCode,
    brand: deal.brandName || 'Festive Partner'
  });

  container.innerHTML = `
    <div class="modal-backdrop active" id="reward-modal-backdrop">
      <div class="modal-card reward-reveal-card">
        <button class="modal-close-btn" id="reward-close-btn" aria-label="Close modal">&times;</button>
        
        <div class="reward-brand-logo-large">
          ${deal.brandInitials || (deal.brandName ? deal.brandName.charAt(0) : 'PF')}
        </div>

        <span class="festive-tag tag-green" id="modal-festive-tag" style="margin-bottom: 8px; display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0; border-radius: 9999px; font-size: 0.78rem; font-weight: 700;">
          <span>🎁</span> Reward Unlocked!
        </span>

        <h3 class="reward-offer-title" style="font-size: 1.35rem; font-weight: 800; color: var(--wf-text-primary); margin: 6px 0 4px;">${deal.offerTitle}</h3>
        <p class="reward-offer-desc" style="font-size: 0.88rem; color: var(--wf-text-secondary); margin-bottom: 16px;">${deal.offerDescription}</p>

        <!-- Unlocked Coupon Code Box -->
        <div class="coupon-display-box" id="coupon-box-wrapper" style="background: var(--wf-surface-subtle); border: 1px dashed var(--wf-border-dark); border-radius: var(--radius-md); padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
          <div class="coupon-code-meta" style="text-align: left;">
            <span style="display: block; font-size: 0.72rem; color: var(--wf-text-secondary); text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">Voucher Code</span>
            <span class="coupon-code-text" id="modal-coupon-code" style="font-family: var(--font-mono); font-size: 1.25rem; font-weight: 800; letter-spacing: 0.08em; color: var(--wf-text-primary);">${fullCode}</span>
          </div>
          <button class="copy-btn" id="copy-coupon-btn" style="background: #111827; color: #FFFFFF; border: none; border-radius: var(--radius-sm); padding: 8px 16px; font-size: 0.82rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: background 0.15s;">
            <span id="copy-btn-icon">📋</span> 
            <span id="copy-btn-label">Copy Code</span>
          </button>
        </div>

        <!-- WhatsApp Delivery Status Banner -->
        <div id="modal-whatsapp-banner" style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; display: flex; align-items: center; gap: 10px; text-align: left;">
          <span style="font-size: 1.3rem;">💬</span>
          <div style="font-size: 0.78rem; color: #166534; line-height: 1.4;">
            <strong>Sent to your WhatsApp:</strong> Voucher code & redemption details shared to <strong id="whatsapp-sent-number">+91 ${userMobile ? userMobile.replace(/(\d{5})(\d{5})/, '$1 $2') : 'Registered Mobile'}</strong>.
          </div>
        </div>

        <!-- Redemption Details -->
        <div class="redemption-steps-box" id="modal-redemption-steps" style="background: #FFFFFF; border: 1px solid var(--wf-border); border-radius: var(--radius-sm); padding: 12px 14px; text-align: left; margin-bottom: 14px; font-size: 0.8rem; color: var(--wf-text-secondary);">
          <div class="redemption-steps-title" style="font-weight: 700; color: var(--wf-text-primary); margin-bottom: 4px;">
            Channel: ${deal.channel === 'Online + Offline' ? '🏬 Online & Store Counter' : '🌐 Online Only'}
          </div>
          <div style="white-space: pre-line; line-height: 1.4;">${deal.redemptionInstructions || '1. Copy your voucher code above.\n2. Click the redeem link below to visit the brand store.\n3. Apply the code at checkout to claim your discount.'}</div>
        </div>

        <details style="text-align: left; font-size: 0.72rem; color: var(--wf-text-secondary); margin-bottom: 18px;">
          <summary style="cursor: pointer; color: var(--wf-text-primary); font-weight: 600;">Terms & Conditions</summary>
          <p style="margin-top: 6px; line-height: 1.4;">${deal.termsAndConditions || 'Offer valid during the festive campaign period. Single use per customer. Cannot be combined with other promotional codes.'}</p>
        </details>

        <div class="modal-action-buttons-wrap" style="display: flex; flex-direction: column; gap: 10px;">
          <a href="${deal.redemptionUrl || '#'}" target="_blank" rel="noopener noreferrer" class="btn-primary" id="modal-redeem-link" style="width: 100%; padding: 12px; display: block; text-align: center; text-decoration: none; font-weight: 700; border-radius: var(--radius-sm); background: #111827; color: #FFFFFF;">
            Redeem Offer on Partner Site &rarr;
          </a>

          <button type="button" id="modal-share-wa-btn" class="btn-secondary" style="width: 100%; padding: 10px; font-size: 0.85rem; display: flex; align-items: center; justify-content: center; gap: 8px; background: #FFFFFF; border: 1px solid var(--wf-border); color: #111827; font-weight: 600; border-radius: var(--radius-sm); cursor: pointer;">
            <span>💬 Share via WhatsApp</span>
          </button>
        </div>
      </div>
    </div>

    <div class="toast-notification" id="toast-notif">✓ Coupon code copied to clipboard!</div>
  `;

  const backdrop = container.querySelector('#reward-modal-backdrop');
  const closeBtn = container.querySelector('#reward-close-btn');
  const copyBtn = container.querySelector('#copy-coupon-btn');
  const toast = container.querySelector('#toast-notif');
  const shareWaBtn = container.querySelector('#modal-share-wa-btn');

  const closeModal = () => {
    backdrop.classList.remove('active');
    setTimeout(() => {
      container.innerHTML = '';
      if (options.onVerified) options.onVerified();
    }, 250);
  };

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  // Copy Coupon Code Handler
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(fullCode).then(() => {
      toast.classList.add('show');
      copyBtn.innerHTML = '<span>✓</span> <span>Copied!</span>';
      setTimeout(() => {
        toast.classList.remove('show');
        copyBtn.innerHTML = '<span>📋</span> <span>Copy Code</span>';
      }, 2500);
    }).catch(() => {
      toast.textContent = 'Code: ' + fullCode;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);
    });

    trackGa4Event(GA4_EVENTS.COUPON_COPIED, { deal_id: deal.dealId, code: fullCode });
  });

  // Share via WhatsApp Handler
  if (shareWaBtn) {
    shareWaBtn.addEventListener('click', () => {
      const shareText = encodeURIComponent(`🎉 I just won an exclusive ${deal.brandName || 'Festive'} voucher: ${deal.offerTitle}! Use code: ${fullCode} at checkout. Claim yours at Poonawalla Fincorp Festive Rewards!`);
      window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
      trackGa4Event(GA4_EVENTS.SHARE_CLICKED, { channel: 'whatsapp', deal_id: deal.dealId });
    });
  }
}
