// Reward Limit Modal Component
// Displays exact standard message and dynamic remaining activities
import { getRemainingEligibleActivities, getAllOtherActivities } from '../state/rewardState.js';

export function openRewardLimitModal({ currentActivityKey, customMessage, onNavigate }) {
  let modalContainer = document.querySelector('#reward-limit-modal-container');
  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'reward-limit-modal-container';
    document.body.appendChild(modalContainer);
  }

  // Get remaining eligible activities (current activity omitted)
  let eligibleActivities = getRemainingEligibleActivities(currentActivityKey);
  if (eligibleActivities.length === 0) {
    // If all activities are claimed, show other activities so user can revisit
    eligibleActivities = getAllOtherActivities(currentActivityKey);
  }

  const messageText = customMessage || "You've already unlocked your reward for this activity! To earn more rewards, explore other activities below.";

  modalContainer.innerHTML = `
    <div class="modal-backdrop active" id="reward-limit-backdrop">
      <div class="modal-card reward-limit-card animate-scale-in">
        <button class="modal-close-btn" id="reward-limit-close-btn" aria-label="Close modal">&times;</button>
        
        <div class="reward-limit-icon-wrap">
          <div class="reward-limit-badge-icon">🎁</div>
        </div>

        <h3 class="reward-limit-title">Reward Unlocked</h3>
        
        <p class="reward-limit-message">
          ${messageText}
        </p>

        <div class="eligible-activities-list">
          <span class="eligible-activities-heading">Available Activities for You:</span>
          <div class="activity-cards-grid">
            ${eligibleActivities.map(act => `
              <div class="activity-nav-card" data-route="${act.route}">
                <div class="activity-icon">${act.icon}</div>
                <div class="activity-info">
                  <div class="activity-title-row">
                    <span class="activity-name">${act.title}</span>
                    <span class="activity-pill-tag">${act.badge}</span>
                  </div>
                  <p class="activity-desc">${act.description}</p>
                </div>
                <div class="activity-arrow">&rarr;</div>
              </div>
            `).join('')}
          </div>
        </div>

        <button class="btn-secondary" id="reward-limit-dismiss-btn" style="width: 100%; margin-top: 20px;">
          Close
        </button>
      </div>
    </div>
  `;

  const backdrop = modalContainer.querySelector('#reward-limit-backdrop');
  const closeBtn = modalContainer.querySelector('#reward-limit-close-btn');
  const dismissBtn = modalContainer.querySelector('#reward-limit-dismiss-btn');

  const closeModal = () => {
    backdrop.classList.remove('active');
    setTimeout(() => { modalContainer.innerHTML = ''; }, 250);
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (dismissBtn) dismissBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  // Activity Card Click Listeners
  const activityCards = modalContainer.querySelectorAll('.activity-nav-card');
  activityCards.forEach(card => {
    card.addEventListener('click', () => {
      const route = card.getAttribute('data-route');
      closeModal();
      if (onNavigate) {
        onNavigate(route);
      } else {
        window.location.hash = `#${route}`;
      }
    });
  });
}
