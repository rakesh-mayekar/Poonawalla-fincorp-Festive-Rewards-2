// Refer & Earn Section Component
import { buildUtmUrl } from '../data/loansData.js';
import { trackGa4Event, GA4_EVENTS } from '../services/gaService.js';
import { sendLeadToLeadSquared } from '../services/crmService.js';
import { getSession } from '../state/sessionState.js';
import { renderTopOffersSection } from './topOffersScroller.js';

export function renderReferSection(container, onNavigate) {
  const wrapper = document.createElement('div');
  wrapper.className = 'loans-container section-wrapper';

  const baseReferralUrl = 'https://referral.poonawallafincorp.com/';
  const finalReferralUrl = buildUtmUrl(baseReferralUrl, 'refer-earn');

  wrapper.innerHTML = `
    <div class="section-header align-left">
      <span class="section-kicker" style="color: var(--wf-text-secondary); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">• CUSTOMER REFERRAL INITIATIVE</span>
      <h2 style="margin-top: 4px;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="section-icon"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        Refer & <span style="font-style: italic; font-weight: 500; color: var(--wf-text-secondary); margin-left: 6px;">Earn</span>
      </h2>
      <p class="subheading">Spread the festive joy! Refer your family & friends for Poonawalla Fincorp loans and get attractive cash vouchers for every disbursed loan.</p>
    </div>

    <div style="background: var(--wf-surface); padding: 36px; border-radius: var(--radius-lg); border: 1px solid var(--wf-border); box-shadow: var(--shadow-sm); max-width: 800px; margin: 0 auto 48px auto;">
      <h3 style="font-size: 1.4rem; color: var(--wf-text-primary); margin-bottom: 28px; text-align: center;">How Refer & Earn Works</h3>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; margin-bottom: 36px;">
        <div style="text-align: center; padding: 12px;">
          <div style="background: #111111; color: white; width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.1rem; margin: 0 auto 16px auto;">1</div>
          <h4 style="font-size: 1.05rem; margin-bottom: 8px;">Refer Friends</h4>
          <p style="font-size: 0.88rem; color: var(--wf-text-secondary); margin: 0;">Tap below to visit our official secure referral portal.</p>
        </div>
        
        <div style="text-align: center; padding: 12px; border-left: 1px solid var(--wf-border); border-right: 1px solid var(--wf-border);">
          <div style="background: #111111; color: white; width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.1rem; margin: 0 auto 16px auto;">2</div>
          <h4 style="font-size: 1.05rem; margin-bottom: 8px;">Enter Details</h4>
          <p style="font-size: 0.88rem; color: var(--wf-text-secondary); margin: 0;">Provide contact details and requirement of your referee.</p>
        </div>
        
        <div style="text-align: center; padding: 12px;">
          <div style="background: #111111; color: white; width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.1rem; margin: 0 auto 16px auto;">3</div>
          <h4 style="font-size: 1.05rem; margin-bottom: 8px;">Earn Rewards</h4>
          <p style="font-size: 0.88rem; color: var(--wf-text-secondary); margin: 0;">Receive guaranteed cash vouchers directly upon loan sanction!</p>
        </div>
      </div>

      <div style="text-align: center; border-top: 1px solid var(--wf-border); padding-top: 28px;">
        <a href="${finalReferralUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" id="refer-now-cta" style="padding: 16px 48px; font-size: 1.1rem; display: inline-flex; align-items: center; gap: 8px; border-radius: var(--radius-sm);">
          🚀 Start Referring Now ↗
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

  // Render Top Offers at the bottom of Refer & Earn page
  renderTopOffersSection(container, onNavigate, {
    title: 'Top Offers For You',
    showHeading: true,
    isBottomSection: true
  });
}
