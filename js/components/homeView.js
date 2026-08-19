import { renderHero } from './hero.js';
import { renderCategoryGrid } from './categoryGrid.js';

export function renderHomeView(container, onNavigate) {
  // 1. Hero / Festival Campaign
  renderHero(container, onNavigate);

  // 2. Key Festival Loan Opportunity (Top Loans Preview)
  const loansPreview = document.createElement('section');
  loansPreview.className = 'home-loans-preview section-wrapper animate-on-scroll';
  loansPreview.innerHTML = `
    <div class="section-header align-left">
      <h2>
        <svg class="section-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
        Our Popular <span style="font-family: var(--font-heading); font-style: italic; font-weight: 500; color: var(--wf-text-secondary); margin-left: 8px;">Services</span>
      </h2>
      <p class="subheading">Explore transparent financial solutions engineered for your business and personal goals.</p>
    </div>
    <div class="loans-grid preview-grid">
      <!-- Instant Personal Loan -->
      <a href="#loan-detail?id=instant-personal-loan" class="loan-card portfolio-card" data-nav="loan-detail" data-id="instant-personal-loan">
        <div class="portfolio-card-badge">Zero Processing Fee</div>
        <div class="portfolio-card-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
        </div>
        <div class="portfolio-card-content">
          <h3 class="portfolio-card-title">Instant Personal Loan</h3>
          <p class="portfolio-card-stats">From 9.99% p.a. <span style="color: #d1d5db; margin: 0 4px;">•</span> <span style="color: #10b981;">Up to ₹30 Lakh</span></p>
          <p class="portfolio-card-desc">100% Paperless, Instant Approval & 24-hour disbursal to fuel festive dreams.</p>
        </div>
        <div class="portfolio-card-footer">
          <button class="btn-primary" style="width: 100%;">Apply Instant Loan &rarr;</button>
        </div>
      </a>
      
      <!-- 24x7 Prime Personal Loan -->
      <a href="#loan-detail?id=prime-personal-loan" class="loan-card portfolio-card" data-nav="loan-detail" data-id="prime-personal-loan">
        <div class="portfolio-card-badge">Flexible EMI</div>
        <div class="portfolio-card-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>
        <div class="portfolio-card-content">
          <h3 class="portfolio-card-title">24x7 Prime Personal Loan</h3>
          <p class="portfolio-card-stats">From 10.49% p.a. <span style="color: #d1d5db; margin: 0 4px;">•</span> <span style="color: #10b981;">Up to ₹30 Lakh</span></p>
          <p class="portfolio-card-desc">Flexible EMIs up to 60 months with zero hidden charges and fast disbursal.</p>
        </div>
        <div class="portfolio-card-footer">
          <button class="btn-primary" style="width: 100%;">Explore Personal Loan &rarr;</button>
        </div>
      </a>

      <!-- Business Loan -->
      <a href="#loan-detail?id=business-loan" class="loan-card portfolio-card" data-nav="loan-detail" data-id="business-loan">
        <div class="portfolio-card-badge">Collateral Free</div>
        <div class="portfolio-card-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>
        </div>
        <div class="portfolio-card-content">
          <h3 class="portfolio-card-title">Business Loan</h3>
          <p class="portfolio-card-stats">From 11.49% p.a. <span style="color: #d1d5db; margin: 0 4px;">•</span> <span style="color: #10b981;">Up to ₹50 Lakh</span></p>
          <p class="portfolio-card-desc">Collateral-free business capital to expand inventory for the festive surge.</p>
        </div>
        <div class="portfolio-card-footer">
          <button class="btn-primary" style="width: 100%;">Grow Business &rarr;</button>
        </div>
      </a>
    </div>
    <div class="view-all-container" style="text-align: center; margin-top: 32px;">
      <button class="btn-primary" id="view-all-loans-btn">View All Loans</button>
    </div>
  `;
  container.appendChild(loansPreview);

  // 3. Play & Win Prominent Banner
  const gamesPreview = document.createElement('section');
  gamesPreview.className = 'home-games-preview section-wrapper animate-on-scroll';
  gamesPreview.innerHTML = `
    <div class="pfin-dark-card">
      <div class="pfin-content">
        <div class="section-header align-left">
          <h2 class="festive-heading pfin-title" style="font-size: 2.5rem; letter-spacing: -0.02em;">
            <svg class="section-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
            Festive <span style="font-style: italic; color: var(--wf-accent);">Games</span>
          </h2>
          <p class="subheading" style="color: inherit; max-width: none;">Spin the wheel, scratch cards, and shuffle to unlock exciting offers and exclusive partner deals.</p>
        </div>
        
        <div class="pfin-actions">
          <button class="btn-primary" id="play-win-hub-btn" style="background:#fff; border-color:#fff; color:#111;">Play Now</button>
        </div>
      </div>
      <div class="pfin-visual">
         <div class="promo-circle" style="background: linear-gradient(135deg, #1f1f22, #09090a); border-color: rgba(255, 255, 255, 0.1); color: #fff;">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
         </div>
      </div>
    </div>
  `;
  container.appendChild(gamesPreview);

  // 4. Explore Secondary Features (Category Grid)
  renderCategoryGrid(container, onNavigate);

  // 5. PFIN Dedicated Section (Moved below CategoryGrid)
  const pfinPreview = document.createElement('section');
  pfinPreview.className = 'home-pfin-preview section-wrapper animate-on-scroll';
  pfinPreview.innerHTML = `
    <div class="pfin-dark-card">
      <div class="pfin-content">
        <div class="pfin-badge">
          <svg width="14" height="14" style="vertical-align: middle; margin-right: 4px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
          DIGITAL FINANCIAL PRODUCT
        </div>
        <h2 class="festive-heading pfin-title">Digital Credit Card <i>Sanction</i></h2>
        <p class="pfin-desc">Get 100% digital instant virtual card generation with zero joining fee and 5% festive rewards.</p>
        
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
          <button class="btn-secondary" style="border-color: rgba(255, 255, 255, 0.3); color: #fff;">View Details</button>
          <button class="btn-primary" style="background: #fff; border-color: #fff; color: #111;">Apply for PFIN Card</button>
        </div>
      </div>
      <div class="pfin-visual">
        <div class="pfin-credit-card-mock">
          <div class="pfin-cc-logo">POONAWALLA PFIN</div>
          <div class="pfin-cc-chip"></div>
          <div class="pfin-cc-number">.... .... .... 8842</div>
          <div class="pfin-cc-footer">
            <span class="pfin-cc-name">VALUED CUSTOMER</span>
            <span class="pfin-cc-exp">10/30</span>
          </div>
        </div>
      </div>
    </div>
  `;
  container.appendChild(pfinPreview);

  // 5. Top Offers For You Section
  const topOffersSection = document.createElement('section');
  topOffersSection.className = 'home-top-offers-preview animate-on-scroll';
  topOffersSection.innerHTML = `
    <div class="top-offers-container">
      <div class="section-header align-left">
        <h2>
          <svg class="section-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
          Top Offers For You
        </h2>
        <p class="subheading">Unlock exclusive vouchers and cashback across top brands.</p>
      </div>
      <div class="top-offers-scroll">
        <div class="top-offer-item">
          <div class="top-offer-logo">MYN</div>
          <div class="top-offer-details">
            <span class="top-offer-brand">Myntra</span>
            <span class="top-offer-text">₹250 OFF on min. cart ₹1,499</span>
          </div>
        </div>
        <div class="top-offer-item">
          <div class="top-offer-logo">KFC</div>
          <div class="top-offer-details">
            <span class="top-offer-brand">KFC</span>
            <span class="top-offer-text">Free Medium Popcorn on ₹499+</span>
          </div>
        </div>
        <div class="top-offer-item">
          <div class="top-offer-logo">SWG</div>
          <div class="top-offer-details">
            <span class="top-offer-brand">Swiggy Instamart</span>
            <span class="top-offer-text">Flat ₹120 OFF on Groceries</span>
          </div>
        </div>
        <div class="top-offer-item">
          <div class="top-offer-logo">AJIO</div>
          <div class="top-offer-details">
            <span class="top-offer-brand">Ajio</span>
            <span class="top-offer-text">₹150 OFF on min order ₹1,299</span>
          </div>
        </div>
        <div class="top-offer-item">
          <div class="top-offer-logo">LS</div>
          <div class="top-offer-details">
            <span class="top-offer-brand">Lifestyle</span>
            <span class="top-offer-text">₹500 OFF on ₹2,500</span>
          </div>
        </div>
        <button class="top-offer-view-all" id="view-all-offers-btn">View All Offers</button>
      </div>
    </div>
  `;
  container.appendChild(topOffersSection);

  // Bind Listeners
  const viewAllOffersBtn = topOffersSection.querySelector('#view-all-offers-btn');
  if (viewAllOffersBtn) {
    viewAllOffersBtn.addEventListener('click', (e) => {
      e.preventDefault();
      onNavigate('offers');
    });
  }

  const viewAllBtn = loansPreview.querySelector('#view-all-loans-btn');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => onNavigate('loans'));
  }

  const playNowBtn = gamesPreview.querySelector('#play-win-hub-btn');
  if (playNowBtn) {
    playNowBtn.addEventListener('click', () => onNavigate('games'));
  }

  const loanCards = loansPreview.querySelectorAll('.loan-card');
  loanCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      // Simulate navigate with param (app.js handles routing)
      const target = card.getAttribute('href').replace('#', '');
      onNavigate(target);
    });
  });
}
