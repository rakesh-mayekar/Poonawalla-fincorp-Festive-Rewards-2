// Festive Winners Wall Component
// Displays live verified winner feeds, rewards unlocked, and recent customer wins

export function renderWinnersWall(container, onNavigate) {
  const section = document.createElement('section');
  section.className = 'winners-wall-section section-wrapper animate-on-scroll';
  section.id = 'winners-section';

  const WINNERS_DATA = [
    { name: 'Rahul Sharma', city: 'Mumbai', prize: '₹500 Tanishq Gold Voucher', product: 'Instant Loan', time: '2 mins ago', initial: 'R' },
    { name: 'Priya Mukherjee', city: 'Pune', prize: 'Myntra ₹250 Voucher', product: 'Play & Win', time: '5 mins ago', initial: 'P' },
    { name: 'Amitabh Verma', city: 'Delhi NCR', prize: '₹1,000 Amazon Voucher', product: 'Prime Personal Loan', time: '11 mins ago', initial: 'A' },
    { name: 'Sneha Deshmukh', city: 'Bengaluru', prize: '5% Instant Cashback', product: 'PFIN Card', time: '18 mins ago', initial: 'S' },
    { name: 'Vikram Reddy', city: 'Hyderabad', prize: 'KFC Feast Box Voucher', product: 'Spin & Win', time: '24 mins ago', initial: 'V' },
    { name: 'Ananya Gupta', city: 'Ahmedabad', prize: 'Croma ₹1,500 Voucher', product: 'Business Loan', time: '32 mins ago', initial: 'A' }
  ];

  const winnersCardsHtml = WINNERS_DATA.map(w => `
    <div class="winner-card-item">
      <div class="winner-card-top">
        <div class="winner-avatar">${w.initial}</div>
        <div class="winner-info-meta">
          <span class="winner-name">${w.name}</span>
          <span class="winner-location">📍 ${w.city}</span>
        </div>
        <span class="winner-badge-verified">✓ Verified</span>
      </div>
      <div class="winner-prize-box">
        <span class="prize-tag">WON</span>
        <strong class="prize-title">${w.prize}</strong>
      </div>
      <div class="winner-card-bottom">
        <span class="winner-source">Via ${w.product}</span>
        <span class="winner-timestamp">${w.time}</span>
      </div>
    </div>
  `).join('');

  section.innerHTML = `
    <div class="section-header center">
      <div class="festive-kicker-badge">
        <span class="sparkle-icon">🏆</span> CELEBRATION WINNERS
      </div>
      <h2 class="festive-heading">
        Festive Winners <span class="accent-italic">Wall</span>
      </h2>
      <p class="subheading center-subheading">
        Explore offers from 50+ Brands, plus solutions tailored to your goals. Over 25,000+ customers have claimed guaranteed rewards!
      </p>
    </div>

    <!-- Live Live Counter Bar -->
    <div class="winners-metrics-banner">
      <div class="winner-metric">
        <span class="metric-num">₹2.4 Cr+</span>
        <span class="metric-sub">Rewards Disbursed</span>
      </div>
      <div class="metric-divider"></div>
      <div class="winner-metric">
        <span class="metric-num">28,500+</span>
        <span class="metric-sub">Happy Winners</span>
      </div>
      <div class="metric-divider"></div>
      <div class="winner-metric">
        <span class="metric-num">50+</span>
        <span class="metric-sub">Partner Brands</span>
      </div>
    </div>

    <!-- Winners Grid / Ticker -->
    <div class="winners-grid-wrapper">
      <div class="winners-grid">
        ${winnersCardsHtml}
      </div>
    </div>

    <div class="winners-footer-cta center" style="margin-top: 36px; text-align: center;">
      <button class="btn-primary" id="winners-play-now-btn" style="padding: 12px 28px;">
        Play & Win Your Reward Now &rarr;
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
