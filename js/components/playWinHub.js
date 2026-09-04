import { renderSpinWinGame } from './spinWin.js';
import { renderScratchCardGame } from './scratchCard.js';
import { renderShuffleCardGame } from './shuffleCard.js';
import { renderTopOffersSection } from './topOffersScroller.js';
import { isPlayAndWinClaimed } from '../state/rewardState.js';
import { openRewardLimitModal } from './rewardLimitModal.js';

let activeGameTab = 'spin';

export function renderPlayWinHub(container, onNavigate) {
  const wrapper = document.createElement('div');
  wrapper.className = 'games-hub-wrapper section-wrapper';

  const alreadyClaimedGame = isPlayAndWinClaimed();

  wrapper.innerHTML = `
    <div class="section-header align-left">
      <span class="section-kicker" style="color: var(--wf-text-secondary); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">• FESTIVE GAMIFICATION ARENA</span>
      <h2 style="margin-top: 4px;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="section-icon"><rect x="2" y="7" width="20" height="15" rx="2" ry="2" /><polyline points="17 2 12 7 7 2" /></svg>
        Play & Win <span style="font-style: italic; font-weight: 500; color: var(--wf-text-secondary); margin-left: 6px;">Rewards</span>
      </h2>
      <p class="subheading">
        Participate in interactive festive games to unlock exclusive brand partner coupons from Lenovo, Tata Cliq Luxury, Myntra & more!
      </p>
    </div>
    
    <!-- Value Exchange 3-Step Guide -->
    <div class="value-exchange-section" style="background: var(--wf-surface); padding: 24px 28px; border-radius: var(--radius-lg); margin-bottom: 32px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; text-align: center; border: 1px solid var(--wf-border); box-shadow: var(--shadow-sm);">
      <div style="padding: 8px;">
        <div style="font-size: 2rem; margin-bottom: 8px;">🎯</div>
        <h4 style="font-size: 0.95rem; color: var(--wf-text-primary); margin-bottom: 4px;">1. Select Any Game</h4>
        <p style="font-size: 0.8rem; color: var(--wf-text-secondary); margin: 0;">Choose between Spin Wheel, Scratch Card, or Card Shuffle.</p>
      </div>
      <div style="padding: 8px; border-left: 1px solid var(--wf-border); border-right: 1px solid var(--wf-border);">
        <div style="font-size: 2rem; margin-bottom: 8px;">📱</div>
        <h4 style="font-size: 0.95rem; color: var(--wf-text-primary); margin-bottom: 4px;">2. Quick Mobile OTP</h4>
        <p style="font-size: 0.8rem; color: var(--wf-text-secondary); margin: 0;">Verify your identity to authenticate and secure your won voucher.</p>
      </div>
      <div style="padding: 8px;">
        <div style="font-size: 2rem; margin-bottom: 8px;">🎁</div>
        <h4 style="font-size: 0.95rem; color: var(--wf-text-primary); margin-bottom: 4px;">3. Instant Reward Claim</h4>
        <p style="font-size: 0.8rem; color: var(--wf-text-secondary); margin: 0;">Reveal your voucher code and redeem at brand partner checkout.</p>
      </div>
    </div>

    ${alreadyClaimedGame ? `
      <div style="background: #FFFBEB; border: 1px solid #FDE68A; padding: 20px 24px; border-radius: var(--radius-md); margin-bottom: 28px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 1.8rem;">🎉</span>
          <div>
            <strong style="color: #92400E; font-size: 0.95rem; display: block;">Game Reward Claimed!</strong>
            <span style="color: #78350F; font-size: 0.85rem;">You have unlocked your Play & Win reward. To earn more vouchers, explore our other reward activities below!</span>
          </div>
        </div>
        <button class="btn-primary" id="view-game-claimed-reward-btn" style="padding: 8px 18px; font-size: 0.85rem;">
          🎁 View My Won Voucher
        </button>
      </div>
    ` : ''}

    <!-- Game Tabs Bar -->
    <div class="games-tabs-bar" style="display: flex; gap: 12px; justify-content: center; margin-bottom: 32px; flex-wrap: wrap;">
      <button class="game-tab-btn ${activeGameTab === 'spin' ? 'active' : ''}" data-tab="spin" style="padding: 12px 24px; border-radius: var(--radius-sm); border: 1px solid var(--wf-border); cursor: pointer; font-weight: 600;">🎡 Spin & Win</button>
      <button class="game-tab-btn ${activeGameTab === 'scratch' ? 'active' : ''}" data-tab="scratch" style="padding: 12px 24px; border-radius: var(--radius-sm); border: 1px solid var(--wf-border); cursor: pointer; font-weight: 600;">✨ Scratch Card</button>
      <button class="game-tab-btn ${activeGameTab === 'shuffle' ? 'active' : ''}" data-tab="shuffle" style="padding: 12px 24px; border-radius: var(--radius-sm); border: 1px solid var(--wf-border); cursor: pointer; font-weight: 600;">🃏 Shuffle Card</button>
    </div>

    <!-- Active Game Container -->
    <div id="game-active-container" style="background: var(--wf-surface); padding: 32px; border-radius: var(--radius-lg); border: 1px solid var(--wf-border); box-shadow: var(--shadow-sm); margin-bottom: 48px;"></div>
  `;

  const tabs = wrapper.querySelectorAll('.game-tab-btn');
  const gameContainer = wrapper.querySelector('#game-active-container');

  function updateTabStyles() {
    tabs.forEach(t => {
      if (t.classList.contains('active')) {
        t.style.background = '#111111';
        t.style.color = '#FFFFFF';
        t.style.borderColor = '#111111';
      } else {
        t.style.background = '#FFFFFF';
        t.style.color = 'var(--wf-text-secondary)';
        t.style.borderColor = 'var(--wf-border)';
      }
    });
  }

  function renderActiveGame() {
    gameContainer.innerHTML = '';
    if (activeGameTab === 'spin') {
      renderSpinWinGame(gameContainer, onNavigate);
    } else if (activeGameTab === 'scratch') {
      renderScratchCardGame(gameContainer, onNavigate);
    } else if (activeGameTab === 'shuffle') {
      renderShuffleCardGame(gameContainer, onNavigate);
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const selectedTab = tab.getAttribute('data-tab');
      // If user already claimed any game, clicking a game tab or play button triggers reward limit modal
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeGameTab = selectedTab;
      updateTabStyles();
      renderActiveGame();
    });
  });

  updateTabStyles();
  renderActiveGame();
  
  container.appendChild(wrapper);

  // Render Top Offers at the bottom of Play & Win Hub
  renderTopOffersSection(container, onNavigate, {
    title: 'Top Offers For You',
    showHeading: true,
    isBottomSection: true
  });
}
