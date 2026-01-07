// Florilege Chrome Extension - New Tab Script
// Displays random content from cached Notion database

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
    document.getElementById('content-container').addEventListener('click', (e) => {
        // Don't shuffle if clicking on a link
        if (e.target.tagName !== 'A') {
            shuffleContent();
        }
    });
});

// Load content from Chrome storage
async function loadContent() {
    try {
        // Get settings first
        const settings = await chrome.storage.sync.get(['notionApiKey', 'notionDatabaseId']);

        if (!settings.notionApiKey || !settings.notionDatabaseId) {
            showError('Please configure your Notion credentials in Settings.');
            return;
        }

        // Try to load from cache first
        const cached = await chrome.storage.local.get(['contentCache', 'cacheTimestamp']);

        // Use cache if it's less than 1 hour old
        const cacheAge = Date.now() - (cached.cacheTimestamp || 0);
        const oneHour = 60 * 60 * 1000;

        if (cached.contentCache && cacheAge < oneHour) {
            contentPool = cached.contentCache;
            console.log('Loaded content from cache');
        } else {
            // Fetch fresh content from Notion
            await fetchFromNotion(settings.notionApiKey, settings.notionDatabaseId);
        }

        if (contentPool.length === 0) {
            showError('No active content found. Please add content to your Notion database.');
        }

    } catch (error) {
        console.error('Error loading content:', error);
        showError('Unable to load content. Check Settings and try again.');
    }
}

// Fetch content from Notion API
async function fetchFromNotion(apiKey, databaseId) {
    try {
        const response = await fetch('https://api.notion.com/v1/databases/' + databaseId + '/query', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + apiKey,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filter: {
                    property: 'Active',
                    checkbox: {
                        equals: true
                    }
                }
            })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch from Notion: ' + response.status);
        }

        const data = await response.json();

        // Transform Notion data to our format
        contentPool = data.results.map(page => {
            const props = page.properties;
            return {
                id: page.id,
                title: getPlainText(props.Title),
                type: getSelect(props.Type) || 'text',
                content: getPlainText(props.Content),
                imageUrl: getUrl(props.ImageURL),
                attribution: getPlainText(props.Attribution),
                learnMoreUrl: getUrl(props.LearnMoreURL),
                editorNote: getPlainText(props.EditorNote)
            };
        });

        // Cache the content
        await chrome.storage.local.set({
            contentCache: contentPool,
            cacheTimestamp: Date.now()
        });

        console.log('Fetched and cached', contentPool.length, 'items from Notion');

    } catch (error) {
        console.error('Error fetching from Notion:', error);
        throw error;
    }
}

// Helper functions to extract data from Notion property objects
function getPlainText(property) {
    if (!property) return '';

    if (property.type === 'title' && property.title) {
        return property.title.map(t => t.plain_text).join('');
    }

    if (property.type === 'rich_text' && property.rich_text) {
        return property.rich_text.map(t => t.plain_text).join('');
    }

    return '';
}

function getSelect(property) {
    if (!property || property.type !== 'select') return '';
    return property.select ? property.select.name : '';
}

function getUrl(property) {
    if (!property || property.type !== 'url') return '';
    return property.url || '';
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
