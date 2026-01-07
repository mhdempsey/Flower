/**
 * Florilege - Personal Oracle
 *
 * Displays random curated content from a Notion database.
 * Press spacebar or click anywhere to shuffle to new content.
 */

// ============================================
// Configuration
// ============================================
const CONFIG = {
    // API endpoint for fetching content (Vercel serverless function)
    apiEndpoint: '/api/content',

    // Fade transition duration (should match CSS)
    fadeDuration: 400,

    // Show hint after this many milliseconds
    hintDelay: 3000,

    // Character threshold for "short" text styling
    shortTextThreshold: 150,
};

// ============================================
// State
// ============================================
let contentItems = [];      // All content from Notion
let currentIndex = -1;      // Current content index
let isTransitioning = false; // Prevent rapid transitions

// ============================================
// DOM Elements
// ============================================
const loadingEl = document.getElementById('loading');
const contentEl = document.getElementById('content');
const hintEl = document.getElementById('hint');

// ============================================
// Main Initialization
// ============================================
document.addEventListener('DOMContentLoaded', init);

async function init() {
    try {
        // Fetch content from Notion via serverless function
        await fetchContent();

        // Display first random piece
        displayRandomContent();

        // Set up event listeners
        setupEventListeners();

        // Show hint after delay
        setTimeout(() => {
            hintEl.classList.add('visible');
        }, CONFIG.hintDelay);

    } catch (error) {
        showError(error);
    }
}

// ============================================
// Fetch Content from Notion
// ============================================
async function fetchContent() {
    const response = await fetch(CONFIG.apiEndpoint);

    if (!response.ok) {
        throw new Error(`Failed to fetch content: ${response.status}`);
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
        throw new Error('No content found. Make sure you have active items in your Notion database.');
    }

    contentItems = data.items;
    console.log(`Loaded ${contentItems.length} content items`);
}

// ============================================
// Display Random Content
// ============================================
function displayRandomContent() {
    if (contentItems.length === 0) return;

    // Pick a random index different from current
    let newIndex;
    if (contentItems.length === 1) {
        newIndex = 0;
    } else {
        do {
            newIndex = Math.floor(Math.random() * contentItems.length);
        } while (newIndex === currentIndex);
    }

    currentIndex = newIndex;
    const item = contentItems[currentIndex];

    // Render the content
    renderContent(item);
}

// ============================================
// Render Content Based on Type
// ============================================
function renderContent(item) {
    // Hide loading
    loadingEl.classList.add('hidden');

    // Build HTML based on content type
    let html = '';

    // Optional label/title
    if (item.title) {
        html += `<p class="content-label">${escapeHtml(item.title)}</p>`;
    }

    // Main content based on type
    switch (item.type) {
        case 'text':
            html += renderText(item);
            break;
        case 'image':
            html += renderImage(item);
            break;
        case 'image_text':
            html += renderImageText(item);
            break;
        case 'video':
            html += renderVideo(item);
            break;
        case 'audio':
            html += renderAudio(item);
            break;
        case 'tweet':
            html += renderTweet(item);
            break;
        case 'link':
            html += renderLink(item);
            break;
        default:
            html += renderText(item); // Fallback to text
    }

    // Attribution
    if (item.attribution) {
        html += `<p class="content-attribution">${escapeHtml(item.attribution)}</p>`;
    }

    // Learn more link
    if (item.learnMoreUrl) {
        html += `<a href="${escapeHtml(item.learnMoreUrl)}" class="content-learn-more" target="_blank" rel="noopener">learn more →</a>`;
    }

    contentEl.innerHTML = html;

    // Load Twitter widget if needed
    if (item.type === 'tweet' && window.twttr) {
        window.twttr.widgets.load(contentEl);
    }
}

// ============================================
// Content Type Renderers
// ============================================

function renderText(item) {
    const textClass = item.content.length < CONFIG.shortTextThreshold ? 'content-text short' : 'content-text';
    return `<blockquote class="${textClass}">${escapeHtml(item.content)}</blockquote>`;
}

function renderImage(item) {
    const imageUrl = item.imageUrl || item.content;
    return `<img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(item.title || 'Image')}" class="content-image" loading="lazy">`;
}

