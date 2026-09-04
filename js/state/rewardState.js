// Reward Claims & History State (Centralized 5-Activity Reward Tracking)
import { getSession } from './sessionState.js';

const REWARD_STORE_KEY = 'pfl_festive_user_rewards_db';

export const REWARD_ACTIVITIES = [
  {
    key: 'play_and_win',
    title: 'Play & Win',
    badge: 'Spin / Scratch / Shuffle',
    description: 'Play festive games to win guaranteed brand vouchers',
    route: 'games',
    icon: '🎰'
  },
  {
    key: 'check_cibil',
    title: 'Check CIBIL',
    badge: 'FREE Score Check',
    description: 'Check your credit score for free & unlock partner deals',
    route: 'cibil',
    icon: '📊'
  },
  {
    key: 'emi_calculator',
    title: 'EMI Calculator',
    badge: 'Instant Scratch Card',
    description: 'Calculate monthly EMIs and unlock a festive Scratch Card',
    route: 'emi',
    icon: '🧮'
  },
  {
    key: 'pfin_card',
    title: 'PFIN Card',
    badge: 'Digital Credit Card',
    description: 'Apply for PFIN virtual card with zero joining fee',
    route: 'pfin',
    icon: '💳'
  },
  {
    key: 'get_loan',
    title: 'Get a Loan',
    badge: 'Festive Rates',
    description: 'Explore instant loans from 9.99% p.a. with zero fee',
    route: 'loans',
    icon: '⚡'
  }
];

let listeners = [];

export function subscribeRewards(callback) {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter(l => l !== callback);
  };
}

function notifyRewardChange() {
  const rewards = getUserRewards();
  listeners.forEach(cb => cb(rewards));
}

function getDatabase() {
  const raw = localStorage.getItem(REWARD_STORE_KEY);
  return raw ? JSON.parse(raw) : {};
}

function saveDatabase(db) {
  localStorage.setItem(REWARD_STORE_KEY, JSON.stringify(db));
}

export function getUserRewards() {
  const session = getSession();
  if (!session.isAuthenticated || !session.mobile) {
    return { claims: {} };
  }

  const db = getDatabase();
  return db[session.mobile] || { claims: {} };
}

export function isActivityClaimed(activityKey) {
  const userRewards = getUserRewards();
  return !!(userRewards.claims && userRewards.claims[activityKey]);
}

export function isPlayAndWinClaimed() {
  const userRewards = getUserRewards();
  const claims = userRewards.claims || {};
  return !!(claims['play_and_win'] || claims['spin_and_win'] || claims['scratch_card'] || claims['shuffle_card']);
}

export function saveRewardClaim(activityKey, dealId) {
  const session = getSession();
  if (!session.isAuthenticated || !session.mobile) return;

  const db = getDatabase();
  const userRecord = db[session.mobile] || { claims: {} };

  userRecord.claims[activityKey] = {
    claimed: true,
    claimedAt: new Date().toISOString(),
    dealId
  };

  // If claiming a game, normalize to unified 'play_and_win' key
  if (['spin_and_win', 'scratch_card', 'shuffle_card'].includes(activityKey)) {
    userRecord.claims['play_and_win'] = {
      claimed: true,
      claimedAt: new Date().toISOString(),
      dealId
    };
  }

  db[session.mobile] = userRecord;
  saveDatabase(db);
  notifyRewardChange();
}

export function getRemainingEligibleActivities(currentActivityKey) {
  const userRewards = getUserRewards();
  const claims = userRewards.claims || {};

  return REWARD_ACTIVITIES.filter(act => {
    // Current activity should NOT be shown in the recommendation list
    if (act.key === currentActivityKey) return false;
    if (currentActivityKey === 'play_and_win' && ['spin_and_win', 'scratch_card', 'shuffle_card'].includes(act.key)) return false;
    
    // Check if this other activity is already claimed
    const isClaimed = !!claims[act.key] || (act.key === 'play_and_win' && isPlayAndWinClaimed());
    return !isClaimed;
  });
}

export function getAllOtherActivities(currentActivityKey) {
  // Returns all activities except the current one (useful for standard navigation lists)
  return REWARD_ACTIVITIES.filter(act => act.key !== currentActivityKey);
}

export function getClaimedDealsCount() {
  const userRewards = getUserRewards();
  return Object.keys(userRewards.claims || {}).length;
}
