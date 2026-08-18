// PFIN Card & Consumer Durable Section Component SOT v1.3 Section 4.7
import { buildUtmUrl } from '../data/loansData.js';
import { allocateRewardForGame } from '../services/rewardEngine.js';
import { trackGa4Event, GA4_EVENTS } from '../services/gaService.js';
import { sendLeadToLeadSquared } from '../services/crmService.js';
import { getSession } from '../state/sessionState.js';
import { getUserRewards, saveRewardClaim } from '../state/rewardState.js';
import { openOtpModal } from './otpModal.js';
import { openRewardModal } from './rewardModal.js';

export function renderPfinSection(container) {
  const wrapper = document.createElement('div');
  wrapper.className = 'loans-container';

  const userRewards = getUserRewards();
  const pfinClaim = userRewards.claims['pfin_reward'];

  wrapper.innerHTML = `
    <div class="loans-header">
      <div class="festive-badge-pill" style="background: rgba(255, 215, 0, 0.15); color: var(--text-gold);">
        💳 Instant EMI Card & Consumer Durable Loans
      </div>
      <h2 class="loans-title festive-heading">Get PFIN Card & Earn Guaranteed Rewards!</h2>
      <p class="loans-subtitle">Shop electronics, appliances & lifestyle products on No Cost EMIs with guaranteed festive gift vouchers.</p>
    </div>

    <!-- Banner Hook -->
    <div class="game-card-wrapper" style="margin-bottom: 24px; background: linear-gradient(135deg, rgba(211, 47, 47, 0.3) 0%, rgba(15, 23, 42, 0.9) 100%);">
      <div style="font-size: 2.5rem; margin-bottom: 8px;">🎁</div>
      <h3 style="font-size: 1.15rem; color: var(--text-gold); margin-bottom: 4px;">
        Guaranteed Festive Reward Offer
      </h3>
      <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 14px;">
        Unlock your guaranteed reward voucher right now before starting your PFIN Card application!
      </p>

      ${pfinClaim ? `
        <div class="played-badge-overlay" style="margin-bottom: 12px;">
          ✓ You have already claimed your guaranteed PFIN reward!
          <br>
          <button class="btn-gold" id="view-previous-pfin-reward" style="margin-top: 8px; font-size: 0.8rem; padding: 6px 16px;">
            🎁 View My Won Reward
          </button>
        </div>
      ` : `
        <button class="btn-gold glow-effect" id="claim-pfin-reward-btn" style="padding: 12px 28px; font-size: 0.95rem;">
          🎁 Unlock My Guaranteed Reward
        </button>
      `}
    </div>

    <!-- 4 Product Cards Grid -->
    <div class="loans-list">
      <!-- Card 1: PFIN Card -->
      <div class="loan-card">
        <div class="loan-card-top">
          <div class="loan-icon-box">💳</div>
          <div class="loan-info">
            <h3 class="loan-title">PFIN Card / EMI Card</h3>
            <div class="loan-rate-tag">Instant Limit up to ₹2 Lakhs • 0% Interest</div>
          </div>
        </div>
        <div class="festive-offer-banner">⚡ Zero Joining Fee + ₹500 Cashback Voucher</div>
        <div class="loan-card-actions" style="margin-top: 14px;">
          <a href="${buildUtmUrl('https://poonawallafincorp.com/emi-card', 'pfin-card')}" target="_blank" rel="noopener noreferrer" class="apply-now-btn pfin-apply-btn" data-title="PFIN EMI Card">
            Apply Now ↗
          </a>
        </div>
      </div>

      <!-- Card 2: Consumer Durable Financing -->
      <div class="loan-card">
        <div class="loan-card-top">
          <div class="loan-icon-box">📺</div>
          <div class="loan-info">
            <h3 class="loan-title">Consumer Durable Financing</h3>
            <div class="loan-rate-tag">No Cost EMI on TV, Fridge & AC</div>
          </div>
        </div>
        <div class="festive-offer-banner">🎉 Up to 24 Months Flexible Tenure</div>
        <div class="loan-card-actions" style="margin-top: 14px;">
          <a href="${buildUtmUrl('https://poonawallafincorp.com/consumer-durable-loans', 'pfin-consumer-durable')}" target="_blank" rel="noopener noreferrer" class="apply-now-btn pfin-apply-btn" data-title="Consumer Durable Loan">
            Apply Now ↗
          </a>
        </div>
      </div>

      <!-- Card 3: Electronics Financing -->
      <div class="loan-card">
        <div class="loan-card-top">
          <div class="loan-icon-box">📱</div>
          <div class="loan-info">
            <h3 class="loan-title">Electronics Financing</h3>
            <div class="loan-rate-tag">Smartphones, Laptops & Gadgets</div>
          </div>
        </div>
        <div class="festive-offer-banner">📱 Instant Approval at Store</div>
        <div class="loan-card-actions" style="margin-top: 14px;">
          <a href="${buildUtmUrl('https://poonawallafincorp.com/consumer-durable-loans', 'pfin-electronics')}" target="_blank" rel="noopener noreferrer" class="apply-now-btn pfin-apply-btn" data-title="Electronics Financing">
            Apply Now ↗
          </a>
        </div>
      </div>

      <!-- Card 4: Lifestyle Financing -->
      <div class="loan-card">
        <div class="loan-card-top">
          <div class="loan-icon-box">🛍️</div>
          <div class="loan-info">
            <h3 class="loan-title">Lifestyle Financing</h3>
            <div class="loan-rate-tag">Furniture, Watches & Home Upgrades</div>
          </div>
        </div>
        <div class="festive-offer-banner">🏷️ 0 Downpayment Options</div>
        <div class="loan-card-actions" style="margin-top: 14px;">
          <a href="${buildUtmUrl('https://poonawallafincorp.com/consumer-durable-loans', 'pfin-lifestyle')}" target="_blank" rel="noopener noreferrer" class="apply-now-btn pfin-apply-btn" data-title="Lifestyle Financing">
            Apply Now ↗
          </a>
        </div>
      </div>
    </div>
  `;

  // Previous Reward Button Handler
  const viewPrevBtn = wrapper.querySelector('#view-previous-pfin-reward');
  if (viewPrevBtn) {
    viewPrevBtn.addEventListener('click', () => {
      const currentRewards = getUserRewards();
      const allocated = allocateRewardForGame('pfin_reward', currentRewards.claims);
      openRewardModal(allocated.deal);
    });
  }

  // Claim Reward Handler
  const claimBtn = wrapper.querySelector('#claim-pfin-reward-btn');
  if (claimBtn) {
    claimBtn.addEventListener('click', () => {
      const session = getSession();
      if (!session.isAuthenticated) {
        openOtpModal(() => {
          claimBtn.click();
        });
        return;
      }

      const currentRewards = getUserRewards();
      const allocated = allocateRewardForGame('pfin_reward', currentRewards.claims);

      saveRewardClaim('pfin_reward', allocated.deal.dealId);

      trackGa4Event(GA4_EVENTS.PFIN_REWARD_CLAIMED, {
        deal_id: allocated.deal.dealId
      });

      sendLeadToLeadSquared({
        mobileNumber: session.mobile,
        activityType: 'PFIN Card Guaranteed Reward Claimed',
        rewardAllocated: allocated.deal.dealId,
        contentSlug: 'pfin-card'
      });

      openRewardModal(allocated.deal);
    });
  }

  // Apply BTN Listeners
  wrapper.querySelectorAll('.pfin-apply-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const session = getSession();
      const title = btn.getAttribute('data-title');
      trackGa4Event(GA4_EVENTS.APPLY_NOW_CLICKED, { product_title: title });

      sendLeadToLeadSquared({
        mobileNumber: session.mobile || 'Guest / Direct Click',
        activityType: `PFIN Product Apply Click: ${title}`,
        contentSlug: 'pfin-card'
      });
    });
  });

  container.appendChild(wrapper);
}
