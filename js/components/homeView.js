import { renderHero } from './hero.js';
import { renderMidPageNav } from './midPageNav.js';
import { renderCategoryGrid } from './categoryGrid.js';
import { renderVideoSection } from './videoSection.js';
import { renderHomeOffersShowcase } from './homeOffersShowcase.js';
import { renderWinnersWall } from './winnersWall.js';
import { renderHomeBlogsSection } from './homeBlogsSection.js';
import { initStickyOffersBar } from './stickyOffersBar.js';
import { PRODUCT_LAMPS } from '../data/loansData.js';

export function renderHomeView(container, onNavigate) {
  // 1. Hero / Festival Campaign ("Celebrate More. Worry Less.")
  renderHero(container, onNavigate);

  // 2. Mid-Page Quick Navigation Bar
  renderMidPageNav(container, onNavigate);

  // 3. Limited Period Offers Section
  const loansPreview = document.createElement('section');
  loansPreview.className = 'home-loans-preview section-wrapper animate-on-scroll';
  loansPreview.id = 'limited-period-offers';
  loansPreview.innerHTML = `
    <div class="section-header center">
      <div class="festive-kicker-badge">
        <span class="sparkle-icon">✨</span> EXCLUSIVE FESTIVE RATES
      </div>
      <h2 class="festive-heading">
        Limited Period <span class="accent-italic">Offers</span>
      </h2>
      <p class="subheading center-subheading">
        Apply for loans and get assured offers from 50+ brands.
      </p>
    </div>

    <div class="loans-grid preview-grid">
      <!-- Instant Loan -->
      <a href="#loan-detail?id=instant-personal-loan" class="loan-card portfolio-card festive-blue-card" data-nav="loan-detail" data-id="instant-personal-loan">
        <div class="portfolio-card-badge">Zero Processing Fee</div>
        <div class="product-lamp-container">
          ${PRODUCT_LAMPS['instant-personal-loan'] || '🪔'}
        </div>
        <div class="portfolio-card-content">
          <h3 class="portfolio-card-title">Instant Loan</h3>
          <p class="portfolio-card-stats">From 10.25% p.a. <span class="stat-dot">•</span> <span class="stat-highlight">Up to ₹5 Lakh</span></p>
          <p class="portfolio-card-desc">100% digital instant approval & quick disbursal to fuel festive moments.</p>
        </div>
        <div class="portfolio-card-footer">
          <button class="btn-primary festive-card-btn" style="width: 100%;">Enjoy Zero Fee &rarr;</button>
        </div>
      </a>
      
      <!-- Personal Loan -->
      <a href="#loan-detail?id=prime-personal-loan" class="loan-card portfolio-card festive-blue-card" data-nav="loan-detail" data-id="prime-personal-loan">
        <div class="portfolio-card-badge">Flexible EMI</div>
        <div class="product-lamp-container">
          ${PRODUCT_LAMPS['prime-personal-loan'] || '🏮'}
        </div>
        <div class="portfolio-card-content">
          <h3 class="portfolio-card-title">Personal Loan</h3>
          <p class="portfolio-card-stats">From 9.99% p.a. <span class="stat-dot">•</span> <span class="stat-highlight">Up to ₹30 Lakh</span></p>
          <p class="portfolio-card-desc">Flexible EMIs up to 60 months with zero hidden charges & high limits.</p>
        </div>
        <div class="portfolio-card-footer">
          <button class="btn-primary festive-card-btn" style="width: 100%;">Choose Flexible EMI &rarr;</button>
        </div>
      </a>

      <!-- Business Loan -->
      <a href="#loan-detail?id=business-loan" class="loan-card portfolio-card festive-blue-card" data-nav="loan-detail" data-id="business-loan">
        <div class="portfolio-card-badge">Collateral Free</div>
        <div class="product-lamp-container">
          ${PRODUCT_LAMPS['business-loan'] || '🏢'}
        </div>
        <div class="portfolio-card-content">
          <h3 class="portfolio-card-title">Business Loan</h3>
          <p class="portfolio-card-stats">From 14.00% p.a. <span class="stat-dot">•</span> <span class="stat-highlight">Up to ₹50 Lakh</span></p>
          <p class="portfolio-card-desc">Collateral-free business capital to expand inventory for the festive surge.</p>
        </div>
        <div class="portfolio-card-footer">
          <button class="btn-primary festive-card-btn" style="width: 100%;">Grow Your Business &rarr;</button>
        </div>
      </a>
    </div>

    <div class="view-all-container" style="text-align: center; margin-top: 36px;">
      <button class="btn-primary" id="view-all-loans-btn" style="padding: 12px 32px;">View All Loans &rarr;</button>
    </div>
  `;
  container.appendChild(loansPreview);

  // 4. Initialize Sticky Bottom "Top Offers For You" bar (triggers on #play-win-section)
  initStickyOffersBar('play-win-section', onNavigate);

  // 5. Play & Win Prominent Banner
  const gamesPreview = document.createElement('section');
  gamesPreview.className = 'home-games-preview section-wrapper animate-on-scroll';
  gamesPreview.id = 'play-win-section';
  gamesPreview.innerHTML = `
    <div class="pfin-dark-card play-win-dark-card">
      <div class="pfin-content">
        <div class="pfin-badge">
          <span style="font-size: 1.1rem; line-height: 0;">🎁</span> GUARANTEED REWARDS
        </div>
        <h2 class="festive-heading" style="font-size: 2.8rem; color: #fff; margin-bottom: 14px;">
          Play <span class="accent-italic">& Win</span>
        </h2>
        <p style="font-size: 1.05rem; color: #cbd5e1; line-height: 1.5; margin-bottom: 28px; font-family: var(--font-body);">
          Spin, scratch & shuffle to win guaranteed vouchers from top brands.
        </p>
        <button class="btn-primary" id="play-win-hub-btn" style="background:#fff; border-color:#fff; color:#111; padding: 12px 28px;">
          Play & Win Rewards &rarr;
        </button>
      </div>
      <div class="pfin-visual">
        <div class="festive-gift-box-visual">
          <div class="gift-box-glow"></div>
          <span class="gift-box-emoji">🎁</span>
          <div class="floating-coins-cluster">
            <span class="coin c1">🪙</span>
            <span class="coin c2">✨</span>
            <span class="coin c3">🎟️</span>
          </div>
        </div>
      </div>
    </div>
  `;
  container.appendChild(gamesPreview);

  // 6. Explore More Features (Category Grid)
  renderCategoryGrid(container, onNavigate);

  // 7. Campaign Video Showreel
  renderVideoSection(container, onNavigate);

  // 8. Digital Credit Card Sanction (PFIN Section)
  const pfinPreview = document.createElement('section');
  pfinPreview.className = 'home-pfin-preview section-wrapper animate-on-scroll';
  pfinPreview.id = 'pfin-credit-card-section';
  pfinPreview.innerHTML = `
    <div class="pfin-dark-card">
      <div class="pfin-content">
        <div class="pfin-badge">
          <svg width="14" height="14" style="vertical-align: middle; margin-right: 4px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
          INSTANT VIRTUAL CARD
        </div>
        <h2 class="festive-heading pfin-title">Digital Credit Card <span class="accent-italic">Sanction</span></h2>
        <p class="pfin-desc">Get 100% digital instant virtual card generation with zero joining fee and 5% festive rewards across top brand outlets.</p>
        
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
          <button class="btn-primary" id="home-pfin-apply-btn" style="background: #fff; border-color: #fff; color: #111; padding: 12px 24px;">Apply for PFIN Card &rarr;</button>
          <button class="btn-secondary" id="home-pfin-view-btn" style="border-color: rgba(255, 255, 255, 0.3); color: #fff; padding: 12px 24px;">View Details</button>
        </div>
      </div>
      <div class="pfin-visual">
        <div class="pfin-pedestal-container">
          <div class="pedestal-glow"></div>
          <div class="pfin-credit-card-mock">
            <div class="pfin-cc-logo">POONAWALLA PFIN</div>
            <div class="pfin-cc-chip"></div>
            <div class="pfin-cc-number">•••• •••• •••• 8842</div>
            <div class="pfin-cc-footer">
              <span class="pfin-cc-name">VALUED CUSTOMER</span>
              <span class="pfin-cc-exp">10/30</span>
            </div>
          </div>
          <div class="pedestal-base"></div>
        </div>
      </div>
    </div>
  `;
  container.appendChild(pfinPreview);

  // 9. Top Offers For You (3-Card Showcase Grid)
  renderHomeOffersShowcase(container, onNavigate);

  // 10. Festive Winners Wall (Live Winner details)
  renderWinnersWall(container, onNavigate);

  // 11. Featured Blogs & Articles Section (3-Card Showcase)
  renderHomeBlogsSection(container, onNavigate);

  // Bind Listeners
  const viewAllBtn = loansPreview.querySelector('#view-all-loans-btn');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => onNavigate('loans'));
  }

  const playNowBtn = gamesPreview.querySelector('#play-win-hub-btn');
  if (playNowBtn) {
    playNowBtn.addEventListener('click', () => onNavigate('games'));
  }

  const pfinViewBtn = pfinPreview.querySelector('#home-pfin-view-btn');
  if (pfinViewBtn) {
    pfinViewBtn.addEventListener('click', () => onNavigate('pfin'));
  }

  const pfinApplyBtn = pfinPreview.querySelector('#home-pfin-apply-btn');
  if (pfinApplyBtn) {
    pfinApplyBtn.addEventListener('click', () => onNavigate('pfin'));
  }

  const loanCards = loansPreview.querySelectorAll('.loan-card');
  loanCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const target = card.getAttribute('href').replace('#', '');
      onNavigate(target);
    });
  });
}
