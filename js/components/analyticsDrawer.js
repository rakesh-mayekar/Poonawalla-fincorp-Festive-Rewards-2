// Live LeadSquared & GA4 Analytics Debug Inspector Component
import { subscribeAnalytics } from '../services/gaService.js';

export function renderAnalyticsDrawer(container) {
  const wrapper = document.createElement('div');

  wrapper.innerHTML = `
    <button class="inspector-toggle-btn" id="inspector-toggle-btn">
      <span>📡</span> API & Event Inspector
    </button>

    <div class="inspector-drawer" id="inspector-drawer">
      <div class="inspector-header">
        <span class="inspector-title">
          <span>🟢</span> Live LeadSquared & GA4 Custom Event Monitor
        </span>
        <button style="background: none; border: none; color: #94A3B8; font-size: 1.2rem; cursor: pointer;" id="inspector-close-btn">&times;</button>
      </div>

      <div class="inspector-body" id="inspector-log-container">
        <div class="inspector-log-entry ga4">
          <span class="log-timestamp">[Initialized]</span>
          <span class="log-tag tag-ga4">GA4 / GTM</span>
          GA4 Property GA4-PFL-FESTIVE-2025 Ready. GTM Container GTM-K63GVFH Active.
        </div>
      </div>
    </div>
  `;

  const toggleBtn = wrapper.querySelector('#inspector-toggle-btn');
  const drawer = wrapper.querySelector('#inspector-drawer');
  const closeBtn = wrapper.querySelector('#inspector-close-btn');
  const logContainer = wrapper.querySelector('#inspector-log-container');

  toggleBtn.addEventListener('click', () => drawer.classList.toggle('open'));
  closeBtn.addEventListener('click', () => drawer.classList.remove('open'));

  const appendLog = (type, payload) => {
    const entry = document.createElement('div');
    entry.className = `inspector-log-entry ${type.toLowerCase()}`;
    const timeStr = new Date().toLocaleTimeString();

    entry.innerHTML = `
      <span class="log-timestamp">[${timeStr}]</span>
      <span class="log-tag tag-${type.toLowerCase()}">${type}</span>
      <strong>${payload.event || payload.ActivityType || 'API Call'}</strong>: ${JSON.stringify(payload.params || payload)}
    `;

    logContainer.prepend(entry);
  };

  // Subscribe to GA4 & LSQ events
  subscribeAnalytics((type, payload) => appendLog(type, payload));
  window.__notifyInspectorLog = (type, payload) => appendLog(type, payload);

  container.appendChild(wrapper);
}
