import { renderHero } from './hero.js';
import { renderCategoryGrid } from './categoryGrid.js';
import { renderTopOffersSection } from './topOffersScroller.js';
import { PRODUCT_LAMPS } from '../data/loansData.js';

export function renderHomeView(container, onNavigate) {
  // 1. Hero / Festival Campaign
  renderHero(container, onNavigate);

  // 2. Top Loans Portfolio Preview with Category Lamps
  const loansPreview = document.createElement('section');
  loansPreview.className = 'home-loans-preview section-wrapper animate-on-scroll';
  loansPreview.innerHTML = `
    <div class="section-header align-left">
      <div style="margin-bottom: 12px; background: transparent; border: none; padding: 0; font-size: 0.75rem; letter-spacing: 0.05em; color: var(--wf-text-secondary); text-transform: uppercase; font-weight: 700;">• POONAWALLA FINCORP PORTFOLIO</div>
      <h2 style="font-family: var(--font-heading); margin-bottom: 8px;">
        Our Popular <span style="font-style: italic; font-weight: 500; color: var(--wf-text-secondary); margin-left: 8px;">Services</span>
      </h2>
      <p class="subheading" style="margin: 0;">Explore transparent financial solutions engineered with festive rate discounts & quick approval.</p>
    </div>
    <div class="loans-grid preview-grid">
      <!-- Instant Personal Loan -->
      <a href="#loan-detail?id=instant-personal-loan" class="loan-card portfolio-card" data-nav="loan-detail" data-id="instant-personal-loan">
        <div class="portfolio-card-badge">Zero Processing Fee</div>
        <div class="product-lamp-container">
          ${PRODUCT_LAMPS['instant-personal-loan']}
        </div>
        <div class="portfolio-card-content">
          <h3 class="portfolio-card-title">Instant Personal Loan</h3>
          <p class="portfolio-card-stats">From 10.25% p.a. <span style="color: #d1d5db; margin: 0 4px;">•</span> <span style="color: #10b981;">Up to ₹5 Lakh</span></p>
          <p class="portfolio-card-desc">100% Paperless, Instant Approval & 5-minute disbursal to fuel festive dreams.</p>
        </div>
        <div class="portfolio-card-footer">
          <button class="btn-primary" style="width: 100%;">Apply Instant Loan &rarr;</button>
        </div>
      </a>
      
      <!-- 24x7 Prime Personal Loan -->
      <a href="#loan-detail?id=prime-personal-loan" class="loan-card portfolio-card" data-nav="loan-detail" data-id="prime-personal-loan">
        <div class="portfolio-card-badge">Flexible EMI</div>
        <div class="product-lamp-container">
          ${PRODUCT_LAMPS['prime-personal-loan']}
        </div>
        <div class="portfolio-card-content">
          <h3 class="portfolio-card-title">24x7 Prime Personal Loan</h3>
          <p class="portfolio-card-stats">From 9.99% p.a. <span style="color: #d1d5db; margin: 0 4px;">•</span> <span style="color: #10b981;">Up to ₹30 Lakh</span></p>
          <p class="portfolio-card-desc">Flexible EMIs up to 60 months with zero hidden charges and high sanction limits.</p>
        </div>
        <div class="portfolio-card-footer">
          <button class="btn-primary" style="width: 100%;">Explore Prime Loan &rarr;</button>
        </div>
      </a>

      <!-- Business Loan -->
      <a href="#loan-detail?id=business-loan" class="loan-card portfolio-card" data-nav="loan-detail" data-id="business-loan">
        <div class="portfolio-card-badge">Collateral Free</div>
        <div class="product-lamp-container">
          ${PRODUCT_LAMPS['business-loan']}
        </div>
        <div class="portfolio-card-content">
          <h3 class="portfolio-card-title">Business Loan</h3>
          <p class="portfolio-card-stats">From 14.00% p.a. <span style="color: #d1d5db; margin: 0 4px;">•</span> <span style="color: #10b981;">Up to ₹50 Lakh</span></p>
          <p class="portfolio-card-desc">Collateral-free business capital to expand inventory for the festive surge.</p>
        </div>
        <div class="portfolio-card-footer">
          <button class="btn-primary" style="width: 100%;">Grow Business &rarr;</button>
        </div>
      </a>
    </div>
    <div class="view-all-container" style="text-align: center; margin-top: 32px;">
      <button class="btn-primary" id="view-all-loans-btn">View All 7 Loan Products</button>
    </div>
  `;
  container.appendChild(loansPreview);

  // 4. Play & Win Prominent Banner
  const gamesPreview = document.createElement('section');
  gamesPreview.className = 'home-games-preview section-wrapper animate-on-scroll';
  gamesPreview.innerHTML = `
    <div class="pfin-dark-card">
      <div class="pfin-content">
        <div style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; background: transparent; border: 1px solid rgba(255,255,255,0.2); border-radius: 20px; font-size: 0.75rem; font-weight: 600; color: #fff; margin-bottom: 24px;">
          <span style="font-size: 1.2rem; line-height: 0;">☆</span> FESTIVE GAMIFICATION
        </div>
        <h2 class="festive-heading" style="font-size: 3rem; color: #fff; margin-bottom: 16px;">
          Play <i style="color: var(--wf-text-secondary);">& Win</i>
        </h2>
        <p style="font-size: 1.1rem; color: #a1a1aa; line-height: 1.5; margin-bottom: 32px; font-family: var(--font-body);">Spin the wheel, scratch cards, and shuffle to unlock guaranteed brand vouchers from Lenovo, Tata Cliq Luxury, Myntra & more.</p>
        <button class="btn-primary" id="play-win-hub-btn" style="background:#fff; border-color:#fff; color:#111;">Play & Win Rewards &rarr;</button>
      </div>
      <div class="pfin-visual">
         <div class="promo-circle" style="width: 100px; height: 100px; background: transparent; border: 1px solid rgba(255, 255, 255, 0.2); color: #fff;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
         </div>
      </div>
    </div>
  `;
  container.appendChild(gamesPreview);

  // 5. Explore Secondary Features (Category Grid)
  renderCategoryGrid(container, onNavigate);

  // 6. PFIN Dedicated Section
  const pfinPreview = document.createElement('section');
  pfinPreview.className = 'home-pfin-preview section-wrapper animate-on-scroll';
  pfinPreview.style.marginTop = '120px';
  pfinPreview.innerHTML = `
    <div class="pfin-dark-card">
      <div class="pfin-content">
        <div class="pfin-badge">
          <svg width="14" height="14" style="vertical-align: middle; margin-right: 4px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
          DIGITAL FINANCIAL PRODUCT
        </div>
        <h2 class="festive-heading pfin-title">Digital Credit Card <i>Sanction</i></h2>
        <p class="pfin-desc">Get 100% digital instant virtual card generation with zero joining fee and guaranteed festive vouchers.</p>
        
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
          <button class="btn-secondary" id="home-pfin-view-btn" style="border-color: rgba(255, 255, 255, 0.3); color: #fff;">View Details</button>
          <button class="btn-primary" id="home-pfin-apply-btn" style="background: #fff; border-color: #fff; color: #111;">Apply for PFIN Card &rarr;</button>
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
  `;
  container.appendChild(pfinPreview);

  // 7. Top Offers Auto-Scroller Carousel (Continuous marquee containing all 12 items)
  renderTopOffersSection(container, onNavigate, {
    title: 'Top Offers For You',
    showHeading: true
  });

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
