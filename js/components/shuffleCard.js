// Game 3: Shuffle Card 3D Component
import { playTickSound, playWinFanfare } from '../services/audioSynth.js';
import { allocateRewardForGame } from '../services/rewardEngine.js';
import { trackGa4Event, GA4_EVENTS } from '../services/gaService.js';
import { sendLeadToLeadSquared } from '../services/crmService.js';
import { getSession } from '../state/sessionState.js';
import { isPlayAndWinClaimed, saveRewardClaim, getUserRewards } from '../state/rewardState.js';
import { openOtpModal } from './otpModal.js';
import { openRewardModal } from './rewardModal.js';
import { openRewardLimitModal } from './rewardLimitModal.js';

export function renderShuffleCardGame(container, onNavigate) {
  const card = document.createElement('div');
  card.className = 'game-card-wrapper';

  const isClaimed = isPlayAndWinClaimed();

  card.innerHTML = `
    <h3 class="festive-heading" style="font-size: 1.35rem; margin-bottom: 6px;">🃏 Festive Card Shuffle</h3>
    <p class="game-instructions-box" style="margin-bottom: 20px; font-size: 0.9rem; color: var(--wf-text-secondary);">
      Pick 1 face-down card from below to reveal your lucky festive brand partner deal!
    </p>

    ${isClaimed ? `
      <div class="played-badge-overlay" style="max-width: 480px; margin: 0 auto; background: #FFFBEB; border: 1px solid #FDE68A; padding: 20px; border-radius: 8px; color: #92400E; font-weight: 600; font-size: 0.92rem; text-align: center;">
        ✓ You have already unlocked your Play & Win reward!
        <div style="margin-top: 14px; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
          <button class="btn-primary" id="view-previous-shuffle-reward" style="font-size: 0.85rem; padding: 8px 20px;">
            🎁 View My Won Voucher
          </button>
          <button class="btn-secondary" id="explore-other-shuffle-activities" style="font-size: 0.85rem; padding: 8px 20px; background: #FFFFFF;">
            Explore Other Activities &rarr;
          </button>
        </div>
      </div>
    ` : `
      <div class="shuffle-cards-container" style="display: flex; gap: 16px; justify-content: center; margin: 20px 0; perspective: 1000px;">
        <div class="shuffle-card" data-card-idx="0">
          <div class="card-face card-back">🎴<br>PICK</div>
          <div class="card-face card-front">
            <span class="card-front-title" id="front-title-0">🎉 WINNER!</span>
          </div>
        </div>

        <div class="shuffle-card" data-card-idx="1">
          <div class="card-face card-back">🎴<br>PICK</div>
          <div class="card-face card-front">
            <span class="card-front-title" id="front-title-1">🎉 WINNER!</span>
          </div>
        </div>

        <div class="shuffle-card" data-card-idx="2">
          <div class="card-face card-back">🎴<br>PICK</div>
          <div class="card-face card-front">
            <span class="card-front-title" id="front-title-2">🎉 WINNER!</span>
          </div>
        </div>
      </div>
      <p style="text-align: center; font-size: 0.78rem; color: var(--wf-text-secondary); margin-top: 12px;">
        * One guaranteed reward per mobile number across all festive games
      </p>
    `}
  `;

  container.appendChild(card);

  // View Won Reward Handler
  const viewPrevBtn = card.querySelector('#view-previous-shuffle-reward');
  if (viewPrevBtn) {
    viewPrevBtn.addEventListener('click', () => {
      const currentRewards = getUserRewards();
      const allocated = allocateRewardForGame('play_and_win', currentRewards.claims);
      openRewardModal(allocated.deal);
    });
  }

  const exploreBtn = card.querySelector('#explore-other-shuffle-activities');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
      openRewardLimitModal({
        currentActivityKey: 'play_and_win',
        onNavigate
      });
    });
  }

  if (isClaimed) return;

  // Shuffle Cards Click Listener
  const cards = card.querySelectorAll('.shuffle-card');
  let isPicking = false;

  cards.forEach(cardEl => {
    cardEl.addEventListener('click', () => {
      if (isPicking || cardEl.classList.contains('flipped')) return;

      if (isPlayAndWinClaimed()) {
        openRewardLimitModal({
          currentActivityKey: 'play_and_win',
          onNavigate
        });
        return;
      }

      const session = getSession();
      if (!session.isAuthenticated) {
        openOtpModal(() => {
          cardEl.click();
        });
        return;
      }

      isPicking = true;
      playTickSound();

      // Allocate Reward
      const currentRewards = getUserRewards();
      const allocated = allocateRewardForGame('play_and_win', currentRewards.claims);

      // Set front text
      const idx = cardEl.getAttribute('data-card-idx');
      const frontTitle = card.querySelector(`#front-title-${idx}`);
      if (frontTitle) {
        frontTitle.textContent = allocated.deal.brandName;
      }

      // Flip card animation
      cardEl.classList.add('flipped');
      playWinFanfare();

      if (window.confetti) {
        window.confetti({ particleCount: 90, spread: 65, origin: { y: 0.6 } });
      }

      saveRewardClaim('play_and_win', allocated.deal.dealId);

      trackGa4Event(GA4_EVENTS.GAME_REWARD_CLAIMED, {
        game_type: 'shuffle_card',
        deal_id: allocated.deal.dealId
      });

      sendLeadToLeadSquared({
        mobileNumber: session.mobile,
        activityType: 'Shuffle Card Reward Claimed',
        rewardAllocated: allocated.deal.dealId,
        contentSlug: 'play-shuffle'
      });

      setTimeout(() => {
        openRewardModal(allocated.deal);
        renderShuffleCardGame(container, onNavigate);
      }, 700);
    });
  });
}
