// Global OTP Verification Modal Component SOT v1.3 Section 3 & Section 8.1
import { saveSession } from '../state/sessionState.js';
import { sendLeadToLeadSquared } from '../services/crmService.js';
import { trackGa4Event, GA4_EVENTS } from '../services/gaService.js';

export function openOtpModal(onSuccessCallback) {
  const container = document.querySelector('#otp-modal-container');
  if (!container) return;

  container.innerHTML = `
    <div class="modal-backdrop active" id="otp-modal-backdrop">
      <div class="modal-card">
        <button class="modal-close-btn" id="otp-close-btn">&times;</button>
        
        <div class="otp-header-icon">📱</div>
        <h3 class="otp-title">Identity Verification</h3>
        <p class="otp-subtitle">Enter your 10-digit mobile number to unlock your festive rewards & session.</p>

        <form id="otp-form" class="otp-form-group">
          <!-- Step 1: Mobile Number Input -->
          <div id="otp-step-mobile">
            <label class="input-label">Mobile Number</label>
            <div class="mobile-input-wrap">
              <span class="country-code-flag">🇮🇳 +91</span>
              <input type="tel" id="mobile-input" class="phone-input" placeholder="98765 43210" maxlength="10" required pattern="[6-9][0-9]{9}">
            </div>
            <button type="button" class="btn-gold glow-effect" id="send-otp-btn" style="width: 100%; margin-top: 14px; padding: 12px;">
              Get OTP 🚀
            </button>
          </div>

          <!-- Step 2: 6-Digit OTP Input -->
          <div id="otp-step-code" style="display: none;">
            <div style="font-size: 0.8rem; color: var(--text-secondary); text-align: center; margin-bottom: 8px;">
              Enter 6-digit OTP sent to <strong id="sent-mobile-label" style="color: var(--text-gold);"></strong>
            </div>
            
            <div class="otp-boxes-group">
              <input type="text" class="otp-box-digit" maxlength="1" pattern="[0-9]" required>
              <input type="text" class="otp-box-digit" maxlength="1" pattern="[0-9]" required>
              <input type="text" class="otp-box-digit" maxlength="1" pattern="[0-9]" required>
              <input type="text" class="otp-box-digit" maxlength="1" pattern="[0-9]" required>
              <input type="text" class="otp-box-digit" maxlength="1" pattern="[0-9]" required>
              <input type="text" class="otp-box-digit" maxlength="1" pattern="[0-9]" required>
            </div>

            <button type="submit" class="btn-primary" id="verify-otp-btn" style="width: 100%; margin-top: 14px; padding: 12px;">
              Verify & Continue ✓
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  const backdrop = container.querySelector('#otp-modal-backdrop');
  const closeBtn = container.querySelector('#otp-close-btn');

  const stepMobile = container.querySelector('#otp-step-mobile');
  const stepCode = container.querySelector('#otp-step-code');

  const mobileInput = container.querySelector('#mobile-input');
  const sendOtpBtn = container.querySelector('#send-otp-btn');
  const sentMobileLabel = container.querySelector('#sent-mobile-label');

  const otpDigits = container.querySelectorAll('.otp-box-digit');
  const form = container.querySelector('#otp-form');

  const closeModal = () => {
    backdrop.classList.remove('active');
    setTimeout(() => { container.innerHTML = ''; }, 300);
  };

  closeBtn.addEventListener('click', closeModal);

  // Send OTP Click Handler
  sendOtpBtn.addEventListener('click', () => {
    const val = mobileInput.value.trim();
    if (!/^[6-9]\d{9}$/.test(val)) {
      alert('Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.');
      return;
    }

    sentMobileLabel.textContent = `+91 ${val}`;
    stepMobile.style.display = 'none';
    stepCode.style.display = 'block';

    // Auto-fill test OTP digits for frictionless UX demo
    const demoCode = ['8', '8', '8', '8', '8', '8'];
    otpDigits.forEach((digitInput, idx) => {
      digitInput.value = demoCode[idx];
    });
    otpDigits[0].focus();
  });

  // Focus next box automatically
  otpDigits.forEach((digitInput, idx) => {
    digitInput.addEventListener('input', (e) => {
      if (e.target.value.length === 1 && idx < otpDigits.length - 1) {
        otpDigits[idx + 1].focus();
      }
    });
  });

  // Form Submit Handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const enteredMobile = mobileInput.value.trim();
    const enteredOtp = Array.from(otpDigits).map(d => d.value).join('');

    if (enteredOtp.length !== 6) {
      alert('Please enter the full 6-digit OTP code.');
      return;
    }

    // Save session JWT token in localStorage
    saveSession(enteredMobile);

    // Track GA4 event & LeadSquared CRM Lead capture
    trackGa4Event(GA4_EVENTS.OTP_VALIDATED, { mobile: enteredMobile });
    sendLeadToLeadSquared({
      mobileNumber: enteredMobile,
      activityType: 'OTP Verification Completed',
      contentSlug: 'global-otp'
    });

    closeModal();
    if (onSuccessCallback) {
      onSuccessCallback();
    }
  });
}
