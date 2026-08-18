// Main JS Application Router & Initializer SOT v1.3
import { renderHeader } from './components/header.js';
import { renderHero } from './components/hero.js';
import { renderCategoryGrid } from './components/categoryGrid.js';
import { renderLoansSection } from './components/loansSection.js';
import { renderSpinWinGame } from './components/spinWin.js';
import { renderScratchCardGame } from './components/scratchCard.js';
import { renderShuffleCardGame } from './components/shuffleCard.js';
import { renderReferSection } from './components/referSection.js';
import { renderCibilSection } from './components/cibilSection.js';
import { renderEmiSection } from './components/emiSection.js';
import { renderPfinSection } from './components/pfinSection.js';
import { renderOffersSection } from './components/offersSection.js';
import { renderMyOffersSection } from './components/myOffersSection.js';
import { renderStickyOffers } from './components/stickyOffers.js';
import { initParticleBackground } from './components/particleBg.js';

let activeGameTab = 'spin';

function navigateTo(route) {
  window.location.hash = route;
  renderRoute(route);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderRoute(route) {
  const main = document.querySelector('#main-content');
  if (!main) return;
  main.innerHTML = '';

  switch (route) {
    case 'loans':
      renderLoansSection(main);
      break;

    case 'games':
      renderGamesHub(main);
      break;

    case 'refer':
      renderReferSection(main);
      break;

    case 'cibil':
      renderCibilSection(main, navigateTo);
      break;

    case 'emi':
      renderEmiSection(main);
      break;

    case 'pfin':
      renderPfinSection(main);
      break;

    case 'offers':
      renderOffersSection(main);
      break;

    case 'myoffers':
      renderMyOffersSection(main, navigateTo);
      break;

    case 'home':
    default:
      renderHero(main, navigateTo);
      renderCategoryGrid(main, navigateTo);
      break;
  }
}

function renderGamesHub(main) {
  const wrapper = document.createElement('div');
  
  wrapper.innerHTML = `
    <div class="games-hub-header">
      <h2 class="loans-title festive-heading">Play & Win Festive Rewards</h2>
      <p class="loans-subtitle">Play interactive games and unlock exclusive brand partner coupons!</p>
    </div>

    <div class="games-tabs-bar">
      <button class="game-tab-btn ${activeGameTab === 'spin' ? 'active' : ''}" data-tab="spin">🎡 Spin & Win</button>
      <button class="game-tab-btn ${activeGameTab === 'scratch' ? 'active' : ''}" data-tab="scratch">✨ Scratch Card</button>
      <button class="game-tab-btn ${activeGameTab === 'shuffle' ? 'active' : ''}" data-tab="shuffle">🃏 Shuffle Card</button>
    </div>

    <div id="game-active-container"></div>
  `;

  const tabs = wrapper.querySelectorAll('.game-tab-btn');
  const gameContainer = wrapper.querySelector('#game-active-container');

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
      renderActiveGame();
    });
  });

  renderActiveGame();
  main.appendChild(wrapper);
}

document.addEventListener('DOMContentLoaded', () => {
  initParticleBackground();
  const headerContainer = document.querySelector('#site-header');
  const stickyContainer = document.querySelector('#sticky-offers-container');

  if (headerContainer) renderHeader(headerContainer, navigateTo);
  if (stickyContainer) renderStickyOffers(stickyContainer);

  const initialRoute = window.location.hash.replace('#', '') || 'home';
  renderRoute(initialRoute);

  window.addEventListener('hashchange', () => {
    const route = window.location.hash.replace('#', '') || 'home';
    renderRoute(route);
  });
});
