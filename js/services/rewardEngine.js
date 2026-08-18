// Reward Allocation Engine SOT v1.3 Section 8.4 & 8.5
import { BRAND_OFFERS } from '../data/offersData.js';

export function allocateRewardForGame(gameId, userClaimHistory = {}) {
  // Check if user already claimed a deal for this game
  if (userClaimHistory[gameId] && userClaimHistory[gameId].dealId) {
    const existingDeal = BRAND_OFFERS.find(d => d.dealId === userClaimHistory[gameId].dealId);
    if (existingDeal) {
      return {
        alreadyClaimed: true,
        deal: existingDeal
      };
    }
  }

  // Filter active deals applicable to the current game/section
  const applicableDeals = BRAND_OFFERS.filter(deal => 
    deal.isActive && 
    !deal.isFallback &&
    deal.applicableGames.includes(gameId)
  );

  let selectedDeal = null;

  if (applicableDeals.length > 0) {
    // Random selection from filtered active pool
    const randomIndex = Math.floor(Math.random() * applicableDeals.length);
    selectedDeal = applicableDeals[randomIndex];
  } else {
    // Fallback Pool Logic (Section 8.5)
    const fallbackDeals = BRAND_OFFERS.filter(deal => deal.isFallback && deal.isActive);
    if (fallbackDeals.length > 0) {
      const randomIndex = Math.floor(Math.random() * fallbackDeals.length);
      selectedDeal = fallbackDeals[randomIndex];
    } else {
      // Ultimate safety default
      selectedDeal = BRAND_OFFERS[0];
    }
  }

  return {
    alreadyClaimed: false,
    deal: selectedDeal
  };
}
