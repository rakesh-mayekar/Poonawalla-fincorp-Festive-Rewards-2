// Loans Section Component (All Loans)
import { LOAN_PRODUCTS, buildUtmUrl } from '../data/loansData.js';
import { trackGa4Event, GA4_EVENTS } from '../services/gaService.js';
import { getSession } from '../state/sessionState.js';

export function renderLoansSection(container) {
  const wrapper = document.createElement('div');
  wrapper.className = 'loans-container section-wrapper';

  wrapper.innerHTML = `
    <div class="section-header">
      <h2>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="section-icon"><path d="M11 4C11 8.5 7.5 11 4 11C7.5 11 11 13.5 11 18C11 13.5 14.5 11 19 11C14.5 11 11 8.5 11 4Z" /><circle cx="6" cy="17" r="1.5" /><path d="M18 5 v4 m-2 -2 h4" /></svg>
        Explore All Loan Products
      </h2>
      <p class="subheading">Discover high-value loans with attractive interest rates & festive offers.</p>
    </div>

    <div class="loans-list preview-grid" id="loans-list-wrapper"></div>
  `;

  const listContainer = wrapper.querySelector('#loans-list-wrapper');

  LOAN_PRODUCTS.forEach(product => {
    const card = document.createElement('a');
    card.href = `#loan-detail?id=${product.id}`;
    card.className = 'loan-card';
    card.id = `loan-card-${product.id}`;

    card.innerHTML = `
      <div class="loan-card-content">
        <div class="loan-icon-box" aria-hidden="true" style="font-size: 2rem; margin-bottom: 12px;">${product.icon}</div>
        <h3 class="loan-title">${product.title}</h3>
        <p class="loan-desc" style="font-size: 0.85rem; color: var(--wf-text-secondary); margin-bottom: 12px;">
          EMI Starts ${product.startingEmi} • ${product.interestRate}
        </p>
        
        <div class="festive-offer-banner" style="margin-bottom: 16px;">
          <span aria-hidden="true">🏷️</span> ${product.festiveOffer}
        </div>
      </div>
      
      <div class="trust-badge-row" style="margin-bottom: 16px; justify-content: flex-start;">
        <span class="trust-badge"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> 100% Secure</span>
      </div>

      <div class="loan-card-footer">
        <button class="btn-secondary" style="width: 100%;">View Details</button>
      </div>
    `;

    // Click tracking before routing
    card.addEventListener('click', () => {
      trackGa4Event(GA4_EVENTS.VIEW_ITEM, {
        product_slug: product.slug,
        product_title: product.title
      });
    });

    listContainer.appendChild(card);
  });

  container.appendChild(wrapper);
}
