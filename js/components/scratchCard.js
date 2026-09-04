// Game 2: Scratch Card Canvas Component
import { playScratchSound, playWinFanfare } from '../services/audioSynth.js';
import { allocateRewardForGame } from '../services/rewardEngine.js';
import { trackGa4Event, GA4_EVENTS } from '../services/gaService.js';
import { sendLeadToLeadSquared } from '../services/crmService.js';
import { getSession } from '../state/sessionState.js';
import { isPlayAndWinClaimed, saveRewardClaim, getUserRewards } from '../state/rewardState.js';
import { openOtpModal } from './otpModal.js';
import { openRewardModal } from './rewardModal.js';
import { openRewardLimitModal } from './rewardLimitModal.js';

export function renderScratchCardGame(container, onNavigate) {
  const card = document.createElement('div');
  card.className = 'game-card-wrapper';

  const isClaimed = isPlayAndWinClaimed();

  card.innerHTML = `
    <h3 class="festive-heading" style="font-size: 1.35rem; margin-bottom: 6px;">✨ Festive Scratch Card</h3>
    <p class="game-instructions-box" style="margin-bottom: 20px; font-size: 0.9rem; color: var(--wf-text-secondary);">
      Use your finger or mouse cursor to scratch the metallic card and reveal your brand voucher reward!
    </p>

    ${isClaimed ? `
      <div class="played-badge-overlay" style="max-width: 480px; margin: 0 auto; background: #FFFBEB; border: 1px solid #FDE68A; padding: 20px; border-radius: 8px; color: #92400E; font-weight: 600; font-size: 0.92rem; text-align: center;">
        ✓ You have already unlocked your Play & Win reward!
        <div style="margin-top: 14px; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
          <button class="btn-primary" id="view-previous-scratch-reward" style="font-size: 0.85rem; padding: 8px 20px;">
            🎁 View My Won Voucher
          </button>
          <button class="btn-secondary" id="explore-other-scratch-activities" style="font-size: 0.85rem; padding: 8px 20px; background: #FFFFFF;">
            Explore Other Activities &rarr;
          </button>
        </div>
      </div>
    ` : `
      <div class="scratch-card-container" style="margin: 0 auto; width: 280px; height: 180px; position: relative; border-radius: 8px; overflow: hidden; border: 1px solid var(--wf-border); box-shadow: 0 4px 16px rgba(0,0,0,0.06);">
        <div class="scratch-reward-underlay" id="scratch-underlay" style="position: absolute; inset: 0; background: #FFFFFF; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 16px;">
          <span class="scratch-reward-title" id="underlay-title" style="font-weight: 800; font-size: 0.95rem; color: var(--wf-text-primary); text-align: center;">🔒 Scratch to Unlock</span>
          <span class="scratch-reward-code" id="underlay-code" style="font-family: var(--font-mono); font-size: 1.1rem; color: #10B981; font-weight: 800; margin-top: 6px;">••••••••</span>
        </div>
        <canvas id="scratch-canvas" width="280" height="180" style="position: absolute; inset: 0; cursor: pointer; z-index: 2;"></canvas>
      </div>
      <p style="text-align: center; font-size: 0.78rem; color: var(--wf-text-secondary); margin-top: 12px;">
        * One guaranteed reward per mobile number across all festive games
      </p>
    `}
  `;

  container.appendChild(card);

  const viewPrevBtn = card.querySelector('#view-previous-scratch-reward');
  if (viewPrevBtn) {
    viewPrevBtn.addEventListener('click', () => {
      const currentRewards = getUserRewards();
      const allocated = allocateRewardForGame('play_and_win', currentRewards.claims);
      openRewardModal(allocated.deal);
    });
  }

  const exploreBtn = card.querySelector('#explore-other-scratch-activities');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
      openRewardLimitModal({
        currentActivityKey: 'play_and_win',
        onNavigate
      });
    });
  }

  if (isClaimed) return;

  const canvas = card.querySelector('#scratch-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Fill Wireframe Grayscale Overlay Pattern
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
  ctx.fillText('✨ SCRATCH HERE WITH FINGER ✨', 140, 95);

  let isDrawing = false;
  let scratchedPercent = 0;
  let allocatedDeal = null;
  let isRevealed = false;

  function scratch(x, y) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, 2 * Math.PI);
    ctx.fill();
    playScratchSound();
    checkScratchedPercentage();
  }

  function checkScratchedPercentage() {
    if (isRevealed) return;

    const imgData = ctx.getImageData(0, 0, 280, 180);
    const pixels = imgData.data;
    let transparentCount = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentCount++;
    }

    scratchedPercent = (transparentCount / (pixels.length / 4)) * 100;

    if (scratchedPercent >= 38) {
      isRevealed = true;
      ctx.clearRect(0, 0, 280, 180);
      playWinFanfare();

      const session = getSession();
      saveRewardClaim('play_and_win', allocatedDeal.dealId);

      trackGa4Event(GA4_EVENTS.GAME_REWARD_CLAIMED, {
        game_type: 'scratch_card',
        deal_id: allocatedDeal.dealId
      });

      sendLeadToLeadSquared({
        mobileNumber: session.mobile,
        activityType: 'Scratch Card Reward Claimed',
        rewardAllocated: allocatedDeal.dealId,
        contentSlug: 'play-scratch'
      });

      setTimeout(() => {
        openRewardModal(allocatedDeal);
        renderScratchCardGame(container, onNavigate);
      }, 500);
    }
  }

  function handleStart(e) {
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
        const currentRewards = getUserRewards();
        const alloc = allocateRewardForGame('play_and_win', currentRewards.claims);
        allocatedDeal = alloc.deal;

        const underlayTitle = card.querySelector('#underlay-title');
        const underlayCode = card.querySelector('#underlay-code');
        if (underlayTitle && underlayCode) {
          underlayTitle.textContent = allocatedDeal.offerTitle;
          underlayCode.textContent = allocatedDeal.couponCode;
        }

        trackGa4Event(GA4_EVENTS.GAME_STARTED, { game_type: 'scratch_card' });
      });
      return;
    }

    if (!allocatedDeal) {
      const currentRewards = getUserRewards();
      const alloc = allocateRewardForGame('play_and_win', currentRewards.claims);
      allocatedDeal = alloc.deal;

      const underlayTitle = card.querySelector('#underlay-title');
      const underlayCode = card.querySelector('#underlay-code');
      if (underlayTitle && underlayCode) {
        underlayTitle.textContent = allocatedDeal.offerTitle;
        underlayCode.textContent = allocatedDeal.couponCode;
      }

      trackGa4Event(GA4_EVENTS.GAME_STARTED, { game_type: 'scratch_card' });
    }

    isDrawing = true;
    handleMove(e);
  }

  function handleMove(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    scratch(x, y);
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
