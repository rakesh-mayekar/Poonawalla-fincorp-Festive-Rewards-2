// Brand Partner Deals & Fallback Pool SOT v1.3
// Top Offers Auto-Scroller List (Exact 12 Offers as specified in prompt)
export const AUTO_SCROLLER_OFFERS = [
  {
    id: 'scroller-1',
    brandName: 'Lenovo',
    brandInitials: 'LEN',
    offerDescription: 'Additional ₹5,000 OFF on PCs & Laptops',
    category: 'Electronics',
    color: '#E2231A'
  },
  {
    id: 'scroller-2',
    brandName: 'Tata Cliq Luxury',
    brandInitials: 'TCL',
    offerDescription: 'Flat ₹1,250 OFF on purchases above ₹10,000',
    category: 'Luxury & Fashion',
    color: '#0F172A'
  },
  {
    id: 'scroller-3',
    brandName: 'Senco Gold',
    brandInitials: 'SNC',
    offerDescription: '25% OFF on Gold Jewellery Making Charges',
    category: 'Jewellery',
    color: '#D97706'
  },
  {
    id: 'scroller-4',
    brandName: 'Ajio Luxe',
    brandInitials: 'AJL',
    offerDescription: 'Additional 8% OFF on Premium Fashion',
    category: 'Fashion',
    color: '#1E293B'
  },
  {
    id: 'scroller-5',
    brandName: 'Coach',
    brandInitials: 'COA',
    offerDescription: 'Additional 8% OFF',
    category: 'Luxury',
    color: '#475569'
  },
  {
    id: 'scroller-6',
    brandName: 'Emporio Armani',
    brandInitials: 'EA',
    offerDescription: 'Additional 8% OFF',
    category: 'Luxury',
    color: '#111827'
  },
  {
    id: 'scroller-7',
    brandName: 'Diesel',
    brandInitials: 'DSL',
    offerDescription: 'Additional 8% OFF',
    category: 'Fashion',
    color: '#DC2626'
  },
  {
    id: 'scroller-8',
    brandName: 'Titan Xylys',
    brandInitials: 'XYL',
    offerDescription: '10% OFF on Premium Watches',
    category: 'Watches',
    color: '#334155'
  },
  {
    id: 'scroller-9',
    brandName: 'Titan Premium Watches',
    brandInitials: 'TTN',
    offerDescription: '10% OFF on Premium Watches',
    category: 'Watches',
    color: '#1F2937'
  },
  {
    id: 'scroller-10',
    brandName: 'Joyalukkas',
    brandInitials: 'JOY',
    offerDescription: '20% OFF on Making Charges',
    category: 'Jewellery',
    color: '#B45309'
  },
  {
    id: 'scroller-11',
    brandName: 'JBL',
    brandInitials: 'JBL',
    offerDescription: 'Flat 15% OFF on JBL Bestsellers',
    category: 'Audio',
    color: '#EA580C'
  },
  {
    id: 'scroller-12',
    brandName: 'Myntra',
    brandInitials: 'MYN',
    offerDescription: 'Additional ₹250 OFF on Orders Above ₹1,499',
    category: 'Fashion',
    color: '#E11D48'
  }
];

