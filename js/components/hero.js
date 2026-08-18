// Hero Section Component with Live Win Ticker
const RECENT_WINNERS = [
  { city: 'Mumbai', prize: 'Myntra ₹250 Voucher', mobile: '98***1209' },
  { city: 'Delhi', prize: 'KFC Popcorn Voucher', mobile: '99***4410' },
  { city: 'Bengaluru', prize: 'Swiggy Instamart ₹120 Off', mobile: '88***9012' },
  { city: 'Pune', prize: 'Ajio ₹150 Voucher', mobile: '97***3318' },
  { city: 'Hyderabad', prize: 'Lifestyle ₹500 Voucher', mobile: '91***8821' }
];

export function renderHero(container, onNavigate) {
  const heroWrapper = document.createElement('section');
  heroWrapper.className = 'festive-hero';

  heroWrapper.innerHTML = `
    <div class="festive-badge-pill">🪔 Festive Celebration Sale 2025</div>
    
    <h1 class="hero-title festive-heading">
      Celebrate Big Savings & Guaranteed Rewards!
    </h1>
    
    <p class="hero-subtitle">
      Explore low-interest loans, play interactive festive games, check your CIBIL score for free, and win vouchers from Myntra, KFC, Swiggy & more!
    </p>

    <div class="hero-cta-group">
      <button class="btn-gold glow-effect" id="hero-play-win-btn">
        🎰 Play & Win Rewards
      </button>
      <button class="btn-primary" id="hero-loans-btn">
        💳 Explore Loans
      </button>
    </div>

    <!-- Live Live Winner Ticker Bar -->
    <div style="margin-top: 18px; padding: 6px 12px; background: rgba(255,255,255,0.04); border: 1px dashed var(--wireframe-border); border-radius: var(--radius-sm); font-size: 0.75rem; color: var(--wireframe-text-secondary); display: flex; align-items: center; justify-content: center; gap: 6px;" id="hero-live-ticker">
      <span>🎉</span> <span id="ticker-text">User from Mumbai (98***1209) won Myntra ₹250 Voucher!</span>
    </div>

    <div class="hero-stats-bar">
      <div class="hero-stat-item">
        <span class="stat-value">₹50L+</span>
        <span class="stat-label">Max Loan Limit</span>
      </div>
      <div class="hero-stat-item">
        <span class="stat-value">100%</span>
        <span class="stat-label">Digital Process</span>
      </div>
      <div class="hero-stat-item">
        <span class="stat-value">150+</span>
        <span class="stat-label">Brand Offers</span>
      </div>
    </div>
  `;

  heroWrapper.querySelector('#hero-play-win-btn').addEventListener('click', () => onNavigate('games'));
  heroWrapper.querySelector('#hero-loans-btn').addEventListener('click', () => onNavigate('loans'));

  // Rotate Live Winner Ticker
  let winnerIdx = 0;
  const tickerText = heroWrapper.querySelector('#ticker-text');
  const tickerInterval = setInterval(() => {
    winnerIdx = (winnerIdx + 1) % RECENT_WINNERS.length;
    const w = RECENT_WINNERS[winnerIdx];
    if (tickerText) {
      tickerText.textContent = `User from ${w.city} (${w.mobile}) won ${w.prize}!`;
    }
  }, 3500);

  container.appendChild(heroWrapper);
}
