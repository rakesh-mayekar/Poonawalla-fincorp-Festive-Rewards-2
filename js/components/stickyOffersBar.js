// Sticky Bottom "Top Offers For You" Component
// Visible ONLY from the "Play & Win" section to the bottom of the page
// (Hidden during the first two sections: Hero & Limited Period Offers)

import { AUTO_SCROLLER_OFFERS } from '../data/offersData.js';

export function initStickyOffersBar(targetSectionId = 'play-win-section', onNavigate) {
  // Remove existing sticky bar if re-initializing
  const existingBar = document.getElementById('sticky-bottom-offers-bar');
  if (existingBar) existingBar.remove();

  const bar = document.createElement('div');
  bar.id = 'sticky-bottom-offers-bar';
  bar.className = 'sticky-bottom-offers-bar';
  bar.setAttribute('role', 'complementary');
  bar.setAttribute('aria-label', 'Festive Top Offers Sticky Bar');

  // Generate cards matching PDF style: Myntra ₹250 OFF on min. cart ₹1,499, etc.
  const offersList = AUTO_SCROLLER_OFFERS.length > 0 ? AUTO_SCROLLER_OFFERS : [
    { id: 'myntra-1', brandName: 'Myntra', brandInitials: 'M', offerDescription: '₹250 OFF on min. cart ₹1,499' },
    { id: 'amazon-1', brandName: 'Amazon', brandInitials: 'a', offerDescription: 'Up to 15% Instant Cashback' },
    { id: 'flipkart-1', brandName: 'Flipkart', brandInitials: 'F', offerDescription: 'Flat ₹500 OFF Festive Special' },
    { id: 'swiggy-1', brandName: 'Swiggy', brandInitials: 'S', offerDescription: 'Flat ₹120 OFF Instamart' },
    { id: 'kfc-1', brandName: 'KFC', brandInitials: 'K', offerDescription: 'Free Popcorn on ₹499 order' },
    { id: 'croma-1', brandName: 'Croma', brandInitials: 'C', offerDescription: 'Extra ₹1,000 Festive Voucher' }
  ];

  const cardsHtml = [...offersList, ...offersList].map(offer => `
    <div class="sticky-offer-item" data-id="${offer.id}">
      <div class="sticky-offer-badge-wrap">
        <span class="sticky-brand-logo ${offer.brandName.toLowerCase()}">${offer.brandInitials || offer.brandName.charAt(0)}</span>
      </div>
      <div class="sticky-offer-info">
        <strong class="sticky-brand-title">${offer.brandName}</strong>
        <span class="sticky-offer-text">${offer.offerDescription}</span>
      </div>
    </div>
  `).join('');

  bar.innerHTML = `
    <div class="sticky-bar-content-wrapper">
      <div class="sticky-bar-header-tag">
        <span class="sticky-pulse-dot"></span>
        <span class="sticky-tag-title">Top Offers For You</span>
      </div>

      <div class="sticky-offers-track-wrapper">
        <div class="sticky-offers-track">
          ${cardsHtml}
        </div>
      </div>

      <div class="sticky-bar-cta-wrap">
        <button class="sticky-view-all-btn" id="sticky-view-all-offers" aria-label="View All Top Offers">
          View All &rarr;
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(bar);

  // Click on "View All" (Scrolls smoothly to featured offers grid or navigates to offers)
  const viewAllBtn = bar.querySelector('#sticky-view-all-offers');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
      const offersGrid = document.getElementById('featured-offers-grid');
      if (offersGrid) {
        offersGrid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (onNavigate) {
        onNavigate('offers');
      }
    });
  }

  // Click on individual items
  const items = bar.querySelectorAll('.sticky-offer-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      const offersGrid = document.getElementById('featured-offers-grid');
      if (offersGrid) {
        offersGrid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (onNavigate) {
        onNavigate('offers');
      }
    });
  });

  // Setup Observer on #play-win-section (3rd section on home page)
  const setupObserver = () => {
    const targetElement = document.getElementById(targetSectionId);
    if (!targetElement) {
      setTimeout(setupObserver, 200);
      return;
    }

    const checkVisibility = () => {
      const rect = targetElement.getBoundingClientRect();
      // Only show once the user scrolls down to or past the Play & Win section
      if (rect.top <= window.innerHeight * 0.85) {
        bar.classList.add('visible');
      } else {
        bar.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', checkVisibility, { passive: true });
    checkVisibility();
  };

  setupObserver();
}
