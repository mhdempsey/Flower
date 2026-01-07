# Installing the Florilege Chrome Extension

This guide walks you through installing and configuring the Chrome extension.

## Installation

### Step 1: Download the Extension

1. Download or clone this repository
2. Locate the `extension` folder

### Step 2: Load in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable **"Developer mode"** (toggle in top right)
3. Click **"Load unpacked"**
4. Select the `extension` folder
5. The extension should appear in your list

### Step 3: Configure Settings

1. Click the extension icon in your toolbar (puzzle piece)
2. Find "Florilege" and click the ⚙ icon, OR
3. Open a new tab and click the gear icon in the top right

### Step 4: Enter Your Credentials

1. **Notion API Key**: Your `secret_...` token
2. **Database ID**: The 32-character ID from your database URL
3. Click **"Save Settings"**
4. Click **"Test Connection"** to verify it works

## Usage

### New Tab Experience
- Every new tab shows a random piece of content
- Press **Spacebar** to shuffle to new content
- Click anywhere (except links) to shuffle
- Click the ⚙ gear to access settings

### Keyboard Shortcuts
- **Space**: Show new random content
- **Click**: Show new random content

## Features

### Offline Support
The extension caches your content locally. Even without internet:
- Previously loaded content still displays
- New content syncs when you're back online

### Fast Loading
- Content loads from local cache first
- Fresh content fetches in the background
- New tabs open instantly

## Updating Content

1. Add/edit items in your Notion database
2. Toggle the **Active** checkbox for items to show
3. In extension settings, click **"Clear Cache & Refresh"**
4. Open a new tab to see updated content

## Adding Custom Icons

The extension needs icons. Create or download these files and add to `extension/icons/`:

- `icon16.png` (16x16 pixels)
- `icon48.png` (48x48 pixels)
- `icon128.png` (128x128 pixels)

A simple approach:
1. Create a 128x128 image with a "F" letter
2. Resize to create the smaller versions
3. Use a tool like [realfavicongenerator.net](https://realfavicongenerator.net)

## Troubleshooting

### "Welcome to Florilege" keeps showing
- Your API key or Database ID isn't saved
- Check for typos in settings
- Make sure you clicked "Save Settings"

### "Unable to load content"
- Click "Test Connection" in settings
- Verify your Notion integration has database access
- Check the database has Active items

### Extension not appearing
- Make sure Developer mode is enabled
- Try removing and re-adding the extension
- Check for errors in `chrome://extensions/`

### Content not updating
- Click "Clear Cache & Refresh" in settings
- Wait for the cache timer (1 hour by default)

## Privacy & Security

- Your API key is stored locally in Chrome's sync storage
- It's only sent directly to Notion's API
- No data is sent to any other servers
- Content is cached locally on your device

## Uninstalling

1. Go to `chrome://extensions/`
2. Find Florilege
3. Click **"Remove"**

Your Notion database and content remain untouched.

---

Next: [Customize Appearance →](CUSTOMIZE.md)
