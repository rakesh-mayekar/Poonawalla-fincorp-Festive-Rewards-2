// Check CIBIL Component
import { buildUtmUrl } from '../data/loansData.js';
import { trackGa4Event, GA4_EVENTS } from '../services/gaService.js';
import { sendLeadToLeadSquared } from '../services/crmService.js';
import { getSession } from '../state/sessionState.js';
import { isActivityClaimed, saveRewardClaim } from '../state/rewardState.js';
import { allocateRewardForGame } from '../services/rewardEngine.js';
import { openOtpModal } from './otpModal.js';
import { openRewardModal } from './rewardModal.js';
import { openRewardLimitModal } from './rewardLimitModal.js';
import { renderTopOffersSection } from './topOffersScroller.js';

export function renderCibilSection(container, onNavigate) {
  const wrapper = document.createElement('div');
  wrapper.className = 'loans-container section-wrapper';

  const baseCibilUrl = 'https://poonawallafincorp.com/credit-score/check-cibil-score';
  const finalCibilUrl = buildUtmUrl(baseCibilUrl, 'cibil-check');

  const cibilAlreadyClaimed = isActivityClaimed('check_cibil');

  wrapper.innerHTML = `
    <div class="section-header align-left">
      <span class="section-kicker" style="color: var(--wf-text-secondary); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">• OFFICIAL CREDIT HEALTH</span>
      <h2 style="margin-top: 4px;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="section-icon"><path d="M11 4C11 8.5 7.5 11 4 11C7.5 11 11 13.5 11 18C11 13.5 14.5 11 19 11C14.5 11 11 8.5 11 4Z" /><circle cx="6" cy="17" r="1.5" /><path d="M18 5 v4 m-2 -2 h4" /></svg>
        Check CIBIL <span style="font-style: italic; font-weight: 500; color: var(--wf-text-secondary); margin-left: 6px;">Score</span>
      </h2>
      <p class="subheading">Check your official credit score instantly without impacting your credit rating. High scores unlock special festive loan interest rates!</p>
    </div>

    <!-- Prominent FREE Tag above the Card -->
    <div style="max-width: 800px; margin: 0 auto 12px auto; display: flex; justify-content: flex-start;">
      <span class="prominent-free-badge" style="background: #10B981; color: #FFFFFF; font-weight: 800; font-size: 0.85rem; letter-spacing: 0.08em; padding: 6px 16px; border-radius: 4px; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 8px rgba(16, 185, 129, 0.25);">
        ✨ 100% FREE CREDIT CHECK
      </span>
    </div>

    <div class="cibil-main-card" style="background: var(--wf-surface); padding: 36px; border-radius: var(--radius-lg); border: 1px solid var(--wf-border); box-shadow: var(--shadow-sm); max-width: 800px; margin: 0 auto 48px auto; text-align: center;">
      <div style="font-size: 3.5rem; margin-bottom: 16px;">📈</div>
      
      <h3 style="font-size: 1.6rem; color: var(--wf-text-primary); margin-bottom: 8px;">Check Your Official CIBIL Report</h3>
      <p style="font-size: 0.95rem; color: var(--wf-text-secondary); max-width: 550px; margin: 0 auto 24px auto;">
        Get an instant credit score analysis with complete report breakdown and unlock an exclusive partner voucher reward directly!
      </p>

      <!-- Festive Voucher Offer Box -->
      <div style="background: var(--wf-surface-subtle); padding: 18px 24px; border-radius: var(--radius-md); margin-bottom: 28px; border: 1px dashed #10B981; text-align: left; display: flex; align-items: center; gap: 16px;">
        <div style="font-size: 2.2rem; flex-shrink: 0;">🎁</div>
        <div>
          <span style="color: #065F46; font-weight: 800; font-size: 0.95rem; display: block; margin-bottom: 2px;">
            Guaranteed Festive Partner Voucher
          </span>
          <p style="font-size: 0.85rem; color: var(--wf-text-secondary); margin: 0;">
            Completing your CIBIL check entitles you to an instant brand discount voucher from top lifestyle partners!
          </p>
        </div>
      </div>

      <!-- Action Area -->
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: center;">
        <a href="${finalCibilUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" id="check-cibil-cta" style="padding: 16px 48px; font-size: 1.1rem; border-radius: var(--radius-sm); display: inline-flex; align-items: center; gap: 10px;">
          🔍 Check CIBIL Score & Unlock Reward ↗
        </a>

        ${cibilAlreadyClaimed ? `
          <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); padding: 16px 20px; border-radius: var(--radius-sm); color: #065F46; font-weight: 600; font-size: 0.95rem; margin-top: 8px; width: 100%; max-width: 480px; text-align: center;">
            ✓ You have already unlocked your Check CIBIL reward voucher!
            <br>
            <button class="btn-secondary" id="view-cibil-won-reward-btn" style="margin-top: 12px; font-size: 0.85rem; padding: 8px 20px;">
              🎁 View My Claimed Voucher
            </button>
          </div>
        ` : `
          <p style="font-size: 0.8rem; color: var(--wf-text-secondary); margin: 4px 0 0 0;">
            No credit score impact • 100% Free & Secure RBI Regulated Channel
          </p>
        `}
      </div>

      <!-- Feature Highlights -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-top: 36px; padding-top: 28px; border-top: 1px solid var(--wf-border); text-align: left;">
        <div style="display: flex; align-items: flex-start; gap: 10px;">
          <span style="color: #10B981; font-weight: bold; font-size: 1.1rem;">✓</span>
          <div>
            <strong style="font-size: 0.85rem; display: block; color: var(--wf-text-primary);">Zero Credit Impact</strong>
            <span style="font-size: 0.78rem; color: var(--wf-text-secondary);">Soft credit check doesn't lower rating</span>
          </div>
        </div>
        <div style="display: flex; align-items: flex-start; gap: 10px;">
          <span style="color: #10B981; font-weight: bold; font-size: 1.1rem;">✓</span>
          <div>
            <strong style="font-size: 0.85rem; display: block; color: var(--wf-text-primary);">Direct Voucher Reward</strong>
            <span style="font-size: 0.78rem; color: var(--wf-text-secondary);">Instant brand voucher upon verification</span>
          </div>
        </div>
        <div style="display: flex; align-items: flex-start; gap: 10px;">
          <span style="color: #10B981; font-weight: bold; font-size: 1.1rem;">✓</span>
          <div>
            <strong style="font-size: 0.85rem; display: block; color: var(--wf-text-primary);">Custom Loan Offers</strong>
            <span style="font-size: 0.78rem; color: var(--wf-text-secondary);">Pre-approved festive limits unlocked</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // CIBIL CTA Click: Directs to CIBIL check & allocates reward upon return/OTP
  const cibilCta = wrapper.querySelector('#check-cibil-cta');
  if (cibilCta) {
    cibilCta.addEventListener('click', () => {
      const session = getSession();
      trackGa4Event(GA4_EVENTS.CIBIL_REDIRECT_CLICKED);

      sendLeadToLeadSquared({
        mobileNumber: session.mobile || 'Guest / Direct Click',
        activityType: 'CIBIL Check Redirect',
        contentSlug: 'cibil-check'
      });

      // If user is already claimed for cibil, clicking will not issue new reward
      if (cibilAlreadyClaimed) {
        return;
      }

      // If not authenticated, prompt OTP verification to attach and grant voucher directly
      if (!session.isAuthenticated) {
        setTimeout(() => {
          openOtpModal(() => {
            handleCibilRewardAllocation();
          });
        }, 1500);
      } else {
        setTimeout(() => {
          handleCibilRewardAllocation();
        }, 1500);
      }
    });
  }

  function handleCibilRewardAllocation() {
    if (isActivityClaimed('check_cibil')) {
      openRewardLimitModal({
        currentActivityKey: 'check_cibil',
        onNavigate
      });
      return;
    }

    const currentRewards = getSession();
    const allocated = allocateRewardForGame('check_cibil');
    saveRewardClaim('check_cibil', allocated.deal.dealId);

    trackGa4Event(GA4_EVENTS.GAME_REWARD_CLAIMED, {
      activity: 'check_cibil',
      deal_id: allocated.deal.dealId
    });

    openRewardModal(allocated.deal);
    renderCibilSection(container, onNavigate); // Re-render to update state
  }

  // View Already Won Voucher
  const viewWonBtn = wrapper.querySelector('#view-cibil-won-reward-btn');
  if (viewWonBtn) {
    viewWonBtn.addEventListener('click', () => {
      const allocated = allocateRewardForGame('check_cibil');
      openRewardModal(allocated.deal);
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