export const BRAND_OFFERS = [
  {
    dealId: 'DEAL-LENOVO-5000',
    brandName: 'Lenovo',
    brandInitials: 'LEN',
    offerTitle: 'Additional ₹5,000 OFF on PCs & Laptops',
    offerDescription: 'Get additional ₹5,000 instant discount on selected Lenovo laptops, desktops & tablets.',
    couponCode: 'PFLLENOVO5K',
    channel: 'Online',
    category: 'Electronics',
    redemptionUrl: 'https://www.lenovo.com/in/en/',
    redemptionInstructions: '1. Copy coupon code.\n2. Add eligible PC or Laptop on Lenovo Official Store.\n3. Apply coupon code at checkout.',
    termsAndConditions: 'Valid on purchases of Lenovo ThinkPad, Yoga, IdeaPad & Legion series. Valid till 31st Dec 2025.',
    applicableGames: ['play_and_win', 'check_cibil', 'emi_calculator', 'pfin_card', 'get_loan'],
    isActive: true,
    isFallback: false
  },
  {
    dealId: 'DEAL-TATACLIQ-1250',
    brandName: 'Tata Cliq Luxury',
    brandInitials: 'TCL',
    offerTitle: 'Flat ₹1,250 OFF on orders above ₹10,000',
    offerDescription: 'Shop premier global luxury brands on Tata CLiQ Luxury and enjoy flat ₹1,250 festive savings.',
    couponCode: 'PFLCLIQ1250',
    channel: 'Online',
    category: 'Shopping',
    redemptionUrl: 'https://luxury.tatacliq.com/',
    redemptionInstructions: '1. Copy coupon code.\n2. Add luxury items worth ₹10,000+ to cart.\n3. Paste coupon at payment checkout.',
    termsAndConditions: 'Valid on select luxury fashion and accessory collections.',
    applicableGames: ['play_and_win', 'check_cibil', 'emi_calculator', 'pfin_card', 'get_loan'],
    isActive: true,
    isFallback: false
  },
  {
    dealId: 'DEAL-SENCO-25',
    brandName: 'Senco Gold',
    brandInitials: 'SNC',
    offerTitle: '25% OFF on Gold Jewellery Making Charges',
    offerDescription: 'Avail exclusive 25% discount on handcrafted gold and diamond jewellery making charges.',
    couponCode: 'PFLSENCO25',
    channel: 'Online + Offline',
    category: 'Shopping',
    redemptionUrl: 'https://sencogoldanddiamonds.com/',
    redemptionInstructions: 'Online: Enter coupon at checkout.\nOffline: Present this voucher screen at any Senco Gold store.',
    termsAndConditions: 'Valid across all Senco Gold showrooms across India and official website.',
    applicableGames: ['play_and_win', 'check_cibil', 'emi_calculator', 'pfin_card', 'get_loan'],
    isActive: true,
    isFallback: false
  },
  {
    dealId: 'DEAL-MYNTRA-250',
    brandName: 'Myntra',
    brandInitials: 'MYN',
    offerTitle: 'Additional ₹250 OFF on Orders Above ₹1,499',
    offerDescription: 'Get flat ₹250 extra discount on festive fashion on Myntra with minimum cart value of ₹1,499.',
    couponCode: 'PFLFESTIVE250',
    channel: 'Online',
    category: 'Shopping',
    redemptionUrl: 'https://www.myntra.com',
    redemptionInstructions: '1. Copy coupon code.\n2. Add fashion items worth ₹1,499+ on Myntra app/website.\n3. Apply coupon code at checkout.',
    termsAndConditions: 'Valid on select festive catalog. Valid till 31st Dec 2025.',
    applicableGames: ['play_and_win', 'check_cibil', 'emi_calculator', 'pfin_card', 'get_loan'],
    isActive: true,
    isFallback: false
  },
  {
    dealId: 'DEAL-JBL-15',
    brandName: 'JBL',
    brandInitials: 'JBL',
    offerTitle: 'Flat 15% OFF on JBL Bestsellers',
    offerDescription: 'Enjoy superior sound quality with flat 15% off on JBL bluetooth speakers, soundbars, and headphones.',
    couponCode: 'PFLJBL15',
    channel: 'Online',
    category: 'Electronics',
    redemptionUrl: 'https://in.jbl.com/',
    redemptionInstructions: '1. Copy promo code.\n2. Choose audio products on in.jbl.com.\n3. Apply code during checkout.',
    termsAndConditions: 'Cannot be clubbed with ongoing site-wide clearance promotions.',
    applicableGames: ['play_and_win', 'check_cibil', 'emi_calculator', 'pfin_card', 'get_loan'],
    isActive: true,
    isFallback: false
  },
  {
    dealId: 'DEAL-JOYALUKKAS-20',
    brandName: 'Joyalukkas',
    brandInitials: 'JOY',
    offerTitle: '20% OFF on Making Charges',
    offerDescription: 'Special festive jewellery voucher offering 20% discount on gold making charges.',
    couponCode: 'PFLJOY20',
    channel: 'Online + Offline',
    category: 'Shopping',
    redemptionUrl: 'https://www.joyalukkas.in/',
    redemptionInstructions: 'Show this digital voucher to Joyalukkas billing desk or apply coupon online.',
    termsAndConditions: 'Applicable on Gold & Diamond jewellery collections.',
    applicableGames: ['play_and_win', 'check_cibil', 'emi_calculator', 'pfin_card', 'get_loan'],
    isActive: true,
    isFallback: false
  },
  {
    dealId: 'DEAL-TITAN-10',
    brandName: 'Titan Premium Watches',
    brandInitials: 'TTN',
    offerTitle: '10% OFF on Premium Watches',
    offerDescription: 'Elevate your festive wrist style with flat 10% discount on premium Titan watch collections.',
    couponCode: 'PFLTITAN10',
    channel: 'Online + Offline',
    category: 'Shopping',
    redemptionUrl: 'https://www.titan.co.in/',
    redemptionInstructions: 'Apply coupon code at checkout on titan.co.in or present at World of Titan stores.',
    termsAndConditions: 'Valid on selected analog and automatic luxury watch models.',
    applicableGames: ['play_and_win', 'check_cibil', 'emi_calculator', 'pfin_card', 'get_loan'],
    isActive: true,
    isFallback: true
  },
  {
    dealId: 'DEAL-AJIO-LUXE-8',
    brandName: 'Ajio Luxe',
    brandInitials: 'AJL',
    offerTitle: 'Additional 8% OFF on Premium Fashion',
    offerDescription: 'Shop luxury clothing, footwear, and accessories from global fashion houses with extra 8% off.',
    couponCode: 'PFLAJIOLUXE8',
    channel: 'Online',
    category: 'Shopping',
    redemptionUrl: 'https://luxe.ajio.com/',
    redemptionInstructions: 'Paste voucher code in the promo box on Ajio Luxe checkout page.',
    termsAndConditions: 'Valid on qualifying premium designer brands.',
    applicableGames: ['play_and_win', 'check_cibil', 'emi_calculator', 'pfin_card', 'get_loan'],
    isActive: true,
    isFallback: true
  }
];
