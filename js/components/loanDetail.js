import { LOAN_PRODUCTS, PRODUCT_LAMPS, buildUtmUrl } from '../data/loansData.js';
import { trackGa4Event, GA4_EVENTS } from '../services/gaService.js';
import { sendLeadToLeadSquared } from '../services/crmService.js';
import { getSession } from '../state/sessionState.js';
import { renderTopOffersSection } from './topOffersScroller.js';

export function renderLoanDetail(container, loanId, onNavigate) {
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

  const lampSvg = PRODUCT_LAMPS[product.id] || '';

  wrapper.innerHTML = `
    <!-- Breadcrumb & Back -->
    <div class="loan-detail-nav-row" style="margin-bottom: 24px;">
      <a href="#loans" class="back-to-loans-btn" id="back-to-loans-link" style="display: inline-flex; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: 600; color: var(--wf-text-secondary); text-decoration: none;">
        &larr; Back to All Loans
      </a>
    </div>

    <!-- Header & Category Lamp -->
    <div class="loan-detail-header" style="text-align: center; margin-bottom: 36px;">
      <div class="loan-lamp-hero-wrap" style="margin: 0 auto 16px auto; width: 90px; height: 90px; border-radius: 50%; background: var(--wf-surface); border: 1px solid var(--wf-border); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(0,0,0,0.04);">
        ${lampSvg}
      </div>
      <span class="festive-badge-pill" style="margin-bottom: 12px; display: inline-block;">✨ Special Festive Edition 2025</span>
      <h1 class="loans-title festive-heading" style="font-size: 2.4rem; margin-bottom: 8px;">${product.title}</h1>
      <p class="loans-subtitle" style="max-width: 650px; margin: 0 auto; font-size: 1.1rem; color: var(--wf-text-secondary);">
        ${product.subtitle} — engineered for quick approval with attractive festive rates and minimal documentation.
      </p>
      
      <div class="festive-offer-banner enhanced-banner" style="margin-top: 24px; font-size: 1.05rem; padding: 14px 28px; display: inline-flex; align-items: center; gap: 10px; background: linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%); border: 1px solid #FDE68A; border-radius: 8px; color: #92400E;">
        <span aria-hidden="true" style="font-size: 1.4rem;">🏷️</span> 
        <span><strong>Exclusive Festive Offer:</strong> ${product.festiveOffer}</span>
      </div>
    </div>

    <!-- Main Content Container -->
    <div class="loan-detail-content" style="background: var(--wf-surface); padding: 36px; border-radius: var(--radius-lg); border: 1px solid var(--wf-border); box-shadow: var(--shadow-sm); max-width: 860px; margin: 0 auto 48px auto;">
      
      <!-- Rates & Starting EMI Row -->
      <div class="loan-key-metrics-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 36px; padding-bottom: 28px; border-bottom: 1px solid var(--wf-border);">
        <div class="metric-box" style="background: var(--wf-surface-subtle); padding: 18px 24px; border-radius: var(--radius-md); border: 1px solid var(--wf-border);">
          <span style="color: var(--wf-text-secondary); font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">Interest Rate</span>
          <div style="font-size: 1.6rem; font-weight: 800; color: #10B981;">${product.interestRate}</div>
          <span style="font-size: 0.75rem; color: var(--wf-text-secondary);">Festive Discount Applied</span>
        </div>

        <div class="metric-box" style="background: var(--wf-surface-subtle); padding: 18px 24px; border-radius: var(--radius-md); border: 1px solid var(--wf-border);">
          <span style="color: var(--wf-text-secondary); font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">EMI Starts At</span>
          <div style="font-size: 1.6rem; font-weight: 800; color: var(--wf-text-primary);">${product.startingEmi}</div>
          <span style="font-size: 0.75rem; color: var(--wf-text-secondary);">Flexible Tenure Options</span>
        </div>

        <div class="metric-box" style="background: var(--wf-surface-subtle); padding: 18px 24px; border-radius: var(--radius-md); border: 1px solid var(--wf-border);">
          <span style="color: var(--wf-text-secondary); font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">Processing Time</span>
          <div style="font-size: 1.6rem; font-weight: 800; color: var(--wf-text-primary);">Instant Disbursal</div>
          <span style="font-size: 0.75rem; color: var(--wf-text-secondary);">100% Digital Flow</span>
        </div>
      </div>

      <!-- Enhanced Festive Benefits Section -->
      <div class="festive-benefits-section" style="margin-bottom: 36px;">
        <div class="festive-benefits-header" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
          <h3 style="font-size: 1.4rem; color: var(--wf-text-primary); display: flex; align-items: center; gap: 8px;">
            <span style="color: #EAB308;">✨</span> Festive Benefits
          </h3>
          <span style="font-size: 0.75rem; font-weight: 700; color: #10B981; background: rgba(16, 185, 129, 0.1); padding: 4px 10px; border-radius: 4px;">
            FESTIVE ADVANTAGE
          </span>
        </div>

        <div class="festive-benefits-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          ${product.benefits.map((b, idx) => `
            <div class="festive-benefit-card" style="background: var(--wf-surface-subtle); padding: 18px 20px; border-radius: var(--radius-md); border: 1px solid var(--wf-border); display: flex; align-items: flex-start; gap: 14px; transition: transform 0.2s ease;">
              <div class="benefit-check-icon" style="width: 28px; height: 28px; border-radius: 50%; background: #111111; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: 800; flex-shrink: 0;">
                ✓
              </div>
              <div>
                <span class="benefit-card-title" style="font-size: 0.95rem; font-weight: 700; color: var(--wf-text-primary); display: block; margin-bottom: 4px;">Benefit ${idx + 1}</span>
                <p style="font-size: 0.88rem; color: var(--wf-text-secondary); line-height: 1.5; margin: 0;">${b}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Eligibility Section -->
      <div style="margin-bottom: 36px; background: #F8FAFC; border: 1px solid #E2E8F0; padding: 20px 24px; border-radius: var(--radius-md);">
        <h4 style="font-size: 1rem; margin-bottom: 8px; color: #0F172A; font-weight: 700;">📌 Eligibility Criteria</h4>
        <p style="font-size: 0.92rem; color: #475569; line-height: 1.6; margin: 0;">
          ${product.eligibility}
        </p>
      </div>
      
      <!-- Trust & Security Badges -->
      <div class="trust-badge-row" style="margin-bottom: 32px; justify-content: center; gap: 24px; display: flex; flex-wrap: wrap;">
        <span class="trust-badge" style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.85rem; color: var(--wf-text-secondary);">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> 100% Secure & RBI Regulated
        </span>
        <span class="trust-badge" style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.85rem; color: var(--wf-text-secondary);">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Instant Verification
        </span>
        <span class="trust-badge" style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.85rem; color: var(--wf-text-secondary);">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Zero Hidden Fees
        </span>
      </div>

      <!-- Action Button Group -->
      <div style="text-align: center;">
        <a href="${finalApplyUrl}" target="_blank" rel="noopener noreferrer" class="apply-now-btn btn-primary" data-slug="${product.slug}" data-title="${product.title}" style="padding: 16px 48px; font-size: 1.1rem; display: inline-flex; align-items: center; justify-content: center; gap: 10px; border-radius: var(--radius-sm);">
          Apply for ${product.title} &rarr;
        </a>
        <p style="margin-top: 12px; font-size: 0.8rem; color: var(--wf-text-secondary);">Direct safe redirect to official Poonawalla Fincorp loan application portal.</p>
      </div>
    </div>
  `;

  // Back link listener
  const backLink = wrapper.querySelector('#back-to-loans-link');
  if (backLink) {
    backLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (onNavigate) {
        onNavigate('loans');
      } else {
        window.location.hash = '#loans';
      }
    });
  }

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

  // Render Top Offers at the bottom of the loan detail page
  renderTopOffersSection(container, onNavigate, {
    title: 'Top Offers For You',
    showHeading: true,
    isBottomSection: true
  });
}
