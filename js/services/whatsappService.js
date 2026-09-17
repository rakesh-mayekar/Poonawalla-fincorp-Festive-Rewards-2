// WhatsApp Communication Simulation Service (SOT & Client Feedback)
// Displays a realistic WhatsApp delivery notification toast/banner

export function showWhatsAppNotification({
  title = 'WhatsApp Notification Sent',
  recipient = '',
  message = '',
  voucherCode = '',
  brand = '',
  actionUrl = ''
}) {
  // Check if toast container exists
  let toastContainer = document.getElementById('whatsapp-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'whatsapp-toast-container';
    toastContainer.className = 'whatsapp-toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'whatsapp-toast-card animate-toast-in';
  
  const displayMobile = recipient ? recipient.replace(/(\d{5})(\d{5})/, '$1 $2') : 'Registered Mobile';

  toast.innerHTML = `
    <div class="whatsapp-toast-header">
      <div class="whatsapp-toast-brand">
        <div class="whatsapp-icon-circle">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.983.537 1.83.821 2.796.821 3.182 0 5.768-2.587 5.768-5.766.001-3.187-2.575-5.772-5.768-5.772zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.073.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z"/></svg>
        </div>
        <div class="whatsapp-toast-sender">
          <span class="sender-name">Poonawalla Fincorp</span>
          <span class="sender-badge">Verified Business ✓</span>
        </div>
      </div>
      <span class="whatsapp-toast-time">Just now</span>
      <button class="whatsapp-toast-close" aria-label="Close">&times;</button>
    </div>
    
    <div class="whatsapp-toast-body">
      <div class="whatsapp-message-bubble">
        <p class="whatsapp-msg-intro">🎉 <strong>${title}</strong></p>
        <p class="whatsapp-msg-text">${message}</p>
        ${voucherCode ? `
          <div class="whatsapp-voucher-pill">
            <span class="voucher-tag">${brand ? brand + ' Voucher' : 'Offer Code'}:</span>
            <code class="voucher-code-highlight">${voucherCode}</code>
          </div>
        ` : ''}
        <p class="whatsapp-msg-footer">Sent to 📱 +91 ${displayMobile}</p>
      </div>
    </div>
  `;

  toastContainer.appendChild(toast);

  // Close handler
  const closeBtn = toast.querySelector('.whatsapp-toast-close');
  const dismissToast = () => {
    toast.classList.add('animate-toast-out');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 400);
  };

  closeBtn.addEventListener('click', dismissToast);

  // Auto-dismiss after 8 seconds
  setTimeout(dismissToast, 8000);
}
