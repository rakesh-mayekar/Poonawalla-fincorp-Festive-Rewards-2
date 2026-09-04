// Blog Article Detail Reader Component (#blog-detail?id=...)
// Comprehensive reader view with reading time, author, full content, key takeaways & related blogs

import { FESTIVE_BLOGS } from '../data/blogsData.js';
import { renderTopOffersSection } from './topOffersScroller.js';

export function renderBlogDetail(container, blogId, onNavigate) {
  const blog = FESTIVE_BLOGS.find(b => b.id === blogId) || FESTIVE_BLOGS[0];
  const relatedBlogs = FESTIVE_BLOGS.filter(b => b.id !== blog.id).slice(0, 2);

  const wrapper = document.createElement('div');
  wrapper.className = 'blog-detail-page section-wrapper';

  wrapper.innerHTML = `
    <!-- Top Breadcrumb -->
    <div class="blog-detail-breadcrumb">
      <a href="#blogs" class="breadcrumb-back-link" id="detail-back-blogs">&larr; Back to All Blogs</a>
      <span class="breadcrumb-sep">/</span>
      <span class="breadcrumb-current">${blog.category}</span>
    </div>

    <!-- Article Header -->
    <header class="blog-detail-header">
      <div class="blog-category-badge" style="margin-bottom: 16px;">${blog.category}</div>
      <h1 class="blog-detail-title">${blog.title}</h1>
      
      <div class="blog-author-bar">
        <div class="author-avatar">${blog.author.charAt(0)}</div>
        <div class="author-meta">
          <strong class="author-name">${blog.author}</strong>
          <span class="author-role">${blog.authorRole}</span>
        </div>
        <div class="article-meta-right">
          <span class="article-date">📅 ${blog.date}</span>
          <span class="article-dot">•</span>
          <span class="article-read-time">⏱ ${blog.readTime}</span>
        </div>
      </div>
    </header>

    <!-- Hero Banner Card Visual -->
    <div class="blog-detail-banner-card" style="background: ${blog.coverGradient};">
      <span class="detail-banner-emoji">${blog.coverEmoji}</span>
      <div class="detail-banner-badge">FESTIVE INSIGHTS 2026</div>
    </div>

    <!-- Article Body Content -->
    <div class="blog-detail-layout">
      <main class="blog-content-body">
        ${blog.content}

        <!-- Tags Bar -->
        <div class="blog-tags-footer">
          <span class="tags-label">Topics:</span>
          <div class="tags-cluster">
            ${blog.tags.map(t => `<span class="detail-tag-pill">#${t}</span>`).join('')}
          </div>
        </div>

        <!-- Quick Loan CTA Box inside Article -->
        <div class="blog-financial-cta-box">
          <div class="cta-box-content">
            <span class="cta-sparkle">✨</span>
            <h4>Looking to fund your festive dreams?</h4>
            <p>Get instant personal loans starting from 9.99% p.a. with zero processing fee and guaranteed brand vouchers.</p>
          </div>
          <button class="btn-primary" id="blog-cta-apply-btn" style="white-space: nowrap; padding: 12px 24px;">
            Apply Instant Loan &rarr;
          </button>
        </div>
      </main>

      <!-- Sidebar: Related Articles & Quick Links -->
      <aside class="blog-detail-sidebar">
        <div class="sidebar-widget">
          <h4 class="widget-title">Related Festive Guides</h4>
          <div class="sidebar-related-list">
            ${relatedBlogs.map(rb => `
              <div class="related-article-item" data-id="${rb.id}">
                <div class="related-thumb" style="background: ${rb.coverGradient};">
                  ${rb.coverEmoji}
                </div>
                <div class="related-info">
                  <span class="related-cat">${rb.category}</span>
                  <h5 class="related-title">${rb.title}</h5>
                  <span class="related-read-time">${rb.readTime}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="sidebar-widget promo-widget">
          <span class="promo-icon">🎁</span>
          <h4>Play & Win Vouchers</h4>
          <p>Spin the wheel or scratch cards to claim instant coupons from Myntra, KFC & Amazon!</p>
          <button class="btn-secondary" id="sidebar-play-btn" style="width: 100%; font-size: 0.85rem; padding: 8px 14px;">
            Play Games &rarr;
          </button>
        </div>
      </aside>
    </div>
  `;

  // Attach Event Handlers
  const backBtn = wrapper.querySelector('#detail-back-blogs');
  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (onNavigate) onNavigate('blogs');
    });
  }

  const applyBtn = wrapper.querySelector('#blog-cta-apply-btn');
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      if (onNavigate) onNavigate('loans');
    });
  }

  const playBtn = wrapper.querySelector('#sidebar-play-btn');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (onNavigate) onNavigate('games');
    });
  }

  wrapper.querySelectorAll('.related-article-item').forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.getAttribute('data-id');
      if (onNavigate) {
        onNavigate(`blog-detail?id=${targetId}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  container.appendChild(wrapper);

  // Bottom Top Offers Section
  renderTopOffersSection(container, onNavigate, {
    title: 'Top Offers For You',
    showHeading: true,
    isBottomSection: true
  });
}
