// Game 1: Spin & Win Canvas Wheel Engine
import { playTickSound, playWinFanfare } from '../services/audioSynth.js';
import { allocateRewardForGame } from '../services/rewardEngine.js';
import { trackGa4Event, GA4_EVENTS } from '../services/gaService.js';
import { sendLeadToLeadSquared } from '../services/crmService.js';
import { getSession } from '../state/sessionState.js';
import { isPlayAndWinClaimed, saveRewardClaim, getUserRewards } from '../state/rewardState.js';
import { openOtpModal } from './otpModal.js';
import { openRewardModal } from './rewardModal.js';
import { openRewardLimitModal } from './rewardLimitModal.js';

const WHEEL_SEGMENTS = [
  { label: 'Lenovo ₹5,000', color: '#1A1A1A', dealId: 'DEAL-LENOVO-5000' },
  { label: 'Tata Cliq ₹1,250', color: '#333333', dealId: 'DEAL-TATACLIQ-1250' },
  { label: 'Senco 25% Off', color: '#242424', dealId: 'DEAL-SENCO-25' },
  { label: 'Myntra ₹250', color: '#3F3F46', dealId: 'DEAL-MYNTRA-250' },
  { label: 'JBL 15% Off', color: '#18181B', dealId: 'DEAL-JBL-15' },
  { label: 'Joyalukkas 20%', color: '#27272A', dealId: 'DEAL-JOYALUKKAS-20' },
  { label: 'Titan 10% Off', color: '#52525B', dealId: 'DEAL-TITAN-10' },
  { label: 'Ajio Luxe 8%', color: '#2D2D30', dealId: 'DEAL-AJIO-LUXE-8' }
];

export function renderSpinWinGame(container, onNavigate) {
  const card = document.createElement('div');
  card.className = 'game-card-wrapper';

  const isClaimed = isPlayAndWinClaimed();

  card.innerHTML = `
    <h3 class="festive-heading" style="font-size: 1.35rem; margin-bottom: 6px;">🎰 Spin & Win Festive Wheel</h3>
    <p class="game-instructions-box" style="margin-bottom: 20px; font-size: 0.9rem; color: var(--wf-text-secondary);">
      Verify your mobile number, tap "SPIN NOW" to spin the wheel, and reveal your guaranteed brand reward voucher!
    </p>

    <div class="spin-wheel-container">
      <svg class="wheel-pointer" viewBox="0 0 30 40">
        <polygon points="15,40 0,0 30,0" fill="#FFFFFF" stroke="#111111" stroke-width="2"/>
      </svg>
      <canvas id="spin-wheel-canvas" width="560" height="560"></canvas>
      <div class="spin-center-cap">PFL</div>
    </div>

    <div style="margin-top: 24px; text-align: center;">
      ${isClaimed ? `
        <div class="played-badge-overlay" style="max-width: 480px; margin: 0 auto; background: #FFFBEB; border: 1px solid #FDE68A; padding: 18px 20px; border-radius: 8px; color: #92400E; font-weight: 600; font-size: 0.92rem;">
          ✓ You have already unlocked your Play & Win reward!
          <div style="margin-top: 12px; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
            <button class="btn-primary" id="view-previous-spin-reward" style="font-size: 0.85rem; padding: 8px 20px;">
              🎁 View My Won Voucher
            </button>
            <button class="btn-secondary" id="explore-other-spin-activities" style="font-size: 0.85rem; padding: 8px 20px; background: #FFFFFF;">
              Explore Other Activities &rarr;
            </button>
          </div>
        </div>
      ` : `
        <button class="btn-primary glow-effect" id="spin-wheel-cta-btn" style="padding: 16px 44px; font-size: 1.1rem; border-radius: var(--radius-sm);">
          ⚡ SPIN NOW!
        </button>
        <p style="font-size: 0.78rem; color: var(--wf-text-secondary); margin-top: 8px;">
          * One guaranteed reward per mobile number across all festive games
        </p>
      `}
    </div>
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
    const radius = cx - 12;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Outer Rim
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 8, 0, 2 * Math.PI);
    ctx.fillStyle = '#111111';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFFFFF';
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
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Text Labels
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(segAngle + arcSize / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 20px "SF Pro Display", "Inter", sans-serif';
      ctx.fillText(WHEEL_SEGMENTS[i].label, radius - 28, 7);
      ctx.restore();
    }
  }

  drawWheel(currentAngle);

  // View Won Voucher Handler
  const viewPrevBtn = card.querySelector('#view-previous-spin-reward');
  if (viewPrevBtn) {
    viewPrevBtn.addEventListener('click', () => {
      const userRewards = getUserRewards();
      const allocated = allocateRewardForGame('play_and_win', userRewards.claims);
      openRewardModal(allocated.deal);
    });
  }

  const exploreBtn = card.querySelector('#explore-other-spin-activities');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
      openRewardLimitModal({
        currentActivityKey: 'play_and_win',
        onNavigate
      });
    });
  }

  // Spin CTA Handler
  const spinBtn = card.querySelector('#spin-wheel-cta-btn');
  if (!spinBtn) return;

  spinBtn.addEventListener('click', () => {
    if (isSpinning) return;

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
        spinBtn.click();
      });
      return;
    }

    // Allocate Reward
    const userRewards = getUserRewards();
    const allocated = allocateRewardForGame('play_and_win', userRewards.claims);
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
    const duration = 3800;
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

        saveRewardClaim('play_and_win', targetDealId);

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
          renderSpinWinGame(container, onNavigate); // Re-render in claimed state
        }, 500);
      }
    }

    requestAnimationFrame(animateSpin);
  });
}
