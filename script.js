// ===== Tweeter Clone - Minimal JS per CSCI 3342 spec =====
// Notes:
// - Enforces 160-char limit
// - Disables "tweeet" button if limit exceeded or empty
// - Updates label with remaining characters or clear error

(function () {
  const MAX = 280;

  const input = document.getElementById('composer-input');
  const btn   = document.getElementById('post-btn');
  const label = document.getElementById('char-count');
  const feed  = document.getElementById('tweets');

  // Updates remaining count + validation message
  function updateCounter() {
    const len = input.value.length;
    const remaining = MAX - len;

    if (remaining >= 0) {
      label.textContent = remaining;
      btn.disabled = (input.value.trim().length === 0);
    } else {
      label.textContent = remaining;
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
      <img class="avatar" src="https://i.pravatar.cc/48?img=10" alt="Your avatar" />
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
          <button class="icon-btn" type="button" aria-label="Like">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <button class="icon-btn" type="button" aria-label="Share">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
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