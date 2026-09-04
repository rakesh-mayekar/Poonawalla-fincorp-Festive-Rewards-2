// Poonawalla Fincorp Loan Products Data SOT v1.3
// Each category features distinct customized SVG festive lamps & visuals

export const PRODUCT_LAMPS = {
  'instant-personal-loan': `
    <svg class="product-lamp-svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
      <defs>
        <radialGradient id="lamp-glow-instant" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stop-color="#FDE047" stop-opacity="1"/>
          <stop offset="60%" stop-color="#EAB308" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#CA8A04" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="flame-instant" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FEF08A"/>
          <stop offset="60%" stop-color="#F59E0B"/>
          <stop offset="100%" stop-color="#DC2626"/>
        </linearGradient>
      </defs>
      <!-- Aura Glow -->
      <circle cx="24" cy="18" r="14" fill="url(#lamp-glow-instant)" opacity="0.35"/>
      <!-- Lightning Flame -->
      <path d="M24 6 C26 12 28 15 24 22 C20 15 22 12 24 6 Z" fill="url(#flame-instant)"/>
      <path d="M24 10 L22 16 L25 16 L23 21" stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Diya Base: Sleek Modern Geometric Oval -->
      <path d="M10 26 C10 26 13 36 24 36 C35 36 38 26 38 26 C38 26 33 29 24 29 C15 29 10 26 10 26 Z" fill="#18181B" stroke="#F59E0B" stroke-width="1.5"/>
      <!-- Lamp Stand -->
      <path d="M20 36 L17 42 L31 42 L28 36" fill="#27272A" stroke="#F59E0B" stroke-width="1.2"/>
    </svg>
  `,
  'prime-personal-loan': `
    <svg class="product-lamp-svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
      <defs>
        <radialGradient id="lamp-glow-prime" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stop-color="#E9D5FF"/>
          <stop offset="70%" stop-color="#A855F7" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#7E22CE" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="flame-prime" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="50%" stop-color="#C084FC"/>
          <stop offset="100%" stop-color="#6B21A8"/>
        </linearGradient>
      </defs>
      <!-- Royal Aura -->
      <circle cx="24" cy="16" r="15" fill="url(#lamp-glow-prime)" opacity="0.4"/>
      <!-- Crown Diya Flame -->
      <path d="M24 5 C27 11 29 15 24 22 C19 15 21 11 24 5 Z" fill="url(#flame-prime)"/>
      <circle cx="24" cy="14" r="2.5" fill="#FFFFFF"/>
      <!-- Royal Crown Brass Diya Base -->
      <path d="M8 25 C12 36 36 36 40 25 C35 29 29 30 24 30 C19 30 13 29 8 25 Z" fill="#1E1B4B" stroke="#A855F7" stroke-width="1.8"/>
      <!-- Crown Filigree Details -->
      <circle cx="16" cy="28" r="1.5" fill="#FDE047"/>
      <circle cx="24" cy="29" r="1.5" fill="#FDE047"/>
      <circle cx="32" cy="28" r="1.5" fill="#FDE047"/>
      <path d="M18 35 L14 42 L34 42 L30 35" fill="#2E1065" stroke="#A855F7" stroke-width="1.2"/>
    </svg>
  `,
  'business-loan': `
    <svg class="product-lamp-svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
      <defs>
        <radialGradient id="lamp-glow-biz" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stop-color="#A7F3D0"/>
          <stop offset="60%" stop-color="#10B981" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#047857" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="flame-biz" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FEF08A"/>
          <stop offset="50%" stop-color="#34D399"/>
          <stop offset="100%" stop-color="#059669"/>
        </linearGradient>
      </defs>
      <!-- Prosperity Glow -->
      <circle cx="24" cy="16" r="14" fill="url(#lamp-glow-biz)" opacity="0.35"/>
      <!-- Prosperity Flame -->
      <path d="M24 5 C26.5 10 28 14 24 21 C20 14 21.5 10 24 5 Z" fill="url(#flame-biz)"/>
      <!-- Kalash / Prosperity Deepam Base -->
      <path d="M12 24 C14 34 34 34 36 24 C32 28 28 29 24 29 C20 29 16 28 12 24 Z" fill="#064E3B" stroke="#34D399" stroke-width="1.6"/>
      <!-- Growth Staircase Pattern -->
      <path d="M20 33 L24 30 L28 33" stroke="#FDE047" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M18 34 L15 42 L33 42 L30 34" fill="#022C22" stroke="#34D399" stroke-width="1.2"/>
    </svg>
  `,
  'gold-loan': `
    <svg class="product-lamp-svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
      <defs>
        <radialGradient id="lamp-glow-gold" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stop-color="#FEF08A"/>
          <stop offset="50%" stop-color="#F59E0B" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#D97706" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="flame-gold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="40%" stop-color="#FDE047"/>
          <stop offset="100%" stop-color="#D97706"/>
        </linearGradient>
      </defs>
      <!-- Golden Aureole -->
      <circle cx="24" cy="15" r="16" fill="url(#lamp-glow-gold)" opacity="0.45"/>
      <!-- Double Golden Flame -->
      <path d="M24 4 C27 9 29 13 24 21 C19 13 21 9 24 4 Z" fill="url(#flame-gold)"/>
      <circle cx="24" cy="14" r="3" fill="#FFFBEB" stroke="#F59E0B" stroke-width="0.8"/>
      <!-- Pure Gold Lotus Diya Petals Base -->
      <path d="M9 25 C13 36 35 36 39 25 C34 29 29 30 24 30 C19 30 14 29 9 25 Z" fill="#78350F" stroke="#FBBF24" stroke-width="2"/>
      <!-- Golden Coin Base -->
      <ellipse cx="24" cy="40" rx="10" ry="3" fill="#F59E0B" stroke="#FDE047" stroke-width="1.2"/>
      <path d="M19 34 L19 40 M29 34 L29 40" stroke="#FBBF24" stroke-width="1.5"/>
    </svg>
  `,
  'loan-against-property': `
    <svg class="product-lamp-svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
      <defs>
        <radialGradient id="lamp-glow-lap" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stop-color="#FED7AA"/>
          <stop offset="60%" stop-color="#FB923C" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#C2410C" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="flame-lap" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FEF08A"/>
          <stop offset="50%" stop-color="#FB923C"/>
          <stop offset="100%" stop-color="#9A3412"/>
        </linearGradient>
      </defs>
      <!-- Home Hearth Glow -->
      <circle cx="24" cy="16" r="14" fill="url(#lamp-glow-lap)" opacity="0.35"/>
      <!-- High Hearth Flame -->
      <path d="M24 5 C26 10 27.5 14 24 20 C20.5 14 22 10 24 5 Z" fill="url(#flame-lap)"/>
      <!-- House Shaped Architectural Diya Base -->
      <path d="M11 25 L24 16 L37 25 C35 34 13 34 11 25 Z" fill="#431407" stroke="#FB923C" stroke-width="1.8"/>
      <!-- Pillar Stand -->
      <rect x="18" y="32" width="12" height="10" rx="1" fill="#7C2D12" stroke="#FDBA74" stroke-width="1.2"/>
      <line x1="24" y1="33" x2="24" y2="41" stroke="#FED7AA" stroke-width="1"/>
    </svg>
  `,
  'professional-loan': `
    <svg class="product-lamp-svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
      <defs>
        <radialGradient id="lamp-glow-prof" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stop-color="#BAE6FD"/>
          <stop offset="60%" stop-color="#0284C7" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#0369A1" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="flame-prof" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="40%" stop-color="#38BDF8"/>
          <stop offset="100%" stop-color="#0284C7"/>
        </linearGradient>
      </defs>
      <!-- Sapphire Caduceus Glow -->
      <circle cx="24" cy="15" r="14" fill="url(#lamp-glow-prof)" opacity="0.35"/>
      <!-- Wisdom Flame -->
      <path d="M24 4 C26.5 9 28 13 24 21 C20 13 21.5 9 24 4 Z" fill="url(#flame-prof)"/>
      <!-- Sapphire Diya Body -->
      <path d="M10 25 C14 35 34 35 38 25 C33 29 28 30 24 30 C20 30 15 29 10 25 Z" fill="#0C4A6E" stroke="#38BDF8" stroke-width="1.8"/>
      <!-- Laurel Emblem -->
      <path d="M21 27 C20 25 19 23 20 21" stroke="#BAE6FD" stroke-width="1.2" stroke-linecap="round"/>
      <path d="M27 27 C28 25 29 23 28 21" stroke="#BAE6FD" stroke-width="1.2" stroke-linecap="round"/>
      <!-- Pedestal Base -->
      <path d="M18 34 L15 42 L33 42 L30 34" fill="#082F49" stroke="#38BDF8" stroke-width="1.2"/>
    </svg>
  `,
  'car-loan': `
    <svg class="product-lamp-svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
      <defs>
        <radialGradient id="lamp-glow-car" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stop-color="#FECACA"/>
          <stop offset="60%" stop-color="#EF4444" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#B91C1C" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="flame-car" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FEF08A"/>
          <stop offset="50%" stop-color="#F87171"/>
          <stop offset="100%" stop-color="#DC2626"/>
        </linearGradient>
      </defs>
      <!-- Dynamic Crimson Glow -->
      <circle cx="24" cy="15" r="14" fill="url(#lamp-glow-car)" opacity="0.35"/>
      <!-- Aerodynamic Speed Flame -->
      <path d="M24 5 C28 11 27 15 24 21 C21 15 20 11 24 5 Z" fill="url(#flame-car)"/>
      <!-- Chariot Aerodynamic Lamp Base -->
      <path d="M8 26 C12 34 36 34 40 26 C34 29 29 30 24 30 C19 30 14 29 8 26 Z" fill="#450A0A" stroke="#EF4444" stroke-width="1.8"/>
      <!-- Wheel Accent Accents -->
      <circle cx="16" cy="39" r="3" fill="#7F1D1D" stroke="#FCA5A5" stroke-width="1.2"/>
      <circle cx="32" cy="39" r="3" fill="#7F1D1D" stroke="#FCA5A5" stroke-width="1.2"/>
      <path d="M19 39 L29 39" stroke="#EF4444" stroke-width="1.5"/>
    </svg>
  `,
  'pfin-card': `
    <svg class="product-lamp-svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
      <defs>
        <radialGradient id="lamp-glow-pfin" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stop-color="#CFFAFE"/>
          <stop offset="60%" stop-color="#06B6D4" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#0E7490" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="flame-pfin" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="50%" stop-color="#22D3EE"/>
          <stop offset="100%" stop-color="#0891B2"/>
        </linearGradient>
      </defs>
      <!-- Cyber Hologram Aura -->
      <circle cx="24" cy="15" r="15" fill="url(#lamp-glow-pfin)" opacity="0.4"/>
      <!-- Digital Flame -->
      <path d="M24 4 C27 10 28 14 24 21 C20 14 21 10 24 4 Z" fill="url(#flame-pfin)"/>
      <circle cx="24" cy="13" r="2" fill="#FFFFFF"/>
      <!-- Smart Chip Futuristic Lamp Base -->
      <path d="M10 24 C14 34 34 34 38 24 C33 28 28 29 24 29 C20 29 15 28 10 24 Z" fill="#164E63" stroke="#22D3EE" stroke-width="1.8"/>
      <!-- Smart Chip Grid -->
      <rect x="21" y="32" width="6" height="6" rx="1" fill="#0891B2" stroke="#67E8F9" stroke-width="1"/>
      <line x1="18" y1="35" x2="21" y2="35" stroke="#22D3EE" stroke-width="1"/>
      <line x1="27" y1="35" x2="30" y2="35" stroke="#22D3EE" stroke-width="1"/>
    </svg>
  `
};

