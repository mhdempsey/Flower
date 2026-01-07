# Installing the Florilege Chrome Extension

Transform your new tab into a personal oracle showing curated content from your Notion database.

## Prerequisites

- Google Chrome browser (or Chromium-based browser like Edge, Brave, Arc)
- Your Notion Integration Token and Database ID (see [NOTION-SETUP.md](NOTION-SETUP.md))

## Step 1: Prepare Extension Files

You'll need the `extension` folder from the Florilege project. Make sure it contains:

```
extension/
├── manifest.json
├── newtab.html
├── options.html
├── script.js
├── options.js
├── style.css
└── images/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

### Create Placeholder Icons (if needed)

If you don't have icon files yet, you can:

1. **Quick option**: Use any small square PNG images (rename them to `icon16.png`, `icon48.png`, `icon128.png`)
2. **Create custom icons**: Make simple icons in any image editor
   - Size: 16x16, 48x48, 128x128 pixels
   - Format: PNG with transparency
   - Design: Simple, minimal (a letter "F", a flower, etc.)

3. **Use a favicon generator**:
   - Go to [favicon.io](https://favicon.io/favicon-generator/)
   - Create an icon with "F" or any symbol
   - Download and extract to the `images/` folder

## Step 2: Load Extension in Chrome

1. **Open Chrome Extensions Page**
   - Visit `chrome://extensions/`
   - Or: Menu (⋮) → More Tools → Extensions

2. **Enable Developer Mode**
   - Toggle the **"Developer mode"** switch in the top right
   - This allows you to load unpacked extensions

3. **Load the Extension**
   - Click **"Load unpacked"**
   - Navigate to your `florilege/extension` folder
   - Click **"Select Folder"**

4. **Verify Installation**
   - You should see "Florilege" in your extensions list
   - Make sure it's enabled (toggle should be blue)

## Step 3: Configure Extension Settings

1. **Open Settings**
   - Right-click the Florilege icon in your extensions bar
   - Select **"Options"**
   - Or: Click **"Details"** on the extension card → **"Extension options"**

2. **Enter Your Notion Credentials**
   - **Notion Integration Token**: Paste your `secret_...` token
   - **Notion Database ID**: Paste your 32-character database ID
   - Click **"Save Settings"**

3. **Test the Extension**
   - Open a new tab (Cmd+T or Ctrl+T)
   - You should see one of your curated content pieces
   - Press **Spacebar** to shuffle to new content

## Step 4: Customize (Optional)

### Change Background Color
Edit `extension/style.css`, line 17:
```css
background-color: #faf9f7; /* Change to your preferred color */
```

### Change Fonts
Edit `extension/newtab.html`, lines 7-8:
```html
<!-- Replace font families in the Google Fonts URL -->
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500&display=swap" rel="stylesheet">
```

### Disable Click-to-Shuffle
Edit `extension/script.js`, remove lines 24-29:
```javascript
// Comment out or delete this block
// document.getElementById('content-container').addEventListener('click', (e) => {
//     if (e.target.tagName !== 'A') {
//         shuffleContent();
//     }
// });
```

After making changes:
1. Go to `chrome://extensions/`
2. Click the **reload icon** (⟳) on the Florilege extension
3. Open a new tab to see changes

## Troubleshooting

### Extension Not Loading

**"Manifest file is missing or unreadable"**
- Make sure you selected the `extension` folder (not the parent folder)
- Verify `manifest.json` exists in the folder
- Check that the file is valid JSON (no syntax errors)

**Icons not showing**
- Create placeholder PNG files in the `images/` folder
- Or remove the icon references from `manifest.json` temporarily

### No Content Appearing

**"Please configure your Notion credentials"**
- Go to extension Options (right-click icon → Options)
- Enter your Notion Integration Token and Database ID
- Click "Save Settings"

**"No active content found"**
- Check your Notion database has entries with Active ✓ checked
- Verify property names are correct (case-sensitive)
- Click "Clear Cache" in Options and refresh

**"Failed to fetch from Notion"**
- Verify your Integration Token is correct
- Check the integration has access to your database
- Verify Database ID is exactly 32 characters

### Content Loads But Doesn't Display

**Blank screen**
- Check browser console (F12) for errors
- Verify all files are in the extension folder
- Try clearing cache and reloading extension

**Images not showing**
- Use external image URLs (Unsplash, GitHub, Imgur)
- Avoid Notion's internal file URLs
- Make sure URLs start with `https://`

### Caching Issues

**Old content showing after updates**
1. Go to extension Options
2. Click **"Clear Cache"**
3. Open a new tab

Or:
1. Go to `chrome://extensions/`
2. Click **reload** (⟳) on the extension
3. Open a new tab

## Features

### Keyboard Shortcuts
- **Spacebar**: Shuffle to new content
- **Cmd/Ctrl + T**: Open new tab

### Offline Support
- Content is cached for 1 hour
- Works without internet after initial load
- Refreshes automatically when online

### Privacy
- No tracking or analytics
- Data stored locally in your browser
- Notion API key never leaves your computer
- No external servers except Notion API

## Updating the Extension

When you update the code:

1. Make your changes to files in `extension/` folder
2. Go to `chrome://extensions/`
3. Click the **reload icon** (⟳) on Florilege
4. Open a new tab to test changes

## Publishing (Advanced)

To publish your extension to the Chrome Web Store:

1. **Prepare for submission**:
   - Create proper icon assets (16x16, 48x48, 128x128)
   - Add screenshots (1280x800 or 640x400)
   - Write a description
   - Create a privacy policy (if collecting data)

2. **Create a developer account**:
   - Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
   - Pay one-time $5 registration fee

3. **Upload extension**:
   - Zip your `extension` folder
   - Upload to dashboard
   - Fill in metadata
   - Submit for review

4. **Wait for approval**:
   - Usually takes a few days
   - Check for any feedback from reviewers
   - Make requested changes if needed

## Alternative Browsers

### Microsoft Edge
1. Visit `edge://extensions/`
2. Enable Developer Mode
3. Load unpacked extension
4. Same setup process

### Brave Browser
1. Visit `brave://extensions/`
2. Enable Developer Mode
3. Load unpacked extension
4. Same setup process

### Arc Browser
- Works the same as Chrome
- Visit `arc://extensions/`

## Uninstalling

To remove the extension:

1. Go to `chrome://extensions/`
2. Find Florilege
3. Click **"Remove"**
4. Confirm removal

Your Notion database and content remain untouched.

## Next Steps

- **Customize the design**: See [CUSTOMIZE.md](CUSTOMIZE.md)
- **Deploy the website version**: See [DEPLOY.md](DEPLOY.md)
- **Add more content** to your Notion database

## Tips

- Add 20-30 pieces of content for good variety
- Mix different content types (text, images, videos)
- Use the Active checkbox to curate seasonally
- Update your database regularly to keep it fresh
- Share your setup! Export your extension and share with friends
