// Florilege Chrome Extension - Options Page Script

document.addEventListener('DOMContentLoaded', async () => {
    // Load saved settings
    const settings = await chrome.storage.sync.get(['notionApiKey', 'notionDatabaseId']);

    if (settings.notionApiKey) {
        document.getElementById('notionApiKey').value = settings.notionApiKey;
    }

    if (settings.notionDatabaseId) {
        document.getElementById('notionDatabaseId').value = settings.notionDatabaseId;
    }

    // Save settings
    document.getElementById('settings-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const apiKey = document.getElementById('notionApiKey').value.trim();
        const databaseId = document.getElementById('notionDatabaseId').value.trim();

        if (!apiKey || !databaseId) {
            showStatus('Please fill in all fields', 'error');
            return;
        }

        try {
            // Save to storage
            await chrome.storage.sync.set({
                notionApiKey: apiKey,
                notionDatabaseId: databaseId
            });

            // Clear cache to force refresh
            await chrome.storage.local.remove(['contentCache', 'cacheTimestamp']);

            showStatus('Settings saved successfully! Open a new tab to see your content.', 'success');

        } catch (error) {
            console.error('Error saving settings:', error);
            showStatus('Error saving settings. Please try again.', 'error');
        }
    });

    // Clear cache button
    document.getElementById('clearCache').addEventListener('click', async () => {
        try {
            await chrome.storage.local.remove(['contentCache', 'cacheTimestamp']);
            showStatus('Cache cleared! Content will refresh on next new tab.', 'success');
        } catch (error) {
            console.error('Error clearing cache:', error);
            showStatus('Error clearing cache.', 'error');
        }
    });
});

function showStatus(message, type) {
    const statusEl = document.getElementById('statusMessage');
    statusEl.textContent = message;
    statusEl.className = `status-message ${type}`;
    statusEl.style.display = 'block';

    setTimeout(() => {
        statusEl.style.display = 'none';
    }, 5000);
}
