// Florilege - Personal Oracle Content Surfacing System
// Main website script

let contentPool = [];
let currentContent = null;
let isTransitioning = false;

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    await loadContent();
    displayRandomContent();

    // Spacebar to shuffle
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            shuffleContent();
        }
    });

    // Click anywhere to shuffle (optional)
    document.getElementById('content-container').addEventListener('click', () => {
        shuffleContent();
    });
});

// Load content from API
async function loadContent() {
    try {
        const response = await fetch('/api/content');
        if (!response.ok) {
            throw new Error('Failed to fetch content');
        }
        const data = await response.json();
        contentPool = data.content || [];

        if (contentPool.length === 0) {
            showError('No content available. Please add content to your Notion database.');
        }
    } catch (error) {
        console.error('Error loading content:', error);
        showError('Unable to load content. Please check your configuration.');
    }
}

// Display random content
function displayRandomContent() {
    if (contentPool.length === 0) return;

    // Get random content (avoid repeating current)
    let randomContent;
    if (contentPool.length === 1) {
        randomContent = contentPool[0];
    } else {
        do {
            randomContent = contentPool[Math.floor(Math.random() * contentPool.length)];
        } while (randomContent === currentContent && contentPool.length > 1);
    }

    currentContent = randomContent;
    renderContent(randomContent);
}

// Shuffle to new content with fade transition
function shuffleContent() {
    if (isTransitioning || contentPool.length === 0) return;

    isTransitioning = true;
    const container = document.getElementById('content-display');

    // Fade out
    container.classList.remove('fade-in');
    container.classList.add('fade-out');

    setTimeout(() => {
        displayRandomContent();
        container.classList.remove('fade-out');
        container.classList.add('fade-in');
        isTransitioning = false;
    }, 300);
}

// Render content based on type
function renderContent(item) {
    const container = document.getElementById('content-display');
    let html = '';

    // Optional label/title
    if (item.title) {
        html += `<div class="content-label">${escapeHtml(item.title)}</div>`;
    }

    // Editor's note (expandable)
    if (item.editorNote) {
        html += `
            <div class="editor-note">
                <div class="editor-note-toggle" onclick="toggleEditorNote()">editor's note</div>
                <div class="editor-note-content" id="editor-note-content">${escapeHtml(item.editorNote)}</div>
            </div>
        `;
    }

    // Main content based on type
    html += '<div class="content-main">';

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

    html += '</div>';

    // Attribution
    if (item.attribution) {
        html += `<div class="content-attribution">${escapeHtml(item.attribution)}</div>`;
    }

    // Learn more link
    if (item.learnMoreUrl) {
        html += `<div class="content-learn-more"><a href="${escapeHtml(item.learnMoreUrl)}" target="_blank" rel="noopener noreferrer">learn more →</a></div>`;
    }

    container.innerHTML = html;
}

// Toggle editor's note expand/collapse
function toggleEditorNote() {
    const noteContent = document.getElementById('editor-note-content');
    if (noteContent) {
        noteContent.classList.toggle('expanded');
    }
}

// Render functions for each content type
function renderText(item) {
    const textClass = item.content && item.content.length < 150 ? 'large' : '';
    return `<blockquote class="content-text ${textClass}">${escapeHtml(item.content)}</blockquote>`;
}

function renderImage(item) {
    return `<img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.title || 'Image')}" class="content-image">`;
}

function renderImageText(item) {
    let html = `<img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.title || 'Image')}" class="content-image">`;
    if (item.content) {
        html += `<p class="image-caption">${escapeHtml(item.content)}</p>`;
    }
    return html;
}

function renderVideo(item) {
    const videoUrl = getEmbedUrl(item.content, 'video');
    return `<div class="content-video"><iframe src="${videoUrl}" allowfullscreen></iframe></div>`;
}

function renderAudio(item) {
    const audioUrl = getEmbedUrl(item.content, 'audio');
    return `<div class="content-audio"><iframe src="${audioUrl}" height="152" allowtransparency="true" allow="encrypted-media"></iframe></div>`;
}

function renderTweet(item) {
    // For tweets, we'll embed using Twitter's oEmbed API or just link to it
    // Simplified version: just show as a link card
    const tweetId = extractTweetId(item.content);
    return `<div class="content-tweet">
        <blockquote class="content-text">
            <a href="${escapeHtml(item.content)}" target="_blank" rel="noopener noreferrer" style="color: #1a1a1a; text-decoration: none;">
                View tweet →
            </a>
        </blockquote>
    </div>`;
}

function renderLink(item) {
    return `<a href="${escapeHtml(item.content)}" target="_blank" rel="noopener noreferrer" class="content-link">
        <div class="link-title">${escapeHtml(item.title || 'Link')}</div>
        ${item.attribution ? `<div class="link-description">${escapeHtml(item.attribution)}</div>` : ''}
    </a>`;
}

// Helper functions
function getEmbedUrl(url, type) {
    if (type === 'video') {
        // YouTube
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const videoId = extractYouTubeId(url);
            return `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`;
        }
        // Vimeo
        if (url.includes('vimeo.com')) {
            const videoId = url.split('/').pop();
            return `https://player.vimeo.com/video/${videoId}`;
        }
    }

    if (type === 'audio') {
        // Spotify
        if (url.includes('spotify.com')) {
            const trackId = url.includes('track/')
                ? url.split('track/')[1].split('?')[0]
                : url.split('/').pop().split('?')[0];
            return `https://open.spotify.com/embed/track/${trackId}`;
        }
    }

    return url;
}

function extractYouTubeId(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : '';
}

function extractTweetId(url) {
    const match = url.match(/status\/(\d+)/);
    return match ? match[1] : '';
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showError(message) {
    const container = document.getElementById('content-display');
    container.innerHTML = `<div class="loading">${escapeHtml(message)}</div>`;
}
