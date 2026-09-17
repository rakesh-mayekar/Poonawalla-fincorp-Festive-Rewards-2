// Main JS Application Router & Initializer SOT v4.0
import { renderHeader } from './components/header.js?v=4.0';
import { renderHomeView } from './components/homeView.js?v=4.0';
import { renderLoansSection } from './components/loansSection.js?v=4.0';
import { renderSpinWinGame } from './components/spinWin.js?v=4.0';
import { renderScratchCardGame } from './components/scratchCard.js?v=4.0';
import { renderShuffleCardGame } from './components/shuffleCard.js?v=4.0';
import { renderPlayWinHub } from './components/playWinHub.js?v=4.0';
import { renderReferSection } from './components/referSection.js?v=4.0';
import { renderCibilSection } from './components/cibilSection.js?v=4.0';
import { renderEmiSection } from './components/emiSection.js?v=4.0';
import { renderPfinSection } from './components/pfinSection.js?v=4.0';
import { renderOffersSection } from './components/offersSection.js?v=4.0';
import { renderMyOffersSection } from './components/myOffersSection.js?v=4.0';
import { renderBlogsSection } from './components/blogsSection.js?v=4.0';
import { renderBlogDetail } from './components/blogDetail.js?v=4.0';
import { renderFooter } from './components/footer.js?v=4.0';
import { initParticleBackground } from './components/particleBg.js?v=4.0';
import { renderLoanDetail } from './components/loanDetail.js?v=4.0';
import { initScrollToTop } from './components/scrollToTop.js?v=4.0';

function navigateTo(route) {
  window.location.hash = route;
  renderRoute(route);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderRoute(routeString) {
  const main = document.querySelector('#main-content');
  if (!main) return;
  main.innerHTML = '';

  const [path, queryString] = routeString.split('?');
  const queryParams = new URLSearchParams(queryString || '');

  // Re-render header to adjust mode (home vs inner page)
  const headerContainer = document.querySelector('#site-header');
  if (headerContainer) renderHeader(headerContainer, navigateTo);

  switch (path) {
    case 'loans':
      renderLoansSection(main, navigateTo);
      break;

    case 'games':
      renderPlayWinHub(main, navigateTo);
      break;

    case 'spinwin':
      renderSpinWinGame(main, navigateTo);
      break;

    case 'scratchcard':
      renderScratchCardGame(main, navigateTo);
      break;

    case 'shufflecard':
      renderShuffleCardGame(main, navigateTo);
      break;

    case 'refer':
      renderReferSection(main, navigateTo);
      break;

    case 'cibil':
      renderCibilSection(main, navigateTo);
      break;

    case 'emi':
      renderEmiSection(main, navigateTo);
      break;

    case 'pfin':
      renderPfinSection(main, navigateTo);
      break;

    case 'offers':
      renderOffersSection(main, navigateTo);
      break;

    case 'myoffers':
      renderMyOffersSection(main, navigateTo);
      break;

    case 'blogs':
      renderBlogsSection(main, navigateTo);
      break;

    case 'blog-detail':
      renderBlogDetail(main, queryParams.get('id'), navigateTo);
      break;

    case 'loan-detail':
      renderLoanDetail(main, queryParams.get('id'), navigateTo);
      break;

    case 'home':
    default:
      renderHomeView(main, navigateTo);
      break;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initParticleBackground();
  initScrollToTop();

  const headerContainer = document.querySelector('#site-header');
  const footerContainer = document.querySelector('#site-footer');

  if (headerContainer) renderHeader(headerContainer, navigateTo);
  if (footerContainer) renderFooter(footerContainer, navigateTo);

  const initialRoute = window.location.hash.replace('#', '') || 'home';
  renderRoute(initialRoute);

  window.addEventListener('hashchange', () => {
    const route = window.location.hash.replace('#', '') || 'home';
    renderRoute(route);
  });
});

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// Intercept renderRoute to re-init animations
const originalRenderRoute = renderRoute;
renderRoute = function(routeString) {
  originalRenderRoute(routeString);
  setTimeout(initScrollAnimations, 50);
};
