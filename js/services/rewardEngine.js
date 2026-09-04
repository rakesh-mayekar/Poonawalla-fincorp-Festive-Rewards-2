// Reward Allocation Engine SOT v1.3 Section 8.4 & 8.5
import { BRAND_OFFERS } from '../data/offersData.js';

export function allocateRewardForGame(activityKey, userClaimHistory = {}) {
  // Normalize activityKey
  const normalizedKey = ['spin', 'scratch', 'shuffle', 'spin_and_win', 'scratch_card', 'shuffle_card'].includes(activityKey) 
    ? 'play_and_win' 
    : activityKey;

  // Check if user already claimed a deal for this activity
  if (userClaimHistory[normalizedKey] && userClaimHistory[normalizedKey].dealId) {
    const existingDeal = BRAND_OFFERS.find(d => d.dealId === userClaimHistory[normalizedKey].dealId);
    if (existingDeal) {
      return {
        alreadyClaimed: true,
        deal: existingDeal
      };
    }
  }

  // Filter active deals
  const applicableDeals = BRAND_OFFERS.filter(deal => 
    deal.isActive && 
    !deal.isFallback
  );

  let selectedDeal = null;

  if (applicableDeals.length > 0) {
    const randomIndex = Math.floor(Math.random() * applicableDeals.length);
    selectedDeal = applicableDeals[randomIndex];
  } else {
    const fallbackDeals = BRAND_OFFERS.filter(deal => deal.isFallback && deal.isActive);
    if (fallbackDeals.length > 0) {
      const randomIndex = Math.floor(Math.random() * fallbackDeals.length);
      selectedDeal = fallbackDeals[randomIndex];
    } else {
      selectedDeal = BRAND_OFFERS[0];
    }
  }

  return {
    alreadyClaimed: false,
    deal: selectedDeal
  };
}
