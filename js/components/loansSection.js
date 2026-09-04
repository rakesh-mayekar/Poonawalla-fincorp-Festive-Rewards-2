// Loans Section Component (All Loans)
import { LOAN_PRODUCTS, PRODUCT_LAMPS } from '../data/loansData.js';
import { trackGa4Event, GA4_EVENTS } from '../services/gaService.js';
import { renderTopOffersSection } from './topOffersScroller.js';

export function renderLoansSection(container, onNavigate) {
  const wrapper = document.createElement('div');
  wrapper.className = 'loans-container section-wrapper';

  wrapper.innerHTML = `
    <div class="section-header align-left">
      <span class="section-kicker" style="color: var(--wf-text-secondary); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">• FESTIVE LOAN PORTFOLIO</span>
      <h2 style="margin-top: 4px;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="section-icon"><path d="M11 4C11 8.5 7.5 11 4 11C7.5 11 11 13.5 11 18C11 13.5 14.5 11 19 11C14.5 11 11 8.5 11 4Z" /><circle cx="6" cy="17" r="1.5" /><path d="M18 5 v4 m-2 -2 h4" /></svg>
        Explore All Loan <span style="font-style: italic; font-weight: 500; color: var(--wf-text-secondary); margin-left: 6px;">Products</span>
      </h2>
      <p class="subheading">Discover high-value loans with attractive festive interest rates, zero processing fee, and instant approval.</p>
    </div>

    <div class="loans-list preview-grid" id="loans-list-wrapper"></div>
  `;

  const listContainer = wrapper.querySelector('#loans-list-wrapper');

  LOAN_PRODUCTS.forEach(product => {
    const card = document.createElement('a');
    card.href = `#loan-detail?id=${product.id}`;
    card.className = 'loan-card portfolio-card animate-on-scroll';
    card.id = `loan-card-${product.id}`;

    const lampSvg = PRODUCT_LAMPS[product.id] || '';

    card.innerHTML = `
      <div class="portfolio-card-badge">${product.festiveOffer.split('+')[0] || 'Festive Special'}</div>
      
      <div class="product-lamp-container">
        ${lampSvg}
      </div>

      <div class="portfolio-card-content">
        <h3 class="portfolio-card-title">${product.title}</h3>
        <p class="portfolio-card-stats">EMI Starts ${product.startingEmi} <span style="color: #d1d5db; margin: 0 4px;">•</span> <span style="color: #10b981;">${product.interestRate}</span></p>
        <p class="portfolio-card-desc">${product.subtitle}</p>

        <!-- Festive Benefits Preview -->
        <div class="festive-benefits-preview" style="margin-top: 14px; padding-top: 12px; border-top: 1px dashed var(--wf-border);">
          <span style="font-size: 0.75rem; font-weight: 700; color: var(--wf-text-secondary); text-transform: uppercase; display: block; margin-bottom: 6px;">✨ Festive Benefits:</span>
          <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.8rem; color: var(--wf-text-secondary); display: flex; flex-direction: column; gap: 4px;">
            ${product.benefits.slice(0, 2).map(b => `<li style="display: flex; align-items: center; gap: 6px;"><span style="color: #10B981; font-weight: bold;">✓</span> ${b}</li>`).join('')}
          </ul>
        </div>
      </div>
      
      <div class="portfolio-card-footer" style="margin-top: 16px;">
        <button class="btn-primary" style="width: 100%;">View Festive Details &rarr;</button>
      </div>
    `;

    card.addEventListener('click', (e) => {
      e.preventDefault();
      trackGa4Event(GA4_EVENTS.VIEW_ITEM, {
        product_slug: product.slug,
        product_title: product.title
      });
      if (onNavigate) {
        onNavigate(`loan-detail?id=${product.id}`);
      } else {
        window.location.hash = `#loan-detail?id=${product.id}`;
      }
    });

    listContainer.appendChild(card);
  });

  container.appendChild(wrapper);

  // Render Top Offers at the bottom of the Loans page
  renderTopOffersSection(container, onNavigate, {
    title: 'Top Offers For You',
    showHeading: true,
    isBottomSection: true
  });
}
