// Refer & Earn Section Component SOT v1.3 Section 4.4
import { buildUtmUrl } from '../data/loansData.js';
import { trackGa4Event, GA4_EVENTS } from '../services/gaService.js';
import { sendLeadToLeadSquared } from '../services/crmService.js';
import { getSession } from '../state/sessionState.js';

export function renderReferSection(container) {
  const wrapper = document.createElement('div');
  wrapper.className = 'loans-container section-wrapper';

  const baseReferralUrl = 'https://referral.poonawallafincorp.com/';
  const finalReferralUrl = buildUtmUrl(baseReferralUrl, 'refer-earn');

  wrapper.innerHTML = `
    <div class="loans-header" style="text-align: center; margin-bottom: 32px;">
      <div class="festive-badge-pill" style="margin-bottom: 12px; display: inline-block;">🤝 Customer Referral Program</div>
      <h2 class="loans-title festive-heading">Refer Friends & Earn Cash Rewards!</h2>
      <p class="loans-subtitle" style="max-width: 600px; margin: 0 auto;">Spread the festive joy! Refer your family & friends for Poonawalla Fincorp loans and get attractive cash vouchers for every disbursed loan.</p>
    </div>

    <div style="background: var(--wf-surface); padding: 32px; border-radius: var(--radius-lg); border: 1px solid var(--wf-border); box-shadow: var(--shadow-sm); max-width: 800px; margin: 0 auto;">
      <h3 style="font-size: 1.4rem; color: var(--wf-text-primary); margin-bottom: 24px; text-align: center;">How Refer & Earn Works</h3>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; margin-bottom: 32px;">
        <div style="text-align: center;">
          <div style="background: var(--color-primary); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.2rem; margin: 0 auto 16px auto;">1</div>
          <h4 style="font-size: 1.05rem; margin-bottom: 8px;">Refer Now</h4>
          <p style="font-size: 0.9rem; color: var(--wf-text-secondary);">Tap the button below to visit our official referral portal.</p>
        </div>
        
        <div style="text-align: center;">
          <div style="background: var(--color-primary); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.2rem; margin: 0 auto 16px auto;">2</div>
          <h4 style="font-size: 1.05rem; margin-bottom: 8px;">Enter Details</h4>
          <p style="font-size: 0.9rem; color: var(--wf-text-secondary);">Provide your friend's contact information and loan requirement.</p>
        </div>
        
        <div style="text-align: center;">
          <div style="background: var(--color-primary); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.2rem; margin: 0 auto 16px auto;">3</div>
          <h4 style="font-size: 1.05rem; margin-bottom: 8px;">Earn Rewards</h4>
          <p style="font-size: 0.9rem; color: var(--wf-text-secondary);">Get guaranteed cash rewards directly upon loan sanction!</p>
        </div>
      </div>

      <div style="text-align: center; border-top: 1px solid var(--wf-border); padding-top: 24px;">
        <a href="${finalReferralUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" id="refer-now-cta" style="padding: 16px 40px; font-size: 1.1rem; display: inline-block;">
          🚀 Start Referring Now
        </a>
      </div>
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
