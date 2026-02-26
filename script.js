// ===== Tweeter Clone - Minimal JS per CSCI 3342 spec =====
// Notes:
// - Enforces 160-char limit
// - Disables "tweeet" button if limit exceeded or empty
// - Updates label with remaining characters or clear error

(function () {
  const MAX = 160;

  const input = document.getElementById('tweet-input');
  const btn   = document.getElementById('tweet-btn');
  const label = document.getElementById('char-label');
  const feed  = document.getElementById('tweets');

  // Updates remaining count + validation message
  function updateCounter() {
    const len = input.value.length;
    const remaining = MAX - len;

    if (remaining >= 0) {
      label.textContent = `${remaining} characters remaining`;
      label.classList.remove('char-label--error');
      btn.disabled = (input.value.trim().length === 0);
    } else {
      label.textContent = `160-character limit exceeded by ${Math.abs(remaining)}`;
      label.classList.add('char-label--error');
      btn.disabled = true;
    }
  }

  // Renders a new tweet at the top of the list
  function postTweet() {
    const text = input.value.trim();
    if (!text || text.length > MAX) return;

    const now = new Date();
    const pretty = now.toLocaleString('en-US', {
      month: 'short', day: 'numeric',
      year: 'numeric', hour: 'numeric', minute: '2-digit'
    });

    const article = document.createElement('article');
    article.className = 'tweet';
    article.innerHTML = `
      <div class="avatar avatar--placeholder" role="img" aria-label="Profile photo placeholder"></div>
      <div class="tweet__main">
        <header class="tweet__header">
          <span class="tweet__author">You</span>
          <span class="tweet__handle">@yourhandle</span>
          <span class="tweet__dot">·</span>
          <time class="tweet__time" datetime="${now.toISOString()}">${pretty}</time>
        </header>
        <p class="tweet__text"></p>
        <footer class="tweet__footer">
          <button class="icon-btn" type="button" aria-label="Comment">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V5a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>
            </svg>
          </button>
          <button class="icon-btn" type="button" aria-label="Retweet">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <polyline points="17 1 21 5 17 9"></polyline>
              <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
              <polyline points="7 23 3 19 7 15"></polyline>
              <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
            </svg>
          </button>
          <button class="icon-btn" type="button" aria-label="Link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L10 4"></path>
              <path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 1 0 7.07 7.07L14 20"></path>
            </svg>
          </button>
          <button class="icon-btn" type="button" aria-label="Upload">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 5 17 10"></polyline>
              <line x1="12" y1="5" x2="12" y2="20"></line>
            </svg>
          </button>
        </footer>
      </div>
    `;

    // Escape text content safely
    article.querySelector('.tweet__text').textContent = text;

    // Prepend new tweet to the top of #tweets
    feed.prepend(article);

    // Reset composer
    input.value = '';
    updateCounter();
  }

  // Events
  input.addEventListener('input', updateCounter);
  btn.addEventListener('click', postTweet);

  // Optional: Ctrl/Cmd + Enter to post
  input.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      postTweet();
    }
  });

  // Initial label state
  updateCounter();
})();