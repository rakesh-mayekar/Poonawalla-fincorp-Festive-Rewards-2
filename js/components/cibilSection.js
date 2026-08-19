// Free CIBIL Check Component SOT v1.3 Section 4.5
import { buildUtmUrl } from '../data/loansData.js';
import { trackGa4Event, GA4_EVENTS } from '../services/gaService.js';
import { sendLeadToLeadSquared } from '../services/crmService.js';
import { getSession } from '../state/sessionState.js';
import { unlockCibilExtraSpin, getUserRewards } from '../state/rewardState.js';
import { openOtpModal } from './otpModal.js';

export function renderCibilSection(container, onNavigate) {
  const wrapper = document.createElement('div');
  wrapper.className = 'loans-container section-wrapper';

  const baseCibilUrl = 'https://poonawallafincorp.com/credit-score/check-cibil-score';
  const finalCibilUrl = buildUtmUrl(baseCibilUrl, 'cibil-check');

  const userRewards = getUserRewards();

  wrapper.innerHTML = `
    <div class="section-header">
      <div class="festive-badge-pill" style="margin-bottom: 12px; display: inline-block;">
        📊 100% Free Utility
      </div>
      <h2>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="section-icon"><path d="M11 4C11 8.5 7.5 11 4 11C7.5 11 11 13.5 11 18C11 13.5 14.5 11 19 11C14.5 11 11 8.5 11 4Z" /><circle cx="6" cy="17" r="1.5" /><path d="M18 5 v4 m-2 -2 h4" /></svg>
        Check Your Free CIBIL Score
      </h2>
      <p class="subheading">Check your credit score instantly without impacting your credit rating. Good credit scores unlock lower interest rates!</p>
    </div>

    <div style="background: var(--wf-surface); padding: 32px; border-radius: var(--radius-lg); border: 1px solid var(--wf-border); box-shadow: var(--shadow-sm); max-width: 800px; margin: 0 auto; text-align: center;">
      <div style="font-size: 3.5rem; margin-bottom: 16px;">📈</div>
      
      <div style="background: var(--wf-surface-subtle); padding: 16px; border-radius: var(--radius-sm); margin-bottom: 24px; border: 1px dashed var(--color-primary);">
        <span style="color: var(--color-primary); font-weight: 800; font-size: 1rem; display: block; margin-bottom: 8px;">
          🎁 Festive Day Bonus Offer
        </span>
        <p style="font-size: 0.95rem; color: var(--wf-text-secondary); margin: 0;">
          Checking your CIBIL score today awards you <strong>1 EXTRA SPIN</strong> on the Spin & Win game!
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 16px; align-items: center;">
        <a href="${finalCibilUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" id="check-cibil-cta" style="padding: 16px 40px; font-size: 1.1rem;">
          🔍 Check My CIBIL Score For Free ↗
        </a>

        ${userRewards.cibilExtraSpinUnlocked ? `
          <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); padding: 16px; border-radius: var(--radius-sm); color: #10B981; font-weight: 600; font-size: 0.95rem; margin-top: 8px; width: 100%; max-width: 400px;">
            ⭐ Extra Spin Unlocked! 
            <br>
            <button class="btn-primary" id="go-to-spin-btn" style="margin-top: 12px; font-size: 0.9rem; padding: 10px 24px;">
              🎰 Go to Spin & Win Game
            </button>
          </div>
        ` : `
          <button class="btn-outline" id="simulate-cibil-return-btn" style="margin-top: 8px; font-size: 0.9rem; padding: 10px 24px;">
            ✓ I've Completed My CIBIL Check (Claim Extra Spin)
          </button>
        `}
      </div>
    </div>
  `;

  // CIBIL CTA Redirect Listener
  wrapper.querySelector('#check-cibil-cta').addEventListener('click', () => {
    const session = getSession();
    trackGa4Event(GA4_EVENTS.CIBIL_REDIRECT_CLICKED);

    sendLeadToLeadSquared({
      mobileNumber: session.mobile || 'Guest / Direct Click',
      activityType: 'CIBIL Check Redirect',
      contentSlug: 'cibil-check'
    });
  });

  // Simulated Return / Completion Handler
  const simulateBtn = wrapper.querySelector('#simulate-cibil-return-btn');
  if (simulateBtn) {
    simulateBtn.addEventListener('click', () => {
      const session = getSession();
      if (!session.isAuthenticated) {
        openOtpModal(() => {
          unlockCibilExtraSpin();
          trackGa4Event(GA4_EVENTS.CIBIL_EXTRA_SPIN_UNLOCKED);
          onNavigate('games');
        });
        return;
      }

      unlockCibilExtraSpin();
      trackGa4Event(GA4_EVENTS.CIBIL_EXTRA_SPIN_UNLOCKED);
      onNavigate('games');
    });
  }

  const goToSpinBtn = wrapper.querySelector('#go-to-spin-btn');
  if (goToSpinBtn) {
    goToSpinBtn.addEventListener('click', () => onNavigate('games'));
  }

  container.appendChild(wrapper);
}
