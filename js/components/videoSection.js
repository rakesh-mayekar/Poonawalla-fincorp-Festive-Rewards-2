// Campaign Video Showreel Section Component
// Displays the festive campaign showreel with interactive playback modal

export function renderVideoSection(container, onNavigate) {
  const videoSection = document.createElement('section');
  videoSection.className = 'campaign-video-section section-wrapper animate-on-scroll';
  videoSection.id = 'campaign-video-section';

  videoSection.innerHTML = `
    <div class="section-header center">
      <div class="festive-kicker-badge">
        <span class="sparkle-icon">📹</span> CAMPAIGN SHOWREEL
      </div>
      <h2 class="festive-heading video-heading">
        Celebrate More. <span class="accent-italic">Worry Less.</span>
      </h2>
      <p class="subheading center-subheading">
        Watch how Poonawalla Fincorp brings festive cheer and instant financial freedom to families across India.
      </p>
    </div>

    <div class="video-showreel-wrapper">
      <div class="video-player-card" id="showreel-card">
        <div class="video-thumbnail-overlay">
          <!-- Wireframe showreel visual graphic -->
          <div class="video-poster-bg">
            <div class="poster-glow"></div>
            <div class="poster-badge">CAMPAIGN FILM • 2026</div>
            <div class="poster-title-wrap">
              <span class="poster-subtitle">POONAWALLA FINCORP PRESENTS</span>
              <h3 class="poster-main-title">Festive Celebration Film</h3>
              <p class="poster-tagline">Make your festive moments bigger and brighter.</p>
            </div>
          </div>
          
          <!-- Play Trigger Button with Clean Ripple -->
          <button class="video-play-btn" id="video-play-trigger" aria-label="Play Campaign Showreel">
            <div class="play-ripple"></div>
            <div class="play-ripple-outer"></div>
            <svg class="play-icon-svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>
        </div>

        <div class="video-card-footer">
          <div class="video-meta-left">
            <span class="video-duration-pill">▶ 01:45 MIN</span>
            <span class="video-badge-hd">HD 1080p</span>
          </div>
          <div class="video-meta-right">
            <span class="video-views-count">1.2M+ Views</span>
            <button class="video-share-btn" id="showreel-share-btn">Share ↗</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Interactive Video Modal Player
  const triggerBtn = videoSection.querySelector('#video-play-trigger');
  const showreelCard = videoSection.querySelector('#showreel-card');

  const openVideoModal = () => {
    let modal = document.getElementById('showreel-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'showreel-modal-backdrop';
      modal.id = 'showreel-modal';
      modal.innerHTML = `
        <div class="showreel-modal-dialog">
          <div class="showreel-modal-header">
            <div class="showreel-header-info">
              <span class="modal-badge">Festive Celebration</span>
              <h4>Poonawalla Fincorp — Campaign Film</h4>
            </div>
            <button class="showreel-modal-close" id="showreel-modal-close" aria-label="Close Video">&times;</button>
          </div>
          <div class="showreel-video-container">
            <div class="simulated-video-player">
              <div class="video-scene-ambient">
                <div class="ambient-light-glow"></div>
                <div class="festive-video-content">
                  <div class="video-watermark">POONAWALLA FINCORP</div>
                  <div class="video-center-art">
                    <div class="video-center-icon-pill">🎬</div>
                    <h3>Celebrate More. Worry Less.</h3>
                    <p>Instant Loans • Zero Processing Fee • Guaranteed Festive Rewards</p>
                  </div>
                  <div class="video-progress-bar-wrap">
                    <div class="video-progress-bar-fill"></div>
                  </div>
                </div>
              </div>
              <div class="video-custom-controls">
                <button class="v-ctrl-btn" id="v-toggle-play">⏸ Pause</button>
                <div class="v-time-display"><span id="v-curr-time">00:24</span> / 01:45</div>
                <div class="v-quality-pill">HD 1080p</div>
              </div>
            </div>
          </div>
          <div class="showreel-modal-footer">
            <p>Apply for festive loans today and get assured vouchers from 50+ top brands!</p>
            <button class="btn-primary" id="modal-explore-loans-btn" style="padding: 10px 24px;">Explore Loans &rarr;</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      const closeBtn = modal.querySelector('#showreel-modal-close');
      const loansBtn = modal.querySelector('#modal-explore-loans-btn');
      const togglePlay = modal.querySelector('#v-toggle-play');

      const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      };

      closeBtn.addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });

      if (loansBtn) {
        loansBtn.addEventListener('click', () => {
          closeModal();
          if (onNavigate) onNavigate('loans');
        });
      }

      let isPlaying = true;
      if (togglePlay) {
        togglePlay.addEventListener('click', () => {
          isPlaying = !isPlaying;
          togglePlay.textContent = isPlaying ? '⏸ Pause' : '▶ Play';
        });
      }
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  if (triggerBtn) triggerBtn.addEventListener('click', openVideoModal);
  if (showreelCard) {
    showreelCard.addEventListener('click', (e) => {
      if (!e.target.closest('#showreel-share-btn')) {
        openVideoModal();
      }
    });
  }

  const shareBtn = videoSection.querySelector('#showreel-share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        shareBtn.textContent = 'Copied! ✓';
        setTimeout(() => { shareBtn.textContent = 'Share ↗'; }, 2000);
      }
    });
  }

  container.appendChild(videoSection);
}
