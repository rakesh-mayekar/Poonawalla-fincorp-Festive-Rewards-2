// GA4 & GTM Analytics Event Emitter SOT v1.3
export const GA4_EVENTS = {
  OTP_VALIDATED: 'otp_validated',
  GAME_STARTED: 'game_started',
  GAME_REWARD_CLAIMED: 'game_reward_claimed',
  COUPON_COPIED: 'coupon_copied',
  APPLY_NOW_CLICKED: 'apply_now_clicked',
  CIBIL_REDIRECT_CLICKED: 'cibil_redirect_clicked',
  CIBIL_EXTRA_SPIN_UNLOCKED: 'cibil_extra_spin_unlocked',
  EMI_REDIRECT_CLICKED: 'emi_redirect_clicked',
  EMI_SCRATCH_CARD_CLAIMED: 'emi_scratch_card_claimed',
  PFIN_REWARD_CLAIMED: 'pfin_reward_claimed',
  REFER_EARN_REDIRECT_CLICKED: 'refer_earn_redirect_clicked',
  OFFER_CARD_VIEWED: 'offer_card_viewed',
  MY_OFFERS_VIEWED: 'my_offers_viewed'
};

const eventListeners = [];

export function subscribeAnalytics(listener) {
  eventListeners.push(listener);
}

export function trackGa4Event(eventName, params = {}) {
  const payload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ga4PropertyId: 'GA4-PFL-FESTIVE-2025',
    gtmContainerId: 'GTM-K63GVFH',
    params: {
      utm_source: 'festive-microsite',
      utm_medium: 'microsite',
      utm_campaign: 'festive2025',
      ...params
    }
  };

  // Push to GTM dataLayer if available
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);

  console.log(`[GA4 Event Fired]: ${eventName}`, payload);

  // Notify registered inspector listeners
  eventListeners.forEach(listener => listener('GA4', payload));
}
