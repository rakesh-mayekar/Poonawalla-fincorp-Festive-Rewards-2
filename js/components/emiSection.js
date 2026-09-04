// EMI Calculator Component with Live Interactive Visualizer, Mandatory OTP, Scratch Card Reward, and Limit Rules
import { buildUtmUrl } from '../data/loansData.js';
import { allocateRewardForGame } from '../services/rewardEngine.js';
import { trackGa4Event, GA4_EVENTS } from '../services/gaService.js';
import { sendLeadToLeadSquared } from '../services/crmService.js';
import { getSession } from '../state/sessionState.js';
import { isActivityClaimed, saveRewardClaim, getRemainingEligibleActivities } from '../state/rewardState.js';
import { openOtpModal } from './otpModal.js';
import { openRewardModal } from './rewardModal.js';
import { openRewardLimitModal } from './rewardLimitModal.js';
import { playScratchSound, playWinFanfare } from '../services/audioSynth.js';
import { renderTopOffersSection } from './topOffersScroller.js';

export function renderEmiSection(container, onNavigate) {
  const wrapper = document.createElement('div');
  wrapper.className = 'loans-container section-wrapper';

  const baseEmiUrl = 'https://poonawallafincorp.com/emi-calculator';
  const finalEmiUrl = buildUtmUrl(baseEmiUrl, 'emi-calculator');

  const emiAlreadyClaimed = isActivityClaimed('emi_calculator');

  wrapper.innerHTML = `
    <div class="section-header align-left">
      <span class="section-kicker" style="color: var(--wf-text-secondary); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">• FINANCIAL AFFORDABILITY PLANNER</span>
      <h2 style="margin-top: 4px;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="section-icon"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M8 18h.01M12 18h.01"/></svg>
        EMI <span style="font-style: italic; font-weight: 500; color: var(--wf-text-secondary); margin-left: 6px;">Calculator</span>
      </h2>
      <p class="subheading">Estimate your monthly installments with interactive sliders and unlock guaranteed festive Scratch Card rewards.</p>
    </div>

    <div style="display: grid; grid-template-columns: 1fr; gap: 32px; max-width: 1000px; margin: 0 auto 48px auto;">
      
      <!-- Native Interactive EMI Calculator & Visualizer Widget -->
      <div style="background: var(--wf-surface); padding: 36px; border-radius: var(--radius-lg); border: 1px solid var(--wf-border); box-shadow: var(--shadow-sm); text-align: left;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
          <h3 style="font-size: 1.3rem; color: var(--wf-text-primary); margin: 0;">
            📊 Quick EMI Estimator
          </h3>
          <span style="font-size: 0.8rem; font-weight: 700; color: #10B981; background: rgba(16, 185, 129, 0.1); padding: 4px 12px; border-radius: 4px;">
            FESTIVE RATE ESTIMATION
          </span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 28px;">
          <!-- Slider 1: Amount -->
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.95rem; font-weight: 600; color: var(--wf-text-primary);">
              <span>Loan Amount:</span>
              <span id="loan-amt-val" style="color: #111111; font-weight: 800; font-size: 1.1rem;">₹ 5,00,000</span>
            </div>
            <input type="range" id="loan-amt-range" min="50000" max="3000000" step="50000" value="500000" style="width: 100%; accent-color: #111111; height: 6px; cursor: pointer;">
            <div style="display: flex; justify-content: space-between; margin-top: 4px; font-size: 0.75rem; color: var(--wf-text-secondary);">
              <span>₹50,000</span>
              <span>₹30,00,000</span>
            </div>
          </div>

          <!-- Slider 2: Interest -->
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.95rem; font-weight: 600; color: var(--wf-text-primary);">
              <span>Interest Rate (% p.a.):</span>
              <span id="interest-rate-val" style="color: #111111; font-weight: 800; font-size: 1.1rem;">10.25%</span>
            </div>
            <input type="range" id="interest-rate-range" min="8" max="24" step="0.25" value="10.25" style="width: 100%; accent-color: #111111; height: 6px; cursor: pointer;">
            <div style="display: flex; justify-content: space-between; margin-top: 4px; font-size: 0.75rem; color: var(--wf-text-secondary);">
              <span>8% p.a.</span>
              <span>24% p.a.</span>
            </div>
          </div>

          <!-- Slider 3: Tenure -->
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.95rem; font-weight: 600; color: var(--wf-text-primary);">
              <span>Tenure (Months):</span>
              <span id="tenure-val" style="color: #111111; font-weight: 800; font-size: 1.1rem;">36 Months</span>
            </div>
            <input type="range" id="tenure-range" min="12" max="84" step="6" value="36" style="width: 100%; accent-color: #111111; height: 6px; cursor: pointer;">
            <div style="display: flex; justify-content: space-between; margin-top: 4px; font-size: 0.75rem; color: var(--wf-text-secondary);">
              <span>12 Months</span>
              <span>84 Months</span>
            </div>
          </div>

          <!-- Calculated Result Box with SVG Donut Visualizer -->
          <div style="background: var(--wf-surface-subtle); border: 1px solid var(--wf-border); border-radius: var(--radius-md); padding: 24px; text-align: center; margin-top: 8px;">
            <span style="font-size: 0.85rem; color: var(--wf-text-secondary); text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;">Estimated Monthly EMI</span>
            <div style="font-size: 2.6rem; font-weight: 800; color: var(--wf-text-primary); margin: 6px 0;" id="calc-emi-result">
              ₹ 16,192
            </div>

            <!-- Interactive SVG Donut Chart -->
            <div style="position: relative; width: 130px; height: 130px; margin: 16px auto;">
              <svg viewBox="0 0 36 36" style="width: 130px; height: 130px; transform: rotate(-90deg);">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--wf-border)" stroke-width="3.8"/>
                <path id="donut-interest-segment" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10B981" stroke-width="3.8" stroke-dasharray="25, 100"/>
              </svg>
              <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 0.82rem; font-weight: 700; color: var(--wf-text-primary);" id="donut-percent-text">
                14% Interest
              </div>
            </div>

            <div style="font-size: 0.9rem; color: var(--wf-text-secondary); display: flex; justify-content: space-around; margin-top: 16px; border-top: 1px solid var(--wf-border); padding-top: 14px;">
              <div>Principal: <strong style="color: var(--wf-text-primary);" id="calc-principal-display">₹ 5,00,000</strong></div>
              <div>Total Interest: <strong style="color: #10B981;" id="calc-total-interest">₹ 82,912</strong></div>
            </div>
          </div>

          <!-- Main CTA: Calculate EMI & Unlock Reward -->
          <div style="text-align: center; margin-top: 8px;">
            <button class="btn-primary" id="calculate-and-unlock-btn" style="padding: 16px 40px; font-size: 1.1rem; width: 100%; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; gap: 10px;">
              <span>🎁</span> Calculate EMI & Unlock Reward
            </button>
            <p style="margin-top: 8px; font-size: 0.78rem; color: var(--wf-text-secondary);">
              Recalculate anytime as needed. Mobile OTP verification required for festive reward allocation.
            </p>
          </div>
        </div>
      </div>

      <!-- Scratch Card Reward Container (Appears post calculation / unlock) -->
      <div id="emi-scratch-card-area" style="background: var(--wf-surface); padding: 36px; border-radius: var(--radius-lg); border: 1px solid var(--wf-border); box-shadow: var(--shadow-sm); text-align: center; display: ${emiAlreadyClaimed ? 'block' : 'none'};">
        ${emiAlreadyClaimed ? `
          <div class="emi-reward-limit-box" style="background: #FFFBEB; border: 1px solid #FDE68A; padding: 24px; border-radius: var(--radius-md); text-align: left;">
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 16px;">
              <span style="font-size: 1.8rem; line-height: 1;">🎁</span>
              <div>
                <strong style="color: #92400E; font-size: 1rem; display: block; margin-bottom: 4px;">EMI Reward Unlocked!</strong>
                <p style="color: #78350F; font-size: 0.95rem; line-height: 1.5; margin: 0;">
                  You've already unlocked your EMI Calculator reward! To earn more rewards, explore other activities such as Play & Win, Check CIBIL, PFIN Card, or Get a Loan.
                </p>
              </div>
            </div>

            <!-- Dynamic Activity Quick Links -->
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 14px; padding-top: 14px; border-top: 1px dashed #FCD34D;">
              <button class="btn-secondary" data-quick-nav="games" style="font-size: 0.82rem; padding: 8px 16px; background: #FFFFFF;">🎰 Play & Win</button>
              <button class="btn-secondary" data-quick-nav="cibil" style="font-size: 0.82rem; padding: 8px 16px; background: #FFFFFF;">📊 Check CIBIL</button>
              <button class="btn-secondary" data-quick-nav="pfin" style="font-size: 0.82rem; padding: 8px 16px; background: #FFFFFF;">💳 PFIN Card</button>
              <button class="btn-secondary" data-quick-nav="loans" style="font-size: 0.82rem; padding: 8px 16px; background: #FFFFFF;">⚡ Get a Loan</button>
            </div>
          </div>
        ` : `
          <div id="scratch-game-embed-inner">
            <h3 style="font-size: 1.3rem; margin-bottom: 6px; color: var(--wf-text-primary);">✨ Your Festive Scratch Card is Ready!</h3>
            <p style="font-size: 0.88rem; color: var(--wf-text-secondary); margin-bottom: 20px;">Use your finger or mouse to scratch the metallic card and reveal your brand voucher:</p>
            
            <div class="scratch-card-container" style="margin: 0 auto; width: 280px; height: 180px; position: relative; border-radius: 8px; overflow: hidden; border: 1px solid var(--wf-border); box-shadow: 0 4px 16px rgba(0,0,0,0.06);">
              <div class="scratch-reward-underlay" id="emi-scratch-underlay" style="position: absolute; inset: 0; background: #FFFFFF; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 16px;">
                <span class="scratch-reward-title" id="emi-underlay-title" style="font-weight: 800; font-size: 0.95rem; color: var(--wf-text-primary); text-align: center;">🎉 Festive Partner Deal</span>
                <span class="scratch-reward-code" id="emi-underlay-code" style="font-family: var(--font-mono); font-size: 1.1rem; color: #10B981; font-weight: 800; margin-top: 6px;">••••••••</span>
              </div>
              <canvas id="emi-scratch-canvas" width="280" height="180" style="position: absolute; inset: 0; cursor: pointer; z-index: 2;"></canvas>
            </div>
          </div>
        `}
      </div>

    </div>
  `;

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

    const interestRatio = (interest / totalAmount) * 100;
    const dashVal = Math.round(interestRatio);
    donutSegment.setAttribute('stroke-dasharray', `${dashVal}, 100`);
    donutPercentText.textContent = `${dashVal}% Interest`;
  }

  amtRange.addEventListener('input', calculateEmi);
  rateRange.addEventListener('input', calculateEmi);
  tenureRange.addEventListener('input', calculateEmi);
  calculateEmi();

  // CTA Click: Calculate EMI & Unlock Reward
  const calcAndUnlockBtn = wrapper.querySelector('#calculate-and-unlock-btn');
  const scratchArea = wrapper.querySelector('#emi-scratch-card-area');

  calcAndUnlockBtn.addEventListener('click', () => {
    // If already claimed, user can recalculate freely, but no additional reward is issued
    if (isActivityClaimed('emi_calculator')) {
      scratchArea.style.display = 'block';
      scratchArea.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const session = getSession();
    if (!session.isAuthenticated) {
      openOtpModal(() => {
        setupScratchCardFlow();
      });
      return;
    }

    setupScratchCardFlow();
  });

  function setupScratchCardFlow() {
    scratchArea.style.display = 'block';
    scratchArea.scrollIntoView({ behavior: 'smooth' });

    const canvas = wrapper.querySelector('#emi-scratch-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Fill Canvas Overlay with Metallic Wireframe
    ctx.fillStyle = '#262626';
    ctx.fillRect(0, 0, 280, 180);

    ctx.strokeStyle = '#404040';
    ctx.lineWidth = 1;
    for (let i = 0; i < 280; i += 15) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 40, 180);
      ctx.stroke();
    }

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ SCRATCH WITH FINGER / MOUSE ✨', 140, 95);

    const allocated = allocateRewardForGame('emi_calculator');
    const allocatedDeal = allocated.deal;

    const underlayTitle = wrapper.querySelector('#emi-underlay-title');
    const underlayCode = wrapper.querySelector('#emi-underlay-code');
    if (underlayTitle && underlayCode) {
      underlayTitle.textContent = allocatedDeal.offerTitle;
      underlayCode.textContent = allocatedDeal.couponCode;
    }

    let isDrawing = false;
    let isRevealed = false;

    function scratch(x, y) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, 2 * Math.PI);
      ctx.fill();
      playScratchSound();
      checkScratched();
    }

    function checkScratched() {
      if (isRevealed) return;
      const imgData = ctx.getImageData(0, 0, 280, 180);
      const pixels = imgData.data;
      let transparent = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) transparent++;
      }
      const percent = (transparent / (pixels.length / 4)) * 100;
      if (percent >= 38) {
        isRevealed = true;
        ctx.clearRect(0, 0, 280, 180);
        playWinFanfare();

        const curSession = getSession();
        saveRewardClaim('emi_calculator', allocatedDeal.dealId);

        trackGa4Event(GA4_EVENTS.EMI_SCRATCH_CARD_CLAIMED, {
          deal_id: allocatedDeal.dealId
        });

        sendLeadToLeadSquared({
          mobileNumber: curSession.mobile,
          activityType: 'EMI Calculator Scratch Reward Claimed',
          rewardAllocated: allocatedDeal.dealId,
          contentSlug: 'emi-calculator'
        });

        setTimeout(() => {
          openRewardModal(allocatedDeal);
          renderEmiSection(container, onNavigate); // Re-render to show updated limit state
        }, 500);
      }
    }

    function handleStart(e) {
      isDrawing = true;
      handleMove(e);
    }

    function handleMove(e) {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      scratch(clientX - rect.left, clientY - rect.top);
    }

    function handleEnd() {
      isDrawing = false;
    }

    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseup', handleEnd);
    canvas.addEventListener('touchstart', handleStart, { passive: true });
    canvas.addEventListener('touchmove', handleMove, { passive: true });
    canvas.addEventListener('touchend', handleEnd, { passive: true });
  }

  // Bind quick nav buttons
  wrapper.querySelectorAll('[data-quick-nav]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-quick-nav');
      if (onNavigate) {
        onNavigate(target);
      } else {
        window.location.hash = `#${target}`;
      }
    });
  });

  container.appendChild(wrapper);

  // Render Top Offers at the bottom of the EMI Calculator page
  renderTopOffersSection(container, onNavigate, {
    title: 'Top Offers For You',
    showHeading: true,
    isBottomSection: true
  });
}
