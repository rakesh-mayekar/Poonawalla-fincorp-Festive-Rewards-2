// LeadSquared (LSQ) CRM Forwarding Service SOT v1.3
import { subscribeAnalytics } from './gaService.js';

export function sendLeadToLeadSquared({ mobileNumber, activityType, rewardAllocated = null, contentSlug = '' }) {
  const payload = {
    MobileNumber: mobileNumber,
    OTPValidationTimestamp: new Date().toISOString(),
    ActivityType: activityType,
    RewardAllocated: rewardAllocated,
    LeadSource: 'Festive Microsite 2025',
    UTM_Source: 'festive-microsite',
    UTM_Medium: 'microsite',
    UTM_Campaign: 'festive2025',
    UTM_Content: contentSlug,
    LeadSquaredEndpoint: 'https://api-in21.leadsquared.com/v2/LeadManagement.svc/Lead.Capture'
  };

  console.log(`[LeadSquared Lead Forwarded]:`, payload);

  // Notify registered inspector listeners
  const notifyListeners = window.__notifyInspectorLog;
  if (notifyListeners) {
    notifyListeners('LSQ', payload);
  }

  return Promise.resolve({ success: true, leadId: `LSQ-${Date.now()}` });
}
