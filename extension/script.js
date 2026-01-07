/**
 * Florilege Chrome Extension
 *
 * New tab page that displays random curated content from Notion.
 * Caches content locally for speed and offline use.
 */

// ============================================
// Configuration
// ============================================
const CONFIG = {
    // Notion API base URL
    notionApiBase: 'https://api.notion.com/v1',

    // Cache duration in milliseconds (1 hour)
    cacheDuration: 60 * 60 * 1000,

    // Fade transition duration
    fadeDuration: 400,

    // Show hint after this many milliseconds
    hintDelay: 3000,

    // Character threshold for "short" text styling
    shortTextThreshold: 150,
};

// ============================================
// State
// ============================================
let contentItems = [];
let currentIndex = -1;
let isTransitioning = false;
let settings = null;

// ============================================
// DOM Elements
// ============================================
const setupEl = document.getElementById('setup');
const setupBtn = document.getElementById('setup-btn');
const loadingEl = document.getElementById('loading');
const contentEl = document.getElementById('content');
const hintEl = document.getElementById('hint');

// ============================================
// Main Initialization
// ============================================
document.addEventListener('DOMContentLoaded', init);

async function init() {
    // Load settings from Chrome storage
    settings = await loadSettings();

    // Check if configured
    if (!settings.apiKey || !settings.databaseId) {
        showSetupPrompt();
        return;
    }

    try {
        // Try to load from cache first, then fetch fresh data
        await loadContent();

        // Display random content
        if (contentItems.length > 0) {
            displayRandomContent();
            setupEventListeners();

            // Show hint after delay
            setTimeout(() => {
                hintEl.classList.add('visible');
            }, CONFIG.hintDelay);
        } else {
            showError(new Error('No content found. Add some items to your Notion database and mark them as Active.'));
        }

    } catch (error) {
        showError(error);
    }
}

// ============================================
// Settings Management
// ============================================
async function loadSettings() {
    return new Promise((resolve) => {
        chrome.storage.sync.get(['notionApiKey', 'notionDatabaseId'], (result) => {
            resolve({
                apiKey: result.notionApiKey || '',
                databaseId: result.notionDatabaseId || ''
            });
        });
    });
}

function showSetupPrompt() {
    loadingEl.classList.add('hidden');
    setupEl.classList.add('visible');

    setupBtn.addEventListener('click', () => {
        chrome.runtime.openOptionsPage();
    });
}

// ============================================
// Content Loading (with caching)
// ============================================
async function loadContent() {
    // Try cache first
    const cached = await getCachedContent();

    if (cached && cached.items && cached.items.length > 0) {
        contentItems = cached.items;
        console.log(`Loaded ${contentItems.length} items from cache`);

        // Refresh in background if cache is old
        if (Date.now() - cached.timestamp > CONFIG.cacheDuration) {
            fetchAndCacheContent().catch(console.error);
        }
    } else {
        // No cache, fetch fresh
        await fetchAndCacheContent();
    }
}

async function getCachedContent() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['florilegeCache'], (result) => {
            resolve(result.florilegeCache || null);
        });
    });
}

async function fetchAndCacheContent() {
    const items = await fetchFromNotion();

    // Cache the results
    await new Promise((resolve) => {
        chrome.storage.local.set({
            florilegeCache: {
                items,
                timestamp: Date.now()
            }
        }, resolve);
    });

    contentItems = items;
    console.log(`Fetched and cached ${items.length} items`);
}

// ============================================
// Notion API
// ============================================
async function fetchFromNotion() {
    const response = await fetch(
        `${CONFIG.notionApiBase}/databases/${settings.databaseId}/query`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${settings.apiKey}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filter: {
                    property: 'Active',
                    checkbox: {
                        equals: true
                    }
                }
            })
        }
    );

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Notion API error: ${response.status}`);
    }

    const data = await response.json();
    return data.results.map(transformNotionPage).filter(Boolean);
}

function transformNotionPage(page) {
    try {
        const props = page.properties;

        const title = getNotionTitle(props.Title);
        const type = getNotionSelect(props.Type) || 'text';
        const content = getNotionRichText(props.Content);
        const imageUrl = getNotionUrl(props.ImageURL);
        const attribution = getNotionRichText(props.Attribution);
        const learnMoreUrl = getNotionUrl(props.LearnMoreURL);

        if (!content && !imageUrl) {
            return null;
        }

        return {
            id: page.id,
            title,
            type,
            content,
            imageUrl,
            attribution,
            learnMoreUrl,
        };
    } catch (error) {
        console.error('Error transforming page:', page.id, error);
        return null;
    }
}

// Notion property extractors
function getNotionTitle(prop) {
    if (!prop || !prop.title || !prop.title.length) return '';
    return prop.title.map(t => t.plain_text).join('');
}

function getNotionRichText(prop) {
    if (!prop || !prop.rich_text || !prop.rich_text.length) return '';
    return prop.rich_text.map(t => t.plain_text).join('');
}

function getNotionSelect(prop) {
    if (!prop || !prop.select) return null;
    return prop.select.name;
}

function getNotionUrl(prop) {
    if (!prop || !prop.url) return '';
    return prop.url;
}

// ============================================
// Display Random Content
// ============================================
function displayRandomContent() {
    if (contentItems.length === 0) return;

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

    renderContent(item);
}

// ============================================
// Render Content Based on Type
// ============================================
function renderContent(item) {
    loadingEl.classList.add('hidden');

    let html = '';

    if (item.title) {
        html += `<p class="content-label">${escapeHtml(item.title)}</p>`;
    }

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
            html += renderText(item);
    }

    if (item.attribution) {
        html += `<p class="content-attribution">${escapeHtml(item.attribution)}</p>`;
    }

    if (item.learnMoreUrl) {
        html += `<a href="${escapeHtml(item.learnMoreUrl)}" class="content-learn-more" target="_blank" rel="noopener">learn more →</a>`;
    }

    contentEl.innerHTML = html;

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
    const tweetId = getTweetId(item.content);
    if (!tweetId) {
        return `<p class="error-message">Invalid tweet URL</p>`;
    }

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

    let hostname;
    try {
        hostname = new URL(url).hostname;
    } catch {
        hostname = url;
    }

    return `<a href="${escapeHtml(url)}" class="content-link-card" target="_blank" rel="noopener">
        <div class="link-title">${escapeHtml(title)}</div>
        ${description ? `<div class="link-description">${escapeHtml(description)}</div>` : ''}
        <div class="link-url">${escapeHtml(hostname)}</div>
    </a>`;
}

// ============================================
// URL Parsers & Helpers
// ============================================

function getVideoEmbedUrl(url) {
    if (!url) return null;

    const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (ytMatch) {
        return `https://www.youtube.com/embed/${ytMatch[1]}`;
    }

    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
        return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }

    return null;
}

function getSpotifyEmbedUrl(url) {
    if (!url) return null;

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
    // Click anywhere to shuffle (except links and settings)
    document.body.addEventListener('click', (e) => {
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
    hintEl.classList.remove('visible');

    contentEl.classList.add('fade-out');

    setTimeout(() => {
        displayRandomContent();
        contentEl.classList.remove('fade-out');

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
            <p style="margin-top: 1rem;"><a href="options.html">Check your settings →</a></p>
        </div>
    `;
    console.error('Florilege error:', error);
}

// ============================================
// Load Twitter Widget Script
// ============================================
(function loadTwitterWidget() {
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    document.head.appendChild(script);
})();
