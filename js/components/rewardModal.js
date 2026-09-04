// Common Reward Redemption Screen Modal Component SOT v1.3 Section 5 & Section 13.2
import { trackGa4Event, GA4_EVENTS } from '../services/gaService.js';
import { getSession, saveSession } from '../state/sessionState.js';
import { saveRewardClaim } from '../state/rewardState.js';
import { sendLeadToLeadSquared } from '../services/crmService.js';

export function getMaskedCouponCode(code) {
  if (!code) return 'PFLLEN*****K';
  if (code.length <= 6) {
    return code.slice(0, 3) + '*****' + code.slice(-1);
  }
  const prefix = code.slice(0, 6);
  const suffix = code.slice(-1);
  return `${prefix}*****${suffix}`;
}

export function openRewardModal(deal, options = {}) {
  const container = document.querySelector('#reward-modal-container');
  if (!container) return;

  const session = getSession();
  let isAuthenticated = session && session.isAuthenticated;
  const fullCode = deal.couponCode || 'PFLLENOVO5K';
  const maskedCode = getMaskedCouponCode(fullCode);

  container.innerHTML = `
    <div class="modal-backdrop active" id="reward-modal-backdrop">
      <div class="modal-card reward-reveal-card ${!isAuthenticated ? 'has-inline-otp' : ''}">
        <button class="modal-close-btn" id="reward-close-btn">&times;</button>
        
        <div class="reward-brand-logo-large">
          ${deal.brandInitials || 'PFL'}
        </div>

        <span class="festive-tag ${isAuthenticated ? 'tag-green' : 'tag-locked'}" id="modal-festive-tag" style="margin-bottom: 8px;">
          ${isAuthenticated ? '🎁 Reward Unlocked!' : '🔒 Reward Locked - Verify Mobile'}
        </span>

        <h3 class="reward-offer-title">${deal.offerTitle}</h3>
        <p class="reward-offer-desc">${deal.offerDescription}</p>

        <!-- Coupon Code Box (Masked when unverified) -->
        <div class="coupon-display-box ${!isAuthenticated ? 'coupon-locked' : ''}" id="coupon-box-wrapper">
          <div class="coupon-code-meta">
            <span class="coupon-code-text" id="modal-coupon-code">${isAuthenticated ? fullCode : maskedCode}</span>
            <span class="coupon-lock-hint" id="coupon-lock-hint" style="${isAuthenticated ? 'display: none;' : ''}">
              🔒 Complete verification below to unlock full code
            </span>
          </div>
          <button class="copy-btn ${!isAuthenticated ? 'copy-btn-disabled' : ''}" id="copy-coupon-btn" ${!isAuthenticated ? 'disabled' : ''}>
            <span id="copy-btn-icon">${isAuthenticated ? '📋' : '🔒'}</span> 
            <span id="copy-btn-label">${isAuthenticated ? 'Copy Code' : 'Locked'}</span>
          </button>
        </div>

        <!-- Inline OTP Verification Box (shown if not authenticated) -->
        <div class="modal-inline-otp-section" id="modal-inline-otp-wrap" style="${isAuthenticated ? 'display: none;' : ''}">
          <div class="inline-otp-card">
            <div class="inline-otp-kicker">📱 UNLOCK YOUR GUARANTEED VOUCHER</div>
            <p class="inline-otp-hint">Enter your mobile number to verify with OTP and instantly reveal your full voucher code!</p>
            
            <!-- Step 1: Mobile Input -->
            <div id="modal-otp-step-1" class="modal-otp-step">
              <div class="mobile-input-wrap">
                <span class="country-code-flag">🇮🇳 +91</span>
                <input type="tel" id="modal-mobile-input" class="phone-input" placeholder="98765 43210" maxlength="10" pattern="[6-9][0-9]{9}">
              </div>
              <button type="button" class="btn-primary glow-effect" id="modal-send-otp-btn" style="width: 100%; margin-top: 10px; padding: 12px; font-weight: 700;">
                Get OTP to Unlock 🚀
              </button>
            </div>

            <!-- Step 2: 6-Digit OTP Box -->
            <div id="modal-otp-step-2" class="modal-otp-step" style="display: none;">
              <div class="modal-otp-sent-info">
                OTP sent to <strong id="modal-sent-phone-label">+91 XXXXXXXXXX</strong>
                <button type="button" class="edit-phone-btn" id="modal-edit-phone-btn">Edit</button>
              </div>

              <div class="otp-boxes-group">
                <input type="text" class="otp-box-digit modal-otp-digit" maxlength="1" pattern="[0-9]" inputmode="numeric">
                <input type="text" class="otp-box-digit modal-otp-digit" maxlength="1" pattern="[0-9]" inputmode="numeric">
                <input type="text" class="otp-box-digit modal-otp-digit" maxlength="1" pattern="[0-9]" inputmode="numeric">
                <input type="text" class="otp-box-digit modal-otp-digit" maxlength="1" pattern="[0-9]" inputmode="numeric">
                <input type="text" class="otp-box-digit modal-otp-digit" maxlength="1" pattern="[0-9]" inputmode="numeric">
                <input type="text" class="otp-box-digit modal-otp-digit" maxlength="1" pattern="[0-9]" inputmode="numeric">
              </div>

              <button type="button" class="btn-primary glow-effect" id="modal-verify-unlock-btn" style="width: 100%; margin-top: 8px; padding: 12px; font-weight: 700;">
                Verify & Unlock Full Code ✨
              </button>
            </div>

            <!-- Step 3: Verified Success State -->
            <div id="modal-otp-step-success" class="modal-otp-step" style="display: none;">
              <div class="otp-success-banner">
                <span class="success-check-icon">✓</span>
                <div>
                  <strong>Mobile Verified Successfully!</strong>
                  <div style="font-size: 0.78rem; color: #065F46;">Your full voucher code is unlocked and ready to use.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Redemption Steps -->
        <div class="redemption-steps-box" id="modal-redemption-steps">
          <div class="redemption-steps-title">
            Channel: ${deal.channel === 'Online + Offline' ? '🏬 Online & Store Counter' : '🌐 Online Only'}
          </div>
          <div style="white-space: pre-line;">${deal.redemptionInstructions}</div>
        </div>

        <details style="text-align: left; font-size: 0.72rem; color: var(--wf-text-secondary); margin-bottom: 16px;">
          <summary style="cursor: pointer; color: var(--wf-text-primary); font-weight: 600;">Terms & Conditions</summary>
          <p style="margin-top: 6px;">${deal.termsAndConditions}</p>
        </details>

        <div class="modal-action-buttons-wrap">
          <a href="${deal.redemptionUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary glow-effect" id="modal-redeem-link" style="width: 100%; padding: 12px; display: block; text-align: center; text-decoration: none;">
            Redeem Offer on Partner Site ↗
          </a>
        </div>
      </div>
    </div>

    <div class="toast-notification" id="toast-notif">✓ Coupon code copied to clipboard!</div>
  `;

  const backdrop = container.querySelector('#reward-modal-backdrop');
  const closeBtn = container.querySelector('#reward-close-btn');
  const copyBtn = container.querySelector('#copy-coupon-btn');
  const toast = container.querySelector('#toast-notif');
  const couponText = container.querySelector('#modal-coupon-code');
  const festiveTag = container.querySelector('#modal-festive-tag');
  const lockHint = container.querySelector('#coupon-lock-hint');
  const couponBox = container.querySelector('#coupon-box-wrapper');

  const step1 = container.querySelector('#modal-otp-step-1');
  const step2 = container.querySelector('#modal-otp-step-2');
  const stepSuccess = container.querySelector('#modal-otp-step-success');

  const mobileInput = container.querySelector('#modal-mobile-input');
  const sendOtpBtn = container.querySelector('#modal-send-otp-btn');
  const sentPhoneLabel = container.querySelector('#modal-sent-phone-label');
  const editPhoneBtn = container.querySelector('#modal-edit-phone-btn');
  const verifyUnlockBtn = container.querySelector('#modal-verify-unlock-btn');
  const otpDigits = container.querySelectorAll('.modal-otp-digit');

  const closeModal = () => {
    backdrop.classList.remove('active');
    setTimeout(() => { container.innerHTML = ''; }, 300);
  };

  closeBtn.addEventListener('click', closeModal);

  // Copy Button Click Handler
  copyBtn.addEventListener('click', () => {
    if (!isAuthenticated) return;
    navigator.clipboard.writeText(fullCode).then(() => {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);

      trackGa4Event(GA4_EVENTS.COUPON_COPIED, {
        deal_id: deal.dealId,
        brand: deal.brandName
      });
    }).catch(() => {
      alert(`Coupon code: ${fullCode}`);
    });
  });

  // Step 1: Send OTP Click Handler
  if (sendOtpBtn) {
    sendOtpBtn.addEventListener('click', () => {
      const val = mobileInput.value.trim();
      if (!/^[6-9]\d{9}$/.test(val)) {
        alert('Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.');
        return;
      }

      sentPhoneLabel.textContent = `+91 ${val}`;
      step1.style.display = 'none';
      step2.style.display = 'block';

      // Auto-fill test demo code 888888 for easy testing
      const demoCode = ['8', '8', '8', '8', '8', '8'];
      otpDigits.forEach((digitInput, idx) => {
        digitInput.value = demoCode[idx];
      });
      otpDigits[0].focus();
    });
  }

  // Edit Phone Number Click Handler
  if (editPhoneBtn) {
    editPhoneBtn.addEventListener('click', () => {
      step2.style.display = 'none';
      step1.style.display = 'block';
      mobileInput.focus();
    });
  }

  // OTP Digits Auto-Advance
  otpDigits.forEach((digitInput, idx) => {
    digitInput.addEventListener('input', (e) => {
      if (e.target.value.length === 1 && idx < otpDigits.length - 1) {
        otpDigits[idx + 1].focus();
      }
    });
  });

  // Step 2: Verify & Unlock Code Click Handler
  if (verifyUnlockBtn) {
    verifyUnlockBtn.addEventListener('click', () => {
      const enteredMobile = mobileInput.value.trim();
      const enteredOtp = Array.from(otpDigits).map(d => d.value).join('');

      if (enteredOtp.length !== 6) {
        alert('Please enter the full 6-digit OTP code.');
        return;
      }

      // Save Session & Claim
      isAuthenticated = true;
      saveSession(enteredMobile);
      saveRewardClaim('play_and_win', deal.dealId);

      // GA4 Event & LeadSquared CRM Lead
      trackGa4Event(GA4_EVENTS.OTP_VALIDATED, { mobile: enteredMobile });
      sendLeadToLeadSquared({
        mobileNumber: enteredMobile,
        activityType: 'Play & Win Reward Unlocked',
        rewardAllocated: deal.dealId,
        contentSlug: 'play-reward-unlock'
      });

      // Confetti burst
      if (window.confetti) {
        window.confetti({ particleCount: 110, spread: 75, origin: { y: 0.55 } });
      }

      // Smoothly Unlock Coupon Code UI
      couponText.textContent = fullCode;
      couponText.classList.add('coupon-unlocked-pulse');
      couponBox.classList.remove('coupon-locked');
      couponBox.classList.add('coupon-unlocked-active');

      if (lockHint) lockHint.style.display = 'none';
      festiveTag.className = 'festive-tag tag-green';
      festiveTag.textContent = '🎁 Reward Unlocked!';

      // Enable Copy Button
      copyBtn.disabled = false;
      copyBtn.classList.remove('copy-btn-disabled');
      copyBtn.querySelector('#copy-btn-icon').textContent = '📋';
      copyBtn.querySelector('#copy-btn-label').textContent = 'Copy Code';

      // Transition OTP Form to Success State
      step2.style.display = 'none';
      stepSuccess.style.display = 'block';

      if (options.onVerified) {
        options.onVerified();
      }
    });
  }
}
