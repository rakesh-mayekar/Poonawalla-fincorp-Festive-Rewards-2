// Blogs Listing Page Component (#blogs)
// Displays full catalog of festive articles with category filtering & search

import { FESTIVE_BLOGS } from '../data/blogsData.js';
import { renderTopOffersSection } from './topOffersScroller.js';

export function renderBlogsSection(container, onNavigate) {
  const wrapper = document.createElement('div');
  wrapper.className = 'blogs-listing-page section-wrapper';

  const categories = ['All', 'Festive Financial Planning', 'Credit & CIBIL Guide', 'Business Financing', 'Loan Comparison', 'Digital Banking', 'Smart Tools'];

  wrapper.innerHTML = `
    <!-- Header -->
    <div class="section-header align-left">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <a href="#home" class="breadcrumb-back-link" id="blogs-back-home">&larr; Back to Home</a>
      </div>
      <span class="section-kicker" style="color: var(--wf-text-secondary); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">• KNOWLEDGE & INSIGHTS HUB</span>
      <h2 style="margin-top: 4px;">
        Festive Financial <span style="font-style: italic; font-weight: 500; color: var(--wf-text-secondary); margin-left: 6px;">Articles & Guides</span>
      </h2>
      <p class="subheading">Read actionable financial wisdom to make the smartest loan, savings, and celebration decisions.</p>
    </div>

    <!-- Filter & Search Controls -->
    <div class="blogs-controls-row">
      <div class="blogs-category-pills" id="blogs-category-pills">
        ${categories.map((cat, idx) => `
          <button class="blog-cat-btn ${idx === 0 ? 'active' : ''}" data-category="${cat}">${cat}</button>
        `).join('')}
      </div>

      <div class="blogs-search-wrap">
        <input type="text" class="blogs-search-input" id="blogs-search" placeholder="Search guides (Gold, CIBIL, EMI)...">
      </div>
    </div>

    <!-- Articles Grid -->
    <div class="blogs-catalog-grid" id="blogs-grid-container"></div>
  `;

  const gridContainer = wrapper.querySelector('#blogs-grid-container');
  const searchInput = wrapper.querySelector('#blogs-search');
  const catButtons = wrapper.querySelectorAll('.blog-cat-btn');

  let selectedCat = 'All';
  let searchQuery = '';

  function renderList() {
    gridContainer.innerHTML = '';

    const filtered = FESTIVE_BLOGS.filter(b => {
      const matchCat = selectedCat === 'All' || b.category.toLowerCase() === selectedCat.toLowerCase();
      const matchSearch = searchQuery === '' || 
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div class="blogs-empty-state">
          <span style="font-size: 3rem;">🔍</span>
          <h3>No matching articles found</h3>
          <p>Try searching with another keyword or select "All".</p>
        </div>
      `;
      return;
    }

    filtered.forEach(blog => {
      const card = document.createElement('article');
      card.className = 'blog-card catalog-card';
      card.setAttribute('data-id', blog.id);

      card.innerHTML = `
        <div class="blog-card-cover" style="background: ${blog.coverGradient};">
          <span class="blog-cover-emoji">${blog.coverEmoji}</span>
          <span class="blog-category-badge">${blog.category}</span>
        </div>

        <div class="blog-card-body">
          <div class="blog-meta-row">
            <span class="blog-read-time">⏱ ${blog.readTime}</span>
            <span class="blog-dot">•</span>
            <span class="blog-date">${blog.date}</span>
          </div>

          <h3 class="blog-title">${blog.title}</h3>
          <p class="blog-excerpt">${blog.excerpt}</p>

          <div class="blog-tags-row">
            ${blog.tags.slice(0, 3).map(t => `<span class="blog-tag-pill">#${t}</span>`).join('')}
          </div>
        </div>

        <div class="blog-card-footer">
          <span class="blog-read-link">Read Full Guide &rarr;</span>
        </div>
      `;

      card.addEventListener('click', () => {
        if (onNavigate) onNavigate(`blog-detail?id=${blog.id}`);
      });

      gridContainer.appendChild(card);
    });
  }

  // Filter Event Listeners
  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedCat = btn.getAttribute('data-category');
      renderList();
    });
  });

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    renderList();
  });

  const backHomeBtn = wrapper.querySelector('#blogs-back-home');
  if (backHomeBtn) {
    backHomeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (onNavigate) onNavigate('home');
    });
  }

  renderList();
  container.appendChild(wrapper);

  // Bottom Top Offers Section
  renderTopOffersSection(container, onNavigate, {
    title: 'Top Offers For You',
    showHeading: true,
    isBottomSection: true
  });
}
