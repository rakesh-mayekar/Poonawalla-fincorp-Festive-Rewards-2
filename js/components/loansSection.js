// Loans Section Component
import { LOAN_PRODUCTS, buildUtmUrl } from '../data/loansData.js';
import { trackGa4Event, GA4_EVENTS } from '../services/gaService.js';
import { sendLeadToLeadSquared } from '../services/crmService.js';
import { getSession } from '../state/sessionState.js';

export function renderLoansSection(container) {
  const wrapper = document.createElement('div');
  wrapper.className = 'loans-container';

  wrapper.innerHTML = `
    <div class="loans-header">
      <h2 class="loans-title festive-heading">Poonawalla Fincorp Loan Products</h2>
      <p class="loans-subtitle">Discover high-value loans with attractive interest rates & festive offers.</p>
    </div>

    <div class="loans-list" id="loans-list-wrapper"></div>
  `;

  const listContainer = wrapper.querySelector('#loans-list-wrapper');

  LOAN_PRODUCTS.forEach(product => {
    const card = document.createElement('div');
    card.className = 'loan-card';
    card.id = `loan-card-${product.id}`;

    const finalApplyUrl = buildUtmUrl(product.applyUrl, product.slug);

    card.innerHTML = `
      <div class="loan-card-top">
        <div class="loan-icon-box">${product.icon}</div>
        <div class="loan-info">
          <h3 class="loan-title">${product.title}</h3>
          <div class="loan-rate-tag">
            <span>EMI Starts ${product.startingEmi}</span> • <span>${product.interestRate}</span>
          </div>
        </div>
      </div>

      <div class="festive-offer-banner">
        <span>🏷️</span> ${product.festiveOffer}
      </div>

      <div class="loan-accordion-content">
        <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 8px;">
          <strong>Eligibility:</strong> ${product.eligibility}
        </p>
        <ul class="benefit-list">
          ${product.benefits.map(b => `<li class="benefit-item"><span>✓</span> ${b}</li>`).join('')}
        </ul>
      </div>

      <div class="loan-card-actions">
        <button class="toggle-details-btn" data-id="${product.id}">
          <span class="toggle-text">View Key Benefits</span>
          <span class="toggle-icon">▼</span>
        </button>

        <a href="${finalApplyUrl}" target="_blank" rel="noopener noreferrer" class="apply-now-btn" data-slug="${product.slug}" data-title="${product.title}">
          Apply Now ↗
        </a>
      </div>
    `;

    // Accordion Toggle Handler
    const toggleBtn = card.querySelector('.toggle-details-btn');
    const toggleText = card.querySelector('.toggle-text');
    const toggleIcon = card.querySelector('.toggle-icon');

    toggleBtn.addEventListener('click', () => {
      const isExpanded = card.classList.toggle('expanded');
      toggleText.textContent = isExpanded ? 'Hide Key Benefits' : 'View Key Benefits';
      toggleIcon.textContent = isExpanded ? '▲' : '▼';
    });

    // Apply Now CTA Click Handler
    const applyBtn = card.querySelector('.apply-now-btn');
    applyBtn.addEventListener('click', () => {
      const session = getSession();
      trackGa4Event(GA4_EVENTS.APPLY_NOW_CLICKED, {
        product_slug: product.slug,
        product_title: product.title
      });

      sendLeadToLeadSquared({
        mobileNumber: session.mobile || 'Guest / Direct Click',
        activityType: `Loan Product Apply Click: ${product.title}`,
        contentSlug: product.slug
      });
    });

    listContainer.appendChild(card);
  });

  container.appendChild(wrapper);
}
