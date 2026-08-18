// Reward Claims & History State (SOT v1.3 Section 8.3)
import { getSession } from './sessionState.js';

const REWARD_STORE_KEY = 'pfl_festive_user_rewards_db';

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
    return { claims: {}, cibilExtraSpinUnlocked: false, cibilExtraSpinUsed: false };
  }

  const db = getDatabase();
  return db[session.mobile] || {
    claims: {},
    cibilExtraSpinUnlocked: false,
    cibilExtraSpinUsed: false
  };
}

export function saveRewardClaim(activityKey, dealId) {
  const session = getSession();
  if (!session.isAuthenticated || !session.mobile) return;

  const db = getDatabase();
  const userRecord = db[session.mobile] || { claims: {}, cibilExtraSpinUnlocked: false, cibilExtraSpinUsed: false };

  userRecord.claims[activityKey] = {
    claimed: true,
    claimedAt: new Date().toISOString(),
    dealId
  };

  db[session.mobile] = userRecord;
  saveDatabase(db);
  notifyRewardChange();
}

export function unlockCibilExtraSpin() {
  const session = getSession();
  if (!session.isAuthenticated || !session.mobile) return;

  const db = getDatabase();
  const userRecord = db[session.mobile] || { claims: {}, cibilExtraSpinUnlocked: false, cibilExtraSpinUsed: false };

  userRecord.cibilExtraSpinUnlocked = true;
  db[session.mobile] = userRecord;
  saveDatabase(db);
  notifyRewardChange();
}

export function useCibilExtraSpin() {
  const session = getSession();
  if (!session.isAuthenticated || !session.mobile) return;

  const db = getDatabase();
  const userRecord = db[session.mobile] || { claims: {}, cibilExtraSpinUnlocked: false, cibilExtraSpinUsed: false };

  userRecord.cibilExtraSpinUsed = true;
  db[session.mobile] = userRecord;
  saveDatabase(db);
  notifyRewardChange();
}

export function getClaimedDealsCount() {
  const userRewards = getUserRewards();
  return Object.keys(userRewards.claims || {}).length;
}
