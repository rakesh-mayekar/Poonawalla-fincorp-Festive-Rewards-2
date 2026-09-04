// Poonawalla Fincorp Loan Products Data SOT v1.3
// Each category features distinct customized SVG festive lamps & visuals

export const PRODUCT_LAMPS = {
  'instant-personal-loan': `<span class="wireframe-category-pill">Instant Loan</span>`,
  'prime-personal-loan': `<span class="wireframe-category-pill">Personal Loan</span>`,
  'business-loan': `<span class="wireframe-category-pill">Business Loan</span>`,
  'gold-loan': `<span class="wireframe-category-pill">Gold Loan</span>`,
  'loan-against-property': `<span class="wireframe-category-pill">Property Loan</span>`,
  'professional-loan': `<span class="wireframe-category-pill">Professional</span>`,
  'car-loan': `<span class="wireframe-category-pill">Car Loan</span>`,
  'pfin-card': `<span class="wireframe-category-pill">Virtual Card</span>`
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
