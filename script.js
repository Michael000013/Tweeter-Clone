// Twitter Clone - JavaScript

class Tweet {
    constructor(id, author, handle, text, avatar, timestamp) {
        this.id = id;
        this.author = author;
        this.handle = handle;
        this.text = text;
        this.avatar = avatar;
        this.timestamp = timestamp;
        this.likes = 0;
        this.retweets = 0;
        this.replies = 0;
        this.liked = false;
        this.retweeted = false;
    }
}

class TwitterClone {
    constructor() {
        this.tweets = [];
        this.users = [
            { name: 'Alex Tech', handle: '@alextech', avatar: 'https://i.pravatar.cc/48?img=1' },
            { name: 'Sarah Dev', handle: '@sarahdev', avatar: 'https://i.pravatar.cc/48?img=2' },
            { name: 'John Code', handle: '@johncode', avatar: 'https://i.pravatar.cc/48?img=3' },
            { name: 'Emma Web', handle: '@emmaweb', avatar: 'https://i.pravatar.cc/48?img=4' },
        ];
        this.currentUser = { name: 'You', handle: '@yourhandl', avatar: 'https://i.pravatar.cc/48?img=1' };
        this.loadTweets();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderTweets();
        this.addSampleTweets();
    }

    setupEventListeners() {
        const tweetInput = document.getElementById('tweet-input');
        const postBtn = document.getElementById('post-btn');
        const tweetBtn = document.querySelector('.tweet-btn');

        // Enable/disable post button based on input
        tweetInput.addEventListener('input', () => {
            postBtn.disabled = tweetInput.value.trim().length === 0;
        });

        // Post tweet on button click
        postBtn.addEventListener('click', () => this.postTweet());

        // Post tweet on Ctrl+Enter or Cmd+Enter
        tweetInput.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                if (!postBtn.disabled) {
                    this.postTweet();
                }
            }
        });

        // Tweet button opens compose (optional - just focus input)
        tweetBtn.addEventListener('click', () => {
            tweetInput.focus();
        });
    }

    postTweet() {
        const tweetInput = document.getElementById('tweet-input');
        const text = tweetInput.value.trim();

        if (text.length === 0) return;

        const tweet = new Tweet(
            Date.now(),
            this.currentUser.name,
            this.currentUser.handle,
            text,
            this.currentUser.avatar,
            new Date()
        );

        this.tweets.unshift(tweet);
        this.saveTweets();
        tweetInput.value = '';
        document.getElementById('post-btn').disabled = true;
        this.renderTweets();
    }

    addSampleTweets() {
        // Only add sample tweets if none exist
        if (this.tweets.length > 0) return;

        const sampleTweets = [
            new Tweet(
                Date.now() - 3600000,
                'Alex Tech',
                '@alextech',
                'Just launched my new portfolio website! Check it out and let me know what you think 🚀',
                'https://i.pravatar.cc/48?img=1',
                new Date(Date.now() - 3600000)
            ),
            new Tweet(
                Date.now() - 7200000,
                'Sarah Dev',
                '@sarahdev',
                'Learning Web3 development has been an amazing journey. The future of the web is here! 💻',
                'https://i.pravatar.cc/48?img=2',
                new Date(Date.now() - 7200000)
            ),
            new Tweet(
                Date.now() - 10800000,
                'John Code',
                '@johncode',
                'Finally fixed that bug that\'s been haunting me for weeks. Feels good 😎',
                'https://i.pravatar.cc/48?img=3',
                new Date(Date.now() - 10800000)
            ),
            new Tweet(
                Date.now() - 14400000,
                'Emma Web',
                '@emmaweb',
                'CSS Grid and Flexbox are game changers. Anyone else love these layouts as much as I do?',
                'https://i.pravatar.cc/48?img=4',
                new Date(Date.now() - 14400000)
            ),
        ];

        sampleTweets.forEach(tweet => {
            tweet.likes = Math.floor(Math.random() * 1000) + 100;
            tweet.retweets = Math.floor(Math.random() * 500) + 50;
            tweet.replies = Math.floor(Math.random() * 300) + 20;
        });

        this.tweets = sampleTweets;
        this.saveTweets();
    }

    toggleLike(tweetId) {
        const tweet = this.tweets.find(t => t.id === tweetId);
        if (tweet) {
            tweet.liked = !tweet.liked;
            tweet.likes += tweet.liked ? 1 : -1;
            this.saveTweets();
            this.renderTweets();
        }
    }

    toggleRetweet(tweetId) {
        const tweet = this.tweets.find(t => t.id === tweetId);
        if (tweet) {
            tweet.retweeted = !tweet.retweeted;
            tweet.retweets += tweet.retweeted ? 1 : -1;
            this.saveTweets();
            this.renderTweets();
        }
    }

    deleteTweet(tweetId) {
        this.tweets = this.tweets.filter(t => t.id !== tweetId);
        this.saveTweets();
        this.renderTweets();
    }

    formatTimestamp(date) {
        const now = new Date();
        const diff = now - date;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 60) return 'now';
        if (minutes < 60) return `${minutes}m`;
        if (hours < 24) return `${hours}h`;
        if (days < 7) return `${days}d`;
        
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    }

    renderTweets() {
        const container = document.getElementById('tweets-container');
        container.innerHTML = '';

        this.tweets.forEach(tweet => {
            const tweetElement = document.createElement('div');
            tweetElement.className = 'tweet';
            tweetElement.innerHTML = `
                <div class="tweet-content">
                    <img src="${tweet.avatar}" alt="${tweet.author}" class="tweet-author-avatar">
                    <div class="tweet-body">
                        <div class="tweet-header">
                            <span class="tweet-author">${tweet.author}</span>
                            <span class="tweet-handle">${tweet.handle}</span>
                            <span class="tweet-date">·</span>
                            <span class="tweet-date">${this.formatTimestamp(tweet.timestamp)}</span>
                        </div>
                        <div class="tweet-text">${this.escapHTML(tweet.text)}</div>
                        <div class="tweet-stats">
                            <div class="tweet-stat">
                                <span>${this.formatNumber(tweet.replies)}</span>
                                <span>Replies</span>
                            </div>
                            <div class="tweet-stat">
                                <span>${this.formatNumber(tweet.retweets)}</span>
                                <span>Retweets</span>
                            </div>
                            <div class="tweet-stat">
                                <span>${this.formatNumber(tweet.likes)}</span>
                                <span>Likes</span>
                            </div>
                        </div>
                        <div class="tweet-actions-footer">
                            <div class="tweet-action reply-action" data-id="${tweet.id}">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23 3v6h-6M1 21h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H1a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"/>
                                </svg>
                                <span>${this.formatNumber(tweet.replies)}</span>
                            </div>
                            <div class="tweet-action retweet-action ${tweet.retweeted ? 'retweeted' : ''}" data-id="${tweet.id}">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23 3v6h-6M1 21h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H1a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" stroke="currentColor" fill="none"/>
                                </svg>
                                <span>${this.formatNumber(tweet.retweets)}</span>
                            </div>
                            <div class="tweet-action like-action ${tweet.liked ? 'liked' : ''}" data-id="${tweet.id}">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                                </svg>
                                <span>${this.formatNumber(tweet.likes)}</span>
                            </div>
                            <div class="tweet-action share-action" data-id="${tweet.id}">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="18" cy="5" r="3"></circle>
                                    <circle cx="6" cy="12" r="3"></circle>
                                    <circle cx="18" cy="19" r="3"></circle>
                                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button class="delete-btn" data-id="${tweet.id}">Delete</button>
                    </div>
                </div>
            `;

            // Add event listeners
            tweetElement.querySelector('.like-action').addEventListener('click', () => {
                this.toggleLike(tweet.id);
            });

            tweetElement.querySelector('.retweet-action').addEventListener('click', () => {
                this.toggleRetweet(tweet.id);
            });

            tweetElement.querySelector('.delete-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteTweet(tweet.id);
            });

            tweetElement.querySelector('.share-action').addEventListener('click', () => {
                alert('Share functionality would open share options');
            });

            tweetElement.querySelector('.reply-action').addEventListener('click', () => {
                alert('Reply functionality would open reply composer');
            });

            container.appendChild(tweetElement);
        });
    }

    escapHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveTweets() {
        localStorage.setItem('tweets', JSON.stringify(this.tweets));
    }

    loadTweets() {
        const saved = localStorage.getItem('tweets');
        if (saved) {
            const data = JSON.parse(saved);
            this.tweets = data.map(t => {
                const tweet = new Tweet(t.id, t.author, t.handle, t.text, t.avatar, new Date(t.timestamp));
                tweet.likes = t.likes;
                tweet.retweets = t.retweets;
                tweet.replies = t.replies;
                tweet.liked = t.liked;
                tweet.retweeted = t.retweeted;
                return tweet;
            });
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TwitterClone();
});
