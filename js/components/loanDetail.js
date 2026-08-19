import { LOAN_PRODUCTS, buildUtmUrl } from '../data/loansData.js';
import { trackGa4Event, GA4_EVENTS } from '../services/gaService.js';
import { sendLeadToLeadSquared } from '../services/crmService.js';
import { getSession } from '../state/sessionState.js';

export function renderLoanDetail(container, loanId) {
  const product = LOAN_PRODUCTS.find(p => p.id === loanId);
  
  if (!product) {
    container.innerHTML = `
      <div style="padding: 64px 20px; text-align: center;">
        <h2>Loan product not found</h2>
        <a href="#loans" class="btn-primary" style="margin-top: 16px;">View All Loans</a>
      </div>
    `;
    return;
  }

  const finalApplyUrl = buildUtmUrl(product.applyUrl, product.slug);
  const wrapper = document.createElement('div');
  wrapper.className = 'loan-detail-container section-wrapper';

  wrapper.innerHTML = `
    <div class="loan-detail-header" style="text-align: center; margin-bottom: 32px;">
      <div class="loan-icon-box" style="font-size: 3rem; margin: 0 auto 16px auto; width: 80px; height: 80px; border-radius: 50%; background: var(--wf-surface-subtle); display: flex; align-items: center; justify-content: center;">
        ${product.icon}
      </div>
      <h2 class="loans-title festive-heading">${product.title}</h2>
      <p class="loans-subtitle" style="max-width: 600px; margin: 0 auto;">
        ${product.title} with attractive rates and special festive offers.
      </p>
      
      <div class="festive-offer-banner" style="margin-top: 24px; font-size: 1rem; padding: 12px 24px;">
        <span aria-hidden="true">🏷️</span> <strong>Festive Special:</strong> ${product.festiveOffer}
      </div>
    </div>

    <div class="loan-detail-content" style="background: var(--wf-surface); padding: 32px; border-radius: var(--radius-lg); border: 1px solid var(--wf-border); box-shadow: var(--shadow-sm); max-width: 800px; margin: 0 auto;">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid var(--wf-border);">
        <div>
          <h4 style="color: var(--wf-text-secondary); font-size: 0.9rem; margin-bottom: 4px;">Interest Rate</h4>
          <div style="font-size: 1.2rem; font-weight: 800; color: var(--wf-text-primary);">${product.interestRate}</div>
        </div>
        <div>
          <h4 style="color: var(--wf-text-secondary); font-size: 0.9rem; margin-bottom: 4px;">EMI Starts At</h4>
          <div style="font-size: 1.2rem; font-weight: 800; color: var(--wf-text-primary);">${product.startingEmi}</div>
        </div>
      </div>

      <div style="margin-bottom: 32px;">
        <h3 style="font-size: 1.2rem; margin-bottom: 16px;">Key Benefits</h3>
        <ul class="benefit-list" style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 12px;">
          ${product.benefits.map(b => `
            <li style="display: flex; align-items: flex-start; gap: 12px; font-size: 0.95rem; color: var(--wf-text-secondary);">
              <span style="color: var(--color-primary); font-weight: 800;">✓</span>
              <span>${b}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <div style="margin-bottom: 32px;">
        <h3 style="font-size: 1.2rem; margin-bottom: 16px;">Eligibility</h3>
        <p style="font-size: 0.95rem; color: var(--wf-text-secondary); line-height: 1.6;">
          ${product.eligibility}
        </p>
      </div>
      
      <div class="trust-badge-row" style="margin-bottom: 32px; justify-content: center; gap: 24px;">
        <span class="trust-badge"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> 100% Secure</span>
        <span class="trust-badge"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Quick Disbursal</span>
      </div>

      <div style="text-align: center;">
        <a href="${finalApplyUrl}" target="_blank" rel="noopener noreferrer" class="apply-now-btn btn-primary" data-slug="${product.slug}" data-title="${product.title}" style="padding: 16px 40px; font-size: 1.1rem; display: inline-flex; align-items: center; justify-content: center;">
          Apply Now <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 8px;"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
        <p style="margin-top: 12px; font-size: 0.8rem; color: var(--wf-text-secondary);">You will be redirected to the secure Poonawalla Fincorp application portal.</p>
      </div>
    </div>
  `;

  // Apply Now CTA Click Handler
  const applyBtn = wrapper.querySelector('.apply-now-btn');
  if (applyBtn) {
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
  }

  container.appendChild(wrapper);
}