function renderImageText(item) {
    const imageUrl = item.imageUrl || '';
    let html = '';

    if (imageUrl) {
        html += `<div class="content-image-wrapper">
            <img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(item.title || 'Image')}" class="content-image" loading="lazy">
        </div>`;
    }

    if (item.content) {
        html += `<p class="content-caption">${escapeHtml(item.content)}</p>`;
    }

    return html;
}

function renderVideo(item) {
    const embedUrl = getVideoEmbedUrl(item.content);
    if (!embedUrl) {
        return `<p class="error-message">Invalid video URL</p>`;
    }

    return `<div class="content-video-wrapper">
        <iframe src="${embedUrl}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>`;
}

function renderAudio(item) {
    const embedUrl = getSpotifyEmbedUrl(item.content);
    if (!embedUrl) {
        return `<p class="error-message">Invalid Spotify URL</p>`;
    }

    return `<div class="content-audio-wrapper">
        <iframe src="${embedUrl}" height="152" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </div>`;
}

function renderTweet(item) {
    // Extract tweet ID from URL
    const tweetId = getTweetId(item.content);
    if (!tweetId) {
        return `<p class="error-message">Invalid tweet URL</p>`;
    }

    // Use Twitter's oEmbed or widget
    return `<div class="content-tweet-wrapper">
        <blockquote class="twitter-tweet" data-dnt="true">
            <a href="${escapeHtml(item.content)}"></a>
        </blockquote>
    </div>`;
}

function renderLink(item) {
    const url = item.content || item.learnMoreUrl;
    const title = item.title || 'Link';
    const description = item.content !== url ? item.content : '';

    return `<a href="${escapeHtml(url)}" class="content-link-card" target="_blank" rel="noopener">
        <div class="link-title">${escapeHtml(title)}</div>
        ${description ? `<div class="link-description">${escapeHtml(description)}</div>` : ''}
        <div class="link-url">${escapeHtml(new URL(url).hostname)}</div>
    </a>`;
}

// ============================================
// URL Parsers & Helpers
// ============================================

function getVideoEmbedUrl(url) {
    if (!url) return null;

    // YouTube
    const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (ytMatch) {
        return `https://www.youtube.com/embed/${ytMatch[1]}`;
    }

    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
        return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }

    return null;
}

function getSpotifyEmbedUrl(url) {
    if (!url) return null;

    // Match Spotify track, album, playlist, episode
    const spotifyMatch = url.match(/open\.spotify\.com\/(track|album|playlist|episode)\/([a-zA-Z0-9]+)/);
    if (spotifyMatch) {
        return `https://open.spotify.com/embed/${spotifyMatch[1]}/${spotifyMatch[2]}`;
    }

    return null;
}

function getTweetId(url) {
    if (!url) return null;

    const match = url.match(/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/);
    return match ? match[1] : null;
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// Event Listeners
// ============================================
function setupEventListeners() {
    // Click anywhere to shuffle
    document.body.addEventListener('click', (e) => {
        // Don't trigger on link clicks
        if (e.target.tagName === 'A' || e.target.closest('a')) {
            return;
        }
        shuffle();
    });

    // Spacebar to shuffle
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            shuffle();
        }
    });
}

// ============================================
// Shuffle with Fade Transition
// ============================================
function shuffle() {
    if (isTransitioning || contentItems.length <= 1) return;

    isTransitioning = true;

    // Hide hint after first interaction
    hintEl.classList.remove('visible');

    // Fade out
    contentEl.classList.add('fade-out');

    // After fade out, change content and fade in
    setTimeout(() => {
        displayRandomContent();
        contentEl.classList.remove('fade-out');

        // Allow new transitions after fade in completes
        setTimeout(() => {
            isTransitioning = false;
        }, CONFIG.fadeDuration);

    }, CONFIG.fadeDuration);
}

// ============================================
// Error Handling
// ============================================
function showError(error) {
    loadingEl.classList.add('hidden');
    contentEl.innerHTML = `
        <div class="error-message">
            <p>Unable to load content</p>
            <code>${escapeHtml(error.message)}</code>
        </div>
    `;
    console.error('Florilege error:', error);
}

// ============================================
// Load Twitter Widget Script (if needed)
// ============================================
(function loadTwitterWidget() {
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    document.head.appendChild(script);
})();
