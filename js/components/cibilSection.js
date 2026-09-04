// Check CIBIL Component (Direct Official Brand Redirect - No Coupons/Offers)
import { buildUtmUrl } from '../data/loansData.js';
import { trackGa4Event, GA4_EVENTS } from '../services/gaService.js';
import { sendLeadToLeadSquared } from '../services/crmService.js';
import { getSession } from '../state/sessionState.js';
import { renderTopOffersSection } from './topOffersScroller.js';

export function renderCibilSection(container, onNavigate) {
  const wrapper = document.createElement('div');
  wrapper.className = 'loans-container section-wrapper';

  const baseCibilUrl = 'https://poonawallafincorp.com/credit-score/check-cibil-score';
  const finalCibilUrl = buildUtmUrl(baseCibilUrl, 'cibil-check');

  wrapper.innerHTML = `
    <div class="section-header align-left">
      <span class="section-kicker" style="color: var(--wf-text-secondary); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">• OFFICIAL CREDIT HEALTH</span>
      <h2 style="margin-top: 4px;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="section-icon"><path d="M11 4C11 8.5 7.5 11 4 11C7.5 11 11 13.5 11 18C11 13.5 14.5 11 19 11C14.5 11 11 8.5 11 4Z" /><circle cx="6" cy="17" r="1.5" /><path d="M18 5 v4 m-2 -2 h4" /></svg>
        Check CIBIL <span style="font-style: italic; font-weight: 500; color: var(--wf-text-secondary); margin-left: 6px;">Score</span>
      </h2>
      <p class="subheading">Check your official credit score instantly without impacting your credit rating on the Poonawalla Fincorp official portal.</p>
    </div>

    <!-- Prominent FREE Tag above the Card -->
    <div style="max-width: 800px; margin: 0 auto 12px auto; display: flex; justify-content: flex-start;">
      <span class="prominent-free-badge" style="background: #10B981; color: #FFFFFF; font-weight: 800; font-size: 0.85rem; letter-spacing: 0.08em; padding: 6px 16px; border-radius: 4px; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 8px rgba(16, 185, 129, 0.25);">
        ✨ 100% FREE OFFICIAL CHECK
      </span>
    </div>

    <div class="cibil-main-card" style="background: var(--wf-surface); padding: 40px 32px; border-radius: var(--radius-lg); border: 1px solid var(--wf-border); box-shadow: var(--shadow-sm); max-width: 800px; margin: 0 auto 48px auto; text-align: center;">
      <div style="font-size: 3.5rem; margin-bottom: 12px;">📈</div>
      
      <h3 style="font-size: 1.6rem; color: var(--wf-text-primary); margin-bottom: 8px;">Check Your Official CIBIL Report</h3>
      <p style="font-size: 0.95rem; color: var(--wf-text-secondary); max-width: 580px; margin: 0 auto 28px auto; line-height: 1.5;">
        Get an instant credit score analysis with complete report breakdown and unlock pre-approved festive loan interest rates directly on the official brand website.
      </p>

      <!-- Score Range Visualizer -->
      <div style="background: var(--wf-surface-subtle); border: 1px solid var(--wf-border); border-radius: var(--radius-md); padding: 20px 24px; margin-bottom: 28px; text-align: left;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <span style="font-size: 0.85rem; font-weight: 700; color: var(--wf-text-primary);">Credit Score Range:</span>
          <span style="font-size: 0.82rem; font-weight: 700; color: #10B981;">750+ Unlocks Best Rates</span>
        </div>
        <div style="height: 10px; border-radius: 6px; background: linear-gradient(to right, #EF4444 0%, #F59E0B 35%, #10B981 70%, #047857 100%); width: 100%; margin-bottom: 6px;"></div>
        <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--wf-text-secondary);">
          <span>300 (Poor)</span>
          <span>650 (Fair)</span>
          <span>750 (Good)</span>
          <span>900 (Excellent)</span>
        </div>
      </div>

      <!-- Action Area -->
      <div style="display: flex; flex-direction: column; gap: 14px; align-items: center;">
        <a href="${finalCibilUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary glow-effect" id="check-cibil-cta" style="padding: 16px 48px; font-size: 1.1rem; border-radius: var(--radius-sm); display: inline-flex; align-items: center; gap: 10px; text-decoration: none;">
          🔍 Check CIBIL Score on Official Site ↗
        </a>

        <p style="font-size: 0.8rem; color: var(--wf-text-secondary); margin: 0;">
          No credit score impact • 100% Free & Secure RBI Regulated Channel
        </p>
      </div>

      <!-- Feature Highlights -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-top: 36px; padding-top: 28px; border-top: 1px solid var(--wf-border); text-align: left;">
        <div style="display: flex; align-items: flex-start; gap: 10px;">
          <span style="color: #10B981; font-weight: bold; font-size: 1.1rem;">✓</span>
          <div>
            <strong style="font-size: 0.85rem; display: block; color: var(--wf-text-primary);">Zero Credit Impact</strong>
            <span style="font-size: 0.78rem; color: var(--wf-text-secondary);">Soft credit check does not lower your rating</span>
          </div>
        </div>
        <div style="display: flex; align-items: flex-start; gap: 10px;">
          <span style="color: #10B981; font-weight: bold; font-size: 1.1rem;">✓</span>
          <div>
            <strong style="font-size: 0.85rem; display: block; color: var(--wf-text-primary);">Instant Detailed Report</strong>
            <span style="font-size: 0.78rem; color: var(--wf-text-secondary);">Clear insights into active accounts & payments</span>
          </div>
        </div>
        <div style="display: flex; align-items: flex-start; gap: 10px;">
          <span style="color: #10B981; font-weight: bold; font-size: 1.1rem;">✓</span>
          <div>
            <strong style="font-size: 0.85rem; display: block; color: var(--wf-text-primary);">Pre-Approved Offers</strong>
            <span style="font-size: 0.78rem; color: var(--wf-text-secondary);">Unlock best festive rates based on score</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // CIBIL CTA Click: Directs to CIBIL check on official brand portal
  const cibilCta = wrapper.querySelector('#check-cibil-cta');
  if (cibilCta) {
    cibilCta.addEventListener('click', () => {
      const session = getSession();
      trackGa4Event(GA4_EVENTS.CIBIL_REDIRECT_CLICKED);

      sendLeadToLeadSquared({
        mobileNumber: session.mobile || 'Guest / Direct Click',
        activityType: 'CIBIL Check Redirect to Official Brand Site',
        contentSlug: 'cibil-check'
      });
    });
  }

  container.appendChild(wrapper);

  // Render Top Offers at the bottom of Check CIBIL page
  renderTopOffersSection(container, onNavigate, {
    title: 'Top Offers For You',
    showHeading: true,
    isBottomSection: true
  });
}