export const LOAN_PRODUCTS = [
  {
    id: 'instant-personal-loan',
    slug: 'loans-personal-instant',
    title: 'Instant Personal Loan',
    subtitle: 'Up to ₹5 Lakhs in 5 Minutes',
    startingEmi: '₹1,180 /Lakh',
    interestRate: '10.25% p.a.',
    festiveOffer: '⚡ Zero Processing Fee + Instant Approval',
    applyUrl: 'https://instant-pocket-loan.poonawallafincorp.com/?redirectto=stpl',
    benefits: [
      '100% Digital Paperless Process with No Physical Documents',
      'No Collateral or Guarantor Required for Instant Disbursal',
      'Flexible Festive Repayment Tenures up to 36 Months',
      'Zero Pre-Closure Charges Post 6 EMI Payments'
    ],
    eligibility: 'Salaried individuals with min income ₹15,000/month',
    icon: '⚡',
    themeColor: '#EAB308'
  },
  {
    id: 'prime-personal-loan',
    slug: 'loans-personal-prime',
    title: '24x7 Prime Personal Loan',
    subtitle: 'High Ticket Loans up to ₹30 Lakhs',
    startingEmi: '₹2,149 /Lakh',
    interestRate: '9.99% p.a.',
    festiveOffer: '🎉 Special 0.5% Rate Discount this Festive Season',
    applyUrl: 'https://instant-pocket-loan.poonawallafincorp.com/?redirectto=primepl',
    benefits: [
      'High Loan Amount Sanctions up to ₹30 Lakhs in Minutes',
      'Minimal Documentation for Verified Corporate Employees',
      'Extended Repayment Tenure up to 60 Months',
      'Special Festive Cashback of ₹1,000 on First Disbursal'
    ],
    eligibility: 'Salaried employees at MNCs or Public Companies',
    icon: '👑',
    themeColor: '#A855F7'
  },
  {
    id: 'business-loan',
    slug: 'loans-business',
    title: 'Business Loan',
    subtitle: 'Collateral-free Capital up to ₹50 Lakhs',
    startingEmi: '₹2,350 /Lakh',
    interestRate: '14.00% p.a.',
    festiveOffer: '💼 50% Off on Processing Charges',
    applyUrl: 'https://poonawallafincorp.com/business-loan/apply-for-loan',
    benefits: [
      'Unsecured Working Capital for MSMEs, Retailers & Traders',
      'Rapid Disbursal within 24 Hours to seize festive sales',
      'Customized Seasonal Repayment Options with Overdraft Limits',
      'Zero Prepayment Penalties on Floating Rate Loans'
    ],
    eligibility: 'Business vintage min 2 years with audited financial statements',
    icon: '💼',
    themeColor: '#10B981'
  },
  {
    id: 'gold-loan',
    slug: 'loans-gold',
    title: 'Gold Loan',
    subtitle: 'Highest Value for your Gold Ornaments',
    startingEmi: '₹899 /Lakh',
    interestRate: '8.50% p.a.',
    festiveOffer: '🪙 Free Safety Vault Insurance Included',
    applyUrl: 'https://poonawallafincorp.com/apply-for-loan/gold-loan',
    benefits: [
      'Instant Valuation at Branch or Home Doorstep Service',
      'Flexible Interest-Only Repayment Scheme for Maximum Cashflow',
      '100% Secure Insured Locker Storage for Your Precious Gold',
      '0% Foreclosure and Part-Payment Charges'
    ],
    eligibility: 'Any Indian citizen above 18 years holding gold ornaments',
    icon: '🪙',
    themeColor: '#F59E0B'
  },
  {
    id: 'loan-against-property',
    slug: 'loans-lap',
    title: 'Loan Against Property (LAP)',
    subtitle: 'Unlock High Value up to ₹5 Crores',
    startingEmi: '₹950 /Lakh',
    interestRate: '9.25% p.a.',
    festiveOffer: '🏠 Free Property Legal & Valuation Fee Waived',
    applyUrl: 'https://poonawallafincorp.com/loan-against-property/apply-for-loan',
    benefits: [
      'Industry-Leading High Loan-to-Value (LTV) up to 75%',
      'Long-Term Comfortable Tenures up to 15 Years',
      'Residential, Commercial & Industrial Properties Accepted',
      'Flexible Balance Transfer with Attractive Top-up Limits'
    ],
    eligibility: 'Self-employed or Salaried property owners',
    icon: '🏠',
    themeColor: '#FB923C'
  },
  {
    id: 'professional-loan',
    slug: 'loans-professional',
    title: 'Professional Loan',
    subtitle: 'Tailored for Doctors, CAs & CSs up to ₹50L',
    startingEmi: '₹2,099 /Lakh',
    interestRate: '10.50% p.a.',
    festiveOffer: '🩺 Zero Prepayment Penalties',
    applyUrl: 'https://poonawallafincorp.com/professional-loan/apply-for-loan',
    benefits: [
      'Pre-Approved Limits for Certified Doctors, CAs & CS Professionals',
      'No Co-applicant or Collateral Security Required',
      'Fast-track Digital Verification within 2 Hours',
      'Exclusive Relationship Manager Assistance'
    ],
    eligibility: 'Certified Doctors, Chartered Accountants, Company Secretaries',
    icon: '🩺',
    themeColor: '#0284C7'
  },
  {
    id: 'car-loan',
    slug: 'loans-preowned-car',
    title: 'Pre-Owned Car Loan',
    subtitle: 'Drive Home Your Dream Car with 100% LTV',
    startingEmi: '₹1,450 /Lakh',
    interestRate: '11.00% p.a.',
    festiveOffer: '🚗 Free 1-Year RSA (Roadside Assistance) Voucher',
    applyUrl: 'https://poonawallafincorp.com/pre-owned-car-loan/apply-for-loan',
    benefits: [
      'Up to 100% On-Road Financing on Comprehensive Car Evaluation',
      'Hassle-Free RC Transfer and Title Verification Assistance',
      'Flexible Loan Tenures ranging from 12 to 84 Months',
      'Fast-Track Approval with Minimal Documentation'
    ],
    eligibility: 'Salaried or Self-employed individuals with clean credit history',
    icon: '🚗',
    themeColor: '#EF4444'
  }
];

export function buildUtmUrl(baseUrl, contentSlug) {
  const url = new URL(baseUrl);
  url.searchParams.set('utm_source', 'festive-microsite');
  url.searchParams.set('utm_medium', 'microsite');
  url.searchParams.set('utm_campaign', 'festive2025');
  url.searchParams.set('utm_content', contentSlug);
  return url.toString();
}
