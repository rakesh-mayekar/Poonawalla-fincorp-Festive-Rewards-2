// Breadcrumb Navigation Component for Internal Pages
export function renderBreadcrumbs(container, crumbs = [], onNavigate) {
  const nav = document.createElement('nav');
  nav.className = 'site-breadcrumbs-nav';
  nav.setAttribute('aria-label', 'Breadcrumb');

  let crumbsHtml = `
    <ol class="breadcrumbs-list">
      <li class="breadcrumb-item">
        <a href="#home" class="breadcrumb-link" data-route="home">
          <svg class="breadcrumb-home-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span>Home</span>
        </a>
      </li>
  `;

  crumbs.forEach((crumb, index) => {
    const isLast = index === crumbs.length - 1;
    crumbsHtml += `
      <li class="breadcrumb-separator" aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </li>
      <li class="breadcrumb-item ${isLast ? 'active' : ''}">
        ${isLast ? `<span class="breadcrumb-current" aria-current="page">${crumb.label}</span>` : `<a href="#${crumb.route || 'home'}" class="breadcrumb-link" data-route="${crumb.route}">${crumb.label}</a>`}
      </li>
    `;
  });

  crumbsHtml += `</ol>`;
  nav.innerHTML = crumbsHtml;

  // Handle navigation clicks
  nav.querySelectorAll('.breadcrumb-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const route = link.getAttribute('data-route');
      if (onNavigate && route) {
        onNavigate(route);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  container.prepend(nav);
}
