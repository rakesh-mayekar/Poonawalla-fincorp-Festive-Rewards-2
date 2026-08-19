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
  wrapper.className = 'loans-container section-wrapper';

  const baseEmiUrl = 'https://poonawallafincorp.com/emi-calculator';
  const finalEmiUrl = buildUtmUrl(baseEmiUrl, 'emi-calculator');

  const userRewards = getUserRewards();
  const emiClaim = userRewards.claims['emi_scratch_card'];

  wrapper.innerHTML = `
    <div class="loans-header" style="text-align: center; margin-bottom: 32px;">
      <div class="festive-badge-pill" style="margin-bottom: 12px; display: inline-block;">🧮 Affordability Calculator</div>
      <h2 class="loans-title festive-heading">Calculate Your EMI</h2>
      <p class="loans-subtitle" style="max-width: 600px; margin: 0 auto;">Estimate your monthly EMI before you apply.</p>
    </div>

    <div style="display: grid; grid-template-columns: 1fr; gap: 24px; max-width: 1000px; margin: 0 auto;">
      
      <!-- Native Interactive EMI Calculator & Visualizer Widget -->
      <div style="background: var(--wf-surface); padding: 32px; border-radius: var(--radius-lg); border: 1px solid var(--wf-border); box-shadow: var(--shadow-sm); text-align: left;">
        <h3 style="font-size: 1.2rem; color: var(--wf-text-primary); margin-bottom: 24px; text-align: center;">
          📊 Quick EMI Estimator
        </h3>

        <div style="display: flex; flex-direction: column; gap: 24px;">
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.95rem; font-weight: 600; color: var(--wf-text-primary);">
              <span>Loan Amount:</span>
              <span id="loan-amt-val" style="color: var(--color-primary);">₹ 5,00,000</span>
            </div>
            <input type="range" id="loan-amt-range" min="50000" max="3000000" step="50000" value="500000" style="width: 100%; accent-color: var(--color-primary);">
          </div>

          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.95rem; font-weight: 600; color: var(--wf-text-primary);">
              <span>Interest Rate (% p.a.):</span>
              <span id="interest-rate-val" style="color: var(--color-primary);">10.25%</span>
            </div>
            <input type="range" id="interest-rate-range" min="8" max="24" step="0.25" value="10.25" style="width: 100%; accent-color: var(--color-primary);">
          </div>

          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.95rem; font-weight: 600; color: var(--wf-text-primary);">
              <span>Tenure (Months):</span>
              <span id="tenure-val" style="color: var(--color-primary);">36 Months</span>
            </div>
            <input type="range" id="tenure-range" min="12" max="60" step="6" value="36" style="width: 100%; accent-color: var(--color-primary);">
          </div>

          <!-- Calculated Result Box with SVG Donut Visualizer -->
          <div style="background: var(--wf-surface-subtle); border: 1px solid var(--wf-border); border-radius: var(--radius-md); padding: 24px; text-align: center; margin-top: 8px;">
            <span style="font-size: 0.85rem; color: var(--wf-text-secondary); text-transform: uppercase; font-weight: 700;">Estimated Monthly EMI</span>
            <div style="font-size: 2.5rem; font-weight: 800; color: var(--wf-text-primary); margin: 8px 0;" id="calc-emi-result">
              ₹ 16,192
            </div>

            <!-- Interactive SVG Donut Chart -->
            <div style="position: relative; width: 140px; height: 140px; margin: 16px auto;">
              <svg viewBox="0 0 36 36" style="width: 140px; height: 140px; transform: rotate(-90deg);">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--wf-border)" stroke-width="3.8"/>
                <path id="donut-interest-segment" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--color-primary)" stroke-width="3.8" stroke-dasharray="25, 100"/>
              </svg>
              <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: 700; color: var(--wf-text-primary);" id="donut-percent-text">
                14% Interest
              </div>
            </div>

            <div style="font-size: 0.9rem; color: var(--wf-text-secondary); display: flex; justify-content: space-around; margin-top: 16px;">
              <div>Principal: <strong style="color: var(--wf-text-primary);" id="calc-principal-display">₹ 5,00,000</strong></div>
              <div>Interest: <strong style="color: var(--color-primary);" id="calc-total-interest">₹ 82,912</strong></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Reward Hook Card -->
      <div style="background: var(--wf-surface); padding: 32px; border-radius: var(--radius-lg); border: 1px solid var(--wf-border); box-shadow: var(--shadow-sm); text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <div style="font-size: 3.5rem; margin-bottom: 16px;">🎁</div>
        <h3 style="font-size: 1.4rem; color: var(--wf-text-primary); margin-bottom: 8px;">
          Claim Your Guaranteed Reward
        </h3>
        <p style="font-size: 0.95rem; color: var(--wf-text-secondary); margin-bottom: 24px;">
          Get a Scratch Card just for verifying your mobile number!
        </p>

        ${emiClaim ? `
          <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); padding: 16px; border-radius: var(--radius-sm); color: #10B981; font-weight: 600; font-size: 0.95rem; margin-bottom: 24px; width: 100%;">
            ✓ You have already unlocked your EMI Scratch Reward!
            <br>
            <button class="btn-primary" id="view-previous-emi-reward" style="margin-top: 12px; font-size: 0.9rem; padding: 10px 24px;">
              🎁 View My Won Reward
            </button>
          </div>
        ` : `
          <button class="btn-primary" id="unlock-emi-reward-btn" style="padding: 16px 32px; font-size: 1.1rem; margin-bottom: 24px;">
            🎁 Unlock My Reward
          </button>
        `}

        <div style="margin-top: auto; padding-top: 24px; border-top: 1px solid var(--wf-border); width: 100%;">
          <p style="font-size: 0.85rem; color: var(--wf-text-secondary); margin-bottom: 12px;">Ready to apply for a loan?</p>
          <a href="${finalEmiUrl}" target="_blank" rel="noopener noreferrer" class="btn-outline" id="go-to-emi-redirect-btn" style="padding: 12px 24px; font-size: 0.95rem; display: inline-block;">
            Go to Official EMI Calculator ↗
          </a>
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
