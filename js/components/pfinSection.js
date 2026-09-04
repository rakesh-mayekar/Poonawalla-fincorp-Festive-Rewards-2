// PFIN Card & Consumer Durable Section Component
import { buildUtmUrl, PRODUCT_LAMPS } from '../data/loansData.js';
import { allocateRewardForGame } from '../services/rewardEngine.js';
import { trackGa4Event, GA4_EVENTS } from '../services/gaService.js';
import { sendLeadToLeadSquared } from '../services/crmService.js';
import { getSession } from '../state/sessionState.js';
import { isActivityClaimed, saveRewardClaim, getUserRewards } from '../state/rewardState.js';
import { openOtpModal } from './otpModal.js';
import { openRewardModal } from './rewardModal.js';
import { openRewardLimitModal } from './rewardLimitModal.js';
import { renderTopOffersSection } from './topOffersScroller.js';

export function renderPfinSection(container, onNavigate) {
  const wrapper = document.createElement('div');
  wrapper.className = 'loans-container section-wrapper';

  const pfinAlreadyClaimed = isActivityClaimed('pfin_card');
  const pfinLamp = PRODUCT_LAMPS['pfin-card'] || '';

  wrapper.innerHTML = `
    <div class="section-header align-left">
      <span class="section-kicker" style="color: var(--wf-text-secondary); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">• DIGITAL CREDIT CARD SANCTION</span>
      <h2 style="margin-top: 4px;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="section-icon"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
        PFIN <span style="font-style: italic; font-weight: 500; color: var(--wf-text-secondary); margin-left: 6px;">Card</span>
      </h2>
      <p class="subheading">Instant digital credit limit up to ₹2 Lakhs with No-Cost EMIs and guaranteed festive cashback vouchers.</p>
    </div>

    <!-- PFIN Hero Showcase Banner with Lamp -->
    <div class="pfin-dark-card" style="margin-bottom: 40px;">
      <div class="pfin-content">
        <div class="pfin-badge">
          <svg width="14" height="14" style="vertical-align: middle; margin-right: 4px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
          INSTANT VIRTUAL CARD
        </div>
        <h2 class="festive-heading pfin-title">Digital Credit Card <i>Sanction</i></h2>
        <p class="pfin-desc">Get 100% digital instant virtual card generation with zero joining fee and 5% festive cashback on top brands.</p>
        
        <div class="pfin-stats-row">
          <div class="pfin-stat">
            <strong>₹ 2,00,000</strong>
            <span>CREDIT LIMIT</span>
          </div>
          <div class="pfin-stat">
            <strong>₹ 0</strong>
            <span>JOINING FEE</span>
          </div>
          <div class="pfin-stat">
            <strong>5%</strong>
            <span>FESTIVE CASHBACK</span>
          </div>
        </div>

        <div class="pfin-actions">
          ${pfinAlreadyClaimed ? `
            <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); padding: 12px 18px; border-radius: 6px; color: #34D399; font-weight: 600; font-size: 0.9rem;">
              ✓ You have already unlocked your PFIN Card reward!
              <button class="btn-primary" id="view-pfin-won-reward-btn" style="margin-left: 12px; font-size: 0.8rem; padding: 6px 14px; background: #FFFFFF; color: #111111;">
                View Voucher
              </button>
            </div>
          ` : `
            <button class="btn-primary" id="claim-pfin-reward-btn" style="background: #FFFFFF; color: #111111; border-color: #FFFFFF; font-weight: 700; padding: 14px 28px;">
              🎁 Unlock PFIN Festive Reward &rarr;
            </button>
          `}
          
          <a href="${buildUtmUrl('https://poonawallafincorp.com/emi-card', 'pfin-card')}" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="border-color: rgba(255, 255, 255, 0.3); color: #FFFFFF; padding: 14px 28px;">
            Apply Official Portal ↗
          </a>
        </div>
      </div>
      <div class="pfin-visual">
        <div class="pfin-credit-card-mock">
          <div class="pfin-cc-logo">POONAWALLA PFIN</div>
          <div class="pfin-cc-chip"></div>
          <div class="pfin-cc-number">•••• •••• •••• 8842</div>
          <div class="pfin-cc-footer">
            <span class="pfin-cc-name">VALUED CUSTOMER</span>
            <span class="pfin-cc-exp">10/30</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 4 Product Variants Grid -->
    <div class="loans-list preview-grid" style="margin-bottom: 48px;">
      <!-- Card 1: PFIN Card -->
      <div class="loan-card portfolio-card">
        <div class="portfolio-card-badge">Instant Approval</div>
        <div class="product-lamp-container">
          ${pfinLamp}
        </div>
        <div class="portfolio-card-content">
          <h3 class="portfolio-card-title">PFIN Virtual EMI Card</h3>
          <p class="portfolio-card-stats">Limit up to ₹2 Lakhs <span style="color: #d1d5db; margin: 0 4px;">•</span> <span style="color: #10b981;">0% Interest</span></p>
          <p class="portfolio-card-desc">Zero joining fee with instant card activation on your smartphone.</p>
        </div>
        <div class="portfolio-card-footer">
          <a href="${buildUtmUrl('https://poonawallafincorp.com/emi-card', 'pfin-card')}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="width: 100%; text-decoration: none;">Apply PFIN Card &rarr;</a>
        </div>
      </div>

      <!-- Card 2: Consumer Durable Financing -->
      <div class="loan-card portfolio-card">
        <div class="portfolio-card-badge">No Cost EMI</div>
        <div class="product-lamp-container" style="font-size: 2.2rem; display: flex; align-items: center; justify-content: center; height: 56px;">
          📺
        </div>
        <div class="portfolio-card-content">
          <h3 class="portfolio-card-title">Consumer Durable Loan</h3>
          <p class="portfolio-card-stats">Flexible Tenures <span style="color: #d1d5db; margin: 0 4px;">•</span> <span style="color: #10b981;">Up to 24 Mos</span></p>
          <p class="portfolio-card-desc">Finance TVs, Refrigerators, Air Conditioners with 0 downpayment.</p>
        </div>
        <div class="portfolio-card-footer">
          <a href="${buildUtmUrl('https://poonawallafincorp.com/consumer-durable-loans', 'pfin-consumer-durable')}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="width: 100%; text-decoration: none;">Explore Appliance Loans &rarr;</a>
        </div>
      </div>

      <!-- Card 3: Electronics Financing -->
      <div class="loan-card portfolio-card">
        <div class="portfolio-card-badge">Zero Paperwork</div>
        <div class="product-lamp-container" style="font-size: 2.2rem; display: flex; align-items: center; justify-content: center; height: 56px;">
          📱
        </div>
        <div class="portfolio-card-content">
          <h3 class="portfolio-card-title">Electronics Financing</h3>
          <p class="portfolio-card-stats">Smartphones & Laptops <span style="color: #d1d5db; margin: 0 4px;">•</span> <span style="color: #10b981;">Instant In-Store</span></p>
          <p class="portfolio-card-desc">Upgrade your gadgets at partner retail counters with swift approvals.</p>
        </div>
        <div class="portfolio-card-footer">
          <a href="${buildUtmUrl('https://poonawallafincorp.com/consumer-durable-loans', 'pfin-electronics')}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="width: 100%; text-decoration: none;">Finance Gadgets &rarr;</a>
        </div>
      </div>
    </div>
  `;

  // Claim Reward Handler
  const claimBtn = wrapper.querySelector('#claim-pfin-reward-btn');
  if (claimBtn) {
    claimBtn.addEventListener('click', () => {
      if (isActivityClaimed('pfin_card')) {
        openRewardLimitModal({
          currentActivityKey: 'pfin_card',
          onNavigate
        });
        return;
      }

      const session = getSession();
      if (!session.isAuthenticated) {
        openOtpModal(() => {
          handlePfinRewardAllocation();
        });
        return;
      }

      handlePfinRewardAllocation();
    });
  }

  function handlePfinRewardAllocation() {
    const userRewards = getUserRewards();
    const allocated = allocateRewardForGame('pfin_card', userRewards.claims);

    saveRewardClaim('pfin_card', allocated.deal.dealId);

    trackGa4Event(GA4_EVENTS.PFIN_REWARD_CLAIMED, {
      deal_id: allocated.deal.dealId
    });

    const session = getSession();
    sendLeadToLeadSquared({
      mobileNumber: session.mobile,
      activityType: 'PFIN Card Guaranteed Reward Claimed',
      rewardAllocated: allocated.deal.dealId,
      contentSlug: 'pfin-card'
    });

    openRewardModal(allocated.deal);
    renderPfinSection(container, onNavigate);
  }

  // View Won Reward Handler
  const viewWonBtn = wrapper.querySelector('#view-pfin-won-reward-btn');
  if (viewWonBtn) {
    viewWonBtn.addEventListener('click', () => {
      const userRewards = getUserRewards();
      const allocated = allocateRewardForGame('pfin_card', userRewards.claims);
      openRewardModal(allocated.deal);
    });
  }

  container.appendChild(wrapper);

  // Render Top Offers at the bottom of PFIN Card page
  renderTopOffersSection(container, onNavigate, {
    title: 'Top Offers For You',
    showHeading: true,
    isBottomSection: true
  });
}
