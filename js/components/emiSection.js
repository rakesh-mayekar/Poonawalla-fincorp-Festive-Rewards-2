// EMI Calculator Component (Direct Official Brand Redirect - No Coupons/Offers)
import { buildUtmUrl } from '../data/loansData.js';
import { trackGa4Event, GA4_EVENTS } from '../services/gaService.js';
import { sendLeadToLeadSquared } from '../services/crmService.js';
import { getSession } from '../state/sessionState.js';
import { renderTopOffersSection } from './topOffersScroller.js';

export function renderEmiSection(container, onNavigate) {
  const wrapper = document.createElement('div');
  wrapper.className = 'loans-container section-wrapper';

  const baseEmiUrl = 'https://poonawallafincorp.com/emi-calculator';
  const finalEmiUrl = buildUtmUrl(baseEmiUrl, 'emi-calculator');

  wrapper.innerHTML = `
    <div class="section-header align-left">
      <span class="section-kicker" style="color: var(--wf-text-secondary); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">• FINANCIAL AFFORDABILITY PLANNER</span>
      <h2 style="margin-top: 4px;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="section-icon"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M8 18h.01M12 18h.01"/></svg>
        EMI <span style="font-style: italic; font-weight: 500; color: var(--wf-text-secondary); margin-left: 6px;">Calculator</span>
      </h2>
      <p class="subheading">Estimate your monthly installments with interactive sliders and apply directly on the official Poonawalla Fincorp portal.</p>
    </div>

    <div style="display: grid; grid-template-columns: 1fr; gap: 32px; max-width: 960px; margin: 0 auto 48px auto;">
      
      <!-- Native Interactive EMI Calculator & Visualizer Widget -->
      <div style="background: var(--wf-surface); padding: 36px; border-radius: var(--radius-lg); border: 1px solid var(--wf-border); box-shadow: var(--shadow-sm); text-align: left;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
          <h3 style="font-size: 1.3rem; color: var(--wf-text-primary); margin: 0;">
            📊 Interactive EMI Estimator
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

          <!-- Direct Official Brand Redirect CTA -->
          <div style="display: flex; flex-direction: column; gap: 12px; align-items: center; margin-top: 12px;">
            <a href="${finalEmiUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary glow-effect" id="official-emi-cta" style="padding: 16px 44px; font-size: 1.05rem; width: 100%; border-radius: var(--radius-sm); text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 8px;">
              Apply For Loan on Official Site ↗
            </a>
            
            <button class="btn-secondary" id="explore-loans-listing-btn" style="padding: 12px 28px; font-size: 0.9rem; background: #FFFFFF; width: 100%;">
              Explore All Festive Loan Products &rarr;
            </button>
          </div>
        </div>
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

  // Official Site Redirect Click Tracker
  const officialCta = wrapper.querySelector('#official-emi-cta');
  if (officialCta) {
    officialCta.addEventListener('click', () => {
      const session = getSession();
      trackGa4Event(GA4_EVENTS.APPLY_NOW_CLICKED, { loan_type: 'emi-calculator' });
      sendLeadToLeadSquared({
        mobileNumber: session.mobile || 'Guest / Direct Click',
        activityType: 'EMI Calculator Official Portal Click',
        contentSlug: 'emi-calculator'
      });
    });
  }

  // Explore Loans Listing Button Handler
  const exploreLoansBtn = wrapper.querySelector('#explore-loans-listing-btn');
  if (exploreLoansBtn) {
    exploreLoansBtn.addEventListener('click', () => {
      if (onNavigate) {
        onNavigate('loans');
      } else {
        window.location.hash = '#loans';
      }
    });
  }

  container.appendChild(wrapper);

  // Render Top Offers at the bottom of the EMI Calculator page
  renderTopOffersSection(container, onNavigate, {
    title: 'Top Offers For You',
    showHeading: true,
    isBottomSection: true
  });
}
