// Refer & Earn Section Component SOT v1.3 Section 4.4
import { buildUtmUrl } from '../data/loansData.js';
import { trackGa4Event, GA4_EVENTS } from '../services/gaService.js';
import { sendLeadToLeadSquared } from '../services/crmService.js';
import { getSession } from '../state/sessionState.js';

export function renderReferSection(container) {
  const wrapper = document.createElement('div');
  wrapper.className = 'loans-container';

  const baseReferralUrl = 'https://referral.poonawallafincorp.com/';
  const finalReferralUrl = buildUtmUrl(baseReferralUrl, 'refer-earn');

  wrapper.innerHTML = `
    <div class="loans-header">
      <div class="festive-badge-pill" style="margin-bottom: 8px;">🤝 Customer Referral Program</div>
      <h2 class="loans-title festive-heading">Refer Friends & Earn Cash Rewards!</h2>
      <p class="loans-subtitle">Spread the festive joy! Refer your family & friends for Poonawalla Fincorp loans and get attractive cash vouchers for every disbursed loan.</p>
    </div>

    <div class="game-card-wrapper" style="margin: 0 0 20px;">
      <div style="font-size: 3rem; margin-bottom: 10px;">🎁</div>
      <h3 style="font-size: 1.2rem; color: var(--text-gold); margin-bottom: 8px;">How Refer & Earn Works</h3>
      
      <div style="text-align: left; display: flex; flex-direction: column; gap: 12px; margin: 16px 0; font-size: 0.85rem; color: var(--text-secondary);">
        <div style="display: flex; gap: 10px; align-items: flex-start;">
          <span style="background: var(--pfl-red); color: white; border-radius: 50%; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">1</span>
          <span>Tap <strong>"Refer Now"</strong> to visit Poonawalla's official referral portal.</span>
        </div>
        <div style="display: flex; gap: 10px; align-items: flex-start;">
          <span style="background: var(--pfl-red); color: white; border-radius: 50%; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">2</span>
          <span>Enter your friend's contact details & required loan product.</span>
        </div>
        <div style="display: flex; gap: 10px; align-items: flex-start;">
          <span style="background: var(--pfl-red); color: white; border-radius: 50%; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">3</span>
          <span>Earn guaranteed cash rewards transferred directly upon loan sanction!</span>
        </div>
      </div>

      <a href="${finalReferralUrl}" target="_blank" rel="noopener noreferrer" class="btn-gold glow-effect" id="refer-now-cta" style="width: 100%; padding: 14px; font-size: 1.05rem;">
        🚀 Refer Now ↗
      </a>
    </div>
  `;

  wrapper.querySelector('#refer-now-cta').addEventListener('click', () => {
    const session = getSession();
    trackGa4Event(GA4_EVENTS.REFER_EARN_REDIRECT_CLICKED);

    sendLeadToLeadSquared({
      mobileNumber: session.mobile || 'Guest / Direct Click',
      activityType: 'Refer & Earn Portal Redirect',
      contentSlug: 'refer-earn'
    });
  });

  container.appendChild(wrapper);
}
