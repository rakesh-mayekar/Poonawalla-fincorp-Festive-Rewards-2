// Game 1: Spin & Win Canvas Wheel Engine SOT v1.3 Section 4.3 (Wireframe Theme)
import { playTickSound, playWinFanfare } from '../services/audioSynth.js';
import { allocateRewardForGame } from '../services/rewardEngine.js';
import { trackGa4Event, GA4_EVENTS } from '../services/gaService.js';
import { sendLeadToLeadSquared } from '../services/crmService.js';
import { getSession } from '../state/sessionState.js';
import { getUserRewards, saveRewardClaim, useCibilExtraSpin } from '../state/rewardState.js';
import { openOtpModal } from './otpModal.js';
import { openRewardModal } from './rewardModal.js';

// Wireframe Grayscale Segments
const WHEEL_SEGMENTS = [
  { label: 'Myntra ₹250', color: '#1A1A1A', dealId: 'DEAL-MYNTRA-250' },
  { label: 'KFC Popcorn', color: '#333333', dealId: 'DEAL-KFC-POPCORN' },
  { label: 'Swiggy ₹120', color: '#1D1D1D', dealId: 'DEAL-SWIGGY-120' },
  { label: 'Ajio ₹150', color: '#444444', dealId: 'DEAL-AJIO-150' },
  { label: 'Lifestyle ₹500', color: '#262626', dealId: 'DEAL-LIFESTYLE-500' },
  { label: 'Max ₹500', color: '#555555', dealId: 'DEAL-MAX-500' },
  { label: 'Homecentre ₹300', color: '#2F2F2F', dealId: 'DEAL-HOMECENTRE-300' },
  { label: 'Urban Ladder 10%', color: '#3B3B3B', dealId: 'DEAL-URBANLADDER-10' }
];

export function renderSpinWinGame(container) {
  const card = document.createElement('div');
  card.className = 'game-card-wrapper';

  const userRewards = getUserRewards();
  const spinClaim = userRewards.claims['spin_and_win'];
  const hasExtraSpin = userRewards.cibilExtraSpinUnlocked && !userRewards.cibilExtraSpinUsed;

  card.innerHTML = `
    <h3 class="festive-heading" style="font-size: 1.25rem; margin-bottom: 6px;">🎰 Spin & Win Festive Wheel</h3>
    <div class="game-instructions-box">
      Tap "SPIN NOW" to spin the wheel and reveal your guaranteed brand reward voucher!
    </div>

    ${hasExtraSpin ? `
      <div class="festive-tag tag-green" style="margin-bottom: 14px;">
        ⭐ Bonus Spin Active (Unlocked via Free CIBIL Check)!
      </div>
    ` : ''}

    <div class="spin-wheel-container">
      <svg class="wheel-pointer" viewBox="0 0 30 40">
        <polygon points="15,40 0,0 30,0" fill="#FFFFFF" stroke="#000000" stroke-width="2"/>
      </svg>
      <canvas id="spin-wheel-canvas" width="560" height="560"></canvas>
      <div class="spin-center-cap">PFL</div>
    </div>

    ${spinClaim && !hasExtraSpin ? `
      <div class="played-badge-overlay">
        ✓ You have already spun the wheel for this session!
        <br>
        <button class="btn-gold" id="view-previous-spin-reward" style="margin-top: 10px; font-size: 0.8rem; padding: 6px 16px;">
          🎁 View My Won Reward
        </button>
      </div>
    ` : `
      <button class="btn-gold glow-effect" id="spin-wheel-cta-btn" style="padding: 14px 32px; font-size: 1.05rem;">
        ⚡ SPIN NOW!
      </button>
    `}
  `;

  container.appendChild(card);

  // Setup Canvas Wheel Drawing
  const canvas = card.querySelector('#spin-wheel-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let currentAngle = 0;
  let isSpinning = false;

  function drawWheel(angle) {
    const numSegments = WHEEL_SEGMENTS.length;
    const arcSize = (2 * Math.PI) / numSegments;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = cx - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Outer Rim in White Wireframe
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 8, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#141414';
    ctx.fill();

    for (let i = 0; i < numSegments; i++) {
      const segAngle = angle + i * arcSize;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, segAngle, segAngle + arcSize);
      ctx.closePath();
      ctx.fillStyle = WHEEL_SEGMENTS[i].color;
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw Text Labels
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(segAngle + arcSize / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(WHEEL_SEGMENTS[i].label, radius - 25, 8);
      ctx.restore();
    }
  }

  drawWheel(currentAngle);

  // Previous Reward Button Listener
  const viewPrevBtn = card.querySelector('#view-previous-spin-reward');
  if (viewPrevBtn) {
    viewPrevBtn.addEventListener('click', () => {
      const currentRewards = getUserRewards();
      const allocated = allocateRewardForGame('spin_and_win', currentRewards.claims);
      openRewardModal(allocated.deal);
    });
  }

  // Spin CTA Handler
  const spinBtn = card.querySelector('#spin-wheel-cta-btn');
  if (!spinBtn) return;

  spinBtn.addEventListener('click', () => {
    if (isSpinning) return;

    const session = getSession();
    if (!session.isAuthenticated) {
      openOtpModal(() => {
        spinBtn.click();
      });
      return;
    }

    const currentRewards = getUserRewards();
    const allocated = allocateRewardForGame('spin', currentRewards.claims);
    const targetDealId = allocated.deal.dealId;

    let targetIndex = WHEEL_SEGMENTS.findIndex(s => s.dealId === targetDealId);
    if (targetIndex === -1) targetIndex = 0;

    const numSegments = WHEEL_SEGMENTS.length;
    const arcSize = (2 * Math.PI) / numSegments;
    const targetSegmentAngle = targetIndex * arcSize + arcSize / 2;
    const totalRotation = (5 * 2 * Math.PI) + (Math.PI * 1.5 - targetSegmentAngle);

    isSpinning = true;
    spinBtn.disabled = true;

    trackGa4Event(GA4_EVENTS.GAME_STARTED, { game_type: 'spin_and_win' });

    let start = null;
    const duration = 4000;
    let lastTickAngle = 0;

    function animateSpin(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      currentAngle = totalRotation * easeOut;

      if (currentAngle - lastTickAngle > arcSize) {
        playTickSound();
        lastTickAngle = currentAngle;
      }

      drawWheel(currentAngle);

      if (progress < 1) {
        requestAnimationFrame(animateSpin);
      } else {
        isSpinning = false;
        playWinFanfare();

        saveRewardClaim('spin_and_win', targetDealId);
        if (hasExtraSpin) {
          useCibilExtraSpin();
        }

        trackGa4Event(GA4_EVENTS.GAME_REWARD_CLAIMED, {
          game_type: 'spin_and_win',
          deal_id: targetDealId
        });

        sendLeadToLeadSquared({
          mobileNumber: session.mobile,
          activityType: 'Spin & Win Reward Claimed',
          rewardAllocated: targetDealId,
          contentSlug: 'play-spin'
        });

        setTimeout(() => {
          openRewardModal(allocated.deal);
        }, 500);
      }
    }

    requestAnimationFrame(animateSpin);
  });
}
