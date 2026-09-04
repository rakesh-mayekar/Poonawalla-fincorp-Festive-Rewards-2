// Featured Blogs 3-Card Showcase Component (Homepage)
// Displayed after the Festive Winners Wall

import { FESTIVE_BLOGS } from '../data/blogsData.js';

export function renderHomeBlogsSection(container, onNavigate) {
  const section = document.createElement('section');
  section.className = 'home-blogs-section section-wrapper animate-on-scroll';
  section.id = 'home-blogs-section';

  const featuredBlogs = FESTIVE_BLOGS.slice(0, 3);

  const cardsHtml = featuredBlogs.map(blog => `
    <article class="blog-card" data-id="${blog.id}">
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
      </div>

      <div class="blog-card-footer">
        <span class="blog-read-link">Read Full Article &rarr;</span>
      </div>
    </article>
  `).join('');

  section.innerHTML = `
    <div class="section-header center">
      <div class="festive-kicker-badge">
        <span class="sparkle-icon">📚</span> FESTIVE FINANCIAL INSIGHTS
      </div>
      <h2 class="festive-heading">
        Smart Festive <span class="accent-italic">Guides</span>
      </h2>
      <p class="subheading center-subheading">
        Expert financial tips, smart budgeting tricks, and loan planning strategies to celebrate your biggest festive season worry-free.
      </p>
    </div>

    <div class="home-blogs-grid">
      ${cardsHtml}
    </div>

    <div class="home-blogs-cta-row center" style="margin-top: 36px; text-align: center;">
      <button class="btn-primary" id="home-view-all-blogs-btn" style="padding: 12px 32px;">
        View All Blogs & Articles &rarr;
      </button>
    </div>
  `;

  // Attach Handlers
  const viewAllBtn = section.querySelector('#home-view-all-blogs-btn');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
      if (onNavigate) onNavigate('blogs');
    });
  }

  section.querySelectorAll('.blog-card').forEach(card => {
    card.addEventListener('click', () => {
      const blogId = card.getAttribute('data-id');
      if (onNavigate) onNavigate(`blog-detail?id=${blogId}`);
    });
  });

  container.appendChild(section);
}
