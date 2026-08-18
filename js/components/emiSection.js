// EMI Calculator Component with Live Interactive SVG Donut Chart SOT v1.3 Section 4.6
import { buildUtmUrl } from '../data/loansData.js';
import { allocateRewardForGame } from '../services/rewardEngine.js';
import { trackGa4Event, GA4_EVENTS } from '../services/gaService.js';
import { sendLeadToLeadSquared } from '../services/crmService.js';
import { getSession } from '../state/sessionState.js';
import { getUserRewards, saveRewardClaim } from '../state/rewardState.js';
import { openOtpModal } from './otpModal.js';
import { openRewardModal } from './rewardModal.js';

export function renderEmiSection(container) {
  const wrapper = document.createElement('div');
  wrapper.className = 'loans-container';

  const baseEmiUrl = 'https://poonawallafincorp.com/emi-calculator';
  const finalEmiUrl = buildUtmUrl(baseEmiUrl, 'emi-calculator');

  const userRewards = getUserRewards();
  const emiClaim = userRewards.claims['emi_scratch_card'];

  wrapper.innerHTML = `
    <div class="loans-header">
      <div class="festive-badge-pill">🧮 Affordability Calculator</div>
      <h2 class="loans-title festive-heading">Calculate Your EMI & Unlock a Surprise Reward!</h2>
      <p class="loans-subtitle">Plan your loan EMIs effortlessly. Unlock a scratch card reward instantly before heading to Poonawalla's official EMI calculator!</p>
    </div>

    <!-- Reward Hook Card -->
    <div class="game-card-wrapper" style="margin-bottom: 24px;">
      <div style="font-size: 2.5rem; margin-bottom: 8px;">🎁</div>
      <h3 style="font-size: 1.1rem; color: var(--text-gold); margin-bottom: 6px;">
        Unlock Guaranteed Scratch Card Reward
      </h3>
      <p style="font-size: 0.8rem; color: var(--wireframe-text-secondary); margin-bottom: 16px;">
        1 Scratch Card per mobile number upon verification.
      </p>

      ${emiClaim ? `
        <div class="played-badge-overlay" style="margin-bottom: 14px;">
          ✓ You have already unlocked your EMI Scratch Reward!
          <br>
          <button class="btn-gold" id="view-previous-emi-reward" style="margin-top: 8px; font-size: 0.8rem; padding: 6px 16px;">
            🎁 View My Won Reward
          </button>
        </div>
      ` : `
        <button class="btn-gold glow-effect" id="unlock-emi-reward-btn" style="padding: 12px 28px; font-size: 0.95rem; margin-bottom: 14px;">
          🎁 Unlock My Reward
        </button>
      `}

      <div>
        <a href="${finalEmiUrl}" target="_blank" rel="noopener noreferrer" class="apply-now-btn" id="go-to-emi-redirect-btn" style="padding: 10px 22px; font-size: 0.88rem;">
          Go to Poonawalla EMI Calculator ↗
        </a>
      </div>
    </div>

    <!-- Native Interactive EMI Calculator & Visualizer Widget -->
    <div class="game-card-wrapper" style="text-align: left;">
      <h3 style="font-size: 1.1rem; color: var(--wireframe-text-primary); margin-bottom: 14px; text-align: center;">
        📊 Quick Festive EMI Visualizer
      </h3>

      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.85rem;">
            <span>Loan Amount:</span>
            <strong style="color: #FFFFFF;" id="loan-amt-val">₹ 5,00,000</strong>
          </div>
          <input type="range" id="loan-amt-range" min="50000" max="3000000" step="50000" value="500000" style="width: 100%; accent-color: #FFFFFF;">
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.85rem;">
            <span>Interest Rate (% p.a.):</span>
            <strong style="color: #FFFFFF;" id="interest-rate-val">10.25%</strong>
          </div>
          <input type="range" id="interest-rate-range" min="8" max="24" step="0.25" value="10.25" style="width: 100%; accent-color: #FFFFFF;">
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.85rem;">
            <span>Tenure (Months):</span>
            <strong style="color: #FFFFFF;" id="tenure-val">36 Months</strong>
          </div>
          <input type="range" id="tenure-range" min="12" max="60" step="6" value="36" style="width: 100%; accent-color: #FFFFFF;">
        </div>

        <!-- Calculated Result Box with SVG Donut Visualizer -->
        <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid var(--wireframe-border-white); border-radius: var(--radius-sm); padding: 16px; text-align: center; margin-top: 10px;">
          <span style="font-size: 0.75rem; color: var(--wireframe-text-secondary); text-transform: uppercase;">Estimated Monthly EMI</span>
          <div style="font-size: 1.6rem; font-weight: 800; color: #FFFFFF; margin: 4px 0;" id="calc-emi-result">
            ₹ 16,192
          </div>

          <!-- Interactive SVG Donut Chart -->
          <div style="position: relative; width: 120px; height: 120px; margin: 12px auto;">
            <svg viewBox="0 0 36 36" style="width: 120px; height: 120px; transform: rotate(-90deg);">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#333333" stroke-width="3.8"/>
              <path id="donut-interest-segment" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#FFFFFF" stroke-width="3.8" stroke-dasharray="25, 100"/>
            </svg>
            <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: 700; color: #FFFFFF;" id="donut-percent-text">
              14% Interest
            </div>
          </div>

          <div style="font-size: 0.78rem; color: var(--wireframe-text-secondary); display: flex; justify-content: space-around; margin-top: 6px;">
            <div>Principal: <strong style="color: #FFFFFF;" id="calc-principal-display">₹ 5,00,000</strong></div>
            <div>Interest: <strong style="color: #FFFFFF;" id="calc-total-interest">₹ 82,912</strong></div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Previous Reward Button Handler
  const viewPrevBtn = wrapper.querySelector('#view-previous-emi-reward');
  if (viewPrevBtn) {
    viewPrevBtn.addEventListener('click', () => {
      const currentRewards = getUserRewards();
      const allocated = allocateRewardForGame('emi_scratch_card', currentRewards.claims);
      openRewardModal(allocated.deal);
    });
  }

  // Unlock Reward Button Handler
  const unlockBtn = wrapper.querySelector('#unlock-emi-reward-btn');
  if (unlockBtn) {
    unlockBtn.addEventListener('click', () => {
      const session = getSession();
      if (!session.isAuthenticated) {
        openOtpModal(() => {
          unlockBtn.click();
        });
        return;
      }

      const currentRewards = getUserRewards();
      const allocated = allocateRewardForGame('emi_scratch_card', currentRewards.claims);

      saveRewardClaim('emi_scratch_card', allocated.deal.dealId);

      trackGa4Event(GA4_EVENTS.EMI_SCRATCH_CARD_CLAIMED, {
        deal_id: allocated.deal.dealId
      });

      sendLeadToLeadSquared({
        mobileNumber: session.mobile,
        activityType: 'EMI Scratch Card Reward Claimed',
        rewardAllocated: allocated.deal.dealId,
        contentSlug: 'emi-calculator'
      });

      openRewardModal(allocated.deal);
    });
  }

  // Redirect Button Listener
  wrapper.querySelector('#go-to-emi-redirect-btn').addEventListener('click', () => {
    const session = getSession();
    trackGa4Event(GA4_EVENTS.EMI_REDIRECT_CLICKED);

    sendLeadToLeadSquared({
      mobileNumber: session.mobile || 'Guest / Direct Click',
      activityType: 'EMI Calculator Portal Redirect',
      contentSlug: 'emi-calculator'
    });
  });

  // Interactive Live EMI Math Calculation & SVG Donut Chart Update
  const amtRange = wrapper.querySelector('#loan-amt-range');
  const rateRange = wrapper.querySelector('#interest-rate-range');
  const tenureRange = wrapper.querySelector('#tenure-range');

  const amtVal = wrapper.querySelector('#loan-amt-val');
  const rateVal = wrapper.querySelector('#interest-rate-val');
  const tenureVal = wrapper.querySelector('#tenure-val');

  const emiResult = wrapper.querySelector('#calc-emi-result');
  const principalDisplay = wrapper.querySelector('#calc-principal-display');
  const totalInterest = wrapper.querySelector('#calc-total-interest');

  const donutSegment = wrapper.querySelector('#donut-interest-segment');
  const donutPercentText = wrapper.querySelector('#donut-percent-text');

  function calculateEmi() {
    const P = parseFloat(amtRange.value);
    const r = parseFloat(rateRange.value) / 12 / 100;
    const n = parseInt(tenureRange.value);

    amtVal.textContent = `₹ ${P.toLocaleString('en-IN')}`;
    rateVal.textContent = `${rateRange.value}%`;
    tenureVal.textContent = `${n} Months`;

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const interest = totalAmount - P;

    emiResult.textContent = `₹ ${Math.round(emi).toLocaleString('en-IN')}`;
    principalDisplay.textContent = `₹ ${P.toLocaleString('en-IN')}`;
    totalInterest.textContent = `₹ ${Math.round(interest).toLocaleString('en-IN')}`;

    // Calculate Donut Interest Ratio
    const interestRatio = (interest / totalAmount) * 100;
    const dashVal = Math.round(interestRatio);
    donutSegment.setAttribute('stroke-dasharray', `${dashVal}, 100`);
    donutPercentText.textContent = `${dashVal}% Interest`;
  }

  amtRange.addEventListener('input', calculateEmi);
  rateRange.addEventListener('input', calculateEmi);
  tenureRange.addEventListener('input', calculateEmi);

  calculateEmi();
  container.appendChild(wrapper);
}
