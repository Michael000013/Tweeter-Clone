/* =========================
   Twitter Clone – Clean JS
   =========================
   - Minimal, clear comments
   - Event delegation for actions
   - Safe localStorage usage
   - Short helpers for time & numbers
   - Funny sample tweets
*/

(() => {
  const STORAGE_KEY = 'tc_tweets_v2';
  const MAX_LEN = 280;

  // Current user (editable)
  const CURRENT_USER = {
    name: 'You',
    handle: '@yourhandle',
    avatar: 'https://i.pravatar.cc/48?img=10'
  };

  // ---------- State ----------
  /** @type {Array<Tweet>} */
  let tweets = [];

  class Tweet {
    constructor({ id, author, handle, text, avatar, timestamp, likes = 0, retweets = 0, replies = 0, liked = false, retweeted = false }) {
      this.id = id ?? uid();
      this.author = author;
      this.handle = handle;
      this.text = text;
      this.avatar = avatar;
      this.timestamp = timestamp instanceof Date ? timestamp : new Date(timestamp ?? Date.now());
      this.likes = likes;
      this.retweets = retweets;
      this.replies = replies;
      this.liked = liked;
      this.retweeted = retweeted;
    }
  }

  // ---------- DOM ----------
  const feedEl = document.getElementById('feed');
  const inputEl = document.getElementById('composer-input');
  const postBtn = document.getElementById('post-btn');
  const charCountEl = document.getElementById('char-count');
  const openTweetBtn = document.querySelector('.tweet-open');

  // ---------- Init ----------
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    loadTweets();
    ensureSampleTweets();
    bindComposerEvents();
    bindFeedEvents();
    render();
  }

  // ---------- Events ----------
  function bindComposerEvents() {
    const updateUI = () => {
      const remaining = MAX_LEN - inputEl.value.length;
      charCountEl.textContent = remaining;
      postBtn.disabled = inputEl.value.trim().length === 0 || remaining < 0;
    };

    inputEl.addEventListener('input', updateUI);
    inputEl.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        tryPost();
      }
    });

    postBtn.addEventListener('click', tryPost);
    openTweetBtn?.addEventListener('click', () => inputEl.focus());

    // initial UI state
    updateUI();
  }

  function bindFeedEvents() {
    // Single delegation handler for all tweet actions
    feedEl.addEventListener('click', (e) => {
      const actionBtn = e.target.closest('[data-action]');
      if (!actionBtn) return;

      const action = actionBtn.dataset.action;
      const tweetEl = actionBtn.closest('.tweet');
      const id = tweetEl?.dataset.id;
      if (!id) return;

      if (action === 'like') toggleLike(id);
      else if (action === 'retweet') toggleRetweet(id);
      else if (action === 'reply') notify('Reply composer would open.');
      else if (action === 'share') notify('Share options would open.');
      else if (action === 'delete') deleteTweet(id);
    });
  }

  // ---------- Actions ----------
  function tryPost() {
    const text = inputEl.value.trim();
    if (!text || text.length > MAX_LEN) return;

    const t = new Tweet({
      author: CURRENT_USER.name,
      handle: CURRENT_USER.handle,
      text,
      avatar: CURRENT_USER.avatar
    });

    tweets.unshift(t);
    inputEl.value = '';
    saveTweets();
    render();
  }

  function toggleLike(id) {
    const t = tweets.find(x => x.id === id);
    if (!t) return;
    t.liked = !t.liked;
    t.likes += t.liked ? 1 : -1;
    saveTweets();
    render();
  }

  function toggleRetweet(id) {
    const t = tweets.find(x => x.id === id);
    if (!t) return;
    t.retweeted = !t.retweeted;
    t.retweets += t.retweeted ? 1 : -1;
    saveTweets();
    render();
  }

  function deleteTweet(id) {
    tweets = tweets.filter(x => x.id !== id);
    saveTweets();
    render();
  }

  // ---------- Render ----------
  function render() {
    feedEl.setAttribute('aria-busy', 'true');
    feedEl.innerHTML = tweets
      .sort((a, b) => b.timestamp - a.timestamp)
      .map(renderTweet)
      .join('');
    feedEl.setAttribute('aria-busy', 'false');
  }

  function renderTweet(t) {
    const isOwn = t.handle === CURRENT_USER.handle || t.author === CURRENT_USER.name;
    const escText = escapeHTML(t.text);
    const liked = t.liked ? 'true' : 'false';
    const retweeted = t.retweeted ? 'true' : 'false';

    return `
      <article class="tweet" data-id="${t.id}">
        <img class="tweet__avatar" src="${t.avatar}" alt="${t.author}'s avatar" />
        <div class="tweet__main">
          <header class="tweet__header">
            <span class="tweet__author">${t.author}</span>
            <span class="tweet__handle">${t.handle}</span>
            <span class="tweet__dot">·</span>
            <time class="tweet__time" datetime="${t.timestamp.toISOString()}">${relativeTime(t.timestamp)}</time>
          </header>

          <p class="tweet__text">${escText}</p>

          <footer class="tweet__footer">
            <button class="action action--reply" data-action="reply" type="button" aria-label="Reply">
              ${iconReply()} <span>${formatNumber(t.replies)}</span>
            </button>
            <button class="action action--retweet" data-action="retweet" type="button" aria-label="Retweet" aria-pressed="${retweeted}">
              ${iconRetweet()} <span>${formatNumber(t.retweets)}</span>
            </button>
            <button class="action action--like" data-action="like" type="button" aria-label="Like" aria-pressed="${liked}">
              ${iconLike()} <span>${formatNumber(t.likes)}</span>
            </button>
            <button class="action action--share" data-action="share" type="button" aria-label="Share">
              ${iconShare()}
            </button>
          </footer>
        </div>
        ${isOwn ? `<button class="tweet__delete" data-action="delete" type="button">Delete</button>` : ``}
      </article>
    `;
  }

  // ---------- Sample Data (funny names) ----------
  function ensureSampleTweets() {
    if (tweets.length > 0) return;

    const samples = [
      new Tweet({
        author: 'Captain Bugfix',
        handle: '@fixitfast',
        text: "Squashed a bug so sneaky it had a LinkedIn. Code smells like victory today. 🪲✅",
        avatar: 'https://i.pravatar.cc/48?img=1',
        timestamp: Date.now() - 60 * 60 * 1000, // 1h
        likes: rand(120, 1400),
        retweets: rand(30, 500),
        replies: rand(10, 200)
      }),
      new Tweet({
        author: 'CSS Wizard',
        handle: '@cascadeKing',
        text: "Made a div center itself without flex or grid. The dark arts deepen. 🧙‍♂️✨",
        avatar: 'https://i.pravatar.cc/48?img=4',
        timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2h
        likes: rand(200, 2000),
        retweets: rand(50, 700),
        replies: rand(20, 300)
      }),
      new Tweet({
        author: 'Null Pointer',
        handle: '@voidlord',
        text: "Tried to hug an object reference. Got undefined instead. Typical. 🤖",
        avatar: 'https://i.pravatar.cc/48?img=3',
        timestamp: Date.now() - 3 * 60 * 60 * 1000, // 3h
        likes: rand(80, 900),
        retweets: rand(15, 350),
        replies: rand(5, 150)
      }),
      new Tweet({
        author: 'Meme Machine',
        handle: '@lolbyte',
        text: "If it compiles on the first try, I assume I forgot to save. 💾😅",
        avatar: 'https://i.pravatar.cc/48?img=8',
        timestamp: Date.now() - 4 * 60 * 60 * 1000, // 4h
        likes: rand(160, 1800),
        retweets: rand(40, 600),
        replies: rand(12, 250)
      })
    ];

    tweets = samples;
    saveTweets();
  }

  // ---------- Storage ----------
  function saveTweets() {
    try {
      const payload = tweets.map(t => ({
        ...t,
        timestamp: t.timestamp.toISOString()
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch { /* ignore quota errors */ }
  }

  function loadTweets() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      tweets = data.map(obj => new Tweet(obj));
    } catch {
      tweets = [];
    }
  }

  // ---------- Utils ----------
  function uid() {
    // Simple unique id
    return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  }

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function formatNumber(n) {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    return String(n);
  }

  function relativeTime(date) {
    const now = new Date();
    const diffMs = now - date;
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 10) return 'now';
    if (seconds < 60) return `${seconds}s`;
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  function notify(msg) {
    // Simple demo notification
    alert(msg);
  }

  // ---------- Icons ----------
  function iconReply() {
    return `<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M10 19l-7-7 7-7" />
      <path d="M3 12h12a6 6 0 0 1 6 6v2" />
    </svg>`;
  }

  function iconRetweet() {
    return `<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>`;
  }

  function iconLike() {
    return `<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>`;
  }

  function iconShare() {
    return `<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="18" cy="5" r="3"></circle>
      <circle cx="6" cy="12" r="3"></circle>
      <circle cx="18" cy="19" r="3"></circle>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
    </svg>`;
  }
})();
``