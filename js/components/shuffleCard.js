// Game 3: Shuffle Card 3D CSS Component SOT v1.3 Section 4.3
import { playTickSound, playWinFanfare } from '../services/audioSynth.js';
import { allocateRewardForGame } from '../services/rewardEngine.js';
import { trackGa4Event, GA4_EVENTS } from '../services/gaService.js';
import { sendLeadToLeadSquared } from '../services/crmService.js';
import { getSession } from '../state/sessionState.js';
import { getUserRewards, saveRewardClaim } from '../state/rewardState.js';
import { openOtpModal } from './otpModal.js';
import { openRewardModal } from './rewardModal.js';

export function renderShuffleCardGame(container) {
  const card = document.createElement('div');
  card.className = 'game-card-wrapper';

  const userRewards = getUserRewards();
  const shuffleClaim = userRewards.claims['shuffle_card'];

  card.innerHTML = `
    <h3 class="festive-heading" style="font-size: 1.3rem; margin-bottom: 6px;">🃏 Festive Card Shuffle</h3>
    <div class="game-instructions-box">
      Pick 1 face-down card from below to reveal your lucky festive brand deal!
    </div>

    ${shuffleClaim ? `
      <div class="played-badge-overlay">
        ✓ You have already picked your card for this session!
        <br>
        <button class="btn-gold" id="view-previous-shuffle-reward" style="margin-top: 10px; font-size: 0.8rem; padding: 6px 16px;">
          🎁 View My Won Reward
        </button>
      </div>
    ` : `
      <div class="shuffle-cards-container">
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
    `}
  `;

  container.appendChild(card);

  // View Previous Reward Handler
  const viewPrevBtn = card.querySelector('#view-previous-shuffle-reward');
  if (viewPrevBtn) {
    viewPrevBtn.addEventListener('click', () => {
      const currentRewards = getUserRewards();
      const allocated = allocateRewardForGame('shuffle', currentRewards.claims);
      openRewardModal(allocated.deal);
    });
    return;
  }

  // Shuffle Cards Click Listener
  const cards = card.querySelectorAll('.shuffle-card');
  let isPicking = false;

  cards.forEach(cardEl => {
    cardEl.addEventListener('click', () => {
      if (isPicking || cardEl.classList.contains('flipped')) return;

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
      const allocated = allocateRewardForGame('shuffle', currentRewards.claims);

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

      saveRewardClaim('shuffle_card', allocated.deal.dealId);

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
      }, 700);
    });
  });
}
