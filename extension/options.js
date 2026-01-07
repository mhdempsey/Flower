/**
 * Florilege Options Page
 *
 * Settings for the Chrome extension.
 * Allows users to enter their Notion API key and database ID.
 */

// DOM Elements
const form = document.getElementById('settings-form');
const apiKeyInput = document.getElementById('api-key');
const databaseIdInput = document.getElementById('database-id');
const testBtn = document.getElementById('test-btn');
const clearCacheBtn = document.getElementById('clear-cache-btn');
const statusEl = document.getElementById('status');
const cacheInfoEl = document.getElementById('cache-info');

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
    // Load saved settings
    await loadSettings();

    // Load cache info
    await updateCacheInfo();
});

// ============================================
// Load Settings
// ============================================
async function loadSettings() {
    return new Promise((resolve) => {
        chrome.storage.sync.get(['notionApiKey', 'notionDatabaseId'], (result) => {
            if (result.notionApiKey) {
                apiKeyInput.value = result.notionApiKey;
            }
            if (result.notionDatabaseId) {
                databaseIdInput.value = result.notionDatabaseId;
            }
            resolve();
        });
    });
}

// ============================================
// Save Settings
// ============================================
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const apiKey = apiKeyInput.value.trim();
    const databaseId = cleanDatabaseId(databaseIdInput.value.trim());

    if (!apiKey || !databaseId) {
        showStatus('Please fill in both fields', 'error');
        return;
    }

    // Save to Chrome storage
    chrome.storage.sync.set({
        notionApiKey: apiKey,
        notionDatabaseId: databaseId
    }, () => {
        showStatus('Settings saved successfully!', 'success');
        // Update the input with cleaned ID
        databaseIdInput.value = databaseId;
    });
});

// ============================================
// Test Connection
// ============================================
testBtn.addEventListener('click', async () => {
    const apiKey = apiKeyInput.value.trim();
    const databaseId = cleanDatabaseId(databaseIdInput.value.trim());

    if (!apiKey || !databaseId) {
        showStatus('Please fill in both fields first', 'error');
        return;
    }

    showStatus('Testing connection...', 'success');

    try {
        const response = await fetch(
            `https://api.notion.com/v1/databases/${databaseId}/query`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Notion-Version': '2022-06-28',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    filter: {
                        property: 'Active',
                        checkbox: {
                            equals: true
                        }
                    },
                    page_size: 1
                })
            }
        );

        if (response.ok) {
            const data = await response.json();
            const total = data.results.length;
            showStatus(`Connection successful! Found ${total > 0 ? 'active content' : 'no active content'} in database.`, 'success');
        } else {
            const error = await response.json();
            let message = error.message || 'Connection failed';

            // Provide helpful error messages
            if (response.status === 401) {
                message = 'Invalid API key. Check that your integration token is correct.';
            } else if (response.status === 404) {
                message = 'Database not found. Make sure you\'ve shared the database with your integration.';
            } else if (response.status === 400) {
                message = 'Invalid database ID format.';
            }

            showStatus(message, 'error');
        }
    } catch (error) {
        showStatus(`Network error: ${error.message}`, 'error');
    }
});

// ============================================
// Clear Cache
// ============================================
clearCacheBtn.addEventListener('click', async () => {
    chrome.storage.local.remove('florilegeCache', () => {
        showStatus('Cache cleared! New tab will fetch fresh content.', 'success');
        updateCacheInfo();
    });
});

// ============================================
// Cache Info
// ============================================
async function updateCacheInfo() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['florilegeCache'], (result) => {
            if (result.florilegeCache && result.florilegeCache.items) {
                const cache = result.florilegeCache;
                const date = new Date(cache.timestamp);
                const itemCount = cache.items.length;

                cacheInfoEl.innerHTML = `
                    <strong>${itemCount}</strong> items cached<br>
                    Last updated: ${date.toLocaleString()}
                `;
            } else {
                cacheInfoEl.textContent = 'No cached content';
            }
            resolve();
        });
    });
}

// ============================================
// Helpers
// ============================================

function showStatus(message, type) {
    statusEl.textContent = message;
    statusEl.className = `status ${type}`;
}

/**
 * Extract and clean the database ID from various input formats:
 * - Full URL: https://www.notion.so/abc123?v=...
 * - Just the ID: abc123
 * - ID with dashes: abc-123-def-456
 */
function cleanDatabaseId(input) {
    if (!input) return '';

    // Remove URL parts if present
    let id = input;

    // Extract from URL format
    const urlMatch = input.match(/notion\.so\/(?:.*\/)?([a-f0-9]{32})/i);
    if (urlMatch) {
        return urlMatch[1];
    }

    // Extract ID from URL with dashes
    const dashUrlMatch = input.match(/notion\.so\/(?:.*\/)?([a-f0-9-]{36})/i);
    if (dashUrlMatch) {
        return dashUrlMatch[1].replace(/-/g, '');
    }

    // Remove dashes if present (Notion IDs are sometimes shown with dashes)
    id = id.replace(/-/g, '');

    // Remove any non-hex characters
    id = id.replace(/[^a-f0-9]/gi, '');

    // Notion database IDs are 32 characters
    if (id.length === 32) {
        return id;
    }

    // Return cleaned input even if not exactly 32 chars (user might be typing)
    return id;
}
