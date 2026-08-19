export function renderFooter(container, onNavigate) {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  
  footer.innerHTML = `
    <div class="footer-container">
      <div class="footer-top">
        <div class="footer-brand-col">
          <div class="footer-logo-row">
            <div class="footer-logo-icon">PF</div>
            <div class="footer-logo-text">
              <h2 class="footer-logo-heading">POONAWALLA FINCORP</h2>
              <span class="footer-logo-sub">FESTIVE ENGAGEMENT WIREFRAME</span>
            </div>
          </div>
          <p class="footer-desc">Poonawalla Fincorp Limited (Formerly Magma Fincorp Limited) is a Systemically Important Non-Banking Financial Company (NBFC-ND-SI) registered with the Reserve Bank of India.</p>
          <div class="footer-trust-badges">
            <span class="trust-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg> RBI Regulated</span>
            <span class="trust-divider">•</span>
            <span class="trust-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> 256-bit Encrypted</span>
          </div>
        </div>
        
        <div class="footer-links-col">
          <h4>FESTIVE GAMES</h4>
          <ul>
            <li><a href="#games" data-nav="games">Spin & Win Wheel</a></li>
            <li><a href="#games" data-nav="games">Golden Scratch Card</a></li>
            <li><a href="#games" data-nav="games">3-Card Shuffle Pick</a></li>
            <li><a href="#offers" data-nav="offers">Top Festive Partner Offers</a></li>
            <li><a href="#offers" data-nav="offers">Instant Brand Vouchers</a></li>
          </ul>
        </div>

        <div class="footer-links-col">
          <h4>FINANCIAL SOLUTIONS</h4>
          <ul>
            <li><a href="#loan-detail?id=instant-personal">Pre-Approved ₹15 Lakh Loan</a></li>
            <li><a href="#loan-detail?id=prime-personal">Digital PFIN Credit Card</a></li>
            <li><a href="#loan-detail?id=instant-personal">Instant Personal Loans</a></li>
            <li><a href="#loan-detail?id=business">Business & Gold Loans</a></li>
            <li><a href="#cibil">Free CIBIL Credit Check</a></li>
          </ul>
        </div>

        <div class="footer-links-col contact-col">
          <h4>CUSTOMER CARE</h4>
          <p class="contact-label">Toll-Free Helpline:</p>
          <p class="contact-number">1800-266-3201</p>
          <p class="contact-timing">Mon-Sat (9:00 AM to 6:00 PM)</p>
          <a href="mailto:customercare@poonawallafincorp.com" class="contact-email">customercare@poonawallafincorp.com</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 Poonawalla Fincorp Limited. Wireframe Edition.</p>
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
