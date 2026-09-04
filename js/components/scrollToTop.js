// Floating Scroll To Top Button Component
// Appears smoothly once the user scrolls ~30% of the page

export function initScrollToTop() {
  const existingBtn = document.getElementById('scroll-to-top-btn');
  if (existingBtn) existingBtn.remove();

  const btn = document.createElement('button');
  btn.id = 'scroll-to-top-btn';
  btn.className = 'scroll-to-top-btn';
  btn.setAttribute('aria-label', 'Scroll to Top');
  btn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 15l-6-6-6 6"/>
    </svg>
    <span class="scroll-btn-text">TOP</span>
  `;

  document.body.appendChild(btn);

  // Click Handler
  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Scroll Listener (30% threshold)
  const handleScroll = () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollableHeight <= 0) return;

    const scrollPercentage = (window.scrollY / scrollableHeight) * 100;

    // Show button when scrolled past 30%
    if (scrollPercentage >= 30) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}
