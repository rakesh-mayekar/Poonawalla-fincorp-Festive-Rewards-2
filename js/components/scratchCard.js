// Game 2: Scratch Card Canvas Wireframe Component SOT v1.3 Section 4.3
import { playScratchSound, playWinFanfare } from '../services/audioSynth.js';
import { allocateRewardForGame } from '../services/rewardEngine.js';
import { trackGa4Event, GA4_EVENTS } from '../services/gaService.js';
import { sendLeadToLeadSquared } from '../services/crmService.js';
import { getSession } from '../state/sessionState.js';
import { getUserRewards, saveRewardClaim } from '../state/rewardState.js';
import { openOtpModal } from './otpModal.js';
import { openRewardModal } from './rewardModal.js';

export function renderScratchCardGame(container) {
  const card = document.createElement('div');
  card.className = 'game-card-wrapper';

  const userRewards = getUserRewards();
  const scratchClaim = userRewards.claims['scratch_card'];

  card.innerHTML = `
    <h3 class="festive-heading" style="font-size: 1.25rem; margin-bottom: 6px;">✨ Festive Scratch Card</h3>
    <div class="game-instructions-box">
      Use your finger or mouse cursor to scratch the metallic wireframe overlay and reveal your reward!
    </div>

    ${scratchClaim ? `
      <div class="played-badge-overlay">
        ✓ You have already scratched your card for this session!
        <br>
        <button class="btn-gold" id="view-previous-scratch-reward" style="margin-top: 10px; font-size: 0.8rem; padding: 6px 16px;">
          🎁 View My Won Reward
        </button>
      </div>
    ` : `
      <div class="scratch-card-container">
        <div class="scratch-reward-underlay" id="scratch-underlay">
          <span class="scratch-reward-title" id="underlay-title">🔒 Scratch to Unlock</span>
          <span class="scratch-reward-code" id="underlay-code">••••••••</span>
        </div>
        <canvas id="scratch-canvas" width="270" height="180"></canvas>
      </div>
    `}
  `;

  container.appendChild(card);

  const viewPrevBtn = card.querySelector('#view-previous-scratch-reward');
  if (viewPrevBtn) {
    viewPrevBtn.addEventListener('click', () => {
      const currentRewards = getUserRewards();
      const allocated = allocateRewardForGame('scratch', currentRewards.claims);
      openRewardModal(allocated.deal);
    });
    return;
  }

  const canvas = card.querySelector('#scratch-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Fill Wireframe Grayscale Overlay Pattern
  ctx.fillStyle = '#2B2B2B';
  ctx.fillRect(0, 0, 270, 180);

  // Draw wireframe crosshatch grid lines
  ctx.strokeStyle = '#444444';
  ctx.lineWidth = 1;
  for (let i = 0; i < 270; i += 15) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 40, 180);
    ctx.stroke();
  }

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✨ SCRATCH HERE WITH FINGER ✨', 135, 95);

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

    const imgData = ctx.getImageData(0, 0, 270, 180);
    const pixels = imgData.data;
    let transparentCount = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentCount++;
    }

    scratchedPercent = (transparentCount / (pixels.length / 4)) * 100;

    if (scratchedPercent >= 40) {
      isRevealed = true;
      ctx.clearRect(0, 0, 270, 180);
      playWinFanfare();

      const session = getSession();
      saveRewardClaim('scratch_card', allocatedDeal.dealId);

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
      }, 500);
    }
  }

  function handleStart(e) {
    const session = getSession();
    if (!session.isAuthenticated) {
      openOtpModal(() => {
        const currentRewards = getUserRewards();
        const alloc = allocateRewardForGame('scratch', currentRewards.claims);
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
      const alloc = allocateRewardForGame('scratch', currentRewards.claims);
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
