// Footer Component (Matching PDF Design)
export function renderFooter(container, onNavigate) {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  
  footer.innerHTML = `
    <div class="footer-container">
      <!-- Top NBFC Statement -->
      <div class="footer-nbfc-statement" style="padding-bottom: 24px; margin-bottom: 28px; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
        <div class="footer-logo-row" style="margin-bottom: 12px;">
          <div class="footer-logo-icon">PF</div>
          <div class="footer-logo-text">
            <h2 class="footer-logo-heading" style="color: #FFFFFF; font-size: 1.25rem; font-weight: 800; letter-spacing: 0.05em; margin: 0;">POONAWALLA FINCORP</h2>
          </div>
        </div>
        <p class="footer-desc" style="color: #9CA3AF; font-size: 0.85rem; line-height: 1.6; max-width: 900px; margin: 0;">
          Poonawalla Fincorp Limited (Formerly Magma Fincorp Limited) is a Systemically Important Non-Banking Financial Company (NBFC-ND-SI) registered with the Reserve Bank of India.
        </p>
      </div>

      <div class="footer-top">
        <!-- Col 1: Festive Games -->
        <div class="footer-links-col">
          <h4>FESTIVE GAMES</h4>
          <ul>
            <li><a href="#spinwin" data-nav="spinwin">Spin & Win Wheel</a></li>
            <li><a href="#scratchcard" data-nav="scratchcard">Golden Scratch Card</a></li>
            <li><a href="#shufflecard" data-nav="shufflecard">3-Card Shuffle Pick</a></li>
          </ul>
        </div>

        <!-- Col 2: Loans -->
        <div class="footer-links-col">
          <h4>LOANS</h4>
          <ul>
            <li><a href="#loans" data-nav="loans">All Loans</a></li>
            <li><a href="#loan-detail?id=instant-personal-loan" data-nav="loan-detail">Instant Personal Loan</a></li>
            <li><a href="#loan-detail?id=prime-personal-loan" data-nav="loan-detail">24x7 Prime Personal Loan</a></li>
            <li><a href="#loan-detail?id=business-loan" data-nav="loan-detail">Business Loan</a></li>
            <li><a href="#loan-detail?id=gold-loan" data-nav="loan-detail">Gold Loan</a></li>
            <li><a href="#loan-detail?id=loan-against-property" data-nav="loan-detail">Loan Against Property</a></li>
            <li><a href="#loan-detail?id=professional-loan" data-nav="loan-detail">Professional Loan</a></li>
            <li><a href="#loan-detail?id=car-loan" data-nav="loan-detail">Pre-Owned Car Loan</a></li>
          </ul>
        </div>

        <!-- Col 3: Quick Links -->
        <div class="footer-links-col">
          <h4>QUICK LINKS</h4>
          <ul>
            <li><a href="#refer" data-nav="refer">Refer & Earn</a></li>
            <li><a href="#cibil" data-nav="cibil">Free CIBIL</a></li>
            <li><a href="#emi" data-nav="emi">EMI Calculator</a></li>
            <li><a href="#offers" data-nav="offers">Top Offers</a></li>
          </ul>
        </div>

        <!-- Col 4: Contact Us -->
        <div class="footer-links-col contact-col">
          <h4>CONTACT US</h4>
          <p class="contact-label" style="color: #D1D5DB; font-weight: 700; font-size: 0.8rem; margin-bottom: 2px;">Corporate Office:</p>
          <p style="color: #9CA3AF; font-size: 0.78rem; line-height: 1.4; margin-bottom: 12px;">Unit No. 2401, 24th Floor, Altimus, Dr G.M. Bhosale Marg, Worli, Mumbai, Maharashtra-400018</p>
          
          <p class="contact-label" style="color: #D1D5DB; font-weight: 700; font-size: 0.8rem; margin-bottom: 2px;">Registered Office:</p>
          <p style="color: #9CA3AF; font-size: 0.78rem; line-height: 1.4; margin-bottom: 12px;">201 and 202, 2nd Floor, AP81, Koregaon Park Annexe, Mundhwa, Pune, Maharashtra - 411036</p>

          <p class="contact-label" style="color: #D1D5DB; font-weight: 700; font-size: 0.8rem; margin-bottom: 2px;">Toll Free No:</p>
          <p class="contact-number" style="font-size: 1.1rem; color: #F59E0B; font-weight: 800; margin-bottom: 4px;">1800-266-3201</p>
          <p class="contact-timing" style="color: #9CA3AF; font-size: 0.75rem; margin-bottom: 8px;">Timing: 9:00 AM to 7:00 PM (Mon-Sat, Closed on Sundays & Public holidays)</p>

          <p class="contact-label" style="color: #D1D5DB; font-weight: 700; font-size: 0.8rem; margin-bottom: 2px;">Write To Us:</p>
          <a href="mailto:customercare@poonawallafincorp.com" class="contact-email" style="color: #38BDF8; font-size: 0.8rem;">customercare@poonawallafincorp.com</a>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom" style="margin-top: 32px;">
        <div class="footer-trust-badges" style="display: flex; align-items: center; gap: 12px;">
          <span class="trust-badge" style="color: #10B981; font-weight: 700; font-size: 0.8rem;">✓ RBI Regulated</span>
          <span class="trust-divider" style="color: #6B7280;">•</span>
          <span class="trust-badge" style="color: #9CA3AF; font-weight: 600; font-size: 0.8rem;">🔒 256-bit Encrypted</span>
        </div>
        <p>&copy; Poonawalla Fincorp 2026. All Rights Reserved.</p>
        <div class="footer-legal-links">
          <a href="#">Terms & Conditions</a> <span class="dot-divider">•</span>
          <a href="#">Privacy Policy</a> <span class="dot-divider">•</span>
          <a href="#">Fair Practices Code</a>
        </div>
      </div>
    </div>
  `;

  // Delegate navigation
  footer.querySelectorAll('a[data-nav]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-nav');
      onNavigate(target);
    });
  });

  container.appendChild(footer);
}
