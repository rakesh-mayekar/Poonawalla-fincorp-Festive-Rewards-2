// Reusable Top Offers Auto-Scroller / Auto-Carousel Component
// Used across Homepage and at the bottom of all subpages with all 12 exact offers
import { AUTO_SCROLLER_OFFERS } from '../data/offersData.js';

export function renderTopOffersSection(container, onNavigate, options = {}) {
  const { title = 'Top Offers For You', showHeading = true, isBottomSection = false } = options;

  const section = document.createElement('section');
  section.className = `top-offers-auto-section ${isBottomSection ? 'subpage-bottom-offers' : ''} animate-on-scroll`;

  // Duplicate items for continuous seamless loop
  const offersTrackHtml = [...AUTO_SCROLLER_OFFERS, ...AUTO_SCROLLER_OFFERS].map(offer => `
    <div class="scroller-offer-card" data-id="${offer.id}">
      <div class="scroller-card-header">
        <span class="scroller-brand-badge">${offer.brandInitials}</span>
        <span class="scroller-brand-name">${offer.brandName}</span>
      </div>
      <div class="scroller-offer-desc">${offer.offerDescription}</div>
      <div class="scroller-card-footer">
        <span class="scroller-tag">Festive Exclusive</span>
        <span class="scroller-action-link">Unlock &rarr;</span>
      </div>
    </div>
  `).join('');

  section.innerHTML = `
    <div class="top-offers-inner-wrapper">
      ${showHeading ? `
        <div class="top-offers-section-header">
          <div class="top-offers-title-group">
            <span class="top-offers-kicker">✨ FESTIVE REWARDS & PARTNERS</span>
            <h2 class="top-offers-main-title">${title}</h2>
          </div>
          <button class="btn-secondary view-all-offers-action" style="padding: 8px 18px; font-size: 0.85rem;">
            View All Offers &rarr;
          </button>
        </div>
      ` : ''}

      <div class="offers-marquee-container">
        <div class="offers-marquee-track">
          ${offersTrackHtml}
        </div>
      </div>
    </div>
  `;

  // Click on "View All Offers"
  const viewAllBtn = section.querySelector('.view-all-offers-action');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (onNavigate) {
        onNavigate('offers');
      } else {
        window.location.hash = '#offers';
      }
    });
  }

  // Click on individual cards
  const cards = section.querySelectorAll('.scroller-offer-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      if (onNavigate) {
        onNavigate('offers');
      } else {
        window.location.hash = '#offers';
      }
    });
  });

  container.appendChild(section);
}
