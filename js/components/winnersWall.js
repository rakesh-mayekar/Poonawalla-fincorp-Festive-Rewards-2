// Festive Winners Wall Component
// Highlights top partner brands (Amazon, Myntra, Tanishq, KFC, Croma, Swiggy) and verified customer wins

export function renderWinnersWall(container, onNavigate) {
  const section = document.createElement('section');
  section.className = 'winners-wall-section section-wrapper animate-on-scroll';
  section.id = 'winners-section';

  const WINNERS_DATA = [
    { 
      winner: 'Rahul S.', 
      brand: 'Tanishq', 
      brandInitials: 'T', 
      brandClass: 'tanishq', 
      prize: '₹500 Tanishq Gold Voucher', 
      product: 'Instant Loan', 
      time: '2 mins ago',
      color: '#991B1B'
    },
    { 
      winner: 'Priya M.', 
      brand: 'Myntra', 
      brandInitials: 'M', 
      brandClass: 'myntra', 
      prize: '₹250 OFF on Min. Cart ₹1,499', 
      product: 'Play & Win', 
      time: '5 mins ago',
      color: '#FF3F6C'
    },
    { 
      winner: 'Amitabh V.', 
      brand: 'Amazon', 
      brandInitials: 'a', 
      brandClass: 'amazon', 
      prize: '₹1,000 Amazon Shopping Voucher', 
      product: 'Prime Personal Loan', 
      time: '11 mins ago',
      color: '#FF9900'
    },
    { 
      winner: 'Sneha D.', 
      brand: 'PFIN Cashback', 
      brandInitials: 'PF', 
      brandClass: 'pfin', 
      prize: '5% Instant Festive Cashback', 
      product: 'PFIN Card', 
      time: '18 mins ago',
      color: '#10B981'
    },
    { 
      winner: 'Vikram R.', 
      brand: 'KFC', 
      brandInitials: 'K', 
      brandClass: 'kfc', 
      prize: 'Free Popcorn & Meal Voucher', 
      product: 'Spin & Win', 
      time: '24 mins ago',
      color: '#E4002B'
    },
    { 
      winner: 'Ananya G.', 
      brand: 'Croma', 
      brandInitials: 'C', 
      brandClass: 'croma', 
      prize: '₹1,500 Electronics Voucher', 
      product: 'Business Loan', 
      time: '32 mins ago',
      color: '#00E9BF'
    }
  ];

  const winnersCardsHtml = WINNERS_DATA.map(w => `
    <div class="winner-card-item">
      <div class="winner-card-top">
        <div class="winner-brand-pill ${w.brandClass}">
          <span class="brand-avatar-badge">${w.brandInitials}</span>
          <span class="brand-pill-title">${w.brand}</span>
        </div>
        <span class="winner-customer-name">Winner: <strong>${w.winner}</strong></span>
        <span class="winner-badge-verified">✓ Verified</span>
      </div>

      <div class="winner-prize-box">
        <span class="prize-tag">REWARD</span>
        <strong class="prize-title">${w.prize}</strong>
      </div>

      <div class="winner-card-bottom">
        <span class="winner-source">Claimed via ${w.product}</span>
        <span class="winner-timestamp">⏱ ${w.time}</span>
      </div>
    </div>
  `).join('');

  section.innerHTML = `
    <div class="section-header center">
      <div class="festive-kicker-badge">
        <span class="sparkle-icon">🏆</span> BRAND REWARDS WON
      </div>
      <h2 class="festive-heading">
        Festive Winners <span class="accent-italic">Wall</span>
      </h2>
      <p class="subheading center-subheading">
        Explore guaranteed vouchers from top brands like Amazon, Myntra, Tanishq, KFC & Croma won by customers this festive season!
      </p>
    </div>

    <!-- Live Counter Metrics Bar -->
    <div class="winners-metrics-banner">
      <div class="winner-metric">
        <span class="metric-num">₹2.4 Cr+</span>
        <span class="metric-sub">Rewards Disbursed</span>
      </div>
      <div class="metric-divider"></div>
      <div class="winner-metric">
        <span class="metric-num">28,500+</span>
        <span class="metric-sub">Vouchers Claimed</span>
      </div>
      <div class="metric-divider"></div>
      <div class="winner-metric">
        <span class="metric-num">50+</span>
        <span class="metric-sub">Partner Brands</span>
      </div>
    </div>

    <!-- Winners Grid -->
    <div class="winners-grid-wrapper">
      <div class="winners-grid">
        ${winnersCardsHtml}
      </div>
    </div>

    <div class="winners-footer-cta center" style="margin-top: 36px; text-align: center;">
      <button class="btn-primary" id="winners-play-now-btn" style="padding: 12px 28px;">
        Play & Win Your Brand Voucher Now &rarr;
      </button>
    </div>
  `;

  const playBtn = section.querySelector('#winners-play-now-btn');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (onNavigate) onNavigate('games');
    });
  }

  container.appendChild(section);
}
