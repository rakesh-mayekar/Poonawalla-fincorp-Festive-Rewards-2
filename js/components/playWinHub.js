import { renderSpinWinGame } from './spinWin.js';
import { renderScratchCardGame } from './scratchCard.js';
import { renderShuffleCardGame } from './shuffleCard.js';

let activeGameTab = 'spin';

export function renderPlayWinHub(container) {
  const wrapper = document.createElement('div');
  wrapper.className = 'games-hub-wrapper section-wrapper';

  wrapper.innerHTML = `
    <div class="section-header align-left">
      <h2>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="section-icon"><rect x="2" y="7" width="20" height="15" rx="2" ry="2" /><polyline points="17 2 12 7 7 2" /></svg>
        Play & Win Festive Rewards
      </h2>
      <p class="subheading">
        Participate in our festive games to unlock exclusive brand partner coupons!
      </p>
    </div>
    
    <div class="value-exchange-section" style="background: var(--wf-surface-subtle); padding: 24px; border-radius: var(--radius-lg); margin-bottom: 32px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; text-align: center; border: 1px solid var(--wf-border);">
      <div>
        <div style="font-size: 2rem; margin-bottom: 12px;">🎮</div>
        <h4 style="font-size: 1rem; color: var(--wf-text-primary); margin-bottom: 8px;">Pick a Game</h4>
        <p style="font-size: 0.85rem; color: var(--wf-text-secondary);">Choose from Spin the Wheel, Scratch Card, or Shuffle Card.</p>
      </div>
      <div>
        <div style="font-size: 2rem; margin-bottom: 12px;">🎁</div>
        <h4 style="font-size: 1rem; color: var(--wf-text-primary); margin-bottom: 8px;">Play & Win</h4>
        <p style="font-size: 0.85rem; color: var(--wf-text-secondary);">Test your luck to reveal an exclusive reward from our partners.</p>
      </div>
      <div>
        <div style="font-size: 2rem; margin-bottom: 12px;">💸</div>
        <h4 style="font-size: 1rem; color: var(--wf-text-primary); margin-bottom: 8px;">Unlock Offers</h4>
        <p style="font-size: 0.85rem; color: var(--wf-text-secondary);">Access your won rewards in the "My Offers" section.</p>
      </div>
    </div>

    <div class="games-tabs-bar" style="display: flex; gap: 12px; justify-content: center; margin-bottom: 32px;">
      <button class="game-tab-btn ${activeGameTab === 'spin' ? 'active' : ''}" data-tab="spin" style="padding: 12px 24px; border-radius: var(--radius-sm); border: 1px solid var(--wf-border); background: var(--wf-surface); cursor: pointer; font-weight: 600; color: var(--wf-text-secondary);">🎡 Spin & Win</button>
      <button class="game-tab-btn ${activeGameTab === 'scratch' ? 'active' : ''}" data-tab="scratch" style="padding: 12px 24px; border-radius: var(--radius-sm); border: 1px solid var(--wf-border); background: var(--wf-surface); cursor: pointer; font-weight: 600; color: var(--wf-text-secondary);">✨ Scratch Card</button>
      <button class="game-tab-btn ${activeGameTab === 'shuffle' ? 'active' : ''}" data-tab="shuffle" style="padding: 12px 24px; border-radius: var(--radius-sm); border: 1px solid var(--wf-border); background: var(--wf-surface); cursor: pointer; font-weight: 600; color: var(--wf-text-secondary);">🃏 Shuffle Card</button>
    </div>

    <div id="game-active-container" style="background: var(--wf-surface); padding: 32px; border-radius: var(--radius-lg); border: 1px solid var(--wf-border); box-shadow: var(--shadow-sm);"></div>
  `;

  const tabs = wrapper.querySelectorAll('.game-tab-btn');
  const gameContainer = wrapper.querySelector('#game-active-container');

  function updateTabStyles() {
    tabs.forEach(t => {
      if (t.classList.contains('active')) {
        t.style.background = 'var(--color-primary)';
        t.style.color = '#fff';
        t.style.borderColor = 'var(--color-primary)';
      } else {
        t.style.background = 'var(--wf-surface)';
        t.style.color = 'var(--wf-text-secondary)';
        t.style.borderColor = 'var(--wf-border)';
      }
    });
  }

  function renderActiveGame() {
    gameContainer.innerHTML = '';
    if (activeGameTab === 'spin') {
      renderSpinWinGame(gameContainer);
    } else if (activeGameTab === 'scratch') {
      renderScratchCardGame(gameContainer);
    } else if (activeGameTab === 'shuffle') {
      renderShuffleCardGame(gameContainer);
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeGameTab = tab.getAttribute('data-tab');
      updateTabStyles();
      renderActiveGame();
    });
  });

  updateTabStyles();
  renderActiveGame();
  
  container.appendChild(wrapper);
}
