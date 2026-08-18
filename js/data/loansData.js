// Poonawalla Fincorp Loan Products Data SOT v1.3
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
      '100% Digital Paperless Process',
      'No Collateral / Guarantor Required',
      'Flexible Tenure up to 36 Months'
    ],
    eligibility: 'Salaried individuals with min income ₹15,000/month',
    icon: '⚡'
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
      'High Loan Amount up to ₹30 Lakhs',
      'Minimal Documentation',
      'Tenure up to 60 Months'
    ],
    eligibility: 'Salaried employees at MNCs or Public Companies',
    icon: '👑'
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
      'Unsecured Capital for MSMEs & Retailers',
      'Quick Disbursement within 24 Hours',
      'Customized Repayment Options'
    ],
    eligibility: 'Business vintage min 2 years with audited financial statements',
    icon: '💼'
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
      'Instant Valuation at Branch or Home doorstep',
      'Flexible Interest-Only Repayment Scheme',
      '0% Foreclosure Charges'
    ],
    eligibility: 'Any Indian citizen above 18 years holding gold ornaments',
    icon: '🪙'
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
      'High Loan-to-Value (LTV) Ratio',
      'Tenure up to 15 Years',
      'Residential & Commercial Property Accepted'
    ],
    eligibility: 'Self-employed or Salaried property owners',
    icon: '🏠'
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
      'Pre-approved Limits for Certified Professionals',
      'No Co-applicant Required',
      'Hassle-free Online Verification'
    ],
    eligibility: 'Certified Doctors, Chartered Accountants, Company Secretaries',
    icon: '🩺'
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
      'Up to 100% Financing on Car Evaluation Value',
      'Quick RC Transfer Assistance',
      'Tenure up to 84 Months'
    ],
    eligibility: 'Salaried or Self-employed individuals with clean credit history',
    icon: '🚗'
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
