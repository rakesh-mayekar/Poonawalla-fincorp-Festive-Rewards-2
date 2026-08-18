// Free CIBIL Check Component SOT v1.3 Section 4.5
import { buildUtmUrl } from '../data/loansData.js';
import { trackGa4Event, GA4_EVENTS } from '../services/gaService.js';
import { sendLeadToLeadSquared } from '../services/crmService.js';
import { getSession } from '../state/sessionState.js';
import { unlockCibilExtraSpin, getUserRewards } from '../state/rewardState.js';
import { openOtpModal } from './otpModal.js';

export function renderCibilSection(container, onNavigate) {
  const wrapper = document.createElement('div');
  wrapper.className = 'loans-container';

  const baseCibilUrl = 'https://poonawallafincorp.com/credit-score/check-cibil-score';
  const finalCibilUrl = buildUtmUrl(baseCibilUrl, 'cibil-check');

  const userRewards = getUserRewards();

  wrapper.innerHTML = `
    <div class="loans-header">
      <div class="festive-badge-pill" style="background: rgba(16, 185, 129, 0.15); border-color: rgba(16, 185, 129, 0.4); color: #34D399;">
        📊 100% Free Credit Score Check
      </div>
      <h2 class="loans-title festive-heading">Check Free CIBIL Score & Unlock +1 Extra Spin!</h2>
      <p class="loans-subtitle">Check your credit score instantly without impacting your credit rating. Complete your check to get an extra bonus spin on Spin & Win!</p>
    </div>

    <div class="game-card-wrapper" style="margin: 0 0 20px;">
      <div style="font-size: 3rem; margin-bottom: 10px;">📈</div>
      
      <div style="background: rgba(255, 215, 0, 0.08); border: 1px dashed var(--pfl-gold); padding: 12px; border-radius: 8px; margin-bottom: 16px;">
        <span style="color: var(--text-gold); font-weight: bold; font-size: 0.9rem;">
          🎁 Festive Day Bonus Offer:
        </span>
        <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 4px;">
          Checking your CIBIL score awards you <strong>1 EXTRA SPIN</strong> on the Spin & Win game!
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 12px;">
        <a href="${finalCibilUrl}" target="_blank" rel="noopener noreferrer" class="btn-gold glow-effect" id="check-cibil-cta" style="padding: 14px; font-size: 1rem;">
          🔍 Check My CIBIL Score Now ↗
        </a>

        ${userRewards.cibilExtraSpinUnlocked ? `
          <div class="played-badge-overlay">
            ⭐ Extra Spin Unlocked! Visit Spin & Win game to use your bonus spin.
            <br>
            <button class="btn-primary" id="go-to-spin-btn" style="margin-top: 10px; font-size: 0.82rem; padding: 8px 18px;">
              🎰 Go to Spin & Win Game
            </button>
          </div>
        ` : `
          <button class="btn-outline" id="simulate-cibil-return-btn" style="margin-top: 6px;">
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

  // Simulated Return / Completion Handler (Option 1 & Option 4 SOT v1.3 Section 4.5)
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
