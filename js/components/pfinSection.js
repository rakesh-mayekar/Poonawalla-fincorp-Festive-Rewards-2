// PFIN Card & Consumer Durable Section Component with In-Page 3-Game Hub
import { buildUtmUrl } from '../data/loansData.js';
import { renderSpinWinGame } from './spinWin.js';
import { renderScratchCardGame } from './scratchCard.js';
import { renderShuffleCardGame } from './shuffleCard.js';
import { isActivityClaimed, getUserRewards } from '../state/rewardState.js';
import { openRewardModal } from './rewardModal.js';
import { renderTopOffersSection } from './topOffersScroller.js';

export function renderPfinSection(container, onNavigate) {
  const wrapper = document.createElement('div');
  wrapper.className = 'loans-container section-wrapper';

  const pfinAlreadyClaimed = isActivityClaimed('pfin_card');
  let selectedGame = 'spin'; // 'spin' | 'scratch' | 'shuffle'
  let isGamesExpanded = false;

  wrapper.innerHTML = `
    <div class="section-header align-left">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <a href="#home" class="breadcrumb-back-link" id="pfin-back-home">&larr; Back to Home</a>
      </div>
      <span class="section-kicker" style="color: var(--wf-text-secondary); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">• DIGITAL CREDIT CARD SANCTION</span>
      <h2 style="margin-top: 4px;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="section-icon"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
        PFIN <span style="font-style: italic; font-weight: 500; color: var(--wf-text-secondary); margin-left: 6px;">Card</span>
      </h2>
      <p class="subheading">Instant digital credit limit up to ₹2 Lakhs with No-Cost EMIs and guaranteed festive cashback vouchers.</p>
    </div>

    <!-- PFIN Hero Showcase Banner -->
    <div class="pfin-dark-card" style="margin-bottom: 32px;">
      <div class="pfin-content">
        <div class="pfin-badge">
          <svg width="14" height="14" style="vertical-align: middle; margin-right: 4px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
          INSTANT VIRTUAL CARD
        </div>
        <h2 class="festive-heading pfin-title">Digital Credit Card <i>Sanction</i></h2>
        <p class="pfin-desc">Get 100% digital instant virtual card generation with zero joining fee and 5% festive cashback on top brands.</p>
        
        <div class="pfin-stats-row">
          <div class="pfin-stat">
            <strong>₹ 2,00,000</strong>
            <span>CREDIT LIMIT</span>
          </div>
          <div class="pfin-stat">
            <strong>₹ 0</strong>
            <span>JOINING FEE</span>
          </div>
          <div class="pfin-stat">
            <strong>5%</strong>
            <span>FESTIVE CASHBACK</span>
          </div>
        </div>

        <div class="pfin-actions">
          <button class="btn-primary" id="toggle-pfin-games-btn" style="background: #FFFFFF; color: #18181B; border-color: #FFFFFF; font-weight: 700; padding: 14px 28px;">
            🎁 Unlock PFIN Festive Reward &darr;
          </button>
          
          <a href="${buildUtmUrl('https://poonawallafincorp.com/emi-card', 'pfin-card')}" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="border-color: rgba(255, 255, 255, 0.3); color: #FFFFFF; padding: 14px 28px;">
            Apply Official Portal ↗
          </a>
        </div>
      </div>
      <div class="pfin-visual">
        <div class="pfin-credit-card-mock">
          <div class="pfin-cc-logo">POONAWALLA PFIN</div>
          <div class="pfin-cc-chip"></div>
          <div class="pfin-cc-number">•••• •••• •••• 8842</div>
          <div class="pfin-cc-footer">
            <span class="pfin-cc-name">VALUED CUSTOMER</span>
            <span class="pfin-cc-exp">10/30</span>
          </div>
        </div>
      </div>
    </div>

    <!-- In-Page Interactive 3-Games Section (Expands right below button on the same screen) -->
    <div class="pfin-games-inline-section" id="pfin-inline-games-wrapper" style="margin-bottom: 48px; background: #FFFFFF; border: 1px solid var(--wf-border); border-radius: var(--radius-lg); padding: 32px 24px; box-shadow: var(--shadow-sm); display: none;">
      <div class="section-header center" style="margin-bottom: 24px;">
        <div class="festive-kicker-badge">
          <span>🎁</span> PLAY & WIN PFIN REWARDS
        </div>
        <h3 class="festive-heading" style="font-size: 1.8rem; margin-top: 6px;">
          Choose a Game & Unlock Your Voucher
        </h3>
        <p class="subheading center-subheading" style="font-size: 0.92rem;">
          Play below, reveal your masked festive voucher, verify with OTP, and apply for your PFIN Card on this screen!
        </p>
      </div>

      <!-- 3 Game Selection Tabs -->
      <div class="pfin-game-tabs-row" style="display: flex; gap: 10px; justify-content: center; margin-bottom: 28px; flex-wrap: wrap;">
        <button class="pfin-game-tab-btn active" data-game="spin" style="padding: 10px 22px; border-radius: 30px; border: 1px solid #18181B; background: #18181B; color: #FFFFFF; cursor: pointer; font-weight: 600; font-size: 0.9rem; transition: all 0.2s ease;">
          🎡 Spin & Win
        </button>
        <button class="pfin-game-tab-btn" data-game="scratch" style="padding: 10px 22px; border-radius: 30px; border: 1px solid var(--wf-border); background: #F4F4F5; color: var(--wf-text-primary); cursor: pointer; font-weight: 600; font-size: 0.9rem; transition: all 0.2s ease;">
          ✨ Scratch Card
        </button>
        <button class="pfin-game-tab-btn" data-game="shuffle" style="padding: 10px 22px; border-radius: 30px; border: 1px solid var(--wf-border); background: #F4F4F5; color: var(--wf-text-primary); cursor: pointer; font-weight: 600; font-size: 0.9rem; transition: all 0.2s ease;">
          🃏 Card Shuffle
        </button>
      </div>

      <!-- Active Game Play Canvas Area -->
      <div id="pfin-active-game-container" style="min-height: 380px;"></div>

      <!-- Post-Game Quick Action Banner -->
      <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid var(--wf-border); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
        <p style="margin: 0; font-size: 0.9rem; color: var(--wf-text-secondary);">
          Ready to enjoy 5% festive cashback and instant ₹2 Lakhs limit?
        </p>
        <a href="${buildUtmUrl('https://poonawallafincorp.com/emi-card', 'pfin-card-game-complete')}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="padding: 10px 24px; text-decoration: none;">
          Apply for PFIN Card ↗
        </a>
      </div>
    </div>

    <!-- 3 Product Variants Grid -->
    <div class="loans-list preview-grid" style="margin-bottom: 48px;">
      <!-- Card 1: PFIN Card -->
      <div class="loan-card portfolio-card wireframe-loan-card">
        <div class="portfolio-card-badge">Instant Approval</div>
        <div class="product-lamp-container">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
        </div>
        <div class="portfolio-card-content">
          <h3 class="portfolio-card-title">PFIN Virtual EMI Card</h3>
          <p class="portfolio-card-stats">Limit up to ₹2 Lakhs <span class="stat-dot">•</span> <span class="stat-highlight">0% Interest</span></p>
          <p class="portfolio-card-desc">Zero joining fee with instant card activation on your smartphone.</p>
        </div>
        <div class="portfolio-card-footer">
          <a href="${buildUtmUrl('https://poonawallafincorp.com/emi-card', 'pfin-card')}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="width: 100%; text-decoration: none;">Apply PFIN Card &rarr;</a>
        </div>
      </div>

      <!-- Card 2: Consumer Durable Financing -->
      <div class="loan-card portfolio-card wireframe-loan-card">
        <div class="portfolio-card-badge">No Cost EMI</div>
        <div class="product-lamp-container">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>
        </div>
        <div class="portfolio-card-content">
          <h3 class="portfolio-card-title">Consumer Durable Loan</h3>
          <p class="portfolio-card-stats">Flexible Tenures <span class="stat-dot">•</span> <span class="stat-highlight">Up to 24 Mos</span></p>
          <p class="portfolio-card-desc">Finance TVs, Refrigerators, Air Conditioners with 0 downpayment.</p>
        </div>
        <div class="portfolio-card-footer">
          <a href="${buildUtmUrl('https://poonawallafincorp.com/consumer-durable-loans', 'pfin-consumer-durable')}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="width: 100%; text-decoration: none;">Explore Appliance Loans &rarr;</a>
        </div>
      </div>

      <!-- Card 3: Electronics Financing -->
      <div class="loan-card portfolio-card wireframe-loan-card">
        <div class="portfolio-card-badge">Zero Paperwork</div>
        <div class="product-lamp-container">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
        </div>
        <div class="portfolio-card-content">
          <h3 class="portfolio-card-title">Electronics Financing</h3>
          <p class="portfolio-card-stats">Smartphones & Laptops <span class="stat-dot">•</span> <span class="stat-highlight">Instant In-Store</span></p>
          <p class="portfolio-card-desc">Upgrade your gadgets at partner retail counters with swift approvals.</p>
        </div>
        <div class="portfolio-card-footer">
          <a href="${buildUtmUrl('https://poonawallafincorp.com/consumer-durable-loans', 'pfin-electronics')}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="width: 100%; text-decoration: none;">Finance Gadgets &rarr;</a>
        </div>
      </div>
    </div>
  `;

  // Attach In-Page Game Expand & Switch Handlers
  const toggleGamesBtn = wrapper.querySelector('#toggle-pfin-games-btn');
  const inlineGamesWrapper = wrapper.querySelector('#pfin-inline-games-wrapper');
  const activeGameContainer = wrapper.querySelector('#pfin-active-game-container');
  const gameTabs = wrapper.querySelectorAll('.pfin-game-tab-btn');

  function renderInlineGame(gameKey) {
    if (!activeGameContainer) return;
    activeGameContainer.innerHTML = '';
    
    if (gameKey === 'spin') {
      renderSpinWinGame(activeGameContainer, onNavigate);
    } else if (gameKey === 'scratch') {
      renderScratchCardGame(activeGameContainer, onNavigate);
    } else if (gameKey === 'shuffle') {
      renderShuffleCardGame(activeGameContainer, onNavigate);
    }
  }

  function updateGameTabs() {
    gameTabs.forEach(tab => {
      const g = tab.getAttribute('data-game');
      if (g === selectedGame) {
        tab.style.background = '#18181B';
        tab.style.color = '#FFFFFF';
        tab.style.borderColor = '#18181B';
      } else {
        tab.style.background = '#F4F4F5';
        tab.style.color = 'var(--wf-text-primary)';
        tab.style.borderColor = 'var(--wf-border)';
      }
    });
  }

  if (toggleGamesBtn && inlineGamesWrapper) {
    toggleGamesBtn.addEventListener('click', () => {
      isGamesExpanded = !isGamesExpanded;
      if (isGamesExpanded) {
        inlineGamesWrapper.style.display = 'block';
        toggleGamesBtn.textContent = '▲ Close Games Area';
        toggleGamesBtn.style.background = 'rgba(255, 255, 255, 0.2)';
        toggleGamesBtn.style.color = '#FFFFFF';
        renderInlineGame(selectedGame);
        inlineGamesWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        inlineGamesWrapper.style.display = 'none';
        toggleGamesBtn.textContent = '🎁 Unlock PFIN Festive Reward ↓';
        toggleGamesBtn.style.background = '#FFFFFF';
        toggleGamesBtn.style.color = '#18181B';
      }
    });
  }

  gameTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      selectedGame = tab.getAttribute('data-game');
      updateGameTabs();
      renderInlineGame(selectedGame);
    });
  });

  container.appendChild(wrapper);

  // Render Top Offers at the bottom of PFIN Card page
  renderTopOffersSection(container, onNavigate, {
    title: 'Top Offers For You',
    showHeading: true,
    isBottomSection: true
  });
}
